import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'
import user from './user'
import userList from './userList'
import msgList from './msgList'

export default combineReducers({
  todos,
  visibilityFilter,
  user,
  userList,
  msgList,
})
