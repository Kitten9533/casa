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

class App extends Component {
    render() {
        return (
            <Router>
                <MuiThemeProvider theme={themeTwo}>
                    <Switch>
                        <Route exact path="/" render={
                            () => (
                                <Redirect to="/layout" />
                            )
                        } />
                        <Route path="/layout" component={Layout} />
                        {/* <Route path="/layout" render={
                            () => (
                                <Redirect to="/layout/chat" />
                            )
                        } /> */}
                        <Route path="/login" component={LoginPage} />
                    </Switch>
                </MuiThemeProvider>
            </Router>
        );
    }
}

// export default withRouter(connect()(App))
export default connect(state => {
    return {
        user: state.user
    }
})(App)