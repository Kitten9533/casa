const user = (state = {
    userName: 'Abc',
    isLogin: true,
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