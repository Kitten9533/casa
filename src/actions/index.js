import emit from '@/utils/emit';

let nextTodoId = 0
export const addTodo = text => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text
})

export const setVisibilityFilter = filter => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

export const toggleTodo = id => ({
  type: 'TOGGLE_TODO',
  id
})

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

export const signInStart = (userInfo) => ({
  type: 'SIGN_IN',
  userInfo
})

export const signIn = (userInfo) => {
  return (dispatch, getState) => {
    dispatch(signInStart(userInfo));
    // emit('getConnectedUser', null).then((res) => {
    //   if (res.success) {
    //     dispatch(getOnlineUser(res.data));
    //   }
    // })
    dispatch(getUserList());
  }
}

export const getUserList = () => {
  return (dispatch) => {
    emit('getUserList', null).then((res) => {
      if(res.success) {
        dispatch(getUserListStart(res.data));
      }
    })
  }
}

export const getUserListStart = (userList) => ({
  type: 'GET_USER_LIST_START',
  userList,
})

export const getOnlineUser = (onlineUser) => ({
  type: 'GET_ONLINE_USER',
  onlineUser,
})

export const setSelectedItem = (selectedItem) => ({
  type: 'SET_SELECTED_ITEM',
  selectedItem,
})
