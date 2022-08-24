import React from 'react'
import { deepCopy } from '../../../utilts/clone'
import style from './index.module.scss'



const propsColorType = [
    'color', 'backgroundColor', 'outlineColor', 'borderColor'
]
// props中不显示的
const blankProps = ['name', 'style', 'controls', 'label']
const propsFont = ['fontSize']
const propsStyle = {

    boxSizing: ['border-box', 'content-box'],
    position: ['relative', 'absolute', 'static', 'fixed'],
    display: ['flex', 'inline-flex', 'inline', 'block'],
    flexDirection: ['row', 'column'],
    flexWrap: ['wrap', 'nowrap'],
    borderStyle: ['solid', 'dotted', 'dashed', 'double', 'groove', 'ridge', 'insert', 'outset'],
    justifyContent: ['flex-start', 'flex-end', 'center', 'baseline', 'space-between', 'space-around', 'inherit'],
    alignItems: ['flex-start', 'flex-end', 'center', 'baseline', 'space-between', 'space-around', 'inherit'],
    alignSelf: ['auto', 'start', 'end', 'center', 'stretch'],
    textAlign: ['left', 'center', 'right'],
    textDecoration: ['none', 'underline', 'overline', 'line-through', 'blink'],
    fontWeight: ['light', 'bold'],
    fontStyle: ['normal', 'Italic'],
    cursor: ['default', 'pointer'],
    pointerEvents: ['auto', 'none'],
    backgroundSize:['cover','contain']



}





// 根据id查找组件属性
function findComponentByID(page, id) {
    if (typeof page === 'string') {
        return false
    } else if (page.props.id === id) {
        return page.props
    } else {
        let result
        for (let i in page.children) {
            if (result = findComponentByID(page.children[i], id)) {
                return result
            }
        }
        return false
    }
}

// 根据id查找组件的children
function findChildrenByID(page, id) {
    if (typeof page === 'string') {
        return false
    } else if (page.props.id === id && page.props.id > 1) {
        return page.children
    } else {
        let result
        for (let i in page.children) {
            if (result = findChildrenByID(page.children[i], id)) {
                return result
            }
        }
        return false
    }
}

// 修改style
function change(page, selectComponent, key, value) {
    if (typeof page === 'string') {
        return page
    }
    if (page.props.id === selectComponent) {
        // console.log(page.children[0]);

        page.props.style[key] = value
        return page
    } else {
        page.children = page.children.map((child) => change(child, selectComponent, key, value))
        return page
    }
}
//修改props
function changeProps(page, selectComponent, key, value) {
    if (typeof page === 'string') {
        return page
    }
    if (page.props.id === selectComponent) {
        page.props[key] = value
        return page
    } else {
        page.children = page.children.map((child) => changeProps(child, selectComponent, key, value))
        return page
    }
}
// 修改children中的文本
function changeChildren(page, selectComponent, key, value) {
    if (typeof page === 'string') {
        return page
    }
    if (page.props.id === selectComponent) {
        page.children[0] = value
        return page
    } else {
        page.children = page.children.map((child) => changeChildren(child, selectComponent, key, value))
        return page
    }
}

const StyleSetter = ({ pageInfo, selectComponent, setPageInfo }) => {

    // 修改style的方法
    function handleChange(key, value) {
        let newPageInfo = deepCopy(pageInfo)
        newPageInfo.page = change(newPageInfo.page, selectComponent, key, value)
        setPageInfo(newPageInfo)
    }
    // 修改props的方法
    function handleChangeProps(key, value) {
        let newPageInfo = deepCopy(pageInfo)
        newPageInfo.page = changeProps(newPageInfo.page, selectComponent, key, value)
        setPageInfo(newPageInfo)
    }
    //修改 children的方法
    function handleChangeChildren(key, value) {
        let newPageInfo = deepCopy(pageInfo)
        newPageInfo.page = changeChildren(newPageInfo.page, selectComponent, key, value)
        setPageInfo(newPageInfo)
    }

    let props = findComponentByID(pageInfo.page, selectComponent)
    let children = findChildrenByID(pageInfo.page, selectComponent)
    if (props === false) {
        throw Error(`未找到id: ${id}`)

    }


    return (
        <div className="style-setter-wrapper">
            {/* props */}
            <div>
                {
                    Object.keys(props).map((key, index) => {
                        if (blankProps.indexOf(key) !== -1) {
                            return null
                        } else if (key.startsWith('on')) {
                            return null
                        } else if (key === 'id') {
                            return (
                                <div className={style.setterItemLabel} key={index}>
                                    <div className={style.styleName}>{key}: {props[key]}</div>
                                    {/* <input className={style.setterItem} type={'text'} value={props[key]} onChange={event => handleChangeProps(key, event.target.value)} placeholder="请输入对应属性值" /> */}
                                </div>
                            )
                        }
                        else {
                            return (
                                <div className={style.setterItemLabel} key={index}>
                                    <div className={style.styleName}>{key}:</div>
                                    <input className={style.setterItem} type={'text'} value={props[key]} onChange={event => handleChangeProps(key, event.target.value)} placeholder="请输入对应属性值" />
                                </div>
                            )
                        }
                    })
                }
            </div>
            {/* props.style */}
            <div>
                {
                    Object.keys(props.style).map((key, index) => {

                        index = `${props.id}_${index}` // index区分不同组件id与顺序index
                        if (propsColorType.indexOf(key) !== -1) {
                            // 显示color
                            return (
                                <div className={style.setterItemLabel} key={index}>
                                    <div className={style.styleName}>{key} :</div>
                                    <input className={style.setterItem} type="color" onChange={event => handleChange(key, event.target.value)} value={props.style[key] || ''} />
                                </div>
                            )
                        }
                        //ming新增
                        //标题hgroup
                        else if (propsFont[0].indexOf(key) !== -1) {
                            return (
                                <div className={style.setterItemLabel} key={index}>
                                    <div className={style.styleName}>{key}:</div>
                                    <select className={style.setterItem} onChange={event => handleChange(key, event.target.value)} value={props.style[key] || ''}>
                                        <option value='32px'>h1</option>
                                        <option value='24px'>h2</option>
                                        <option value='18px'>h3</option>
                                        <option value='15px'>h4</option>
                                        <option value='13px'>h5</option>
                                        <option value='10px'>h6</option>
                                        <option value='48px'>48px</option>
                                        <option value='44px'>44px</option>
                                        <option value='40px'>40px</option>
                                        <option value='36px'>36px</option>
                                        <option value='32px'>32px</option>
                                        <option value='28px'>28px</option>
                                        <option value='24px'>24px</option>
                                        <option value='20px'>20px</option>
                                        <option value='16px'>16px</option>
                                        <option value='12px'>12px</option>
                                        <option value='8px'>8px</option>
                                        <option value='6px'>6px</option>
                                        <option value='4px'>4px</option>

                                    </select>
                                </div>
                            )
                        }
                        //除去颜色和标题大小外的所有属性显示select
                        else if (Object.keys(propsStyle).indexOf(key) !== -1) {
                            return (
                                <div className={style.setterItemLabel} key={index}>
                                    <div className={style.styleName}>{key}:</div>
                                    <select className={style.setterItem} onChange={event => handleChange(key, event.target.value)} value={props.style[key] || ''}>
                                        {
                                            propsStyle[key].map((item, i) => {
                                                return (
                                                    <option value={item} key={i}>{item}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            )
                        }
                        //ming新增
                        else {
                            // 显示string
                            return (
                                <div className={style.setterItemLabel} key={index}>
                                    <div className={style.styleName}>{key}:</div>
                                    <input className={style.setterItem} type={'text'} value={props.style[key]} onChange={event => handleChange(key, event.target.value)} placeholder="请输入对应属性值" />
                                </div>
                            )
                        }
                    })
                }
            </div>

            {/* children */}
            <div>
                {
                    Object.keys({ ...children }).map((key, index) => {
                        if (typeof children[index] === 'string') {
                            return (
                                <div className={style.setterItemLabel} key={index}>
                                    <div className={style.styleName}>content:</div>
                                    <input className={style.setterItem} type={'text'} value={{ ...children }[key] || ''} onChange={event => handleChangeChildren(key, event.target.value)} />
                                </div>
                            )
                        } else {
                            return null
                        }

                    })
                }
            </div>

        </div>
    )

}
export default StyleSetter
