import type { NextApiRequest, NextApiResponse } from 'next';
import { getCollection } from '../../utilts/database';
import NextCors from 'nextjs-cors';
import { ObjectId } from 'mongodb';


// 将pageName更名
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await NextCors(req, res, {
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
        origin: '*',
        optionsSuccessStatus: 200
    })

    if (req.method === 'POST') {
        try {
            const { userID, pageID, pageName } = req.body
            const pageCollection = await getCollection('page')
            const userCollection = await getCollection('user')

            // 检测userID与pageID是否合法
            await userCollection.findOne({
                _id: new ObjectId(userID)
            }).then(async (result) => {
                if (result) {
                    // 页面存在
                    await pageCollection.updateOne({
                        _id: new ObjectId(pageID)
                    }, {
                        $set: {
                            pageName: pageName
                        }
                    }).then(
                        result => {
                            // 修改成功
                            res.json({
                                code: 0,
                                msg: 'ok'
                            })
                        },
                        err => {
                            res.json({
                                code: 1,
                                msg: (err as Error).message
                            })
                        }
                    )
                } else {
                    // 页面不存在
                    res.json({
                        code: 3,
                        msg: 'pageID或userID不存在'
                    })
                }

            },
                err => {
                    res.json({
                        code: 2,
                        msg: (err as Error).message
                    })
                }
            )

        } catch (e) {
            const { message } = e as Error

            res.json({
                code: -1,
                msg: message
            })
        }
    } else {
        res.status(404)
    }


}