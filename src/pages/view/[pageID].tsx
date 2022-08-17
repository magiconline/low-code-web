import React from "react";
import { useRouter } from "next/router";
import { Component } from '../../components/render';
import { usePageInfo } from '../../utilts/api'



export default function ViewPage() {

    // 读取pageID
    const router = useRouter()
    const { pageID } = router.query

    // 读取pageInfo
    const { data, isLoading, isError } = usePageInfo(pageID)

    if (isLoading) {
        return <div>{`加载中`}</div>
    }

    if (isError || data.code !== 0) {
        return <div>{`错误: ${isError} ${data.msg}`}</div>
    }

    // const pageInfo = new Page(data.page)

    return (
        <Component {...data.page.page}></Component>
    )
}