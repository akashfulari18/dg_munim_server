const mongoose = require('mongoose')
require('dotenv').config()

const userSchema = mongoose.Schema({
    email: { type: String, required: true },
    firstname:{type:String,required:true},
    lastname:{type:String,required:true},
    mobile_no:{type:Number,required:true},
    username: { type: String, required: true, unique: true },
    market_name:{type:String,required:true},
    gala_no:{type:Number,required:true},
    role: {
        type: String,
        enum: ['admin', 'kharidi', 'adati','shetkari'],
        default: 'adati',
    },
    password: { type: String, required: true }
})

const UserModel = mongoose.model('user', userSchema)

module.exports = UserModel