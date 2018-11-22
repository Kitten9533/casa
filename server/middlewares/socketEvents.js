/**
 * 为当前的socket绑定事件
 * @param {*} io 
 * @param {*} socket 
 * @param {*} routes 
 */
const socketEvents = function(io, socket, routes) {
    console.log('>>> use socketEvents');
    // keys
    Object.keys(routes).forEach((eventName) => {
        socket.on(eventName, routes[routes]);
    })
}

module.exports = socketEvents