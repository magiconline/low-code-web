import React from "react"
import componentlayoutList from '../../../schema/components-layout'
import componenttexttList from '../../../schema/components-text'
import componentmultimediaList from '../../../schema/components-multimedia'
import style from './index.module.scss'


// import { DragComponent, Component } from "./render"


//左侧组件栏布局
export default function Left() {

  const handle_dragStart = (e, type) => {
    e.dataTransfer.setData('component/type', type)
  }


  return (
    <section className={style.editorLeft}>
      <section className={style.editorLeftLayout}>
        <details open>
          <summary>布局</summary>
          {
            componentlayoutList.map((component, index) =>

              <div className={style.editorLeftItem} key={index} style={{ margin: '16px' }}>
                {/* <DragComponent key={index}{...component}></DragComponent> */}
                <div
                  draggable
                  onDragStart={(e) => handle_dragStart(e, component.type)}
                >
                  {component.props.name}
                </div>
              </div>
            )
          }
        </details>
      </section>


      <section className={style.editorLeftText}>
        <details open>
          <summary>
  
            文本</summary>
          {
            componenttexttList.map((component, index) =>
              <div className={style.editorLeftItem} key={index} style={{ margin: '16px' }}>
                {/* <DragComponent key={index}{...component}></DragComponent> */}
                <div
                  draggable
                  onDragStart={(e) => handle_dragStart(e, component.type)}
                >
                  {component.props.name}
                </div>
              </div>
            )
          }
        </details>
      </section>
      <section className={style.editorLeftMultimedia}>
        <details open>
          <summary>多媒体</summary>
          {
            componentmultimediaList.map((component, index) =>

              <div className={style.editorLeftItem} key={index} style={{ margin: '16px' }}>
                {/* <DragComponent key={index}{...component}></DragComponent> */}
                <div
                  draggable
                  onDragStart={(e) => handle_dragStart(e, component.type)}
                >
                  {component.props.name}
                </div>
              </div>
            )
          }
        </details>
      </section>

    </section>
  )


  
}