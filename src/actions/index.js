import emit from '@/utils/emit';

export const signInStart = (userInfo) => ({
  type: 'SIGN_IN',
  userInfo
})

export const signIn = (userInfo) => {
  return (dispatch, getState) => {
    dispatch(signInStart(userInfo));
    dispatch(getUserList());
  }
}

export const getUserList = () => {
  return (dispatch) => {
    emit('getUserList', null).then((res) => {
      if (res.success) {
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

/**
 * 联系人列表 点击联系人-发送即时消息
 * @param {*} userInfo 传入用户信息
 */
export const sendMsgToContact = (userInfo) => ({
  type: 'SEND_MSG_TO_CONTACT',
  userInfo,
})

/**
 * 设置草稿
 * @param {*} draft 
 */
export const setDraft = (draft) => ({
  type: 'SET_DRAFT',
  draft,
})

// 删除草稿
export const deleteDraft = (draft) => ({
  type: 'DELETE_DRAFT',
  draft,
})

// 接受单人发送过来的消息
export const receiveMessageFromOneStart = (msg, key) => ({
  type: 'RECEIVE_MESSAGE_FROM_ONE_START',
  msg,
  key,
})

export const receiveMessageFromOne = (msg) => {
  let userInfo = msg.from;
  return (dispatch) => {
    dispatch(sendMsgToContact(userInfo));
    let key = `single_${userInfo._id}`;
    dispatch(receiveMessageFromOneStart(msg, key));
  }
}

export const addSnackbar = (queue) => ({
  type: 'ADD_SNACKBAR',
  queue,
})

export const removeSnackbar = (key) => ({
  type: 'REMOVE_SNACKBAR',
  key,
})