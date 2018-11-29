const mongoose = require('mongoose');
const { Schema } = mongoose;

const MessageSchema = new Schema({
    status: {
        type: String,
        enum: ['read', 'unread'],
        default: 'unread',
    },
    msgType: {
        type: String,
        enum: ['text', 'image', 'audio', 'video'],
        default: 'text',
    },
    createTime: {
        type: Date,
        default: Date.now,
        index: true
    },
    fromUser: {
        type: Schema.Types.ObjectId,
        index: true,
        ref: 'User',
    },
    toUser: {
        type: Schema.Types.ObjectId,
        index: true,
        ref: 'User',
    },
    content: {
        type: String,
    }
})

const Message = mongoose.model('message', MessageSchema);

module.exports = Message