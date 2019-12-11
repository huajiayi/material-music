import { handleActions } from 'redux-actions'
import state from './state'

export default handleActions({
  SET_USER(state, action) {
    return {...state, user: action.payload}
  }
}, state)