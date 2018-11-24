const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        // match: /^([0-9a-zA-Z]{1,2}|[\u4e00-\u9eff]){1,8}$/,
        index: true,
    },
    password: {
        type: String,
    },
    avatar: {
        type: String,
    },
    job: {
        type: String,
    },
    school: {
        type: String,
    },
    createTime: {
        type: Date, default: Date.now
    },
    lastLoginTime: {
        type: Date, default: Date.now
    },
})

const User = mongoose.model('User', UserSchema);

module.exports = User