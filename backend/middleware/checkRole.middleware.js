require('dotenv').config()
const jwt = require('jsonwebtoken')
const { BlacklistModel } = require('../model/blacklist.model')
const checkRole = (permittedrole) => {


    return async(req, res, next) => {
        const refreshToken = req.headers.authorization.split(' ')[2] || ""
        const accessToken = req.headers.authorization.split(' ')[1] || ""
        // console.log(req.body.role)
        if (refreshToken === "" || accessToken==="") {
            return res.status(400).send({ msg: "Please log in to continue." });
        }

        const blacklistedToken = await BlacklistModel.findOne({ refreshToken: accessToken });

    if (blacklistedToken) {
      return res.status(400).send({ msg: "You are logged out. Please log in again." });
    }

        let decodedToken;
        try {

            decodedToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY);
        } catch (error) {
            if (err.name === 'TokenExpiredError') {
                // Token has expired
                return res.status(400).send({ msg: "Your session has expired, please refresh token" });
            }
            throw err;
        }
        // console.log(decodedToken)

        const user_role = decodedToken.role
        // const user_role = req.body.role

        if (permittedrole.includes(user_role)) {
            req.role = user_role
            next()
        } else {
            return res.send("unauthrisied")
        }
    }

}

module.exports = {
    checkRole
}