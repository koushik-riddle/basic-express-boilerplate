/** ===========================
 * Dependencies
 ============================= */
const express = require('express');
const multer = require('multer');

const upload = multer();
// const { check } = require('express-validator');
const { login, registration } = require('../../controller/authController');
const avatarUpload = require('../../middleware/users/avatarUpload');
const { addUserValidators, addUserValidationHandler } = require('../../validation/userValidation');
const { doLoginValidators, doLoginValidationHandler } = require('../../validation/loginValidation');

const router = express.Router();

router.post('/login', upload.none(), doLoginValidators, doLoginValidationHandler, login);
router.post(
    '/registration',
    avatarUpload,
    addUserValidators,
    addUserValidationHandler,
    registration,
);

module.exports = router;
