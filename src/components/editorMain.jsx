import React, { useState } from "react";
import { ComponentList } from "./componentList";
import { Container } from "./container";
import { Editor } from "./editor";

export function EditorMain({ pageInfo, setPageInfo, canvasSize }) {
    // Container页面中被选择的组件id，供editor编辑
    // PageInfo中的组件id从1开始
    // 点击Container其他部分会将id设为0，且默认为0
    const [selectComponent, setSelectComponent] = useState(0)

    return (
        <div className='editor-main'>
            <ComponentList />
            <Container selectComponent={selectComponent} setSelectComponent={setSelectComponent} pageInfo={pageInfo} canvasSize={canvasSize} setPageInfo={setPageInfo} />
            <Editor selectComponent={selectComponent} pageInfo={pageInfo} setPageInfo={setPageInfo} />
        </div>
    )
}