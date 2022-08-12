// 前端使用的api请求封装

import { Page } from "../schema/schema"

// 读取页面信息
// 传空参数可得到模板页面信息
export async function getPageInfo(userID, pageID) {
    // const url = 'https://lowcode.fly.dev/api/getPage' // 远程url
    const url = '/api/getPage' // 本地url
    return await fetch(url, {
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