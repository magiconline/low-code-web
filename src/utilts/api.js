// 前端使用的api请求封装

import { Page } from "../schema/schema"
import useSWR from "swr"

// 读取页面信息
// 传空参数可得到模板页面信息
export async function getPageInfo(pageID) {
    // const url = 'https://lowcode.fly.dev/api/getPage' // 远程url
    const url = '/api/getPage' // 本地url
    return await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            pageID
        })
    }
    ).then((response) => {
        if (response.ok)
            return response.json()
        else
            throw response.status
    }).then((result) => {
        if (result.code === 0) {
            return result.page
        } else {
            throw result.msg
        }
    })
}

const fetcher = (pageID) => fetch('/api/getPage', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ pageID })
}).then(res => res.json())


export function usePageInfo(pageID) {

    const { data, error } = useSWR(pageID, fetcher)

    return {
        data: data,
        isLoading: !error && !data,
        isError: error
    }
}