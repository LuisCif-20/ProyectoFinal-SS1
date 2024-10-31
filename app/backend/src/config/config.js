require('dotenv').config();

const CONFIG = {
    app: {
        APP_PORT: process.env.APP_PORT,
        BASE_URL: process.env.BASE_URL
    },
    db: {
        DB_PORT: process.env.DB_PORT,
        DB_HOST: process.env.DB_HOST,
        DB_NAME: process.env.DB_NAME,
        DB_USER: process.env.DB_USER,
        DB_PSWD: process.env.DB_PSWD,
        DB_DIAL: process.env.DB_DIAL
    },
    jwt: {
        JWT_ACCESS: process.env.JWT_ACCESS,
        JWT_REFRESH: process.env.JWT_REFRESH,
        JWT_LINK: process.env.JWT_LINK
    },
    mail: {
        MAIL_SERVICE: process.env.MAIL_SERVICE,
        BANK_MAIL: process.env.BANK_MAIL,
        MAIL_PSWD: process.env.MAIL_PSWD
    },
    crypto: {
        KEY: process.env.KEY,
        IV: process.env.IV
    }
};

module.exports = CONFIG;