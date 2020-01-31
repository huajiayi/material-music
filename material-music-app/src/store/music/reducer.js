import { handleActions } from 'redux-actions'
import state from './state'

export default handleActions({
  SET_CURRENT_SONG(state, action) {
    return {
      ...state,
      currentSong: action.payload,
      playList: state.playList.concat(action.payload),
      playIdx: state.playList.length
    }
  },
  SET_PLAY_LIST(state, action) {
    return {
      ...state,
      playList: action.payload,
      playIdx: 0,
      currentSong: action.payload[0]
    }
  },
  PREV_SONG(state, action) {
    const len = state.playList.length
    if(state.playList.length <= 0) return state

    const nextSongIdx = (state.playIdx - 1 + len) % len
    return {
      ...state,
      playIdx: nextSongIdx,
      currentSong: state.playList[nextSongIdx]
    }
  },
  NEXT_SONG(state, action) {
    const len = state.playList.length
    if(state.playList.length <= 0) return state

    const nextSongIdx = (state.playIdx + 1) % len
    return {
      ...state,
      playIdx: nextSongIdx,
      currentSong: state.playList[nextSongIdx]
    }
  }
}, state)