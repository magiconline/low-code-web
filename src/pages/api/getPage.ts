import type { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';
import { getCollection } from '../../utilts/database';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await NextCors(req, res, {
        methods: ['GET', 'POST'],
        origin: '*',
        optionsSuccessStatus: 200
    })

    try {
        const pageCollection = await getCollection('page')

        if (req.method === 'GET') {
            const userID = req.body['userID']
            const pageID = req.body['pageID']

            if (userID && pageID) {
                const result = await pageCollection.findOne({
                    _id: new ObjectId(pageID),
                    userID: userID
                })

                if (result) {
                    res.json({
                        'code': 0,
                        'msg': "OK",
                        'page': result.page
                    })
                } else {
                    res.json({
                        'code': 2,
                        'msg': '参数错误，不存在的userID或pageID'
                    })
                }

            } else {
                // 参数错误
                res.json({
                    'code': 1,
                    'msg': '参数错误'
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