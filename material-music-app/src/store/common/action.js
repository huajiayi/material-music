import { createAction } from 'redux-actions'

export const setTheme = createAction('SET_THEME', theme => theme)
export const setShowMenu = createAction('SET_SHOW_MENU', showMenu => showMenu)
export const setShowLoginPage = createAction('SET_SHOW_LOGIN_PAGE', showLoginPage => showLoginPage)
export const setShowRegisterPage = createAction('SET_SHOW_REGISTER_PAGE', showRegisterPage => showRegisterPage)
export const setShowProfilePage = createAction('SET_SHOW_PROFILE_PAGE', showProfilePage => showProfilePage)
export const setShowAddSongListPage = createAction('SET_SHOW_ADD_SONGLIST_PAGE', showAddSongListPage => showAddSongListPage)
export const setShowCollectSongPage = createAction('SET_SHOW_COLLECT_SONG_PAGE', showCollectSongPage => showCollectSongPage)