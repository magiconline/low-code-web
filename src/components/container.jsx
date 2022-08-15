import React from "react";
import { PreviewComponent } from "./render";

export function Container({ selectComponent, setSelectComponent, pageInfo, setPageInfo, canvasSize }) {
    return (
        <div className='editor-container' id={0} style={{ display: "flex" }}
            onClick={e => {
                setSelectComponent(parseInt(e.target.id))
            }}>
            <div className='canvas-container' style={{
                width: `${canvasSize.width}px`,
                height: `${canvasSize.height}px`,
                backgroundColor: 'white'
            }}>
                <PreviewComponent {...pageInfo.page} selectComponent={selectComponent} setSelectComponent={setSelectComponent} pageInfo={pageInfo} setPageInfo={setPageInfo}></PreviewComponent>
            </div>

        </div>
    )
}