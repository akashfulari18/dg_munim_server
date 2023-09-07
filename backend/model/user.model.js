const mongoose = require('mongoose')
require('dotenv').config()

const userSchema = mongoose.Schema({
    email: { type: String },
    firstname:{type:String,required:true},
    lastname:{type:String,required:true},
    mobile_no:{type:Number,required:true},
    username: { type: String, required: true, unique: true },
    market_name:{type:String},
    gala_no:{type:Number},
    role: {
        type: String,
        enum: ['admin', 'kharidi', 'adati','shetkari'],
        default: 'adati',
    },
    password: { type: String },
    stocks:[
      {
        malacha_prakar:String,
        quantity_in_qunintal:Number

        },
    ],
    kharidi_details:[
        {
            
        },
    ]
})

const UserModel = mongoose.model('user', userSchema)

module.exports = UserModel