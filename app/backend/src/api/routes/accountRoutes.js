const { Router } = require("express");
const { getAccountData, getAccountDataByNumber, getAccountsByUser, postAccount, postChangeAccount, postSwitchPreviousAccount, getClosedAccounts, getFrozenAccounts, patchAccount, deleteAccount, doCloseAccount, getAccountTypes, getExchangeRates, getUser, patchExchangeRate, getAllAccounts } = require("../controllers/accountController");
const { checkToken, checkAuth, checkRole } = require("../middlewares/auth");


const router = Router();

router.get('/exr', getExchangeRates);
router.get('/user', checkToken, checkAuth, getAccountsByUser);
router.get('/id/:id', checkToken, checkAuth, getAccountsByUser);
router.post('/userA', checkToken, checkAuth, getUser);
router.get('/data/:id', checkToken, checkAuth, getAccountData);
router.post('/closed', checkToken, checkAuth, checkRole(['ADMIN']), getClosedAccounts);
router.get('/frozen', checkToken, checkAuth, checkRole(['ADMIN']), getFrozenAccounts);
router.get('/all', checkToken, checkAuth, checkRole(['ADMIN']), getAllAccounts);
router.get('/dataN/:account_number', checkToken, checkAuth, checkRole(['ADMIN']), getAccountDataByNumber);
router.get('/', getAccountTypes);
router.post('/close', checkToken, checkAuth, checkRole(['ADMIN']), doCloseAccount);
router.post('/change', checkToken, checkAuth, checkRole(['ADMIN']), postChangeAccount);
router.post('/switch', checkToken, checkAuth, checkRole(['ADMIN']), postSwitchPreviousAccount);
router.post('/', checkToken, checkAuth, checkRole(['ADMIN']), postAccount);
router.patch('/pA/:id', checkToken, checkAuth, checkRole(['ADMIN']), patchAccount);
router.patch('/er', checkToken, checkAuth, checkRole(['ADMIN']), patchExchangeRate);
router.delete('/:id', checkToken, checkAuth, checkRole(['ADMIN']), deleteAccount);

module.exports = router;