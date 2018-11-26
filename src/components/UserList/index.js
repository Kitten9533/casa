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

class UserList extends Component {

    handleClick = (item) => {
        const { history, match: { url }, dispatch, location, } = this.props;
        let newUrl = `${url}/person/single/${item._id}`;
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
        // connectedUser: [],  // 在线的
        // afkUser: [],        //离开状态的在线用户
        // offlineUser: [],    // 离线的
        const { userList: {
            onlineUser = [],
            afkUser = [],
            offlineUser = []
        }, classes } = this.props;
        return (
            <List>
                {Object.values(onlineUser).map((item, index) => (
                    <ListItem button key={index} onClick={() => this.handleClick(item)}>
                        <Avatar
                            alt="User Avatar"
                            src={item.avatar.indexOf('http') > -1 ? item.avatar : require(`avatar/${item.avatar}`)} />
                        <ListItemText
                            primary={item.name}
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
        userList: state.userList,
    }
})(withStyles(styles)(UserList)))