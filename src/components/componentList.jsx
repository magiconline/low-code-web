import React from "react"
import componentList from '../schema/components'
import { DragComponent, Component } from "./render"

export function ComponentList() {
    return (
        <section className='editor-left'>
            {
                componentList.map((component, index) =>
                    <div key={index} style={{ marginBottom: '30px' }}>
                        <DragComponent key={index} {...component}></DragComponent>
                        <p>{component.type}</p>
                    </div>
                )
            }
        </section>
    )
}
