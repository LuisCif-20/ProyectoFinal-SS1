const { Role, User, Account } = require('../models');

const { sendRememberPinMail } = require('./mailService');
const { decrypt, verify } = require('../utils/crypto');
const { notFound, unAuthorization } = require('../utils/customErrors');
const { generateAccessToken, generateRefreshToken, generateLinkToken } = require('../utils/jwt');

const checkPayload = async ({ id, role }) => {
    const user = await User.findByPk(id);
    if (!user) throw notFound('user');
    if (role.id !== user.role_id) throw unAuthorization('Invalid role');
};

const onLogin = async ({ email, pin }) => {
    const user = await User.findOne({
        where: { email },
        include: {
            model: Role, 
            as: 'role' 
        }
    });
    if (!user) throw notFound('user');
    if (!verify(pin, user.pin)) throw unAuthorization('Incorrect pin.');
    const payload = { id: user.id, role: user.role };
    const refresh_token = generateRefreshToken(payload);
    const access_token = generateAccessToken(payload);
    return { refresh_token, access_token };
};

const rememberPin = async ({ email }) => {
    const user = await User.findOne({
        where: { email }
    });
    if (!user) throw notFound('user');
    const pin = decrypt(user.pin);
    await sendRememberPinMail(email, user.user_name, pin);
};

const accountLink = async ({ email, pin }) => {
    const user = await User.findOne({
        where: { email },
        include: [
            {
                model: Role,
                as: 'role',
            }, 
            {
                model: Account,
                as: 'accounts',
                where: {
                    current_account: true
                }
            }
        ]
    });
    if (!user) throw notFound('user');
    if (!verify(pin, user.pin)) throw unAuthorization('Incorrect pin.');
    const payload = { account_id: user.accounts[0].id };
    const link_token = generateLinkToken(payload);
    return link_token;
};

const refreshToken = ({ id, role }) => {
    const access_token = generateAccessToken({ id, role });
    return access_token;
};

module.exports = {
    checkPayload,
    refreshToken,
    rememberPin,
    accountLink,
    onLogin,
}; 