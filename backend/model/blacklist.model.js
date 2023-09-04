const mongoose = require("mongoose")

const backlistSchema=  mongoose.Schema({
           refreshToken: {
          type: String,
          required: true
        }
      
})

const BlacklistModel = mongoose.model("baclistedtoken",backlistSchema)

module.exports={
    BlacklistModel
}