import React, { useState, useEffect } from "react"
import { deepCopy } from "../../utilts/clone";
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from "next/router";
<link
    rel="stylesheet"
    href="https://fonts.googleapis.com/icon?family=Material+Icons"
/>



export function Header({ selectComponent, pageInfo, setPageInfo, canvasSize, setCanvasSize, editMode, setEditMode }) {
    // 每次调用pageInfo可能会变化，记录pageInfo
    // 撤销、恢复使用setPageInfo
    // console.log({ ...pageInfo });//获取schema数据
    // console.log({ ...pageInfo.page.children });//获取schema数据
    // console.log(selectComponent);


    const [pageInfoHistory, setPageInfoHistory] = useState([])
    const [index, setIndex] = useState(-1)
    useEffect(() => {
        // let newPageInfo = deepCopy()
        //将新的pageInfo追加到数组中，并深赋值，防止覆盖
        if (pageInfoHistory[pageInfoHistory.length - 1] !== pageInfo) {
            let newPageInfoHistory = deepCopy([...pageInfoHistory, pageInfo])
            setPageInfoHistory(newPageInfoHistory)
            setIndex(index + 1)
            console.log(pageInfoHistory)
            console.log(index)
        }
        // console.log(pageInfoHistory[pageInfoHistory.length - 1]);

    }, [pageInfo])

    //撤销
    const undo = () => {
        if (index > 0 && pageInfoHistory[pageInfoHistory.length - 1] !== pageInfo) {
            setIndex(index - 2)  //当点击时也会追加新的pageInfo，因此需要index减两次
            let newPageInfoHistory = deepCopy(pageInfoHistory)
            // newPageInfoHistory.length = index
            setPageInfoHistory([...newPageInfoHistory])
            setPageInfo({ ...newPageInfoHistory[index - 1] })
        }

    }

    //重做
    const redo = () => {
        let newPageInfoHistory = deepCopy(pageInfoHistory)
        if (index + 1 < newPageInfoHistory.length && pageInfoHistory[pageInfoHistory.length - 1] !== pageInfo) {
            setPageInfoHistory([...newPageInfoHistory])
            setPageInfo({ ...newPageInfoHistory[index + 1] })
        }
    }


    //清空画布,将page.children内数据清空
    const clearClick = () => {
        let newPageInfo = pageInfo
        newPageInfo.page.children = []
        setPageInfo({ ...newPageInfo })
    }

    // 递归删除节点
    function selectDelete(arr, newPageInfo) {
        if (selectComponent == NaN) return false
        for (let i = 0; i < arr.length; i++) {
            // id与selectComponent值相同，则选中
            if (!arr[i].props) {
                continue // div没有id值，跳过本次循环
            }
            if (arr[i].props.id == selectComponent) {
                arr.splice(i, 1)
                return setPageInfo({ ...newPageInfo })
            } else if (arr[i].children.length > 1) {
                // 若为div嵌套，则递归遍历其中的节点
                selectDelete(arr[i].children, newPageInfo)
            }
        }
    }

    //删除组件
    const deleteFocus = () => {
        console.log('删除');
        let newPageInfo = pageInfo
        let arr = newPageInfo.page.children
        selectDelete(arr, newPageInfo)
    }



    // 递归上移节点
    function selectUp(arr, newPageInfo) {
        if (selectComponent == NaN) return false
        for (let i = 0; i < arr.length; i++) {
            // id与selectComponent值相同，则选中
            if (!arr[i].props) {
                continue // 跳过本次循环，继续下一个循环
            }
            if (arr[i].props.id == selectComponent && i !== 0) {
                // console.log(i);
                arr[i] = arr.splice(i - 1, 1, arr[i])[0]
                return setPageInfo({ ...newPageInfo })
            } else if (arr[i].children.length > 1) {
                // 若为div嵌套，则递归遍历其中的节点
                selectUp(arr[i].children, newPageInfo)
            }
        }
    }
    //上移
    const placeTop = () => {
        let newPageInfo = pageInfo
        let arr = newPageInfo.page.children
        selectUp(arr, newPageInfo)
    }

    // 递归下移节点
    function selectDown(arr, newPageInfo) {
        if (selectComponent == NaN) return false
        for (let i = 0; i < arr.length; i++) {
            // id与selectComponent值相同，则选中
            if (!arr[i].props) {
                continue // 跳过本次循环，继续下一个循环
            }
            if (arr[i].props.id == selectComponent && i !== arr.length - 1) {
                // console.log(i);
                arr[i] = arr.splice(i + 1, 1, arr[i])[0]
                return setPageInfo({ ...newPageInfo })
            } else if (arr[i].children.length > 1) {
                // 若为div嵌套，则递归遍历其中的节点
                selectDown(arr[i].children, newPageInfo)
            }
        }
    }
    //下移
    const placeBottom = () => {
        let newPageInfo = pageInfo
        let arr = newPageInfo.page.children
        selectDown(arr, newPageInfo)
    }
    //保存
    const saveSchema = () => {
        // sessionStorage.setItem('schema', JSON.stringify(pageInfo));
        let newPageInfo = pageInfo
        let pageID_ = newPageInfo.userID
        let page_ = newPageInfo
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://lowcode.fly.dev/api/savePage', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(
            JSON.stringify({
                pageID: pageID_,
                page: page_,
            })
        );
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var res = JSON.parse(xhr.responseText)
                console.log(res)
                if (res.code === 0) {
                    console.log(res.msg)
                    toast.success(res.msg)
                } else if (res.code === 1) {
                    // 不存在
                    toast.success(res.msg)
                } else if (res.code === 2) {
                    // 参数错误
                    toast.success(res.msg)
                } else if (res.code === -1) {
                    // 未知错误
                    toast.success(res.msg)
                }
            } else {
                console.log(xhr.statusText)
            }
        }
    }

    const buttons = [
        { label: '撤销', handler: undo },
        { label: '重做', handler: redo },
        { label: '删除', handler: deleteFocus },
        { label: '清空', handler: clearClick },
        { label: '上移', handler: placeTop },
        { label: '下移', handler: placeBottom },
    ]
    return (
        <div className='editor-header'>
            <div className="editor-header-logo left">
                <img src="/img/logo.png" height="40px"></img>
            </div>
            {buttons.map((button, index) => (
                <button key={index} className="editor-header-button left" onClick={button.handler}>{button.label}<Toaster /></button>
            ))}

            {/* 自定义画布大小 */}
            {/* className="editor-header-canvas" */}
            <span style={{ color: '#606266', marginLeft: '10px ' }} >
                <span>画布尺寸:</span>
                <input
                    value={canvasSize.width}
                    onChange={(e) => setCanvasSize({ width: e.target.value, height: canvasSize.height })}
                />
                <span>*</span>
                <input
                    value={canvasSize.height}
                    onChange={(e) => setCanvasSize({ width: canvasSize.width, height: e.target.value })}
                />
            </span>

            {/* <Link to="/attack/" className="editor-header-button right" style={{ textDecoration: 'none' }}>发布</Link> */}
            <button onClick={() => setEditMode(!editMode)}>切换编辑/预览</button>
            <button className="editor-header-button right" onClick={saveSchema}>保存<Toaster /></button>
            <a className="editor-header-button right" href={"https://lowcode.fly.dev/view/" + pageInfo.pageID}>发布</a>
        </div>
    )
}
