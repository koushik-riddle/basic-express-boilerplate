/** ===========================
 * Dependencies
 ============================= */
const express = require('express');

const { getAll, getUser, deleteUser } = require('../../controller/userController');
const { authGuard } = require('../../middleware/common/authGuard');

const router = express.Router();

router.get('/getAll', getAll);
router.get('/getUser/:id', getUser);
router.delete('/deleteUser/:id', authGuard, deleteUser);

module.exports = router;
