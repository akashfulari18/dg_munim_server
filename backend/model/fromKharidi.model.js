const mongoose = require('mongoose')

const fromKharidiSchema=mongoose.Schema({
    market_feechi_rakkam: Number,
        market_nirikshan_kharch: Number,
        levi: Number,
        adat: Number,
        cgst: Number,
        sgst: Number,
})

const FromKharidiModel = mongoose.model('fromkharidi',fromKharidiSchema)

module.exports=FromKharidiModel