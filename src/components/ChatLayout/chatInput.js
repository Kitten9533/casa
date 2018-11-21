import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import TagFaces from '@material-ui/icons/TagFaces';
import FolderOpen from '@material-ui/icons/FolderOpen';
import History from '@material-ui/icons/History';
import Send from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';
import * as extraStyles from './chatInput.less'

const styles = theme => ({
    inputBox: {
        // margin: theme.spacing.unit,
    },
    toolBar: {
        display: 'flex',
        height: 40,
        padding: 0,
        paddingLeft: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 2,
        borderTop: '1px solid #f6f7f9',
        // borderBottom: '1px solid #f6f7f9',
    },
    toolIcon: {
        padding: 8,
        marginRight: 4,
    },
    bootstrapRoot: {
        flex: 1,
    },
    bootstrapInput: {
        flex: 1,
        backgroundColor: theme.palette.common.white,
        fontSize: 16,
    },
    inputContent: {
        resize: 'none',
        flex: 1,
        fontSize: 16,
        padding: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 3,
        paddingRight: theme.spacing.unit * 3,
        backgroundColor: theme.palette.common.white,
        border: 'none',
        '&:focus': {
            outline: 'none',
        },
    },
    chatFooter: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
    },
    sendButton: {
        height: 40,
        alignSelf: 'flex-end',
        margin: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
})

class ChatInput extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={extraStyles.container}>
                <label htmlFor="input-content">
                    <div className={classes.toolBar}>
                        <IconButton className={classes.toolIcon}>
                            <TagFaces />
                        </IconButton>
                        <IconButton className={classes.toolIcon}>
                            <FolderOpen />
                        </IconButton>
                        <IconButton className={classes.toolIcon}>
                            <History />
                        </IconButton>
                    </div>
                </label>
                <div className={classes.chatFooter}>
                    <textarea
                        id="input-content"
                        className={classes.inputContent}
                        defaultValue=""
                    ></textarea>
                    <Button variant="contained" color="primary" className={classes.sendButton}>
                        Send
                        <Send className={classes.rightIcon} />
                    </Button>
                </div>
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(ChatInput)