import React, { useState } from 'react';
import './App.css';

// 定义组件接口
interface Component {
    type: string,
    attrs: { [key: string]: string | number },
}

// 定义组件
const componentList: Component[] = [
    {
        type: 'p',
        attrs: {}
    },
    {
        type: 'button',
        attrs: {}
    },
    {
        type: 'textarea',
        attrs: {}
    }
]

function WidgetView(props: any) {
    const comList: Component[] = props.componentList;

    return (
        <div>
            <p>组件列表</p>
            <div className='line'></div>
            {comList.map((com) => {
                return <p className='widget' draggable
                    onDragStart={(e) => {
                        e.dataTransfer.setData('text/plain', com.type);
                        e.dataTransfer.dropEffect = 'move';
                    }}
                > {com.type}</p>
            })}
        </div >
    );
}

function Canvas(props: any) {
    const canvasData = props.canvasData;
    const setCanvasData: React.Dispatch<React.SetStateAction<never[]>> = props.setCanvasData;

    return (
        <div className='canvas'
            onDrop={(e) => {
                e.preventDefault();
                const type = e.dataTransfer.getData('text/plain');
                setCanvasData(canvasData.concat([type]));
            }}
            onDragOver={(e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
            }}
        >
            {canvasData.map((com: string) => {
                return React.createElement(com, { className: 'widget' }, com);
            })}
        </div>
    );
}

function App() {
    const [canvasData, setCanvasData] = useState([]);

    return (
        <div className='main'>
            <div className='header'>
                菜单栏
            </div>
            <div className='line'></div>
            <div className='body'>
                <WidgetView className='components' componentList={componentList}></WidgetView>
                <div className='line'></div>
                <Canvas canvasData={canvasData} setCanvasData={setCanvasData}></Canvas>
                <div className='line'></div>
                <div className='attributes'>属性栏</div>
            </div>
        </div>
    );
}

export default App;
