const { sign, verify } = require('jsonwebtoken');
const CONFIG = require("../../config/config")

const { JWT_ACCESS, JWT_REFRESH, JWT_LINK } = CONFIG.jwt;

const generateAccessToken = (payload) => sign(payload, JWT_ACCESS, { expiresIn: '5m' });

const generateRefreshToken = (payload) => sign(payload, JWT_REFRESH, { expiresIn: '30m' }); 

const generateLinkToken = (payload) => sign(payload, JWT_LINK); 

const checkAccessToken = (token, options) => verify(token, JWT_ACCESS, options); 

const checkRefreshToken = (token, options) => verify(token, JWT_REFRESH, options); 

const checkLinkToken = (token, options) => verify(token, JWT_LINK, options);

module.exports = {
    generateRefreshToken,
    generateAccessToken,
    generateLinkToken,
    checkRefreshToken,
    checkAccessToken,
    checkLinkToken
};