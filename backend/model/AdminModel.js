const mongoose = require('mongoose')
require('dotenv').config()

const adminSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: { type: String, required: true },
    username: { type: String, required: true },
    role: {
        type: String,
        required: true
    },
    password: { type: String, required: true },
    mobile_no: Number
})

const AdminModel = mongoose.model('admin', adminSchema)

module.exports = AdminModel