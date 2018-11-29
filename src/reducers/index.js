import { combineReducers } from 'redux'
import user from './user'
import userList from './userList'
import msgList from './msgList'
// import notifications from './notifications'
import snackbars from './snackbars'

export default combineReducers({
  user,
  userList,
  msgList,
  // notifications,
  snackbars,
})
