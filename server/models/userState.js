const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserStateSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        index: true,
    },
    state: {
        type: String,
        enum: ['online', 'offline', 'afk'],
        default: 'offline',
    }
})

const UserState = mongoose.model('UserState', UserStateSchema);

module.exports = UserState