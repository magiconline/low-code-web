import React, { useState } from "react";
import { ComponentList } from "./componentList";
import { Container } from "./container";
import { Editor } from "./editor";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
export function EditorMain({ pageInfo, setPageInfo, canvasSize }) {
    // Container页面中被选择的组件id，供editor编辑
    // PageInfo中的组件id从1开始
    // 点击Container其他部分会将id设为0，且默认为0
    const [selectComponent, setSelectComponent] = useState(0)

    return (
        <div className='editor-main'>
            <DndProvider backend={HTML5Backend}>
                <ComponentList />
                <Container selectComponent={selectComponent} setSelectComponent={setSelectComponent} pageInfo={pageInfo} canvasSize={canvasSize} setPageInfo={setPageInfo} />
            </DndProvider>

            <Editor selectComponent={selectComponent} pageInfo={pageInfo} setPageInfo={setPageInfo} />
        </div>
    )
}