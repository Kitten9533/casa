import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import { removeSnackbar } from '@/actions';

class Notifier extends Component {
    state = {
        displayed: [],
    };

    storeDisplayed = (key) => {
        this.setState(({ displayed }) => ({
            displayed: [...displayed, key],
        }));
    };

    render() {
        const { notifications, enqueueSnackbar, dispatch } = this.props;
        const { displayed } = this.state;

        notifications.forEach((notification) => {
            setTimeout(() => {
                // If notification already displayed, abort
                if (displayed.indexOf(notification.key) > -1) return;
                // Display notification using notistack
                enqueueSnackbar(notification.message, notification.options);
                // Add notification's key to the local state
                this.storeDisplayed(notification.key);
                // Dispatch action to remove the notification from the redux store
                dispatch(removeSnackbar(notification.key));
            }, 1);
        });

        return null;
    }
}

export default connect(
    state => {
        return {
            notifications: state.notifications.notifications,
        }
    }
)(withSnackbar(Notifier));
