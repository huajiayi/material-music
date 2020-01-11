import { createAction } from 'redux-actions'

export const setCurrentSong = createAction('SET_CURRENT_SONG', song => song)