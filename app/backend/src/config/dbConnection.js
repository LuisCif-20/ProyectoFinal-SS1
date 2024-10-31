const { Sequelize } = require("sequelize");

const CONFIG = require("./config");

const { DB_HOST, DB_PORT, DB_DIAL, DB_USER, DB_PSWD, DB_NAME } = CONFIG.db;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PSWD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: DB_DIAL,
    logging: false
});

const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('----- Successful connection to the DB -----')
    } catch (error) {
        console.error('----- Database connection failed -----', '\n', error);
    }
};

module.exports = { sequelize, testConnection };