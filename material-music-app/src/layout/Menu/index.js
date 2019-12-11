import React from 'react'
import { connect } from 'react-redux'
import { setShowMenu, setShowLoginPage } from '@/store/common/action'
import { isUndef } from '../../common/util'
import './index.scss'
import Hidden from '@material-ui/core/Hidden'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import InboxIcon from '@material-ui/icons/Inbox'
import DraftsIcon from '@material-ui/icons/Drafts'
import Avatar from '@material-ui/core/Avatar'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

function Menu({ showMenu, setShowMenu, setShowLoginPage, user }) {

  const closeMenu = () => {
    setShowMenu(false);
  }

  const showLoginPage = () => {
    setShowLoginPage(true)
  }

  const drawer = (
    <div>
      <List>
        <ListItem button onClick={showLoginPage}>
          {isUndef(user.nickname) ? (
            <AccountCircleIcon className="user-icon" />) : (
            <div className="menu-avatar-container">
              <Avatar className="avatar" src="https://p3.music.126.net/ma8NC_MpYqC-dK_L81FWXQ==/109951163250233892.jpg?param=80y80" />
            </div>
          )}
          <ListItemText primary={isUndef(user.nickname) ? '未登录' : user.nickname} />
        </ListItem>
      </List>
      <Divider variant="middle" />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <DraftsIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
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

const mapStateToProps = state => {
  return {
    showMenu: state.commonReducer.showMenu,
    user: state.userReducer.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setShowMenu: showMenu => dispatch(setShowMenu(showMenu)),
    setShowLoginPage: showLoginPage => dispatch(setShowLoginPage(showLoginPage))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)