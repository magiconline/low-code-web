import React ,{useState}from "react";
import SchemaJSON from '../schema/schema'
// import ReactJSON from 'react-json-view'
import { Tabs} from 'antd';
import 'antd/dist/antd.css'; 
import StyleSetter from "./StyleSetter";
function findComponentByID(page, id) {

}
const { TabPane } = Tabs;
const onChange = (key) => {
    // console.log(key);
  };
export function Editor({ selectComponent, pageInfo, setPageInfo }) {
    // console.log(pageInfo.page.props.style);
//   const [schema, setSchema] = useState(SchemaJSON)
    const [value, setValue] = useState('Map');
     // 右侧属性配置

    if (selectComponent) {
        let componentInfo = findComponentByID(pageInfo.page, selectComponent)
        // console.log(componentInfo);     //undefined
        return (
            <div className="editor-right">
                {/* <div className="setter-tabs-list"> */}
                 <Tabs className="tabs-list" centered defaultActiveKey="1" onChange={onChange}>
                    <TabPane tab="样式" key="1">
                        <StyleSetter pageInfo={pageInfo} selectComponent={selectComponent} />

                    </TabPane>
                    <TabPane tab="代码" key="2">
                        {/* <ReactJSON src={schema}></ReactJSON> */}
                    </TabPane>
                    <TabPane  tab="事件" key="3">
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