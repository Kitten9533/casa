import React, { Component, Fragment } from 'react'
import Message from './message'
import ChatInput from './chatInput'
import Header from './header'
import * as styles from './index.less'

class ChatLayout extends Component {
    render() {
        return (
            <div className={styles.container}>
                <Header />
                <Message />
                <ChatInput />
            </div>
        )
    }
}

export default ChatLayout