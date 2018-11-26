const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const userEvents = require('./routes/user');
const catchError = require('./middlewares/catchError');
const log = require('./middlewares/log');
const call = require('./utils/call');


app.get('/', function (req, res) {
    res.send('<h1>Hello world</h1>');
});

var allRoutes = {
    ...userEvents,
}

// io.attach(http);

// app.use(log());
// io.use(catchError());
io.allClients = []; // 所有连接的客户端， 包括游客和库中的用户
io.allUser = {};    // 在线的用户，数据库中有账号信息的用户
io.allUserId = {};  // 在线的用户id

io.on('connection', (socket) => {
    io.allClients.push(socket);
    console.log('socket.user: ' + socket.user);
    console.log('connect: now online === ' + io.allClients.length);

    // socket.on('login', (payload, fn) => {
    //     call(userEvents.login, payload, fn, io, socket);
    // })

    // socket.on('register', (payload, fn) => {
    //     call(userEvents.register, payload, fn, io, socket);
    // })

    // socket.on('getAllUser', (payload, fn) => {
    //     call(userEvents.getAllUser, payload, fn, io, socket);
    // })

    // 绑定routes中的事件
    Object.keys(allRoutes).forEach((eventName) => {
        socket.on(eventName, (payload, fn) => {
            call(allRoutes[eventName], payload, fn, io, socket);
        });
    })

    socket.on('disconnect', () => {
        var i = io.allClients.indexOf(socket);
        io.allClients.splice(i, 1);
        delete io.allUser[socket.user];
        // 在线用户退出
        delete io.allUserId[socket.user];
        console.log('socket.user: ' + socket.user);
        console.log('Got disconnect!: now online === ' + io.allClients.length);
    })

    socket.on('test', function(name, fn){
        fn(name);
    })
})



// io.on('connection', (socket) => {

//     // console.log('\n\nconnection:========\n' + JSON.stringify(socket));
//     console.log('\n\nconnection:========\n');
//     // console.dir(socket, { depth: null });

//     allClients.push(socket);

//     console.log('user count:' + allClients.length)

//     console.log('a user connect');

//     var addedUser = false;

//     // when the client emits 'new message', this listens and executes
//     socket.on('new message', (data) => {
//         // we tell the client to execute 'new message'
//         socket.broadcast.emit('new message', {
//             username: socket.username,
//             message: data
//         });
//     });

//     // when the client emits 'add user', this listens and executes
//     socket.on('add user', (username) => {
//         if (addedUser) return;

//         // we store the username in the socket session for this client
//         socket.username = username;
//         ++numUsers;
//         addedUser = true;
//         socket.emit('login', {
//             numUsers: numUsers
//         });
//         // echo globally (all clients) that a person has connected
//         socket.broadcast.emit('user joined', {
//             username: socket.username,
//             numUsers: numUsers
//         });
//     });

//     // when the client emits 'typing', we broadcast it to others
//     socket.on('typing', () => {
//         socket.broadcast.emit('typing', {
//             username: socket.username
//         });
//     });

//     // when the client emits 'stop typing', we broadcast it to others
//     socket.on('stop typing', () => {
//         socket.broadcast.emit('stop typing', {
//             username: socket.username
//         });
//     });

//     // when the user disconnects.. perform this
//     socket.on('disconnect', () => {

//         console.log('Got disconnect!');

//         // console.log('\n\ndisconnect:========\n');

//         // console.dir(socket, { depth: null });

//         var i = allClients.indexOf(socket);
//         allClients.splice(i, 1);
//         console.log('user count:' + allClients.length)


//         console.log('a user connect');

//         if (addedUser) {
//             --numUsers;

//             // echo globally that this client has left
//             socket.broadcast.emit('user left', {
//                 username: socket.username,
//                 numUsers: numUsers
//             });
//         }
//     });
// });

module.exports = http