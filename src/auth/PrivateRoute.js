import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

class PrivateRoute extends Component {
    constructor(props) {
        super(props);
        this.fakeAuth = {
            isAuthenticated: false,
            authenticate(cb) {
                this.isAuthenticated = true;
                setTimeout(cb, 100); // fake async
            },
            signout(cb) {
                this.isAuthenticated = false;
                setTimeout(cb, 100);
            }
        };
    }

    render() {
        const { Component, ...rest } = this.props;
        return (
            <Route
                {...rest}
                render={props =>
                    this.fakeAuth.isAuthenticated ? (
                        <Component {...props} />
                    ) : (
                            <Redirect
                                to={{
                                    pathname: "/login",
                                    state: { from: props.location }
                                }}
                            />
                        )
                }
            />
        )
    }
}

export default connect(state => {
    return {
        user: state.user
    }
})(PrivateRoute)