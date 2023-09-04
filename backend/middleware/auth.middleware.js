const jwt = require('jsonwebtoken');
const UserModel = require('../model/user.model');
const { BlacklistModel } = require('../model/blacklist.model');
require('dotenv').config();

const authMiddleware = async (req, res, next) => {
  const accessToken = req.headers.authorization.split(' ')[1] || ""

  try {
    if (accessToken==="") {
      return res.status(400).send({ msg: "Please log in to continue." });
    }

    // To check if the token is blacklisted or not
    const blacklistedToken = await BlacklistModel.findOne({ refreshToken: accessToken });

    if (blacklistedToken) {
      return res.status(400).send({ msg: "You are logged out. Please log in again." });
    }

    let decodedToken;
    try {
      decodedToken = jwt.verify(accessToken, process.env.PRIVATE_KEY);
    //   console.log(decodedToken)
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        // Token has expired
        return res.status(400).send({ msg: "Your session has expired,please refresh token" });
      }
      throw err; // Re-throw other JWT verification errors
    }

    req.role = decodedToken.role;
    req.body.userID = decodedToken.userId;
    next();

  } catch (error) {
    res.status(403).send({ err: error.message });
  }
};

module.exports = authMiddleware;
