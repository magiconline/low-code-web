import React from 'react'
import { deepCopy } from '../../../utilts/clone'
import style from './index.module.scss'



const propsColorType = [
    'color', 'backgroundColor','outlineColor','borderColor'
]
const propsFont = ['fontSize']
const propsStyle={

    boxSizing:['border-box','content-box'],
    position:['relative','absolute','static','fixed'],
    display:['flex','inline-flex','inline'],
    flexDirection:['row','column'],
    flexWrap:['wrap','nowrap'],
    borderStyle:['solid','dotted','dashed','double','groove','ridge','insert','outset'],
    justifyContent:['flex-start','flex-end','center','baseline','space-between','space-around','inherit'],
    alignItems:['flex-start','flex-end','center','baseline','space-between','space-around','inherit'],
    alignSelf:['start','end','center','stretch'],
    textAlign:['left','center','right'],
    textDecoration:['none','underline','overline','line-through','blink'],
    fontWeight:['light','bold'],
    fontStyle:['normal','Italic'],
    cursor:['default','pointer'],
    pointerEvents:['auto','none'],

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
                            <div className={style.setterItemLabel} key={index}>
                                <div className={style.styleName}>{key} :</div>
                                <input className={style.setterItem} type="color" onChange={event => handleChange(key, event.target.value)} value={key.value} />
                                
                            </div>
                            
                        )
                        
                    } 
                    //ming新增
                    //标题hgroup
                    else if(propsFont[0].indexOf(key) !== -1){
                        return (
                            <div className={style.setterItemLabel} key={index}>
                                <div className={style.styleName}>{key}:</div>
                                <select className={style.setterItem} onChange={event => handleChange(key, event.target.value)}>
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
                    else if(Object.keys(propsStyle).indexOf(key) !== -1){
                        return (
                            <div className={style.setterItemLabel} key={index}>
                                <div className={style.styleName}>{key}:</div>
                                <select className={style.setterItem} onChange={event => handleChange(key, event.target.value)} value={key.value}>
                                    {
                                        propsStyle[key].map((item,i)=>{
                                                return(
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
                                        <input className={style.setterItem} type={'text'} value={props.style[key]} onChange={event => handleChange(key, event.target.value)} placeholder="请输入对应属性值"/>
                                    </div>
                                )
                        }
                        

                    
                })
            }
            {
                Object.keys(props).map((key, index) => {
                    //如果是图片，另外增加显示src地址
                    if(key == 'src'){
                        return (
                            <div className={style.setterItemLabel} key={index}>
                                <div className={style.styleName}>src:</div>
                                <input className={style.setterItem} type={'text'} value={props.src} onChange={event => handleChange(key, event.target.value)}/>
                            </div>
                        )
                    }
                })
            }
            {
                Object.keys(props).map((key, index) => {
                    //如果是链接，另外增加显示href地址
                    if(key =='href'){
                        return (
                            <div className={style.setterItemLabel} key={index}>
                                <div className={style.styleName}>href:</div>
                                <input className={style.setterItem} type={'text'} value={props.href} onChange={event => handleChange(key, event.target.value)}/>
                            </div>
                        )
                    }
                })
            }     

            
        </div>
    )

}
export default StyleSetter
