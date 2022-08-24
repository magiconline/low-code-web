import type { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';
import { getCollection } from '../../utilts/database';
import CryptoJS from 'crypto-js';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await NextCors(req, res, {
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200
    })
    try {
        const userCollection = await getCollection('user')

        if (req.method === 'POST') {
            const username = req.body['username']
            const phone = req.body['phone']
            const password = req.body['password']

            if (username && phone && password) {
                // 尝试插入数据，重复会抛出异常
                const result = await userCollection.insertOne({
                    username: username,
                    phone: phone,
                    password: CryptoJS.MD5(password).toString()
                })

                res.json({
                    'code': 0,
                    'msg': '注册成功',
                })
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

        if (message.startsWith('E11000 duplicate key error collection:')) {
            // 用户名或手机重复
            res.json({
                'code': 1,
                'msg': '用户名或密码重复'
            })
        } else {
            // 未知错误
            res.json({
                'code': -1,
                'msg': message
            })
        }
    }

}
