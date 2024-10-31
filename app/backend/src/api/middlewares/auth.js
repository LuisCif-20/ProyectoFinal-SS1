const { checkPayload } = require("../services/authService");
const { tokenExpired, unAuthorization, forbidden } = require("../utils/customErrors");
const { checkAccessToken, checkRefreshToken } = require("../utils/jwt");

const checkToken = (req, res, next) => {
    try {
        let token = req.headers['authorization'];
        if (!token) throw unAuthorization('You nedd an access token.');
        token = token.split(' ').pop();
        checkAccessToken(token, (err, decoded) => {
            if (err) {
                if (err.name === 'TokenExpiredError') throw tokenExpired();
                throw unAuthorization('Invalid token');
            }
            req.payload = decoded;
            next();
        });
    } catch (error) {
        next(error);
    }
};

const checkRefreshT = (req, res, next) => {
    try {
        const token = req.cookies.refresh_token;
        if (!token) throw unAuthorization('You need a refresh token');
        checkRefreshToken(token, (err, decoded) => {
            if (err) throw unAuthorization('Invalid Token');
            req.payload = decoded;
            next();
        });
    } catch (error) {
        next(error);
    }
};

const checkAuth = async (req, res, next) => {
    try {
        const payload = req.payload;
        await checkPayload(payload);
        if (!req.params.id) req.params['id'] = payload.id;
        next();
    } catch (error) {
        next(error);
    }
};

const checkRole = (roles) => async (req, res, next) => {
    try {
        const payload = req.payload;
        if (![].concat(roles).includes(payload.role.name)) throw forbidden();
        next();
    } catch (error) {
        next(error);
    }
}

module.exports = {
    checkRefreshT,
    checkToken,
    checkAuth,
    checkRole
};