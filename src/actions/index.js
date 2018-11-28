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

export const deleteDraft = (draft) => ({
  type: 'DELETE_DRAFT',
  draft,
})