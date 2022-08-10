import React, { useState, useEffect } from "react";
import { EditorHeader } from "../components/editorHeader";
import { EditorMain } from "../components/editorMain";
import { useRouter } from "next/router";
import { getPageInfo } from "../utilts/api";


export default function () {

    // 路由参数
    const router = useRouter()
    const { userID, pageID } = router.query

    // 状态
    // Container页面信息，供渲染和后端使用
    const [pageInfo, setPageInfo] = useState()
    // Container页面预览大小
    const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 })

    // 异步加载页面信息
    useEffect(async () => {
        try {
            const pageInfo = await getPageInfo(userID, pageID)
            setPageInfo(pageInfo)
        } catch (e) {
            alert(e)
        }
    }, [])

    if (pageInfo) {
        // 加载成功
        return (
            <div className="editor-wrapper">
                <EditorHeader props={{ pageInfo, setPageInfo, canvasSize, setCanvasSize }} />
                <EditorMain props={{ pageInfo, setPageInfo, canvasSize }} />
            </div>
        )
    } else {
        // 未加载
        return (
            <p>加载中</p>
        )
    }


}