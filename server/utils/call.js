const assert = require('assert');
const moment = require('moment');
const errDic = require('./errorCodeDic');
// const user = require('../routes/user');
/**
 * 统一处理的方法
 */
/**
 * 
 * @param {*} cb 
 * @param {*} payload 
 * @param {*} fn 客户端 emit 的回调
 * @param {*} io 
 * @param {*} socket 
 */
const call = function (cb, payload, fn, io, socket) {
    if (!cb) {
        return;
    }
    console.dir(`<====== interface: ${cb.name} === ${JSON.stringify(payload)}`);
    cb(payload).then((res) => {
        let {
            eventName,
            data = null,
        } = res;
        fn && fn(data);
        assert(eventName, '事件名不能为空');
        socket.emit(eventName, data);
        console.dir(`${moment().format()} success:(${eventName}) ==========> ${JSON.stringify(res)}`);
        console.log('=======> end');
    }).catch((err) => {
        console.log(err);
        let res = {
            success: false,
            data: null,
            msg: errDic[err.message] ? errDic[err.message].msg : '未处理的异常',
            code: errDic[err.message] ? errDic[err.message].code : '',
        };
        fn && fn(res);
        // socket.emit('callError', res);
        console.dir(`${moment().format()} callError:(callError) ========== ${JSON.stringify(res)}`);
        console.log('=======> end');
    })
}

module.exports = call