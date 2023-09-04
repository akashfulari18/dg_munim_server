const express  =  require('express')
require('dotenv').config()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const cookie = require('cookie-parser')

const connection = require('./db')

const AdminRoute = require('./routes/admin.route')
const adatiRoute = require('./routes/adati.route')
const UserRoute = require('./routes/user.route')

const { BlacklistModel } = require('./model/blacklist.model')
const { checkRole } = require('./middleware/checkRole.middleware')
const authMiddleware = require('./middleware/auth.middleware')




const app = express()

app.use(express.json())
app.use(cookie())
app.use(cors())
app.use(express.json())

// admin route
app.use("/admin",AdminRoute)
app.use("/user",UserRoute)
app.use("/adati",adatiRoute)


app.post("/logout",checkRole(['admin','kharidi','adati']),async(req,res)=>{
// console.log("role",req.body.role)
    try {
        
        // const {AccessToken} = req.cookies //need to change it in future when token comes from frontend then it should come from there

        const accessToken = req.headers.authorization.split(' ')[1];

        const newBlackListedToken = await new BlacklistModel({refreshToken:accessToken})
        await newBlackListedToken.save()

        // blacklistedTokens.push(AccessToken);
     
       res.status(200).send("user logged out successfully");
    } catch (error) {
        res.status(400).send({err:error.message})
    }
})

app.post("/refresh_token",checkRole(['admin','kharidi','adati']),async(req,res)=>{
    const refreshToken = req.headers.authorization.split(' ')[2];
    console.log(refreshToken)
    // console.log(req.role)

    // res.status(200).send(refreshToken)
    try {
        const decodedToken =  jwt.verify(refreshToken,process.env.REFRESH_TOKEN_KEY)
        console.log(decodedToken)
        if(decodedToken){
            
            const accessToken = jwt.sign({ userId: decodedToken.userId, role: decodedToken.role }, process.env.PRIVATE_KEY, { expiresIn: '15m' })

            res.status(200).send(accessToken)
        }else{
            res.status(401).send({ message: 'Invalid refresh token' });
        }
    } catch (error) {
        res.status(400).send({ err: error.message });
        
    }

})

app.listen(process.env.PORT,async()=>{

    try {
        await connection
        console.log(`running on ${process.env.PORT}`)
    } catch (err) {
        console.log("not connected...!")
    }
})