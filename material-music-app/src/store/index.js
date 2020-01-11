import { combineReducers, createStore } from 'redux'
import commonReducer from './common/reducer'
import userReducer from './user/reducer'
import musicReducer from './music/reducer'

const reducer = combineReducers({
  commonReducer,
  userReducer,
  musicReducer
})

const store = createStore(reducer)

export default store