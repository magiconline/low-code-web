// // import React from 'react'
// // import components from '../../../schema/components'
// // import style from './index.module.scss'

// // export default function Left() {
// //   const handle_dragStart = (e, type) => {
// //     e.dataTransfer.setData('component/type', type)
// //   }

// //   return (
// //     <div className={style.editorLeft}>
// //       {
// //         components.map((component, index) =>
// //           <div className={style.editorLeftItem} key={index} style={{ margin: '20px' }}>
// //             {/* <DragComponent key={index}{...component}></DragComponent> */}
// //             <div
// //               draggable
// //               onDragStart={(e) => handle_dragStart(e, component.type)}
// //             >
// //               {component.props.name}
// //             </div>
// //           </div>
// //         )
// //       }
// //     </div>
// //   )
// // }


import React from "react"
// import componentList from '../schema/components'
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


      <section className='editor-left-layout'>
        <details open>
          <summary>布局</summary>
          {
            componentlayoutList.map((component, index) =>

              <div className={style.editorLeftItem} key={index} style={{ margin: '20px' }}>
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


      <section className='editor-left-text'>
        <details open>
          <summary>文本</summary>
          {
            componenttexttList.map((component, index) =>

              <div className={style.editorLeftItem} key={index} style={{ margin: '20px' }}>
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
      <section className='editor-left-multimedia'>
        <details open>
          <summary>多媒体</summary>
          {
            componentmultimediaList.map((component, index) =>

              <div className={style.editorLeftItem} key={index} style={{ margin: '20px' }}>
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