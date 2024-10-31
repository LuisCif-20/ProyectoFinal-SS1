const { findTransactionsByAccount, makeCreditTrasanction, makeDebitTransaction, findTransactionsByAccountAndDate } = require("../services/transactionService");

const { resCreated, resOk } = require("../utils/resHandler");

const getTransactionsByAccount = async ({ params }, res, next) => {
    try {
        const transactions = await findTransactionsByAccount(params.id);
        resOk(res, { transactions });
    } catch (error) {
        next(error);
    }
};

const postTransactionsByAccountAndDate = async ({ body }, res, next) => {
    try {
        const result = await findTransactionsByAccountAndDate(body);
        resOk(res, result);
    } catch (error) {
        next(error);
    }
};

const postDebitTransaction = async ({ body }, res, next) => {
    try {
        await makeDebitTransaction(body);
        resCreated(res);
    } catch (error) {
        next(error);
    }
};

const postCreditTransaction = async ({ body }, res, next) => {
    try {
        await makeCreditTrasanction(body);
        resCreated(res);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getTransactionsByAccount,
    postTransactionsByAccountAndDate,
    postCreditTransaction,
    postDebitTransaction
};