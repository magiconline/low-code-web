import React, { useState, useEffect } from "react";
// import { EditorHeader } from "../components/editorHeader";
// import { EditorMain } from "../components/editorMain";
import { useRouter } from "next/router";
import { getPageInfo } from "../utilts/api";
import Main from "../components/Main";
import { Header } from "../components/Header";


export default function Edit() {

    // 路由参数
    const router = useRouter()


    // 状态
    // Container页面信息，供渲染和后端使用
    const [pageInfo, setPageInfo] = useState(null)
    // Container页面预览大小
    const [canvasSize, setCanvasSize] = useState({ width: 800, height: 1000 })
    // 被选择高亮的组件
    const [selectComponent, setSelectComponent] = useState(0);
    // 切换编辑预览模式
    const [editMode, setEditMode] = useState(true)


    // 异步加载页面信息
    useEffect(() => {
        async function fecthData() {
            if (router.isReady) {
                const { userID, pageID } = router.query
                try {
                    const pageInfo = await getPageInfo(userID, pageID)
                    setPageInfo(pageInfo)
                } catch (e) {
                    console.log(e)
                }
            }
        }
        fecthData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.isReady])

    if (pageInfo) {
        // 加载成功
        return (
            <div className="editor-wrapper">
                <Header selectComponent={selectComponent} pageInfo={pageInfo} setPageInfo={setPageInfo} canvasSize={canvasSize} setCanvasSize={setCanvasSize} editMode={editMode} setEditMode={setEditMode} />
                <Main
                    selectComponent={selectComponent}
                    setSelectComponent={setSelectComponent}
                    pageInfo={pageInfo}
                    setPageInfo={setPageInfo}
                    canvasSize={canvasSize}
                    editMode={editMode}
                />
            </div>
        )
    } else {
        // 未加载
        return (
            <p>加载中</p>
        )
    }


}