import { combineReducers } from 'redux'
import user from './user'
import userList from './userList'
import msgList from './msgList'

export default combineReducers({
  user,
  userList,
  msgList,
})
