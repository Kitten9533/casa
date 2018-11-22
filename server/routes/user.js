const assert = require('assert');
const User = require('../models/user');
const tools = require('../utils/tools');

const user = {
    async register (payload, io, socket){

    },
    async login(payload, io, socket) {
        let {
            name,
            password,
        } = payload;
        // // TODO 密码加密等
        // // TODO 通过 name 和 password 获取数据库中的 userId
        assert(name, '用户名不能为空');
        assert(password, '密码不能为空');

        const user = await User.findOne({ name });
        assert(user, '该用户不存在');

        console.dir(tools.formatRes({token: 'hahhdijisjs'}));
        socket.emit('loginSuccess', tools.formatRes({token: 'hahhdijisjs'}));
        
    },
    async loginByToken() {

    },
    async addFriend() {

    }
}

module.exports = {
    ...user
}