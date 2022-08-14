import React from "react";
import { PreviewComponent } from "./render";

export function Container({ selectComponent, setSelectComponent, pageInfo, canvasSize }) {
    return (
        <section className='editor-container' id={0}
            onClick={e => {
                setSelectComponent(e.target.id)
            }}>
            <div className='canvas-container' id={0}>
                <PreviewComponent {...pageInfo.page} selectComponent={selectComponent}></PreviewComponent>
            </div>

        </section>
    )
}