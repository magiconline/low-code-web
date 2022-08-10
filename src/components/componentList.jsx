import React from "react"
import componentList from '../schema/components'

export function ComponentList() {
    return (
        <section className='editor-left'>
            {
                componentList.map(component => (
                    <div draggable
                        key={component.type}
                        className="editor-left-item"
                    >
                        <div className='list'>{component.label}</div>
                        {/* <div className='list'><span>{component.label}</span></div> */}
                        <div>{component.preview()}</div>
                        {/* <span>{component.label}</span> */}
                    </div>
                ))
            }
        </section>
    )
}
