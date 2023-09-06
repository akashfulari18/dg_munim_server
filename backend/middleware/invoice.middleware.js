const jwt = require('jsonwebtoken')
require('dotenv').config()

const checkInvoieID=async(req,res,next)=>{

    const invoiceToken = req.headers.authorization.split(' ')[3] || ' '

    try {
        const decoded =  jwt.verify(invoiceToken,process.env.PRIVATE_KEY)
        // console.log(decoded)
        if(!decoded){
           res.status(403).send("does not have invoice token")
        }else{
           
            req.invoiceId=decoded.invoiceId
            // console.log(req.invoiceId)
            next()
        }

    } catch (error) {
        res.status(400).send({err:error.message})
    }


}

module.exports=checkInvoieID