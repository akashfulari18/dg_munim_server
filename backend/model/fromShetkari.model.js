const mongoose = require('mongoose')

const fromShetkariSchema=mongoose.Schema({
    market_feechi_rakkam: Number,
        market_nirikshan_kharch: Number,
        levi: Number,
        adat: Number,
        cgst: Number,
        sgst: Number,
})

const FromShetkariModel = mongoose.model('fromshetkari',fromShetkariSchema)

module.exports=FromShetkariModel
