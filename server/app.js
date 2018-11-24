const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const userEvents = require('./routes/user');
const catchError = require('./middlewares/catchError');
const log = require('./middlewares/log');
const call = require('./utils/call');

const socketEvents = require('./middlewares/socketEvents')

// app.get('/', function (req, res) {
//     res.send('<h1>Hello world</h1>');
// });

// io.attach(http);

// app.use(log());
// io.use(catchError());

var numUsers = 0;

var allClients = [];

io.on('connection', (socket) => {
    allClients.push(socket);
    // console.dir(socket);
    console.log('connect');

    socket.on('login', (payload, fn) => {
        call(userEvents.login, payload, fn, io, socket);
    })

    socket.on('register', (payload, fn) => {
        call(userEvents.register, payload, fn, io, socket);
    })

    socket.on('disconnect', () => {
        console.log('Got disconnect!');
        var i = allClients.indexOf(socket);
        allClients.splice(i, 1);
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