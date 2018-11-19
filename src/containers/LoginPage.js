import React, { Component } from 'react'
import { connect } from 'react-redux'
import Login from 'components/Login/index'
import { themeOne } from '@/theme';
import { MuiThemeProvider } from '@material-ui/core/styles';

class LoginPage extends Component {

    componentDidMount() {
        const { user: { isLogin = false }, history } = this.props;
        console.log('isLogin', isLogin);
        console.log('props', this.props);
    }

    render() {
        return (
            <MuiThemeProvider theme={themeOne}>
                <Login />
            </MuiThemeProvider>
        );
    }
}

export default connect(state => {
    return {
        user: state.user,
    }
})(LoginPage)