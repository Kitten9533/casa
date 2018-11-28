const assert = require('assert');
const User = require('../models/user');
const tools = require('../utils/tools');

const getUserByParams = async (params) => {
    const user = await User.find({ $or: params }, { password: 0 });
    let items = Object.assign({}, user || {});
    let res = [];
    Object.values(items).forEach((item) => {
        res.push(item);
    })
    return res;
}

const getOfflineUserByParams = async (arr) => {
    const user = await User.find({ _id: { $nin: arr } }, { password: 0 });
    let items = Object.assign({}, user || {});
    let res = [];
    Object.values(items).forEach((item) => {
        res.push(item);
    })
    return res;
}

/**
 * 刷新用户列表
 * @param {*} io 
 * @param {*} 当前用户的id
 * @returns {onlineUser, afkUser, offlineUser}
 */
const refreshUserList = async (io, userId) => {
    let allUserConnected = Object.assign({}, io.allUserId);
    let userOnline = [];
    let userAFK = [];
    let userOffline = []; //所有在线的userid用于 获取不在线用户
    let result = {};
    userId = userId.toString();
    Object.keys(allUserConnected).forEach((key) => {
        if (allUserConnected[key] === 'online' && key !== userId) {
            userOnline.push({ _id: key });
        } else if (allUserConnected[key] === 'afk' && key !== userId) {
            userAFK.push({ _id: key });
        }
        userOffline.push(key);
    });

    if (userOnline.length > 0) {
        // 刷新在线用户
        result.onlineUser = await getUserByParams(userOnline);
    } else {
        result.onlineUser = [];
    }
    if (userAFK.length > 0) {
        // 刷新离开用户
        result.afkUser = await getUserByParams(userAFK);
    } else {
        result.afkUser = [];
    }
    console.dir(userOnline);
    console.dir(userAFK);
    console.dir(userOffline);
    result.offlineUser = await getOfflineUserByParams(userOffline);
    return result;
}

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
                avatar: tools.initalAvatar(),
                job: 'job',
                school: 'school',
            })
        } catch (e) {
            throw e;
        }

        let res = Object.assign({}, newUser._doc || {});
        delete res['password'];

        let userId = res._id.toString();

        assert(!io.allUserId.hasOwnProperty(userId), 'DO_NOT_LOGIN_AGAIN');

        socket.user = res._id; //  ObjectId
        io.allUser[userId] = socket;
        io.allUserId[userId] = 'online';

        return {
            // eventName: 'register',
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

        let userId = res._id;

        console.dir('------allUserId-----: ' + io.allUserId);
        console.dir('------curr-----: ' + userId);

        assert(!io.allUserId.hasOwnProperty(userId), 'DO_NOT_LOGIN_AGAIN');

        await user.save();
        delete res['password'];

        socket.user = res._id; //   ObjectId
        io.allUser[userId] = socket;
        io.allUserId[userId] = 'online';

        console.dir('allUserId:');
        console.dir(io.allUserId);

        return {
            // eventName: 'login',
            data: tools.formatRes(res),
        }
    },
    // async getConnectedUser(payload, io, socket) {
    //     let params = [];
    //     let userIds = Object.assign({}, io.allUserId);
    //     Object.keys(userIds).forEach((item) => {
    //         params.push({ _id: item });
    //     })
    //     console.log('params', params);
    //     const user = await User.find({ $or: params }, { password: 0 });

    //     let items = Object.assign({}, user || {});
    //     let res = [];
    //     Object.values(items).forEach((item) => {
    //         res.push(item);
    //     })

    //     // 触发所有客户端的userList更新
    //     io.sockets.emit('refreshConnectedUser', {
    //         connectedUser: res
    //     });

    //     return {
    //         data: tools.formatRes(res),
    //     }
    // },
    async getUserList(payload, io, socket) {
        let res = await refreshUserList(io, socket.user); 
        // {onlineUser, afkUser, offlineUser}
        // 触发所有客户端的userList更新
        io.sockets.emit('refreshUserList', res);
        return {
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