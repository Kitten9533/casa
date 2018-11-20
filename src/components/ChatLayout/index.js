import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import * as extraStyles from './index.less'

const styles = theme => ({
    main: {},
    wordBreak: {
        wordBreak: 'break-all',
    },
    listItemAvatar: {
        alignSelf: 'flex-start',
        marginRight: '20px',
    }
})

class ChatLayout extends Component {

    componentDidMount() {
        const { params = {}, msgList } = this.props.match;
    }

    render() {
        const { classes, msgList: { list = {} }, match: { params = {} } } = this.props;
        let { type, id } = params;
        let key = `${type}_${id}`;
        let info = list.hasOwnProperty(key) ? list[key] : { msgList: [] };
        let { msgList } = info;
        console.log('==========', msgList);
        return (
            <List>
                {msgList.map((item, index) => (
                    <ListItem key={index}>
                        <Avatar alt="Remy Sharp"
                            src={info.from.avatar || ''}
                            classes={{
                                root:classes.listItemAvatar
                            }}
                        />
                        <div className={`${extraStyles.listItemContent} ${extraStyles.bubbleLeft}`}>
                            <Typography variant="body2"
                                classes={{
                                    root: classes.bubbleLeft,
                                    body2: classes.wordBreak,
                                }}
                            >
                                {item.content + 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' || ''}
                            </Typography>
                        </div>
                        {/* <Avatar alt="Remy Sharp" src={info.from.avatar || ''} /> */}
                    </ListItem>
                ))}
            </List>
        )
    }
}

export default withRouter(connect(state => {
    return {
        msgList: state.msgList
    }
})(withStyles(styles)(ChatLayout)))