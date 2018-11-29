/**
 * 左侧的消息列表
 */

let initalState = {
    //  --- 当前选择的聊天对象  暂时不用
    selectedItem: {
        type: '',
        msgList: [],
        from: {},
        to: {},
    },
    // 聊天草稿
    draftList: {
        // 'group_44': {
        //     msgType: 'text',    //enum: ['text', 'image', 'audio', 'video'],
        //     content: '',
        // }
    },
    list: {
        'group_44': {
            type: 'group',
            updateTime: 1543301795507,
            msgList: [{
                content: '这是一个群消息1',
                msgType: '',    // 图文，语音等
                createTime: '2018-01-01 00:00:00',
                senderId: '2',
                sender: 'John',
                senderAvatar: '2.jpg',
            }, {
                content: '这是一个群消息2',
                msgType: '',
                createTime: '2018-01-01 00:00:00',
                senderId: '1',
                sender: 'Kitten',
                senderAvatar: '1.jpg',
            }],
            from: {
                id: '44',
                avatar: '11.jpg',
                name: '群名',
                members: [],    // 群成员
                creator: '',    // 群主
            },
        },
        'single_2': {
            type: 'single',
            updateTime: 1543301805507,
            msgList: [{
                content: '11111',
                msgType: '',    // 图文，语音等
                createTime: '2018-01-01 00:00:00',
                sender: 'John',
                senderId: '2',
                senderAvatar: '2.jpg',
            }],
            from: {
                id: '2',
                avatar: '2.jpg',
                name: 'John',
                // status: 'online'
            },
        },
        'single_3': {
            type: 'single',
            updateTime: 1543301905507,
            msgList: [{
                content: '22222',
                msgType: '',    // 图文，语音等
                createTime: '2018-01-01 00:00:00',
                sender: 'Jack',
                senderId: '3',
                senderAvatar: '3.jpg',
            }],
            from: {
                id: '3',
                avatar: '3.jpg',
                name: 'Jack',
                // status: 'offline'
            },
        }
    }
}

const msgList = (state = initalState, action) => {
    switch (action.type) {
        case 'GET_LIST':
            // TODO 调用接口获取消息列表
            return {
                ...state,
            }
        case 'SET_SELECTED_ITEM':
            return {
                ...state,
                selectedItem: action.selectedItem,
            }
        case 'SEND_MSG_TO_CONTACT':
            let { _id: id, avatar, name } = action.userInfo;
            let from = { id, avatar, name };
            let old = state.list[`single_${id}`] || { type: 'single', msgList: [] };
            let newObj = { ...old, from, updateTime: Date.now() };
            return {
                ...state,
                list: {
                    ...state.list,
                    [`single_${id}`]: newObj,
                }
            }
        case 'SET_DRAFT':
            let {
                toUser,
                msgType = 'text',
                content = '',
            } = action.draft;
            return {
                ...state,
                draftList: {
                    ...state.draftList,
                    ...{
                        [toUser]: { content, msgType }
                    }
                },
                list: {
                    ...state.list,
                    [toUser]: {
                        ...state.list[toUser],
                        updateTime: Date.now()
                    }
                }
            }
        case 'DELETE_DRAFT':
            let {
                toUser: key,
            } = action.draft;
            delete state.draftList[key];
            return {
                ...state,
                list: {
                    ...state.list,
                }
            }
        case 'RECEIVE_MESSAGE_FROM_ONE_START':
            // action.msg
            let { list = {} } = state;
            // 此处已经有了 list[action.key] = {} 可以直接使用消息列表 list[action.key].msgList
            if (!list[action.key]) { list[action.key] = { msgList: [] } }
            let { msgList } = list[action.key];
            msgList.push(action.msg);
            return {
                ...state,
                list: {
                    ...state.list,
                    [action.key]: {
                        ...state.list[action.key],
                        msgList,
                    }
                }
            }
        default:
            return state
    }
}

export default msgList