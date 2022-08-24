import React from "react";
import { Tabs } from 'antd';
import 'antd/dist/antd.css';
import StyleSetter from "./StyleSetter";
import style from './index.module.scss'
import Event from './event'

const { TabPane } = Tabs;

export default function Editor({ selectComponent, pageInfo, setPageInfo }) {
    // 右侧属性配置
    if (selectComponent > 1) {
        return (
            <div className={style.editorRight}>
                {/* <div className="setter-tabs-list"> */}
                <Tabs className="tabs-list" centered defaultActiveKey="1">
                    <TabPane tab="样式" key="1">
                        <StyleSetter className='style-list' pageInfo={pageInfo} selectComponent={selectComponent} setPageInfo={setPageInfo} />

                    </TabPane>
                    <TabPane tab="代码" key="2">
                        <div className={style.json}>{JSON.stringify(pageInfo.page)}</div>
                    </TabPane>
                    <TabPane tab="事件" key="3" className={style.event}>
                        <Event pageInfo={pageInfo} selectComponent={selectComponent} setPageInfo={setPageInfo} />
                    </TabPane>
                </Tabs>
                {/* </div> */}

                {/* 2.渲染activeTab对应的View */}
                <div className="setter-content">

                </div>
            </div>
        )
    } else {
        return (
            <div className={style.editorRight}>
                <div className={style.info}>
                    <span>pageID:</span>
                    {pageInfo._id}
                </div>
                <div className={style.info}>
                    <span>userID:</span>
                    {pageInfo.userID}
                </div>
                <div className={style.info}>
                    <span>version:</span>
                    {pageInfo.version}
                </div>
                <div className={style.info}>
                    <span>pageName:</span>
                    {pageInfo.pageName}
                </div>
                <div className={style.info}>
                    <span>maxID:</span>
                    {pageInfo.maxID}
                </div>
            </div>)
    }

}