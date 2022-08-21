import React from 'react'
import { deepCopy } from '../../../utilts/clone'

const propsColorType = [
    // 'color', 'backgroundColor'
]


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

function change(page, selectComponent, key, value) {
    if (typeof page === 'string') {
        return page
    }

    if (page.props.id === selectComponent) {
        page.props.style[key] = value
        return page
    } else {
        page.children = page.children.map((child) => change(child, selectComponent, key, value))
        return page
    }
}

const StyleSetter = ({ pageInfo, selectComponent, setPageInfo }) => {

    function handleChange(key, value) {
        let newPageInfo = deepCopy(pageInfo)
        newPageInfo.page = change(newPageInfo.page, selectComponent, key, value)
        setPageInfo(newPageInfo)
    }

    let props = findComponentByID(pageInfo.page, selectComponent)
    if (props === false) {
        // throw Error(`未找到id: ${id}`)
        return false
    }

    return (
        <div className="style-setter-wrapper">
            {
                Object.keys(props.style).map((key, index) => {
                    if (propsColorType.indexOf(key) !== -1) {
                        // 显示color
                        return (
                            <div className="setter-item-label" key={index}>
                                <div className="style-name">{key} :</div>
                                <input type="color" onChange={event => handleChange(key, event.target.value)} />
                            </div>
                        )
                    } else {
                        // 显示string
                        return (
                            <div className="setter-item-label" key={index}>
                                <div className="style-name">{key}:</div>
                                <input type={'text'} value={props.style[key]} onChange={event => handleChange(key, event.target.value)} />
                            </div>
                        )
                    }
                })
            }
        </div>

    )

}
export default StyleSetter
