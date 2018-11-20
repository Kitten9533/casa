import React, { Component } from 'react'
import { connect } from 'react-redux'
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import MsgList from '@/components/MsgList';
import { Route } from 'react-router-dom';
import ChatLayout from '@/components/ChatLayout'
import Header from '@/components/Layout/Header'

const drawerWidth = 220;

const styles = theme => ({
    root: {
        display: 'flex',
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
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
});

class LayoutPage extends Component {

    componentDidMount() {
        const { user: { isLogin = false }, history } = this.props;
        if (!isLogin) {
            history.replace('/login');
        }
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

    render() {
        const { classes, match: { url: rootUrl } } = this.props;

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
                    <MsgList />
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Route path={`${rootUrl}/chat/:type/:id`} component={ChatLayout} />
                    <Route path={`${rootUrl}/person`} component={ChatLayout} />
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
