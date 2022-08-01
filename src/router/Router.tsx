import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Editor from '../client/pages/Editor'

const Router = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Editor />} />
      </Routes>
    </>
  )
}
export default Router