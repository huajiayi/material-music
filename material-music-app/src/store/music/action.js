import { createAction } from 'redux-actions'

export const setCurrentSong = createAction('SET_CURRENT_SONG', song => song)
export const setPlayList = createAction('SET_PLAY_LIST', playList => playList)
export const prevSong = createAction('PREV_SONG', () => {})
export const nextSong = createAction('NEXT_SONG', () => {})