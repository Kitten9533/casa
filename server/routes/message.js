const assert = require('assert');
const Message = require('../models/message');
const tools = require('../utils/tools');
const mongoose = require('mongoose');

const message = {
    async sendMessageToOne(payload, io, socket) {
        const {
            toUser,
            content = '',
            msgType = 'text',
        } = payload;
        // console.dir(socket);
        assert(socket.user, 'PLEASE_LOGIN');
        assert(toUser, 'NO_TOUSER');
        let newMsg = null;
        try {
            newMsg = await Message.create({
                fromUser: socket.user,
                toUser: mongoose.Types.ObjectId(toUser),
                content,
                msgType,
            })
        } catch (e) {
            throw e;
        }
        let res = Object.assign({}, newMsg._doc || {});
        // console.log(res);

        // console.log('<<<<<<<<<<<<<<<<<<<<<');
        let msgInfo = await Message.findOne({
            _id: res._id
        }).populate('fromUser').populate('toUser');
        // console.log('>>>>>>>>>>>>>>>>>>>>>>');
        // console.log('msgInfo');
        console.log(msgInfo);

        let newRes = {
            content: msgInfo.content,
            msgType: msgInfo.msgType,    // 图文，语音等
            createTime: msgInfo.createTime,
            senderId: msgInfo.fromUser._id,
            sender: msgInfo.fromUser.name,
            senderAvatar: msgInfo.fromUser.avatar,
            from: {
                _id: msgInfo.fromUser._id,
                avatar: msgInfo.fromUser.avatar,
                name: msgInfo.fromUser.name,
            },
            to: {
                _id: msgInfo.toUser._id,
                avatar: msgInfo.toUser.avatar,
                name: msgInfo.toUser.name,
            }
        };

        io.to(io.userToSocket[toUser]).emit('receiveMessageFromOne', newRes);

        return {
            data: tools.formatRes(newRes),
        }
    },
    async sendMessageToGroup(payload, io, socket) {

    },
};

module.exports = {
    ...message
}