import React, { useState } from 'react'
import Left from './Left'
// import Center from './Center'
import Right from './Right'
import style from './index.module.scss'
import Container from './Container';

export default function Main({ pageInfo, setPageInfo, canvasSize }) {
  const [selectComponent, setSelectComponent] = useState(0);

  return (
    <div className={style.editorMain}>
      <Left />

      {/* <Center
        selectComponent={selectComponent}
        setSelectComponent={setSelectComponent}
        pageInfo={pageInfo}
        canvasSize={canvasSize} // 自定义画布大小
        setPageInfo={setPageInfo}
      /> */}

      <Container
        selectComponent={selectComponent}
        setSelectComponent={setSelectComponent}
        pageInfo={pageInfo}
        canvasSize={canvasSize} // 自定义画布大小
        setPageInfo={setPageInfo}
      />

      <Right
        selectComponent={selectComponent}
        pageInfo={pageInfo}
        setPageInfo={setPageInfo}
      />
    </div>
  )
}
