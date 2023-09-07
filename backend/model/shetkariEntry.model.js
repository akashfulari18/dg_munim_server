const mongoose = require('mongoose')

const shetkariEntrySchema = mongoose.Schema({
    firstname:{ type: String},
    lastname:{ type: String},
    mobile_no: { type: Number, required: true, unique: true },
})

const ShetkariModel = mongoose.model('shetkari', shetkariEntrySchema)

module.exports = ShetkariModel
