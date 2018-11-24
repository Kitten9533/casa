import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

export default class Notice extends Component {

    handleClose = () => {
        this.props.handleClose();
    }

    static propTypes = {
        title: PropTypes.string,
        content: PropTypes.string,
    }

    static defaultProps = {
        title: '提示',
        content: '提示内容',
    }

    render() {
        const { title, content, open } = this.props;
        return (
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
                fullWidth={true}
            >
                <DialogTitle id="alert-dialog-slide-title">
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        确定
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}