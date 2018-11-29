import "@babel/polyfill";
import React, { Fragment } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Link, IndexRoute, Switch, HashRouter } from 'react-router-dom'
import App from './App'
import './main.css'
import configureStore from './configureStore'
import socket from '@/utils/socket'
import { getUserListStart, receiveMessageFromOne } from '@/actions'
import { SnackbarProvider } from 'notistack';
import Button from '@material-ui/core/Button';

const store = configureStore();

function addSocketEvents() {
  socket.on('connect', () => {
    console.log('connect')
    socket.on('disconnect', () => {
      console.log('you have been disconnected');
      socket.open();
    });

    // 刷新在线用户列表
    socket.on('refreshUserList', (userList) => {
      store.dispatch(getUserListStart(userList));
    })

    // 接收到某用户发来的消息
    socket.on('receiveMessageFromOne', (msg) => {
      console.log(msg);
      store.dispatch(receiveMessageFromOne(msg));
    })

    // socket.emit('login', { name: 'Kitten', password: '123456' }, (res) => {
    //   console.log('=======', res);
    // });
    // // socket.emit('register', {name: 'Kitten', password: '123456'});
    // socket.emit('test', {name: 'ac', password: 'b'}, (data) => {
    //   console.log('test', data);
    // })

    // async function abc(){
    //   const res = await emit('login', {name: 'Kitten', password: '123456'});
    //   console.log('end', res);
    // }
    // abc();
  })
}

const renderApp = () => {
  render(
    <Provider store={store}>
      {/* <SnackbarProvider
        action={[
          <Button color="secondary" size="small">
            Alert
        </Button>
        ]}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        maxSnack={3}
        onClickAction={() => alert('Clicked on my action button.')}
      > */}
        <App />
      {/* </SnackbarProvider> */}
    </Provider>,
    document.getElementById('root')
  )
}

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./containers/LayoutPage', renderApp)
}

renderApp()
addSocketEvents();

// socket.on('loginSuccess', (res) => {
//   console.log('login success', res);
// });

// socket.on('registerSuccess', (res) => {
//   console.log('register success', res);
// })

// socket.on('callError', (res) => {
//   // TODO 错误处理
//   console.log('callError', res);
// })



// socket.on('login', (data) => {
//   console.log('login');
// })

// socket.on('login', (data) => {
//   connected = true;
//   // Display the welcome message
//   var message = "Welcome to Socket.IO Chat – ";
//   log(message, {
//     prepend: true
//   });
//   addParticipantsMessage(data);
// });

// // Whenever the server emits 'new message', update the chat body
// socket.on('new message', (data) => {
//   addChatMessage(data);
// });

// // Whenever the server emits 'user joined', log it in the chat body
// socket.on('user joined', (data) => {
//   log(data.username + ' joined');
//   addParticipantsMessage(data);
// });

// // Whenever the server emits 'user left', log it in the chat body
// socket.on('user left', (data) => {
//   log(data.username + ' left');
//   addParticipantsMessage(data);
//   removeChatTyping(data);
// });

// // Whenever the server emits 'typing', show the typing message
// socket.on('typing', (data) => {
//   addChatTyping(data);
// });

// // Whenever the server emits 'stop typing', kill the typing message
// socket.on('stop typing', (data) => {
//   removeChatTyping(data);
// });

// socket.on('disconnect', () => {
//   log('you have been disconnected');
// });

// socket.on('reconnect', () => {
//   log('you have been reconnected');
//   if (username) {
//     socket.emit('add user', username);
//   }
// });

// socket.on('reconnect_error', () => {
//   log('attempt to reconnect has failed');
// });
