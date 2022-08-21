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


  // return (
  //   <section className={style.editorLeft}>
  //       <Collapse defaultActiveKey={['1','2','3']}>
          
  //           <Panel className={style.editorLeftLayout} header="布局组件" key="1">
  //           {
  //             componentlayoutList.map((component, index) =>

  //               <div className={style.editorLeftItem} key={index} style={{ margin: '16px' }}>
  //                 {/* <DragComponent key={index}{...component}></DragComponent> */}
  //                 <div
  //                   draggable
  //                   onDragStart={(e) => handle_dragStart(e, component.type)}
  //                 >
  //                   {component.props.name}
  //                 </div>
  //               </div>
  //             )
  //           }
  //           </Panel>
          
  //         <Panel className={style.editorLeftText} header="文本类组件" key="2">
  //         {
  //           componenttexttList.map((component, index) =>
  //             <div className={style.editorLeftItem} key={index} style={{ margin: '16px' }}>
  //               {/* <DragComponent key={index}{...component}></DragComponent> */}
  //               <div
  //                 draggable
  //                 onDragStart={(e) => handle_dragStart(e, component.type)}
  //               >
  //                 {component.props.name}
  //               </div>
  //             </div>
  //           )
  //         }

  //         </Panel>
  //         <Panel className={style.editorLeftMultimedia} header="多媒体组件" key="3">
  //         {
  //           componentmultimediaList.map((component, index) =>

  //             <div className={style.editorLeftItem} key={index} style={{ margin: '16px' }}>
  //               {/* <DragComponent key={index}{...component}></DragComponent> */}
  //               <div
  //                 draggable
  //                 onDragStart={(e) => handle_dragStart(e, component.type)}
  //               >
  //                 {component.props.name}
  //               </div>
  //             </div>
  //           )
  //         }

  //         </Panel>
  //       </Collapse>

  //   </section>
  // )
}