import React from 'react'
import './index.scss'
import Header from './Header'
import Menu from './Menu'
import Main from './Main'
import { BrowserRouter as Router } from "react-router-dom"

export default function Layout() {

  return (
    <Router>
      <div className='layout'>
        <Menu />
        <div className='container'>
          <Header />
          <Main />
        </div>
      </div>
    </Router>
  )
}