const { findAccountsByUser, findAccountData, findAccountDataByNumber, findCloseAccounts, findFrozenAccounts, createAccount, changeAccount, switchPreviousAccount, closeAccount, dropAccount, updateAccount, findAccountTypes, findExchangeRates } = require("../services/accountService");

const { resCreated, resOk } = require("../utils/resHandler");

const getAccountTypes = async (req, res, next) => {
    try {
        const account_types = await findAccountTypes();
        resOk(res, { account_types });
    } catch (error) {
        next(error);
    }
};

const getExchangeRates = async (req, res, next) => {
    try {
        const exchange_rates = await findExchangeRates();
        resOk(res, { exchange_rates });
    } catch (error) {
        next(error);
    }
};

const getAccountsByUser = async ({ params }, res, next) => {
    try {
        const accounts = await findAccountsByUser(params.id);
        resOk(res, { accounts });
    } catch (error) {
        next(error);
    }
};

const getAccountData = async ({ params }, res , next) => {
    try {
        const account = await findAccountData(params.id);
        resOk(res, { account });
    } catch (error) {
        next(error);
    }
};

const getAccountDataByNumber = async ({ params }, res, next) => {
    try {
        const account = await findAccountDataByNumber(params.account_number);
        resOk(res, { account });      
    } catch (error) {
        next(error);
    }
};

const getClosedAccounts = async ({ body }, res, next) => {
    try {
        const accounts = await findCloseAccounts(body);
        resOk(res, { accounts });
    } catch (error) {
        next(error);
    }
};

const getFrozenAccounts = async (req, res, next) => {
    try {
        const accounts = await findFrozenAccounts();
        resOk(res, { accounts });
    } catch (error) {
        next(error);
    }
};

const postAccount = async ({ body }, res, next) => {
    try {
        await createAccount(body);
        resCreated(res);
    } catch (error) {
        next(error);
    }
};

const postChangeAccount = async ({ body }, res, next) => {
    try {
        await changeAccount(body);
        resCreated(res);
    } catch (error) {
        next(error);
    }
};

const postSwitchPreviousAccount = async ({ body }, res, next) => {
    try {
        await switchPreviousAccount(body);
        resOk(res);
    } catch (error) {
        next(error);
    }
};

const doCloseAccount = async ({ body }, res, next) => {
    try {
        await closeAccount(body);
        resCreated(res);
    } catch (error) {
        next(error);
    }
};

const patchAccount = async ({ params, body }, res, next) => {
    try {
        await updateAccount(params.id, body);
        resOk(res);    
    } catch (error) {
        next(error);
    }
};

const deleteAccount = async ({ params }, res, next) => {
    try {
        await dropAccount(params.id);
        resOk(res);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    postSwitchPreviousAccount,
    getAccountDataByNumber,
    getAccountsByUser,
    getClosedAccounts,
    getFrozenAccounts,
    postChangeAccount,
    doCloseAccount,
    getAccountData,
    deleteAccount,
    patchAccount,
    postAccount,
    getAccountTypes,
    getExchangeRates
};