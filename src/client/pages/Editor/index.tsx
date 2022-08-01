import React from 'react'
import Toolbar from './Toolbar'
import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'
import DrawPanel from './DrawPanel'
import './index.scss'

const Editor = () => {
  return (
    <div className='editor-wrapper'>
      <header className='editor-header'><Toolbar/></header>
      <main className='editor-main'>
        <div className='editor-left'><LeftPanel/></div>
        <div className='editor-container'><DrawPanel/></div>
        <div className='editor-right'><RightPanel/></div>
      </main>
    </div>
  )
}
export default Editor