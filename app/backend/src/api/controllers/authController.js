const { onLogin, rememberPin, accountLink, refreshToken } = require("../services/authService");
const { resOk } = require("../utils/resHandler");

const login = async ({ body }, res, next) => {
    try {
        const { refresh_token, ...rest } = await onLogin(body);
        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            sameSite: 'Strict',
            maxAge: 30 * 60 * 1000,
        }); 
        resOk(res, rest);
    } catch (error) {
        next(error);
    }
};

const logout = (req, res, next) => {
    try {
        res.clearCookie('refresh_token');
        resOk(res);
    } catch (error) {
        next(error);
    }
};

const rememberPinMail = async ({ body }, res, next) => {
    try {
        await rememberPin(body);
        resOk(res);
    } catch (error) {
        next(error);
    }
};

const createAccountLink = async ({ body }, res, next) => {
    try {
        const link_token = await accountLink(body);
        resOk(res, { link_token });
    } catch (error) {
        next(error);
    }
};

const refreshAccessToken = ({ payload }, res, next) => {
    try {
        const access_token = refreshToken(payload);
        resOk(res, { access_token });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    refreshAccessToken,
    createAccountLink,
    rememberPinMail,
    logout,
    login
};