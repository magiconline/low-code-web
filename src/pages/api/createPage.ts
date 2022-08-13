import type { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';
import { getCollection, newSession } from '../../utilts/database';
import { defaultPage } from '../../schema/schema';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await NextCors(req, res, {
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
        origin: '*',
        optionsSuccessStatus: 200
    })

    if (req.method === 'POST') {
        // 开启事务
        const session = newSession()


        try {
            session.startTransaction()

            const pageCollection = await getCollection('page')
            const userCollection = await getCollection('user')

            const pageName = req.body['name']
            const userID = req.body['userID']

            if (userID && pageName) {

                // TODO 先在user中添加pageID，再在page中创建模板
                // 如果没有注册则第一步报错 findOneAndUpdate $addToSet


                // 尝试在user中添加pageID
                const pageID = new ObjectId()
                const result = await userCollection.updateOne({
                    _id: new ObjectId(userID)
                }, {
                    $push: {
                        pages: pageID
                    }
                }, { session })

                // 如果已创建userID, 且插入成功,则在pageCollection中插入
                if (result.matchedCount === 1 && result.modifiedCount === 1) {
                    // userID与pageName有唯一索引，重名会异常
                    const result = await pageCollection.insertOne({
                        userID: userID,
                        pageName: pageName,
                        page: defaultPage
                    }, { session })

                    // 提交事务
                    await session.commitTransaction()

                    res.json({
                        'code': 0,
                        'msg': 'OK',
                        'pageID': result.insertedId
                    })
                } else {
                    // 回滚事务，将userCollection中新添加的pageID删除
                    await session.abortTransaction()

                    res.json({
                        code: 2,
                        msg: 'userID不存在',
                    })
                }



            } else {
                await session.abortTransaction()
                // 参数错误
                res.json({
                    'code': 1,
                    'msg': '参数错误'
                })
            }

        } catch (e) {
            await session.abortTransaction()

            const { message } = e as Error

            if (message.startsWith('E11000 duplicate key error collection')) {
                res.json({
                    code: 3,
                    msg: 'name重复'
                })
            } else {
                // 未知错误
                res.json({
                    'code': -1,
                    'msg': message
                })
            }



        } finally {
            await session.endSession()
        }
    } else {
        // 错误的方法
        res.status(404)
    }
}