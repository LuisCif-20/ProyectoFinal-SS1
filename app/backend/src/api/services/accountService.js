const { Op } = require("sequelize");
const { Currency, AccountType, Account, User, ExchangeRate, ClosedAccount, sequelize } = require("../models");
const { badRequest, notFound } = require("../utils/customErrors");
// const { notFound, badRequest } = require("../utils/errorHandler");

const findAccountsByUser = async (user_id) => {
    const accounts = await Account.findAll({
        where: { user_id },
        include: {
            model: AccountType,
            as: 'account_type',
            include: {
                model: Currency,
                as: 'currency'
            }
        }
    });
    return accounts;
};

const findAccountData = async (id) => {
    const account = await Account.findByPk(id, {
        include: [
            {
                model: AccountType,
                as: 'account_type',
                include: {
                    model: Currency,
                    as: 'currency'
                }
            }, 
            {
                model: User,
                as: 'user'
            }
        ]
    });
    if (!account) throw notFound('account');
    return account;
};

const findAccountDataByNumber = async (account_number) => {
    const account = await Account.findOne({
        where: { account_number },
        include: [
            {
                model: AccountType,
                as: 'account_type',
                include: {
                    model: Currency,
                    as: 'currency'
                }
            }, 
            {
                model: User,
                as: 'user'
            }
        ]
    });
    if (!account) throw notFound('account');
    return account;
};

const findCloseAccounts = async (startDate, endDate) => {
    const accounts = await ClosedAccount.findAll({
        where: {
            createdAt: {
                [Op.between]: [startDate, endDate]
            }
        },
        include: {
            model: Account,
            as: 'account'
        }
    });
    return accounts;
};

const findFrozenAccounts = async () => {
    const accounts = await Account.findAll({
        where: {
            state: 'frozen'
        }
    });
    return accounts;
};

const returnAccountFunds = async (user_id) => {
    const currentAccount = await Account.findOne({
        where: {
            user_id,
            current_account: true
        },
        include: {
            model: AccountType,
            as: 'account_type'
        }
    });
    if (!currentAccount) throw notFound('account');
    if (currentAccount.state === 'closed') throw badRequest('Account not available');
    const accountType = await AccountType.findByPk(currentAccount.account_type.id, {
        include: {
            model: Currency,
            as: 'currency'
        }
    });
    const exchangeRate = await ExchangeRate.findOne({
        where: {
            currency_id: accountType.currency.id
        }
    });
    const funds = currentAccount.funds * exchangeRate.rate;
    return [currentAccount, funds];
};

const createAccount = async (data) => {
    const accountTypeId = data.account_type_id;
    const accountType = await AccountType.findByPk(accountTypeId, {
        include: {
            model: Currency,
            as: 'currency'
        }
    });
    const currency_id = accountType.currency.id;
    const exchangeRate = await ExchangeRate.findOne({
        where: { currency_id }
    });
    if ((data.funds / exchangeRate.rate) < accountType.opening_amount) throw badRequest('Insufficient funds');
    const user = await User.findByPk(data.user_id);
    data.funds = (data.funds / exchangeRate.rate);
    data['account_address'] = `${user.user_name}.${accountType.name}@BANKCUNOC.com`;
    await Account.create(data);
};

const changeAccount = async (data) => {
    const [currentAccount, funds] = await returnAccountFunds(data.user_id);
    data['funds'] = funds;
    const t = await sequelize.transaction();
    try {
        await createAccount(data);
        await currentAccount.update({
            funds: 0,
            state: 'frozen',
            current_account: false
        });
        t.commit();
    } catch (error) {
        t.rollback();
        throw error; 
    }
};

const switchPreviousAccount = async ({ user_id, account_id }) => {
    const previousAccount = await Account.findByPk(account_id);
    if (!previousAccount) throw notFound('account');
    const [currentAccount, funds] = await returnAccountFunds(user_id);
    if (account_id === currentAccount.id) throw badRequest('This is not possible.');
    const t = await sequelize.transaction();
    try {
        await previousAccount.update({
            funds,
            state: 'frozen',
            current_account: true
        });
        await currentAccount.update({
            funds: 0,
            state: 'frozen',
            current_account: false
        });
        t.commit();   
    } catch (error) {
        t.rollback();
        throw error;
    }
};

const closeAccount = async (data) => {
    const t = await sequelize.transaction();
    try {
        const [affectedRows] = await Account.update({
            state: 'close'
        }, {
             where: {
                id: data.account_id
            }
        });
        if (affectedRows === 0) throw notFound('account');
        await ClosedAccount.create(data);
        t.commit(); 
    } catch (error) {
        t.rollback();
        throw error;
    }
};

const updateAccount = async (id, data) => {
    const [affectedRows] = await Account.update(data, {
        where: { id }
    });
    if (affectedRows === 0) throw notFound('account');
};

const dropAccount = async (id) => {
    const deleted = await Account.destroy({
        where: { id }
    });
    if (deleted === 0) throw notFound('account');
};

const findAccountTypes = async() => {
    const accountTypes = await AccountType.findAll({
        include: {
            model: Currency,
            as: 'currency'
        }
    });
    return accountTypes;
};

const findExchangeRates = async() => {
    const exchangeRates = await ExchangeRate.findAll({
        include: {
            model: Currency,
            as: 'currency',
            where: {
                name: {
                    [Op.ne]: 'GTQ'
                }
            }
        }
    });
    return exchangeRates;
};

module.exports = {
    findAccountDataByNumber,
    switchPreviousAccount,
    findAccountsByUser,
    findFrozenAccounts,
    findCloseAccounts,
    findAccountData,
    createAccount,
    changeAccount,
    updateAccount,
    closeAccount,
    dropAccount,
    findAccountTypes,
    findExchangeRates
};