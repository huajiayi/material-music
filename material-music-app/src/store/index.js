import { combineReducers, createStore } from 'redux'
import commonReducer from './common/reducer'
import userReducer from './user/reducer'

const reducer = combineReducers({
  commonReducer,
  userReducer
})

const store = createStore(reducer)

export default store