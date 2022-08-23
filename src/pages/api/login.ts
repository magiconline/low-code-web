import type { NextApiRequest, NextApiResponse } from 'next';
import { getCollection } from '../../utilts/database';
import NextCors from 'nextjs-cors';
import CryptoJS from 'crypto-js';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await NextCors(req, res, {
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
        origin: '*',
        optionsSuccessStatus: 200
    })
    try {
        const userCollection = await getCollection('user')

        if (req.method === 'POST') {
            const phone: string = req.body['phone']
            const password: string = req.body['password']

            if (phone && password) {
                const result = await userCollection.findOne({
                    phone: phone,
                    password: CryptoJS.MD5(password).toString()
                })

                if (result) {
                    // 已注册且密码正确
                    res.json({
                        'code': 0,
                        'msg': '登陆成功',
                        'userID': result._id
                    })
                } else {
                    // 未注册或密码错误
                    res.json({
                        'code': 1,
                        'msg': '手机号或密码错误'
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