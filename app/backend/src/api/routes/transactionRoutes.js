const { Router } = require("express");
const { getTransactionsByAccount, postDebitTransaction, postCreditTransaction, postTransactionsByAccountAndDate } = require("../controllers/transactionController");
const { checkToken, checkAuth } = require("../middlewares/auth");
const { checkLinkAuth } = require("../middlewares/linkAuth");

const router = Router();

router.get('/account/:id', checkToken, checkAuth, getTransactionsByAccount);
router.post('/tbud', checkToken, checkAuth, postTransactionsByAccountAndDate);
router.post('/debit', checkToken, checkAuth, postDebitTransaction);
router.post('/credit', checkToken, checkAuth, postCreditTransaction);

router.post('/debit-link', checkLinkAuth, postDebitTransaction);
router.post('/credit-link', checkLinkAuth, postCreditTransaction);

module.exports = router;