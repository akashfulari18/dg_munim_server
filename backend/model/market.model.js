const mongoose = require('mongoose')

const marketSchema = mongoose.Schema({
    market_name: { type: String, required: true },
    email: { type: String, required: true },
    kharidi: {
        regular:Number,
        second_day:Number
    }
})

const MarketModel = mongoose.model("market", marketSchema)

module.exports = MarketModel