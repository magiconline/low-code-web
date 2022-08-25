import React from 'react'
import style from './index.module.scss'
import { Component } from '../../render';
import { PreviewComponent } from '../../render';


export default function Container({ selectComponent, setSelectComponent, pageInfo, setPageInfo, canvasSize, editMode }) {
    // console.log(pageInfo);
    if (editMode) {
        // 编辑模式
        return (
            <div
                className={style.editorCenter}
                onClick={e => {
                    setSelectComponent(parseInt(e.target.id))
                }}
            >
                <div
                    className={style.canvasCenter}
                    style={{
                        width: `${canvasSize.width}px`,
                        height: `${canvasSize.height}px`,
                        backgroundColor: '#000000'
                    }}
                >
                    <PreviewComponent
                        // className={style.canvasField}
                        {...pageInfo.page}
                        selectComponent={selectComponent}
                        setSelectComponent={setSelectComponent}
                        pageInfo={pageInfo}
                        setPageInfo={setPageInfo}
                    />
                </div>
            </div>
        )
    } else {
        // 预览模式
        return (
            <div className={style.editorCenter}>
                <div className={style.canvasCenter} style={{
                    width: `${canvasSize.width}px`,
                    height: `${canvasSize.height}px`,
                    backgroundColor: '#000000'
                }}>
                    <Component {...pageInfo.page}></Component>
                </div>
            </div >
        )
    }


}
