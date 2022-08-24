import { deepCopy } from '../../../utilts/clone'
import style from './index.module.scss'
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
      page.props[key] = value
      return page
  } else {
      page.children = page.children.map((child) => change(child, selectComponent, key, value))
      return page
  }
}
export default function Event({ pageInfo, selectComponent, setPageInfo ,}) {
  function handleChange(key, value) {
    let newPageInfo = deepCopy(pageInfo)
    newPageInfo.page = change(newPageInfo.page, selectComponent, key, value)
    setPageInfo(newPageInfo)
}

let props = findComponentByID(pageInfo.page, selectComponent)
  return (
    <div>
       {
        Object.keys(props).map((key,index) => {
            
           if(key.startsWith('on')){
                return (
                <div className={style.setterItemLabel} key={index}>
                <div className={style.styleName}>{key} :</div>
                <textarea className={style.tabText} value={props[key]} onChange={event => handleChange(key, event.target.value)} ></textarea>
            </div>)
         
            }else {
              return null
            }
        })
      }
    </div>
  )
}
