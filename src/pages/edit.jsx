import React, { useState, useEffect } from "react";
import { EditorHeader } from "../components/editorHeader";
import { EditorMain } from "../components/editorMain";
import { useRouter } from "next/router";
import { getPageInfo } from "../utilts/api";


export default function Edit() {

    // 路由参数
    const router = useRouter()
    const { userID, pageID } = router.query

    // 状态
    // Container页面信息，供渲染和后端使用
    const [pageInfo, setPageInfo] = useState(null)
    // Container页面预览大小
    const [canvasSize, setCanvasSize] = useState({ width: 800, height: 1000 })

    // 异步加载页面信息
    useEffect(() => {
        async function fecthData() {
            try {
                const pageInfo = await getPageInfo(pageID)
                setPageInfo(pageInfo)
            } catch (e) {
                console.log(e)
            }
        }
        fecthData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    if (pageInfo) {
        // 加载成功
        return (
            <div className="editor-wrapper">
                <EditorHeader pageInfo={pageInfo} setPageInfo={setPageInfo} canvasSize={canvasSize} setCanvasSize={setCanvasSize} />
                <EditorMain pageInfo={pageInfo} setPageInfo={setPageInfo} canvasSize={canvasSize} />
            </div>
        )
    } else {
        // 未加载
        return (
            <p>加载中</p>
        )
    }


}