import React from 'react'
import './index.scss'
import { connect } from 'react-redux'
import { setShowMenu } from '@/store/common/action'
import Theme from '@/components/Theme'
import Hidden from '@material-ui/core/Hidden'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

function Header({ useDarkTheme, changeTheme, setShowMenu }) {

  const openDrawer = () => {
    setShowMenu(true);
  }

  return (
    <header className='header'>
      <Toolbar className="toolbar">
        <div>
          <Hidden smUp>
            <IconButton edge="start" color="default" onClick={openDrawer}>
              <MenuIcon />
            </IconButton>
          </Hidden>
        </div>
        <div>
          <Theme />
        </div>
      </Toolbar>
    </header>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    setShowMenu: id => dispatch(setShowMenu(id))
  }
}

export default connect(null, mapDispatchToProps)(Header)