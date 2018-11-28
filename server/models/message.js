const mongoose = require('mongoose');
const { Schema } = mongoose;

const MessageSchema = new Schema({
    status: {
        type: String,
        enum: ['read', 'unread'],
        default: 'read',
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
        ref: 'User',
    },
    toUser: {
        type: String,
        index: true,
    },
    content: {
        type: String,
    }
})

const Message = mongoose.model('message', MessageSchema);

module.exports = Message