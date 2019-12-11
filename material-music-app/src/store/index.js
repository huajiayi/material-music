import { combineReducers, createStore, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise'
import commonReducer from './common/reducer'
import userReducer from './user/reducer'

const reducer = combineReducers({
  commonReducer,
  userReducer
})

const store = createStore(reducer, applyMiddleware(promiseMiddleware))

export default store