import type { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';
import { getCollection, newSession } from '../../utilts/database';
import { Page } from '../../schema/schema';
import { ObjectId } from 'mongodb';

// 存储与解析pageCollection版本
const VERSION = 1;

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

                    // 创建空Page
                    const result = await pageCollection.insertOne(new Page({
                        _id: pageID,
                        userID: new ObjectId(userID),
                        version: VERSION,
                        name: pageName,
                        maxID: 1,
                        page: {
                            type: 'div',
                            props: {
                                id: 1,
                                name: '根组件',
                                style: {
                                    backgroundColor: "grey"
                                }
                            },
                            children: [
                                'hello world'
                            ]
                        }
                    }), { session })

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