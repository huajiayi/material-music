import { handleActions } from 'redux-actions'
import state from './state'

export default handleActions({
  SET_THEME(state, action) {
    return {...state, theme: action.payload}
  },
  SET_SHOW_MENU(state, action) {
    return {...state, showMenu: action.payload}
  },
  SET_SHOW_LOGIN_PAGE(state, action) {
    return {...state, showLoginPage: action.payload}
  },
  SET_SHOW_REGISTER_PAGE(state, action) {
    return {...state, showRegisterPage: action.payload}
  }
}, state)