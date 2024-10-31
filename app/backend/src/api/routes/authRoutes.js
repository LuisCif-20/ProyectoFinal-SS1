const { Router } = require("express");
const { login, createAccountLink, rememberPinMail, refreshAccessToken, logout } = require("../controllers/authController");
const { checkAuth, checkToken, checkRefreshT } = require("../middlewares/auth");

const router = Router();

router.post('/login', login);
router.post('/logout', logout);
router.post('/remember-pin', rememberPinMail);
router.post('/link-account', createAccountLink);
router.post('/refresh-token', checkRefreshT, checkAuth, refreshAccessToken);

module.exports = router;