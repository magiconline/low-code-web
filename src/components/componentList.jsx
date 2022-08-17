import React from "react"
// import componentList from '../schema/components'
import componentlayoutList from '../schema/components-layout'
import componenttexttList from '../schema/components-text'
import componentmultimediaList from '../schema/components-multimedia'

import { DragComponent, Component } from "./render"


//左侧组件栏布局
export function ComponentList() {
    return (
        <section className='editor-left'>
            
            
            <section className='editor-left-layout'>
                <details open>
                    <summary>布局</summary>
                {
                    componentlayoutList.map((component, index) =>
                        
                        <div className='editor-left-item' key={index} style={{ margin: '20px'}}>
                            <DragComponent key={index}{...component}></DragComponent>
                            
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
                    
                    <div className='editor-left-item' key={index} style={{ margin: '20px'}}>
                        <DragComponent key={index}{...component}></DragComponent>
                        
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
                        
                        <div className='editor-left-item' key={index} style={{ margin: '20px'}}>
                            <DragComponent key={index}{...component}></DragComponent>
                            
                        </div>
                    )
                }
                </details>
            </section>

            {/* {
                componentList.map((component, index) =>
                    
                    <div className='editor-left-item' key={index} style={{ margin: '20px'}}>
                        <DragComponent key={index}{...component}></DragComponent>
                        
                    </div>
                )
            } */}
        </section>
    )
}
