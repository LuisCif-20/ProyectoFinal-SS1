const { Op, fn, col } = require("sequelize");
const { Transaction, Account, AccountType, Currency, ExchangeRate, sequelize } = require("../models");
const { badRequest, notFound } = require("../utils/customErrors");

const returnAccountFounds = async ({ account_id, amount }) => {
    const account = await Account.findByPk(account_id, {
        include: {
            model: AccountType,
            as: 'account_type',
            include: {
                model: Currency,
                as: 'currency'
            }
        }
    });
    if (!account) throw notFound('account');
    if (account.state === 'closed') throw badRequest('Account not available');
    const exchangeRate = await ExchangeRate.findOne({
        where: {
            currency_id: account.account_type.currency.id
        }
    });
    const final_amount = amount / exchangeRate.rate;
    return [account, final_amount];
};

const setActiveAccountState = async (account) => {
    const count = await Transaction.count({
        where: {
            account_id: account.id
        }
    });
    if (count >= 1 && account.state !== 'active') await account.update({
        state: 'active'
    });
};

const findTransactionsByAccount = async (id) => {
    const account = await Account.findOne({
        where: { id },
        include: {
            model: this.transaction,
            as: 'transactions'
        }
    });
    if (!account) throw notFound('account');
    const transactions = account.transactions;
    return transactions;
};

const makeDebitTransaction = async (data) => {
    const [account, amount] = await returnAccountFounds(data);
    if (Number(account.funds) < Number(amount)) throw badRequest('Insufficient funds.');
    const funds = Number(account.funds) - Number(amount);
    data['type'] = 'debit';
    data.amount = amount;
    const t = await sequelize.transaction();
    try {
        await Transaction.create(data);
        await setActiveAccountState(account);
        await account.update({
            funds: funds
        });
        t.commit();
    } catch (error) {
        t.rollback();
        throw error;
    }
};

const makeCreditTrasanction = async (data) => {
    const [account, amount] = await returnAccountFounds(data);
    const funds = Number(account.funds) + Number(amount);
    data['type'] = 'credit';
    data.amount = amount;
    const t = await sequelize.transaction();
    try {
        await Transaction.create(data);
        await setActiveAccountState(account);
        await account.update({
            funds: funds
        });
        t.commit();
    } catch (error) {
        t.rollback();
        throw error;
    }
};

const findTransactionsByAccountAndDate = async ({ account_id, start_date, end_date }) => {
    start_date = new Date(start_date);
    end_date = new Date(end_date);
    const transactions = await Transaction.findAll({
        where: {
            account_id,
            createdAt: {
                [Op.between]: [start_date, end_date]
            },
        },
        include: {
            model: Account,
            as: 'account',
            include: {
                model: AccountType,
                as: 'account_type',
                include: {
                    model: Currency,
                    as: 'currency'
                }
            }
        }
    });
    const totalByType = await Transaction.findAll({
        where: {
            account_id,
            createdAt: {
                [Op.between]: [start_date, end_date]
            }
        },
        attributes: [
            'type',
            [fn('SUM', col('amount')), 'total']
        ],
        group: ['type']
    });
    return { transactions, totalByType }
}

module.exports = {
    findTransactionsByAccountAndDate,
    findTransactionsByAccount,
    makeCreditTrasanction,
    makeDebitTransaction
};