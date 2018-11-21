import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router'

const styles = theme => ({
    header: {
        paddingLeft: theme.spacing.unit * 3,
        paddingRight: theme.spacing.unit * 3,
        paddingTop: theme.spacing.unit * 2,
    }
})

class Header extends Component {

    state = {
        from: {},
    }

    componentDidMount() {
        this.changeFromUser();
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            this.changeFromUser();
        }
    }

    changeFromUser = () => {
        const { match: { params = {} }, msgList: { list = {} } } = this.props;
        let { type = '', id = '' } = params;
        let key = `${type}_${id}`;
        let newState = list[key] || {};
        this.setState({
            ...newState
        });
    }

    render() {
        const { classes } = this.props;
        const { from = {} } = this.state;
        return (
            <Typography variant="body1" classes={{
                root: classes.header
            }}>
                {from.name || ' '}
            </Typography>
        )
    }
}

export default withRouter(connect(state => {
    return {
        msgList: state.msgList
    }
})(withStyles(styles)(Header)))