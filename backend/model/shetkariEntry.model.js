const mongoose = require('mongoose')

const shetkariEntrySchema = mongoose.Schema({
    fistname:{ type: String},
    lastname:{ type: String},
    username:{type:String, required: true, unique: true },
    mobile_no: { type: Number, required: true, unique: true },
})

const ShetkariModel = mongoose.model('shetkari', shetkariEntrySchema)

module.exports = ShetkariModel
