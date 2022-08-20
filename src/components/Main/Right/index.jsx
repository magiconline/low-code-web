import React from "react";
import { Tabs } from 'antd';
import 'antd/dist/antd.css';
import StyleSetter from "./StyleSetter";
import style from './index.module.scss'

const { TabPane } = Tabs;

export default function Editor({ selectComponent, pageInfo, setPageInfo }) {
    // 右侧属性配置
    if (selectComponent) {
        return (
            <div className={style.editorRight}>
                {/* <div className="setter-tabs-list"> */}
                <Tabs className="tabs-list" centered defaultActiveKey="1">
                    <TabPane tab="样式" key="1">
                        <StyleSetter pageInfo={pageInfo} selectComponent={selectComponent} setPageInfo={setPageInfo} />

                    </TabPane>
                    <TabPane tab="代码" key="2">
                        {/* <ReactJSON src={schema}></ReactJSON> */}
                    </TabPane>
                    <TabPane tab="事件" key="3">
                        <textarea className="tab-text"></textarea>
                    </TabPane>
                </Tabs>
                {/* </div> */}

                {/* 2.渲染activeTab对应的View */}
                <div className="setter-content">

                </div>
            </div>
        )
    } else {
        return null
    }
}