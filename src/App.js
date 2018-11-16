import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { BrowserRouter, Route, Link, IndexRoute, Switch, HashRouter } from 'react-router-dom'
// pages
import LoginPage from './containers/LoginPage'
import Layout from './containers/Layout'

import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '@/theme'

class App extends Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <HashRouter>
                    <Switch>
                        <Route exact path="/" component={Layout} />
                        <Route path="/index" component={Layout} />
                        <Route path="/login" component={LoginPage} />
                    </Switch>
                </HashRouter>
            </MuiThemeProvider>
        );
    }
}

// export default withRouter(connect()(App))
export default App