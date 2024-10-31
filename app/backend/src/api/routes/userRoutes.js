const { Router } = require("express");
const { getUsersByRole, getUserById, postClient, postAdmin, patchUser, deleteUser } = require("../controllers/userController");
const { checkToken, checkAuth, checkRole } = require("../middlewares/auth");

const router = Router();

router.get('/role/:role', checkToken, checkAuth, checkRole(['ADMIN']), getUsersByRole);
router.post('/client', checkToken, checkAuth, checkRole(['ADMIN']), postClient);
router.delete('/:id', checkToken, checkAuth, checkRole(['ADMIN']), deleteUser);
router.post('/admin', checkToken, checkAuth, checkRole(['ADMIN']), postAdmin);
router.patch('/:id', checkToken, checkAuth, checkRole(['ADMIN']), patchUser);
router.get('/', checkToken, checkAuth, getUserById);

module.exports = router;