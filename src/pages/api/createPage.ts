import type { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';
import { getCollection } from '../../utilts/database';
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

        try {
            const pageCollection = await getCollection('page')
            const userCollection = await getCollection('user')

            const pageName = req.body['pageName']
            const userID = req.body['userID']

            if (userID && pageName) {

                // 尝试在user中添加pageID
                const pageID = new ObjectId()
                const result = await userCollection.findOne({
                    _id: new ObjectId(userID)
                })

                // 如果已创建userID, 且插入成功,则在pageCollection中插入
                if (result) {
                    // userID与pageName有唯一索引，重名会异常

                    // 创建空Page
                    const result = await pageCollection.insertOne({
                        _id: pageID, // 存储时pageID转为_id
                        userID: new ObjectId(userID),
                        version: VERSION,
                        pageName: pageName,
                        maxID: 1,
                        page: {
                            type: 'div',
                            props: {
                                id: 1,
                                name: '根组件',
                                style: {
                                    backgroundColor: "white",
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: '100%',
                                    height: '100%'
                                }
                            },
                            children: [
                            ]
                        }
                    })

                    res.json({
                        'code': 0,
                        'msg': 'OK',
                        'pageID': result.insertedId
                    })
                } else {


                    res.json({
                        code: 2,
                        msg: 'userID不存在',
                    })
                }

            } else {
                // 参数错误
                res.json({
                    'code': 1,
                    'msg': '参数错误'
                })
            }

        } catch (e) {
            const { message } = e as Error

            if (message.startsWith('E11000 duplicate key error collection')) {
                res.json({
                    code: 3,
                    msg: 'pageName重复'
                })
            } else {
                // 未知错误
                res.json({
                    'code': -1,
                    'msg': message
                })
            }

        }
    } else {
        // 错误的方法
        res.status(404)
    }
}