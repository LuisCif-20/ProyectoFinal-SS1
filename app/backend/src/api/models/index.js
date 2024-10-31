const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/dbConnection");
const Role = require("./role")(sequelize, DataTypes);
const User = require("./user")(sequelize, DataTypes);
const Currency = require("./currency")(sequelize, DataTypes);
const AccountType = require("./accountType")(sequelize, DataTypes);
const Account = require("./account")(sequelize, DataTypes);
const Transaction = require("./transaction")(sequelize, DataTypes);
const ExchangeRate = require("./exchangeRate")(sequelize, DataTypes);
const ClosedAccount = require("./closedAccount")(sequelize, DataTypes);
const Config = require("./config")(sequelize, DataTypes);

const models = { Role, User, Currency, AccountType, Account, Transaction, ExchangeRate, ClosedAccount, Config };

Object.values(models).forEach(model => {
    if (model.associate) {
        model.associate(models);
    }
});

models['sequelize'] = sequelize;

module.exports = models;