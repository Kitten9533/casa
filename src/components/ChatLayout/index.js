import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

class ChatLayout extends Component {

    componentDidMount() {
        console.log('ChatLayout', this.props);
    }

    render() {
        return (
            <div>ChatLayout</div>
        )
    }
}

export default withRouter(connect()(ChatLayout))