const assert = require('assert');
const Message = require('../models/message');
const tools = require('../utils/tools');

const message = {
    async sendMessageToOne(payload, io, socket) {
        const {
            toUser,
            content = '',
            msgType = 'text',
        } = payload;
        assert(!socket.user, 'HAS_LOGIN');
        assert(!toUser, 'NO_TOUSER');
        let newMsg = null;
        try{
            newMsg = await Message.create({
                fromUser: socket.user,
                toUser: toUser,
                content,
                msgType,
            })
        } catch(e){
            throw e;
        }
        let res = Object.assign({}, newMsg._doc || {});
        return {
            data: tools.formatRes(res),
        }
        // TODO
    },
    async sendMessageToGroup(payload, io, socket) {

    },
};

module.exports = {
    ...message
}