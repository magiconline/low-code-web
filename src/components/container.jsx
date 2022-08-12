import React from "react";
import { Component, DropComponent } from "./render";

export function Container({ setSelectComponent, pageInfo, canvasSize }) {
    return (
        <section className='editor-container'>
            <div id='canvas-container'>
                <DropComponent {...pageInfo.page}></DropComponent>
            </div>

        </section>
    )
}