import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { BrowserRouter, Route, Link, IndexRoute, Switch, HashRouter as Router, Redirect } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from "react-transition-group"
// pages
import LoginPage from './containers/LoginPage'
import Layout from './containers/LayoutPage'
import PrivateRoute from '@/auth/PrivateRoute'

import { MuiThemeProvider } from '@material-ui/core/styles';
import { themeOne, themeTwo } from '@/theme'
import './main.css'
import Notifier from '@/Notifier';
import ConsecutiveSnackbars from '@/components/ConsecutiveSnackbars'

class App extends Component {
    render() {
        const { snackbars: { queue = [] } } = this.props;
        return (
            <Router>
                <MuiThemeProvider theme={themeTwo}>
                    <div>
                        <ConsecutiveSnackbars queue={queue} />
                        <Switch>
                            <Route exact path="/" render={
                                () => (
                                    <Redirect to="/layout" />
                                )
                            } />
                            <Route path="/layout" component={Layout} />
                            <Route path="/login" component={LoginPage} />
                        </Switch>
                    </div>
                </MuiThemeProvider>
            </Router>
        );
    }
}

// export default withRouter(connect()(App))
export default connect(state => {
    return {
        user: state.user,
        snackbars: state.snackbars,
    }
})(App)