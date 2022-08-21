import { ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';
import { getCollection } from '../../utilts/database';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await NextCors(req, res, {
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
        origin: '*',
        optionsSuccessStatus: 200
    })

    try {
        const pageCollection = await getCollection('page')

        if (req.method === 'POST') {
            const userID = req.body['userID']

            if (userID) {
                const result = pageCollection.find({
                    userID: new ObjectId(userID)
                })
                let pages: { pageID: string; pageName: string; }[] = []
                await result.forEach((e) => {
                    pages.push({
                        pageID: e._id.toString(),
                        pageName: e.pageName
                    })
                })

                res.json({
                    'code': 0,
                    'msg': 'OK',
                    'pages': pages
                })
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