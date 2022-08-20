import React from 'react'
import style from './index.module.scss'
import { deepCopy } from "../../../utilts/clone";
import components from '../../../schema/components'
import { PreviewComponent } from '../../render';

export default function Container({ selectComponent, setSelectComponent, pageInfo, setPageInfo,canvasSize }) {
  // console.log(pageInfo);
  const { children, props, type } = pageInfo.page;
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
          backgroundColor: 'white'
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
}
