const assert = require('assert');
const User = require('../models/user');
const tools = require('../utils/tools');

const user = {
    async register(payload, io, socket) {
        assert(!socket.user, 'HAS_LOGIN');
        
        let {
            name,
            password,
        } = payload;
        assert(name, 'USER_NAME_EMPTY');
        assert(password, 'PASSWORD_EMPTY');

        const user = await User.findOne({ name });
        assert(!user, 'USER_EXISTS');

        let newUser = null;
        try {
            newUser = await User.create({
                name,
                password: await tools.encryption(password),
                avatar: 'avatar',
                job: 'job',
                school: 'school',
            })
        } catch (e) {
            throw e;
        }

        let res = Object.assign({}, newUser._doc || {});
        delete res['password'];

        assert(!io.allUserId.hasOwnProperty(res._id), 'DO_NOT_LOGIN_AGAIN');

        socket.user = res._id;
        io.allUser[res._id] = socket;
        io.allUserId[res._id] = true;

        return {
            eventName: 'register',
            data: tools.formatRes(res),
        }

    },
    async login(payload, io, socket) {
        assert(!socket.user, 'HAS_LOGIN');

        let {
            name,
            password,
        } = payload;
        // // TODO 密码加密等
        // // TODO 通过 name 和 password 获取数据库中的 userId
        assert(name, 'USER_NAME_EMPTY');
        assert(password, 'PASSWORD_EMPTY');

        const user = await User.findOne({ name });
        assert(user, 'USER_NOT_EXISTS');

        const isPasswordCorrect = tools.encryptionCompare(password, user.password);
        assert(isPasswordCorrect, 'INCORRECT_NAME_OR_PASSWORD');

        user.lastLoginTime = Date.now();
        let res = Object.assign({}, user._doc || {});

        console.dir('------allUserId-----: ' + io.allUserId);
        console.dir('------curr-----: ' + res._id);

        assert(!io.allUserId.hasOwnProperty(res._id), 'DO_NOT_LOGIN_AGAIN');

        await user.save();
        delete res['password'];

        socket.user = res._id;
        io.allUser[res._id] = socket;
        io.allUserId[res._id] = true;

        console.log('allUserId:' + io.allUserId);

        return {
            eventName: 'login',
            data: tools.formatRes(res),
        }
    },
    async logout() {

    },
    async loginByToken() {

    },
    async addFriend() {

    },
}

module.exports = {
    ...user
}