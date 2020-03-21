import React, { useState, useCallback, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import router from '@/common/router'
import './index.scss'
import { useDispatch } from 'react-redux'
import { setShowMenu } from '@/store/common/action'
import Theme from '@/components/Theme'
import Hidden from '@material-ui/core/Hidden'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import useHistoryWithName from '@/hook/useHistoryWithName'

export default function Header() {

  const location = useLocation()
  const dispatch = useDispatch()
  const history = useHistoryWithName()

  const [title, setTitle] = useState('')

  const openDrawer = useCallback(() => dispatch(setShowMenu(true)), [dispatch])
  const openSearchPage = useCallback(() => history.push('/search'), [history])

  useEffect(() => {
    let route = location.state && [...router.menu, ...router.page].find(route => route.name === location.state.name)
    route && setTitle(route.meta.title)
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
          <IconButton edge="start" color="default" onClick={openSearchPage}>
            <SearchIcon />
          </IconButton>
          <Theme />
        </div>
      </Toolbar>
    </header>
  )
}