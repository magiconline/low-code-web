import React, { useState } from 'react'
import Left from './Left'
// import Center from './Center'
import Right from './Right'
import style from './index.module.scss'
import Container from './Container';

export default function Main({ selectComponent, setSelectComponent, pageInfo, setPageInfo, canvasSize, editMode }) {

    return (
        <div className={style.editorMain}>
            <Left />

            <Container
                selectComponent={selectComponent}
                setSelectComponent={setSelectComponent}
                pageInfo={pageInfo}
                canvasSize={canvasSize} // 自定义画布大小
                setPageInfo={setPageInfo}
                editMode={editMode}
            />

            <Right
                selectComponent={selectComponent}
                pageInfo={pageInfo}
                setPageInfo={setPageInfo}
            />
        </div>
    )

}
