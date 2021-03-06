import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setShowMenu } from '@/store/common/action'
import { setUser } from '@/store/user/action'
import { isEmptyObj } from '@/common/utils'
import './index.scss'
import Hidden from '@material-ui/core/Hidden'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import Avatar from '@material-ui/core/Avatar'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { Link } from 'react-router-dom'
import router from '@/common/router'
import { getUserInfo } from '@/api'
import { useHistory } from 'react-router-dom'

export default function Menu() {

  const dispatch = useDispatch()
  let history = useHistory()
  
  const [isLogin, setIsLogin] = useState(false)

  const showMenu = useSelector(state => state.commonReducer.showMenu)
  const user = useSelector(state => state.userReducer.user)

  const closeMenu = useCallback(() => dispatch(setShowMenu(false)), [dispatch])
  const _setUser = useCallback(user => dispatch(setUser(user)), [dispatch])

  const handleCloseMenu = useCallback(() => closeMenu(), [closeMenu])
  const handleClickAvatar = useCallback(() => {
    history.push(isLogin ? '/profile' : '/login')
    handleCloseMenu()
  }, [handleCloseMenu, history, isLogin])

  useEffect(() => {
    const init = async () => {
      const userId = localStorage.getItem("userId")
      if(userId) {
        const userInfo = await getUserInfo()
        if(userInfo) {
          _setUser(userInfo)
          setIsLogin(true)
        }else {
          localStorage.removeItem("userId") //用户登录状态失效
        }
      }
    }
    init()
  }, [_setUser])

  useEffect(() => {
    setIsLogin(!isEmptyObj(user))
  }, [user])

  const drawer = (
    <div>
      <List>
        <ListItem button onClick={handleClickAvatar}>
          {isLogin ? (
            <div className="menu-avatar-container">
              <Avatar className="avatar" src={user.avatarUrl} />
            </div>) :
            <AccountCircleIcon className="user-icon" />
          }
          <ListItemText primary={isLogin ? user.nickname : '未登录'} />
        </ListItem>
      </List>
      <Divider variant="middle" />
      <List>
        {router.menu.map(route => {
          if(route.meta && route.meta.needLogin && !isLogin) return null
          return (
            <Link to={{
              pathname: route.path,
              state: {name: route.name}
            }} key={route.name}>
              <ListItem button onClick={handleCloseMenu}>
                <ListItemIcon><route.meta.icon /></ListItemIcon>
                <ListItemText primary={route.meta.title} />
              </ListItem>
            </Link>
          )
        })}
      </List>
    </div>
  )

  return (
    <>
      <Hidden xsUp implementation="css">
        <Drawer
          variant="temporary"
          anchor="left"
          open={showMenu}
          onClose={closeMenu}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden className="menu" xsDown implementation="css">
        <Drawer
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </>
  )
}
