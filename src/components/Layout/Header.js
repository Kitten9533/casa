import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Chat from '@material-ui/icons/Chat';
import Person from '@material-ui/icons/Person';
import DashBoard from '@material-ui/icons/DashBoard';
import IconButton from '@material-ui/core/IconButton';
import {withRouter} from 'react-router'

const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
    toolbar: theme.mixins.toolbar,
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit,
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 6,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 6,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 180,
            },
        },
    },
    typographyRoot: {
        paddingLeft: theme.spacing.unit * 3,
    },
    toolRight: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    toolIcon: {
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
    }
});

class Header extends Component {

    handleTabClick = (key) => {
        const { history, match: { url }, location, } = this.props;
        let newUrl = `${url}/${key}`;
        if(location.pathname === newUrl){
            return;
        }
        history.push(newUrl);
    }

    render() {
        const { classes, user: { name = '' } } = this.props;

        return (
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                        />
                    </div>
                    <div className={classes.toolRight}>
                        <IconButton className={classes.toolIcon} aria-label="Chat" onClick={() => this.handleTabClick('chat')}>
                            <Chat style={{ color: '#FFF' }} />
                        </IconButton>
                        <IconButton className={classes.toolIcon} aria-label="Person" onClick={() => this.handleTabClick('person')}>
                            <Person style={{ color: '#FFF' }} />
                        </IconButton>
                        <IconButton className={classes.toolIcon} aria-label="DashBoard" onClick={() => this.handleTabClick('dashBoard')}>
                            <DashBoard style={{ color: '#FFF' }} />
                        </IconButton>
                    </div>
                    <Typography variant="h6" color="inherit" noWrap
                        classes={{
                            root: classes.typographyRoot
                        }}>
                        {name}
                    </Typography>
                </Toolbar>
            </AppBar>
        )
    }
}

export default withRouter(connect(
    state => {
        return {
            user: state.user,
        }
    }
)(withStyles(styles, { withTheme: true })(Header)));