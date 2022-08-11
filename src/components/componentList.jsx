import React from "react"
import componentList from '../schema/components'
import { Component } from "./render"

export function ComponentList() {
    return (
        <section className='editor-left'>
            <div>editor-left</div>
            {
                componentList.map((component, index) =>
                    <div key={index}>
                        <Component key={index} {...component}></Component>
                        <p>{component.type}</p>
                    </div>
                )
            }
        </section>
    )
}
