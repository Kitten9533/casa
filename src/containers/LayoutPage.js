import React, { Component } from 'react'
import { connect } from 'react-redux'
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import MsgList from '@/components/MsgList';
import { Route, Redirect } from 'react-router-dom';
import ChatLayout from '@/components/ChatLayout'
import PersonLayout from '@/components/PersonLayout'
import Header from '@/components/Layout/header'
import UserList from '@/components/UserList'

const drawerWidth = 220;

const styles = theme => ({
    root: {
        display: 'flex',
        height: '100%',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    toolbar: theme.mixins.toolbar,
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        borderColor: '#f6f7f9',
        background: '#fdfdfd',
    },
    content: {
        flexGrow: 1,
        // padding: theme.spacing.unit * 3,
        display: 'flex',
        flexDirection: 'column',
        background: '#fdfdfd',
    },
});

class LayoutPage extends Component {

    componentDidMount() {
        const { user: { isLogin = false }, history } = this.props;
        if (!isLogin) {
            history.replace('/login');
            return;
        }
        history.replace('/layout/chat');
        // history.replace('/layout/person');
    }

    state = {
        open: true,
    }

    handleDrawerOpen = () => {
        this.setState({
            open: true
        });
    };

    handleDrawerClose = () => {
        this.setState({
            open: false,
        })
    }

    renderLeftBar = (location) => {
        const { location: { pathname = '/' } } = this.props;
        if (pathname.indexOf('/layout/chat') > -1) {
            return <MsgList />
        } else if (pathname.indexOf('/layout/person') > -1) {
            return <UserList />
        } else {
            return null
        }
    }

    render() {
        const { classes, match: { url: rootUrl } } = this.props;
        let leftBar = this.renderLeftBar();

        return (
            <div className={classes.root}>
                <CssBaseline />
                <Header />
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.toolbar} />
                    {leftBar}
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Route path={`${rootUrl}/chat/:type/:id`} component={ChatLayout} />
                    <Route path={`${rootUrl}/person`} component={PersonLayout} />
                    <Route path={`${rootUrl}/dashBoard`} component={ChatLayout} />
                </main>
            </div>
        );
    }
}

export default connect(
    state => {
        return {
            user: state.user,
        }
    }
)(withStyles(styles, { withTheme: true })(LayoutPage));
