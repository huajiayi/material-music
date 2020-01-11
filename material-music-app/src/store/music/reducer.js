import { handleActions } from 'redux-actions'
import state from './state'

export default handleActions({
  SET_CURRENT_SONG(state, action) {
    return {...state, currentSong: action.payload}
  }
}, state)