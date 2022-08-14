import React from "react";
import { useDrag, useDrop } from "react-dnd";

// 根据页面信息pageInfo递归渲染组件
// 供预览使用，不添加额外功能
function Component(props) {
    if (props.children.length > 0) {
        const children = props.children.map((child, index) => {
            return typeof child === 'string' ? child : <Component key={index} {...child}></Component>
        })
        return React.createElement(props.type, props.props, children
        )
    } else {
        return React.createElement(props.type, props.props)
    }

}


// 在Component基础上添加一层div, 加入拖动事件, 选中突出显示
// 在Container中使用
function PreviewComponent({ selectComponent, ...props }) {
    let children = []
    if (props.children.length > 0) {
        children = props.children.map((child, index) => {
            return typeof child === 'string' ? child : <PreviewComponent key={index} {...child} selectComponent={selectComponent}></PreviewComponent>
        })

    }
    if (selectComponent == props.props.id) {
        // 通过切换className突出显示
        return (
            <div className="preview-component-click" >
                {React.createElement(props.type, props.props, children)}
            </div>
        )
    } else {
        return (
            <div className="preview-component"  >
                {React.createElement(props.type, props.props, children)}
            </div>

        )
    }

}
// 渲染可拖动组件
function DragComponent(props) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'add',
        item: { type: props.type }, // 开始拖拽时添加被选中的组件类型
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult()
            alert(`dropped ${item.type} into ${dropResult.id}`)

        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            handlerId: monitor.getHandlerId()
        })
    }))

    return (
        <div ref={drag}>
            <Component {...props}></Component>
        </div>
    )
}

function DropComponent(props) {
    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: 'add',
        drop: () => ({ id: props.id }), // 结束拖拽时添加被释放的组件id
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        })
    }))

    return (
        <div ref={drop} className='drop-component' onClick={(e) => alert(e.currentTarget)}>
            <Component {...props} ></Component>
        </div>
    )
}



export { Component, DragComponent, DropComponent, PreviewComponent }