import React from 'react'
import './index.scss'
import Header from './Header'
import Menu from './Menu'
import Main from './Main'

export default function Layout() {

  return (
    <div className='layout'>
      <Menu />
      <div className='container'>
        <Header />
        <Main />
      </div>
    </div>
  )
}