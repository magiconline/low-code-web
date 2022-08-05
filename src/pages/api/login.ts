import type { NextApiRequest, NextApiResponse } from 'next';
import { getCollection } from '../../utilts/database';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const userCollection = await getCollection('user')

        if (req.method === 'POST') {
            const phone: string = req.body['phone']
            const password: string = req.body['password']

            if (phone && password) {
                const result = await userCollection.findOne({
                    phone: phone,
                    password: password
                })

                if (result) {
                    // 已注册
                    res.json({
                        'code': 0,
                        'msg': '登陆成功',
                        'userID': result._id
                    })
                } else {
                    // 未注册
                    res.json({
                        'code': 1,
                        'msg': '手机号未注册'
                    })
                }
            } else {
                // 参数错误
                res.json({
                    'code': 2,
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