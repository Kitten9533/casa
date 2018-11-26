// 用户列表，在线的，离开的，离线的
const userList = (state = {
    onlineUser: [],  // 在线的
    afkUser: [],        //离开状态的在线用户
    offlineUser: [],    // 离线的
}, action) => {
    switch (action.type) {
        case 'GET_ONLINE_USER':
            console.log('get all user', action);
            console.log('reducers GET_ALL_USER');
            return {
                ...state,
                ...{ onlineUser: action.onlineUser },
            }
        case 'GET_USER_LIST_START':
            let {
                onlineUser = [],
                afkUser = [],
                offlineUser = [],
            } = action.userList;
            return {
                ...state,
                ...{
                    onlineUser,
                    afkUser,
                    offlineUser,
                },
            }
        default:
            return state
    }
}

export default userList