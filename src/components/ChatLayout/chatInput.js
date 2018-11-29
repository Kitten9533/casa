import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import TagFaces from '@material-ui/icons/TagFaces';
import FolderOpen from '@material-ui/icons/FolderOpen';
import History from '@material-ui/icons/History';
import Send from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router'
import * as extraStyles from './chatInput.less'
import { setDraft, deleteDraft, receiveMessageFromOne } from '@/actions'
import { connect } from 'react-redux'
import emit from '@/utils/emit';

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
        borderBottom: '1px solid #f9fafb',
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
        lineHeight: '20px',
        height: 60,
        padding: 0,
        // margin: theme.spacing.unit,
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
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
        alignItems: 'center',
    },
    sendButton: {
        height: 40,
        // alignSelf: 'flex-end',
        margin: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
})

class ChatInput extends Component {

    state = {
        content: '',
        msgType: 'text',
    }

    componentWillReceiveProps(nextProps) {
        let { content, msgType } = this.state;
        if (this.props.location.pathname !== nextProps.location.pathname) { // 聊天人切换
            const { dispatch, match: { params } } = this.props;
            const { type, id } = params;
            if (!!content) {
                // 设置草稿
                dispatch(setDraft({
                    toUser: `${type}_${id}`,
                    content,
                    msgType,
                }));
                this.setState({
                    content: '',
                    msgType: 'text',
                })
            } else {
                // 清空草稿
                dispatch(deleteDraft({
                    toUser: `${type}_${id}`,
                }));
            }
        } else {
            // 草稿恢复到输入框
            const { match: { params }, msgList: { draftList = {} }, dispatch } = nextProps;
            const { type, id } = params;
            let key = `${type}_${id}`;
            let draft = draftList[key] || '';
            if (!draft) return;
            this.setState({
                content: draft.content,
                msgType: draft.msgList,
            }, () => {
                dispatch(deleteDraft({
                    toUser: `${type}_${id}`,
                }));
            })
        }
    }

    handleSendMsg = async () => {
        const { match: { params }, dispatch } = this.props;
        const { id } = params;
        if (!id) return;
        const { content, msgType } = this.state;
        const res = await emit('sendMessageToOne', {
            toUser: id,
            content,
            msgType,
        });
        console.log(res);
        if (res.success) {
            // 替换发送人信息为自己
            // 修改 接受别人消息 为发送消息给别人
            let { from = {}, to = {} } = res.data;
            dispatch(receiveMessageFromOne({
                ...res.data,
                from: to,
                to: from,
            }));
        } else {
            // TODO 发送失败提示
        }
        this.setState({
            content: '',
        })
    }

    handleKeyDown = (e) => {
        // console.log(typeof e.keyCode);
        // console.log(e.keyCode);
        if (e.keyCode === 13) {
            e.preventDefault();
            e.stopPropagation();
            this.handleSendMsg();
        }
    }

    handleChange = (e) => {
        this.setState({
            content: e.target.value,
        });
    }

    render() {
        const { classes } = this.props;
        const { content } = this.state;
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
                        // defaultValue=""
                        onChange={this.handleChange}
                        onKeyDown={this.handleKeyDown}
                        value={content}
                        rows={3}
                    ></textarea>
                    <Button variant="contained" color="primary" className={classes.sendButton} onClick={this.handleSendMsg}>
                        Send
                        <Send className={classes.rightIcon} />
                    </Button>
                </div>
            </div>
        )
    }
}

export default withRouter(connect(state => {
    return {
        msgList: state.msgList,
        user: state.user,
    }
})(withStyles(styles)(ChatInput)))