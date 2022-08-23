// 根据pageInfo渲染组件

import React from "react";
import componentList from '../schema/components'
import { deepCopy } from "../utilts/clone";


// 将字符串转换为函数
function parse(str) {
    if (typeof str === 'string') {
        return new Function('return' + str)()
    } else {
        console.log(`函数转换错误: ${str} ${typeof str}`)
    }
}

// 判断属性是否是函数
function isFunction(key) {
    // 假设所有事件属性都以on开头
    // 或者对应的value使用特殊前缀
    return key.startsWith('on')
}

// 根据页面信息pageInfo递归渲染组件
// 供预览使用，不添加额外功能
function Component(props) {
    // 把props函数属性从字符串转为函数
    // 不要直接修改props
    let newProps = {}
    for (let key in props.props) {
        if (isFunction(key)) {
            newProps[key] = parse(props.props[key])
        } else {
            newProps[key] = props.props[key]
        }
    }

    if (props.children.length > 0) {
        const children = props.children.map((child, index) => {
            return typeof child === 'string' ? child : <Component key={index} {...child}></Component>
        })
        return React.createElement(props.type, newProps, children
        )
    } else {
        return React.createElement(props.type, newProps)
    }
}


// 在Component基础上添加一层div, 加入拖动事件, 选中突出显示
// 在Container中使用
// 禁止<a>超链接点击：css pointer-events:none
// 不设置onXXX函数，
function PreviewComponent({ selectComponent, setSelectComponent, pageInfo, setPageInfo, ...props }) {
    console.assert(typeof selectComponent === 'number')

    // 开始拖动时添加组件id和类型
    const handle_dragStart = (e) => {
        e.dataTransfer.setData('component/id', `${props.props.id}`) // props.id为数字，传输时使用字符串！！
        e.dataTransfer.setData('component/type', `${props.type}`)

        e.stopPropagation()
    }

    // 拖拽经过释放区域
    const handle_dragOver = (e) => {
        e.preventDefault()
        e.dataTransfer.dropEffect = 'move'
    }


    // 在pageInfo.page中根据id查找组件
    const findComponentByID = (id, page) => {
        if (typeof page === 'string' || !page)
            return false

        if (page.props.id === id) {
            return page

        } else {
            for (let index in page.children) {
                let result = findComponentByID(id, page.children[index])
                if (result) {
                    return result
                }
            }
            return false
        }
    }

    // 遍历page删除id对应的组件，返回新组件
    function removeComponentByID(ID, page) {
        if (typeof page === 'string') {
            // 字符串结点直接返回
            return page
        } else if (page.props.id !== ID) {
            // 普通节点ID不同，递归遍历子节点
            let newChildren = []
            for (let index in page.children) {
                let result = removeComponentByID(ID, page.children[index])
                if (result !== false) {
                    // 保留子结点
                    newChildren.push(result)
                }
            }
            page.children = newChildren
            return page
        } else {
            // 要删除的结点
            return false
        }
    }

    // 将component插入page中id=parentID的组件的children中，返回修改后的page
    function addToChildren(component, parentID, page) {
        if (typeof page === 'string') {
            return page
        } else if (page.props.id === parentID) {
            page.children.push(component)
            return page
        } else {
            page.children = page.children.map((child) => {
                return addToChildren(component, parentID, child)
            })
            return page
        }
    }

    // 在pageInfo中将ID对应的组件移动至parentID内
    function moveToChildren(ID, parentID, page) {
        // 找到要移动的组件
        const component = findComponentByID(ID, page)
        if (component === false) {
            console.log('不存在的组件id:', ID)
            return pageInfo
        }

        // 删除要移动的组件得到newPage
        const newPage = removeComponentByID(ID, page)

        // 在parentID组件children中push结点
        return addToChildren(component, parentID, newPage)

    }

    function findParentID(targetID, page) {
        if (typeof page === 'string') {
            return false
        } else {
            for (let i in page.children) {
                if (typeof page.children[i] === 'string') {
                    continue
                } else if (page.children[i].props.id === targetID)
                    return page.props.id
                else {
                    let result = findParentID(targetID, page.children[i])
                    if (result !== false) {
                        return result
                    }
                }
            }
            return false
        }

    }

    // 释放
    function handle_drop(e) {
        e.preventDefault()
        e.stopPropagation() // 避免触发两次

        const dragID = parseInt(e.dataTransfer.getData('component/id'))
        const dragType = e.dataTransfer.getData('component/type')
        const dropID = parseInt(e.target.id)
        const dropType = e.target.localName

        console.assert(typeof dragID === 'number')
        console.assert(typeof dropID === 'number')

        console.log(`drag ${dragID}/${dragType} into ${dropID}/${dropType}`)
        // console.log(e)

        if (dragID) {
            // dragID存在，移动组件

            // 不需要移动
            if (dragID === dropID) {
                return
            }

            if (dropType === 'div') {
                // 如果目标容器可嵌套(div)，则向children push
                let newPageInfo = pageInfo
                newPageInfo.page = moveToChildren(dragID, dropID, newPageInfo.page)
                setPageInfo({ ...newPageInfo })

            } else {
                // TODO 如果目标不可嵌套，则根据y轴坐标判断在上面还是下面添加
                // TODO 如果是水平布局则比较x轴
                // console.log('暂时不支持移动组件')
                // e.target.offset为与editor-main相对像素
                const offset = e.clientY >= (e.target.offsetTop + e.target.offsetHeight / 2) ? 1 : 0
                // console.log(offset)

                let newPageInfo = pageInfo
                let parentID = findParentID(dropID, newPageInfo.page)
                newPageInfo.page = moveToChildren(dragID, parentID, newPageInfo.page)
                setPageInfo({ ...newPageInfo })
            }
        } else {
            // dragID不存在，新建组件

            let newPageInfo = pageInfo
            newPageInfo.maxID += 1
            let component

            for (let index in componentList) {
                if (componentList[index].type === dragType) {
                    // 直接赋值bug，所有相同类型的组件使用同一个page的引用
                    // 需要深拷贝新建component
                    // component = componentList[index]
                    component = deepCopy(componentList[index])
                    component.props.id = newPageInfo.maxID
                    break
                }
            }


            if (dropType === 'div') {
                // 如果目标容器可嵌套(div)，则向children push
                newPageInfo.page = addToChildren(component, dropID, newPageInfo.page)

            } else {
                // 寻找父节点，向其孩子插入
                // 如果目标不可嵌套，则根据y轴坐标判断在上面还是下面添加
                let parentID = findParentID(dropID, newPageInfo.page)
                console.assert(parentID !== false)

                newPageInfo.page = addToChildren(component, parentID, newPageInfo.page)

            }

            setPageInfo({ ...newPageInfo })
        }

        // 避免冒泡
        return false
    }

    // 组件是string, 不需要渲染
    if (typeof props === 'string') {
        return { props }
    }

    // 递归渲染子组件
    let children = []
    if (props.children.length > 0) {
        children = props.children.map((child, index) => {
            return typeof child === 'string' ? child
                : <div className="canvas-field" key={index} id={child.props.id}>
                    <PreviewComponent  {...child} pageInfo={pageInfo} setPageInfo={setPageInfo} selectComponent={selectComponent} setSelectComponent={setSelectComponent}></PreviewComponent>
                </div>
        })
    }




    // 编辑时删除组件onXXX函数
    let newProps = {}
    for (let key in props.props) {
        // console.log(`props.${key} = ${props.props[key]}`)
        if (!isFunction(key)) {
            newProps[key] = props.props[key]
        }
    }

    // 编辑时禁用<a>点击效果
    if (props.type === 'a') {
        newProps.style['pointer-events'] = 'none'
    }

    // TODO 编辑时禁用input 和 textarea标签输入功能（设置只读）
    if (props.type === 'input' || props.type === 'textarea') {
        newProps.readOnly = true
    }

    // img标签不能传children参数
    // 通过切换className高亮被选中的组件
    if (children.length !== 0) {
        return React.createElement(props.type, {
            // ...props.props,
            ...newProps,
            className: selectComponent === props.props.id ? "preview-component-click" : "preview-component",
            draggable: true,
            onDragStart: handle_dragStart,
            onDragOver: handle_dragOver,
            onDrop: handle_drop
        }, children)
    } else {
        return React.createElement(props.type, {
            // ...props.props,
            ...newProps,
            className: selectComponent === props.props.id ? "preview-component-click" : "preview-component",
            draggable: true,
            onDragStart: handle_dragStart,
            onDragOver: handle_dragOver,
            onDrop: handle_drop
        })
    }



}


// 渲染左侧列表中的可拖动组件
function DragComponent(props) {
    function handle_dragStart(e) {
        e.dataTransfer.setData('component/type', props.type)
    }
    // const styleLeft = {
    //     border: '1px solid #BFC3F2', 
    //     borderRadius:'4px', 
    //     userSelect: 'none',
    //     textAlign:'center',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     height:'30px',
    //     color:'#000CF5',
    //     fontFamily:'Geneva',
    //     cursor:'-webkit-grab',

    // }


    return (
        <div draggable onDragStart={handle_dragStart}>

            <div>{props.props.name}</div>
            {/*<Component {...props}></Component>
            <Component {...props}></Component> */}
        </div>
    )
}
export { Component, DragComponent, PreviewComponent }