const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const AdminModel = require('../model/AdminModel')
const UserModel = require('../model/user.model')

const UserRoute = express.Router()

UserRoute.post('/login', async (req, res) => {

    const { username, password } = req.body


    // console.log(username)
    try {
        const user = await UserModel.findOne({ username })
        
        
        if (user) {
            const {_id ,role}=user
            // console.log(_id,role)
            const decoded = await bcrypt.compare(password, user.password)
            // console.log(user)

            if (decoded) {
                const accessToken = jwt.sign({ userId: user._id, role: user.role }, process.env.PRIVATE_KEY, { expiresIn: '1h' })

                const refreshToken = jwt.sign({ userId: user._id, role: user.role }, process.env.REFRESH_TOKEN_KEY,{expiresIn:'7d'})
               
                const userData={
                    role:user.role,
                    firstname:user.firstname,
                    lastname:user.lastname,
                    username:user.username,
                    mobile_no:user.movile_no,
                    gala_no:user.gala_no,
                    market_name:user.gala_no
                }

                if (user.role === 'adati') {
                    userData.adati_ID = user._id; // Replace with the adati ID or value you want to include
                  } else if (user.role === 'kharidi') {
                    userData.kharidi_ID = user._id; // Replace with the kharidi ID or value you want to include
                  } else if (user.role === 'admin') {
                    userData.admin_ID = user._id; // Replace with the admin ID or value you want to include
                  }
                
                res.status(200).send({ msg: "login successful", accessToken ,refreshToken ,userData})

            } else {

                res.status(400).send({ err: "user not found" })
            }

        } else {
            res.status(400).send({ err: "user not found" })
        }
    } catch (error) {
        res.status(400).send({ err: error.message })

    }


})

module.exports = UserRoute