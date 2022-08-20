import React from "react"

const buttons = [
  { label: '撤销', handler: () => { } },
  { label: '重做' },
  { label: '保存' },
  { label: '删除' }
]

export function Header({ pageInfo, setPageInfo, canvasSize, setCanvasSize }) {
  return (
    <div className='editor-header'>

      <div className="editor-header-logo">
        LowCode
      </div>

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

      <div className="editor-header-button">
        {
          buttons.map((button, index) => (
            <button
              key={index}
              className="button"
              onClick={button.handler}>
              {button.label}
            </button>
          ))
        }
      </div>
    </div>
  )
}
