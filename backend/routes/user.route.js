const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const AdminModel = require('../model/AdminModel')
const UserModel = require('../model/user.model')

const UserRoute = express.Router()

UserRoute.post('/login', async (req, res) => {

    const { username, password } = req.body
    const refreshTokens = []

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
               
                refreshTokens.push(refreshToken);

                res.status(200).send({ msg: "login successful", accessToken ,refreshToken ,role:user.role ,adati_ID:user._id })

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