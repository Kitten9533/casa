import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { BrowserRouter, Route, Link, IndexRoute, Switch, HashRouter } from 'react-router-dom'
import LoginPage from './containers/LoginPage'
import Layout from './containers/Layout'

class App extends Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route exact path="/" component={Layout} />
                    <Route path="/index" component={Layout} />
                    <Route path="/login" component={LoginPage} />
                </Switch>
            </HashRouter>
        );
    }
}

// export default withRouter(connect()(App))
export default App