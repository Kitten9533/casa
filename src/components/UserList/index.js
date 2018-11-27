import React, { Component } from 'react';
import { connect } from 'react-redux'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Divider from '@material-ui/core/Divider';
import FiberManualRecord from '@material-ui/icons/FiberManualRecord';
import { withRouter } from 'react-router'
import { withStyles } from '@material-ui/core/styles';
import { setSelectedItem, sendMsgToContact } from '@/actions'
import config from 'root/config/client.conf.js';

const { STATUS_COLOR } = config;

const textEllipsis = {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
}

const styles = theme => ({
    container: {
        width: '100%',
        overflowX: 'hidden',
        transition: 'all ease 0.3s',
        '-webkit-transition': 'all ease 0.3s',
    },
    textPrimary: {
        ...textEllipsis,
        fontSize: '0.875rem',
    },
    textSecondary: {
        ...textEllipsis,
        fontSize: '0.625rem',
    },
    list: {
        padding: 0,
    },
    iconButton: {
        padding: 1,
    },
    menuItem: {
        fontSize: '0.765rem',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 8,
        paddingBottom: 8,
    },
    listItem: {
        padding: 10,
    },
    statusIcon: {
        fontSize: 14,
        marginRight: 5,
    }
})

class UserList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            onlinePanel: true,
            offlinePanel: true,
            // overflow: 'hidden',
            overflow: 'scroll',
            anchorEl: null,
            selectItem: {},
        };
        this.options = [
            { name: '发送即时消息', func: this.handleSendMsg },
            { name: '查看消息记录', func: this.handleShowHistory },
        ];
        this.options2 = [
            { name: '删除联系人', func: this.handleDeleteContact },
        ];
    }

    handleSendMsg = (item) => {
        // send message
        console.log('send message', item);
        const { history, match: { url }, dispatch} = this.props;
        let newUrl = `${url}/chat/single/${item._id}`;
        dispatch(sendMsgToContact(item));
        history.push(newUrl);
    }

    handleShowHistory = (item) => {
        console.log('show history', item);
    }

    handleDeleteContact = (item) => {
        console.log('delete contact', item);
    }

    handleClick = (item) => {
        const { history, match: { url }, dispatch, location, } = this.props;
        let newUrl = `${url}/person/single/${item._id}`;
        if (location.pathname === newUrl) {
            return;
        }
        dispatch(setSelectedItem(item));
        history.push(newUrl);
    }

    handleOverflow = (val) => {
        this.setState({
            overflow: val,
        })
    }

    handleMoreClick = (e, item) => {
        // 点击更多
        e.stopPropagation();
        this.setState({
            anchorEl: e.currentTarget,
            selectItem: item,
        });
    }
    
    handleMenuClose = () => {
        this.setState({
            anchorEl: null,
        })
    }

    handleClose = (cb) => {
        const { selectItem = {} } = this.state;
        cb && cb(selectItem);
        this.setState({
            anchorEl: null,
            selectItem: {},
        })
    }

    renderOption = (list) => {
        const { classes } = this.props;
        return (
            list.map((item, index) => (
                <MenuItem
                    key={index}
                    onClick={(e) => this.handleClose(item.func)}
                    classes={{
                        root: classes.menuItem
                    }}
                >
                    {item.name}
                </MenuItem>
            ))
        )
    }

    renderList = (list, statusKey) => {
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        const { classes } = this.props;
        return (
            <List
                classes={{ root: classes.list }}
            >
                {list.map((item, index) => (
                    <ListItem button key={index} classes={{ root: classes.listItem }}>
                        <FiberManualRecord
                            classes={{
                                root: classes.statusIcon,
                            }}
                            nativeColor={STATUS_COLOR[statusKey] || ''}
                        />
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
                        <IconButton
                            aria-label="More"
                            aria-owns={open ? 'long-menu' : undefined}
                            aria-haspopup="true"
                            onClick={(e) => this.handleMoreClick(e, item)}
                            classes={{
                                root: classes.iconButton,
                            }}
                        >
                            <MoreVertIcon style={{ fontSize: 18 }} />
                        </IconButton>
                    </ListItem>
                ))}
            </List>
        )
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
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        let onlineSlot = this.renderList(onlineUser, 'ONLINE');
        let afkSlot = this.renderList(afkUser, 'AFK');
        let offlineSlot = this.renderList(offlineUser, 'OFFLINE');
        let optionSlot = this.renderOption(this.options);
        let optionSlot2 = this.renderOption(this.options2);
        return (
            <div
                style={{ overflowY: this.state.overflow }}
                className={classes.container}
            // onMouseEnter={() => this.handleOverflow('scroll')}
            // onMouseLeave={() => this.handleOverflow('hidden')}
            >
                <Menu id="long-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={this.handleMenuClose}
                    MenuListProps={{
                        style: { padding: 0 }
                    }}
                    PaperProps={{
                        style: {
                            width: 140,
                        },
                    }}
                >
                    {optionSlot}
                    <Divider />
                    {optionSlot2}
                </Menu>
                {onlineSlot}
                {afkSlot}
                {offlineSlot}
            </div>
        )
    }
}

export default withRouter(connect(state => {
    return {
        userList: state.userList,
    }
})(withStyles(styles)(UserList)))