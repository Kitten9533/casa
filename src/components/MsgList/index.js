import React, { Component } from 'react';
import { connect } from 'react-redux'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

class MsgList extends Component {
    render() {
        return (
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem button key={text}>
                        <Avatar alt="Remy Sharp" src={require('@/assets/images/avatar.jpeg')} />
                        <ListItemText primary={text} secondary={'kakak2k'} />
                    </ListItem>
                ))}
            </List>
        )
    }
}

export default connect()(MsgList)