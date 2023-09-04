const mongoose = require('mongoose')
require('dotenv').config()

const userSchema = mongoose.Schema({
    email: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    role: {
        type: String,
        enum: ['admin', 'kharidi', 'adati'],
        default: 'adati',
    },
    password: { type: String, required: true }
})

const UserModel = mongoose.model('user', userSchema)

module.exports = UserModel