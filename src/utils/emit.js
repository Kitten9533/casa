import socket from './socket';

const emit = function (eventName, payload) {
    return new Promise((resolve, reject) => {
        socket.emit(eventName, payload, (res) => {
            console.log('emit', eventName, payload, res);
            if(res.success){
                resolve(res);
            }else{
                // 报错时
                resolve(res);
            }
        })
    });
}

export default emit