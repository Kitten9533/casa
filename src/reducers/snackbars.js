const defaultState = {
    queue: [],
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'ADD_SNACKBAR':
            return {
                ...state,
                queue: [
                    ...state.queue,
                    {
                        ...action.queue,
                    },
                ],
            };
        case 'REMOVE_SNACKBAR': {
            return {
                ...state,
                notifications: state.notifications.filter(
                    notification => notification.key !== action.key,
                ),
            };
        }
        default:
            return state;
    }
};
