import type { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';
import { getCollection } from '../../utilts/database';
import { ObjectId } from 'mongodb';
import { defaultPage } from '../../schema/schema'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await NextCors(req, res, {
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
        origin: '*',
        optionsSuccessStatus: 200
    })

    try {
        const pageCollection = await getCollection('page')

        if (req.method === 'POST') {
            const pageID = req.body['pageID']
            const userID = req.body['userID']
            if (pageID) {
                const result = await pageCollection.findOne({
                    _id: new ObjectId(pageID),
                    userID: new ObjectId(userID)
                })

                if (result) {
                    res.json({
                        'code': 0,
                        'msg': "OK",
                        'page': result
                    })
                } else {
                    res.json({
                        'code': 2,
                        'msg': '参数错误，不存在的userID或pageID'
                    })
                }
            } else {
                // 测试用空白页面
                res.json({
                    code: 1,
                    msg: '参数错误'
                })
            }


        } else {
            // 错误的方法
            res.status(404)
        }
    } catch (e) {
        const message = (e as Error).message


        // 未知错误
        res.json({
            'code': -1,
            'msg': message
        })

    }
}