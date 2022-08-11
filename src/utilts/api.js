// 前端使用的api请求封装

import { Page } from "../schema/schema"

export async function getPageInfo(userID, pageID, fake = false) {
    if (fake) {
        return new Page({
            version: 1,
            url: '/view/test',
            name: '测试页面',
            maxID: 1,
            variables: [

            ],
            page: {
                id: 1,
                name: '根组件',
                type: 'div',
                props: {},
                children: []
            }
        })
    } else {
        return await fetch('https://lowcode.fly.dev/api/getPage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                pageID, userID
            })
        }
        ).then((response) => {
            if (response.ok)
                return response.json()
            else
                throw response.status
        }).then((result) => {
            if (result.code === 0) {
                return new Page(result.page)
            } else {
                throw result.msg
            }
        })
    }
}