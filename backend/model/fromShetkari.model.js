const mongoose = require('mongoose')

const fromShetkariSchema=mongoose.Schema({
    hamali: Number,
        tolai: Number,
        kata: Number,
        varfer: Number,
        pakhadani: Number,
        prat_fee: Number,
})

const FromShetkariModel = mongoose.model('fromshetkari',fromShetkariSchema)

module.exports=FromShetkariModel
