import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'

const styles = theme => ({
    close: {
        padding: theme.spacing.unit / 2,
    },
});

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

const styles1 = theme => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.dark,
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing.unit,
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
});

function MySnackbarContent(props) {
    const { classes, className, message, onClose, variant, ...other } = props;
    const Icon = variantIcon[variant];

    return (
        <SnackbarContent
            className={classNames(classes[variant], className)}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classes.message}>
                    <Icon className={classNames(classes.icon, classes.iconVariant)} />
                    {message}
                </span>
            }
            action={[
                <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    className={classes.close}
                    onClick={onClose}
                >
                    <CloseIcon className={classes.icon} />
                </IconButton>,
            ]}
            {...other}
        />
    );
}

MySnackbarContent.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    message: PropTypes.node,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

const styles2 = theme => ({
    margin: {
        margin: theme.spacing.unit,
    },
});


class ConsecutiveSnackbars extends React.Component {

    queue = [];

    state = {
        open: false,
        messageInfo: {},
    };

    static propTypes = {
        queue: PropTypes.array,
    }

    static defaultProps = {
        queue: [],
    }

    // processQueue = () => {

    // }

    // handleClose = () => {

    // }

    // handleExited = () => {

    // }

    componentWillReceiveProps(nextProps) {
        this.queue = nextProps.queue;
        if (this.state.open) {
            // immediately begin dismissing current message
            // to start showing new one
            this.setState({ open: false });
        } else {
            this.processQueue();
        }
    }

    // handleClick = message => () => {
    //     this.queue.push({
    //         message,
    //         key: new Date().getTime(),
    //     });

    //     if (this.state.open) {
    //         // immediately begin dismissing current message
    //         // to start showing new one
    //         this.setState({ open: false });
    //     } else {
    //         this.processQueue();
    //     }
    // };

    processQueue = () => {
        if (this.queue.length > 0) {
            this.setState({
                messageInfo: this.queue.shift(),
                open: true,
            });
        }
    };

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ open: false });
    };

    handleExited = () => {
        this.processQueue();
    };

    render() {
        const { classes } = this.props;
        const { messageInfo } = this.state;

        return (
            <div>
                {/* <Button onClick={this.handleClick('message a')}>Show message A</Button> */}
                {/* <Button onClick={this.handleClick('message b')}>Show message B</Button> */}
                <Snackbar
                    key={messageInfo.key}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.open}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                    onExited={this.handleExited}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                // message={<span id="message-id">{messageInfo.message}</span>}
                // action={[
                //     <Button key="undo" color="secondary" size="small" onClick={this.handleClose}>
                //         UNDO
                //     </Button>,
                //     <IconButton
                //         key="close"
                //         aria-label="Close"
                //         color="inherit"
                //         className={classes.close}
                //         onClick={this.handleClose}
                //     >
                //         <CloseIcon />
                //     </IconButton>,
                // ]}
                >
                    <MySnackbarContentWrapper
                        onClose={this.handleClose}
                        variant="info"
                        message={<span id="message-id">{messageInfo.message}</span>}
                        action={[
                            <Button key="undo" color="primary" size="small" onClick={this.handleClose}>
                                UNDO
                        </Button>,
                            <IconButton
                                key="close"
                                aria-label="Close"
                                color="inherit"
                                className={classes.close}
                                onClick={this.handleClose}
                            >
                                <CloseIcon />
                            </IconButton>,
                        ]}
                    />
                </Snackbar>
            </div>
        );
    }
}

ConsecutiveSnackbars.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(connect(
    state => ({
        snackbars: state.snackbars,
    })
)(withStyles(styles)(ConsecutiveSnackbars)));
