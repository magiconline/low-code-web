import React from "react";
// import Block from "../Block";

export function Container({ handleWrapperMouseDown, handleDragEnter, handeDragOver, handleDragLeave, handleDrop, handleClickCanvas, wrapperDragState, markLine, schema, handleMouseDown }) {
    return (
        <section className='editor-container' onMouseDown={handleWrapperMouseDown}>

            <div
                onDragEnter={handleDragEnter}
                onDragOver={handeDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onMouseDown={handleClickCanvas}
                id='canvas-container'
                style={{ ...schema.container, transform: `translate(${wrapperDragState.left}px, ${wrapperDragState.top}px)` }}
            // 这里定义了画布的大小，可以更改
            >
                {markLine.x !== null && <div className="editor-line-x" style={{ left: markLine.x }}></div>}
                {markLine.y !== null && <div className="editor-line-y" style={{ top: markLine.y }}></div>}
                {
                    schema.blocks.map((block, index) => (
                        <Block key={index} block={block} onMouseDown={e => handleMouseDown(e, block, index)} />
                    ))
                }
            </div>

        </section>
    )
}