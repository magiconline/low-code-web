import React from "react"
import componentList from '../schema/components'
import { DragComponent, Component } from "./render"


//左侧组件栏布局
export function ComponentList() {
    return (
        <section className='editor-left'>
            {
                componentList.map((component, index) =>
                    
                    <div className='editor-left-item' key={index} style={{ margin: '20px'}}>
                        <DragComponent key={index}{...component}></DragComponent>
                        
                    </div>
                )
            }
        </section>
    )
}
