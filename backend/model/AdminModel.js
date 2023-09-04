const mongoose = require('mongoose')
require('dotenv').config()

const adminSchema = mongoose.Schema({
    email: { type: String, required: true },
    username: { type: String, required: true },
    role: {
        type: String,
        required:true
    },
    password: { type: String, required: true }
})

const AdminModel = mongoose.model('admin', adminSchema)

module.exports = AdminModel