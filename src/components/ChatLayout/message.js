import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import * as extraStyles from './message.less'

const styles = theme => ({
    main: {},
    wordBreak: {
        wordBreak: 'break-all',
    },
    listItemAvatarLeft: {
        alignSelf: 'flex-start',
        marginRight: '20px',
    },
    listItemAvatarRight: {
        alignSelf: 'flex-start',
        marginLeft: '20px',
    }
})

class Message extends Component {

    renderMsg = (item, index) => {
        const { user, classes } = this.props;
        return (
            <ListItem
                key={index}
                style={{ 'justifyContent': item.senderId !== user.id ? 'flex-start' : 'flex-end' }}>
                {item.senderId !== user.id ? <Avatar alt="Remy Sharp"
                    src={item.senderAvatar || ''}
                    classes={{
                        root: classes.listItemAvatarLeft
                    }}
                /> : null}
                <div className={`${extraStyles.listItemContent} ${item.senderId !== user.id ? extraStyles.bubbleLeft : extraStyles.bubbleRight}`}>
                    <Typography variant="body2"
                        classes={{
                            root: classes.bubbleLeft,
                            body2: classes.wordBreak,
                        }}
                    >
                        {item.content || ''}
                    </Typography>
                </div>
                {item.senderId === user.id ? <Avatar alt="Remy Sharp"
                    src={item.senderAvatar || ''}
                    classes={{
                        root: classes.listItemAvatarRight,
                    }}
                /> : null}
            </ListItem>
        )
    }

    render() {
        const { msgList: { list = {} }, match: { params = {} } } = this.props;
        let { type, id } = params;
        let key = `${type}_${id}`;
        let info = list[key] || { msgList: [] };
        let { msgList } = info;
        return (
            <div className={extraStyles.container}>
                <List>
                    {msgList.map((item, index) => (
                        this.renderMsg(item, index)
                    ))}
                </List>
            </div>
        )
    }
}

export default withRouter(connect(state => {
    return {
        msgList: state.msgList,
        user: state.user,
    }
})(withStyles(styles)(Message)))