import React, { useState, useCallback, useEffect } from 'react'
import { useLocation } from "react-router-dom"
import router from '@/common/router'
import './index.scss'
import { useDispatch } from 'react-redux'
import { setShowMenu } from '@/store/common/action'
import Theme from '@/components/Theme'
import Hidden from '@material-ui/core/Hidden'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

export default function Header() {

  const location = useLocation()
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')

  const openDrawer = useCallback(() => dispatch(setShowMenu(true)), [dispatch])

  useEffect(() => {
    setTitle(router.find(route => route.path === location.pathname).meta.title)
  }, [location])

  return (
    <header className='header'>
      <Toolbar className="toolbar">
        <div>
          <Hidden smUp>
            <IconButton edge="start" color="default" onClick={openDrawer}>
              <MenuIcon />
            </IconButton>
          </Hidden>
          <span>{title}</span>
        </div>
        <div>
          <Theme />
        </div>
      </Toolbar>
    </header>
  )
}