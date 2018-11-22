const mongoose = require('mongoose');
const { Schema } = mongoose;

const FriendSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        index: true,
    },
    friendId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    friendName: {
        type: String, // 朋友备注
    },
    createTime: { 
        type: Date, default: Date.now
    },
})

const Friend = mongoose.model('Friend', FriendSchema);

module.exports = Friend
