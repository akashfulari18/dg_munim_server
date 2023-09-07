const mongoose = require('mongoose')

const marketSchema = mongoose.Schema({
    market_name: { type: String, required: true },
    dar_prati_quintal:{
        jwari:{type:Number},
        bajari:{type:Number},
        soyabin:{type:Number},
        harbhara:{type:Number},
        udid:{type:Number},
        tur:{type:Number},   
    }
   })

const MarketModel = mongoose.model("market", marketSchema)

module.exports = MarketModel