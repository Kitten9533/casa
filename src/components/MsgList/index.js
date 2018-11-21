import React, { Component } from 'react';
import { connect } from 'react-redux'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { withRouter } from 'react-router'
import { withStyles } from '@material-ui/core/styles';
import { setSelectedItem } from '@/actions'

const textEllipsis = {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
}

const styles = theme => ({
    textPrimary: {
        ...textEllipsis,
        fontSize: '0.875rem',
    },
    textSecondary: {
        ...textEllipsis,
        fontSize: '0.625rem',
    }
})

class MsgList extends Component {

    handleClick = (item) => {
        const { history, match: { url }, dispatch, location, } = this.props;
        let newUrl = `${url}/chat/${item.type}/${item.from.id}`;
        if (location.pathname === newUrl) {
            return;
        }
        dispatch(setSelectedItem(item));
        history.push(newUrl);
    }

    componentWillUpdate(nextProps) {
        if (this.props.location.pathname !== nextProps.location.pathname) {
            this.changeFromUser();
        }
    }

    changeFromUser = () => {
        console.log('changeFromUser')
        // TODO 获取发消息的人的用户信息
        // dispatch
    }

    render() {
        const { msgList: { list = {} }, classes } = this.props;
        return (
            <List>
                {Object.values(list).map((item, index) => (
                    <ListItem button key={index} onClick={() => this.handleClick(item)}>
                        <Avatar alt="Remy Sharp" src={item.from.avatar} />
                        <ListItemText
                            primary={item.from.name}
                            secondary={item.msgList[0] ? item.msgList[0].content : ''}
                            classes={{
                                primary: classes.textPrimary,
                                secondary: classes.textSecondary,
                            }}
                        />
                    </ListItem>
                ))}
            </List>
        )
    }
}

export default withRouter(connect(state => {
    return {
        msgList: state.msgList,
    }
})(withStyles(styles)(MsgList)))