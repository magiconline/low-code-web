import React from 'react'
const StyleSetter = ({pageInfo,selectComponent}) => {
 
  // console.log(pageInfo);
  const compList = pageInfo.page.children
  // console.log(compList);
  const propsList = compList[selectComponent-1].props.style

  // 修改普通样式
  const onChange = (key,value) => {
    propsList[key] = Number(value)
    setPageInfo({propsList})  //更新画布视图


  }
  // debugger
  // 修改颜色
  const onChangeColor = (key,value) => {
    propsList[key] = String(value)
    setPageInfo({propsList})  //更新画布视图
   }
//  debugger

  return (
    <div className="style-setter-wrapper">
          {
           Object.keys(propsList).map((key) => {
              switch (key) {
                case 'color':
                  return (
                  <div className="setter-item-label">
                    <div className="style-name">{key} :</div>
                   <input type="color" onChange={event => onChangeColor(key,(event.target.value))}  /> </div>
                  )
                case 'backgroundColor':
                  return (
                    <div className="setter-item-label">
                      <div className="style-name">{key} :</div>
                     <input type="color" onChange={event => onChangeColor(key,(event.target.value))}  /> </div>
                    )        
                default:
                  return <div className="setter-item-label">
                    <div className="style-name">{key}:</div>
                   <input type="number"   value={propsList[key]} onChange={event => onChange(key,event.target.value)} /> </div>
                  // debugger
              }
            })    
          }       
    </div>
    
  )
  
}
export default StyleSetter
