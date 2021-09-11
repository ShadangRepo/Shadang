const jwt = require("jsonwebtoken");
const constants = require('../utils/constants');

const verifyToken = (req, res, next) => {
    var token = req.headers["authorization"];

    if (!token) {
        return res.status(200).send({ success: false, message: "A token is required for authentication" });
    }
    try {
        token = token.split(" ")[1] // Remove bearer text from token
        const decoded = jwt.verify(token, constants.TOKEN_KEY);
        delete decoded.iat;
        delete decoded.exp;
        req.decodedUser = decoded;
    } catch (err) {
        return res.send({ success: false, message: constants.TokenExpiredMessage });
    }
    return next();
};

module.exports = verifyToken;