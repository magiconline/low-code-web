import React from "react"

const buttons = [
    { label: '撤销', handler: () => { } },
    { label: '重做' },
    { label: '保存' },
    { label: '删除' }
]

export function EditorHeader({ pageInfo, setPageInfo, canvasSize, setCanvasSize }) {
    // 每次调用pageInfo可能会变化，记录pageInfo
    // 撤销、恢复使用setPageInfo
    return (

        <div className='editor-header'>
            {buttons.map((button, index) => (
                <button key={index} className="editor-header-button" onClick={button.handler}>{button.label}</button>
            ))}

            {/* 自定义画布大小 */}
            <div className="editor-header-canvas">
                <span>画布尺寸:</span>
                <input
                    value={canvasSize.width}
                    onChange={(e) => setCanvasSize({ width: e.target.value, height: canvasSize.height })}
                />
                <span>*</span>
                <input
                    value={canvasSize.height}
                    onChange={(e) => setCanvasSize({ width: canvasSize.width, height: e.target.value })}
                />
            </div>
        </div>
    )
}
