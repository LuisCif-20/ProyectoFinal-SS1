const { unAuthorization } = require("../utils/customErrors");
const { checkLinkToken } = require("../utils/jwt");

const checkLinkAuth = (req, res, next) => {
    try {
        let token = req.headers['authorization'];
        if (!token) throw unAuthorization('You nedd a linking token.');
        token = token.split(' ').pop();
        const payload = checkLinkToken(token);
        if (!payload) throw unAuthorization('Invalid token.');
        req.body.account_id = payload.account_id;
        next();
    } catch (error) {
        next(error);
    }
}

module.exports = {
    checkLinkAuth
}