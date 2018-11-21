const user = (state = {
    friends: [],
    groups: [],
    token: '',
    isLogin: true,
    id: '1',
    avatar: 'data:image/jpeg;base64,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',
    name: 'Kitten',
    status: 'online',
}, action) => {
    switch (action.type) {
        case 'SIGN_IN':
            return {
                ...state,
                ...{ userName: 'Abc', isLogin: true },
            }
        default:
            return state
    }
}

export default user