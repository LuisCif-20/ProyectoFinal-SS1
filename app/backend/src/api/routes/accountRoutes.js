const { Router } = require("express");
const { getAccountData, getAccountDataByNumber, getAccountsByUser, postAccount, postChangeAccount, postSwitchPreviousAccount, getClosedAccounts, getFrozenAccounts, patchAccount, deleteAccount, doCloseAccount, getAccountTypes, getExchangeRates } = require("../controllers/accountController");
const { checkToken, checkAuth, checkRole } = require("../middlewares/auth");


const router = Router();

router.get('/exr', getExchangeRates);
router.get('/', getAccountTypes);
router.get('/user', checkToken, checkAuth, getAccountsByUser);
router.get('/data/:id', checkToken, checkAuth, getAccountData);
router.get('/closed', checkToken, checkAuth, checkRole(['ADMIN']), getClosedAccounts);
router.get('/frozen', checkToken, checkAuth, checkRole(['ADMIN']), getFrozenAccounts);
router.get('/data/:account_numer', checkToken, checkAuth, checkRole(['ADMIN']), getAccountDataByNumber);
router.post('/', checkToken, checkAuth, checkRole(['ADMIN']), postAccount);
router.post('/close', checkToken, checkAuth, checkRole(['ADMIN']), doCloseAccount);
router.post('/change', checkToken, checkAuth, checkRole(['ADMIN']), postChangeAccount);
router.post('/switch', checkToken, checkAuth, checkRole(['ADMIN']), postSwitchPreviousAccount);
router.patch('/:id', checkAuth, checkAuth, checkRole(['ADMIN']), patchAccount);
router.delete('/:id', checkToken, checkAuth, checkRole(['ADMIN']), deleteAccount);

module.exports = router;