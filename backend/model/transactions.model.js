const mongoose = require('mongoose')

const transactionSchema=mongoose.Schema({
    
})

const TransactionMdodel = mongoose.model('transaction',transactionSchema)

module.exports=TransactionMdodel