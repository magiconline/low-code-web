import React, { useState } from "react";
import { ComponentList } from "./componentList";
import { Container } from "./container";
import { Editor } from "./editor";

export function EditorMain({ pageInfo, setPageInfo, canvasSize }) {
    // Container页面中被选择的组件id，供editor编辑
    const [selectComponent, setSelectComponent] = useState(null)

    return (
        <div className='editor-main'>
            <ComponentList />
            <Container setSelectComponent={setSelectComponent} pageInfo={pageInfo} canvasSize={canvasSize} />
            <Editor selectComponent={selectComponent} pageInfo={pageInfo} setPageInfo={setPageInfo} />
        </div>
    )
}