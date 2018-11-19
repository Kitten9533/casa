import React, { Component } from 'react'
import { connect } from 'react-redux'
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import classNames from 'classnames';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import MsgList from '@/components/MsgList';
import { Route, Switch } from 'react-router-dom';
import ChatLayout from '@/components/ChatLayout'

const drawerWidth = 220;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
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
    toolbar: theme.mixins.toolbar,
});

class LayoutPage extends Component {

    componentDidMount() {
        const { user: { isLogin = false }, history } = this.props;
        console.log('isLogin', isLogin);
        console.log('props', this.props);
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
        const { classes, theme, user: { userName = '' } } = this.props;

        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" color="inherit" noWrap>
                            {userName}
                        </Typography>
                    </Toolbar>
                </AppBar>
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
                    {/* <ChatLayout /> */}
                    <Switch>
                        <Route path="/message/:id" component={ChatLayout}/>
                    </Switch>
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
