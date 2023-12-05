const express = require('express');
const {
    health,
    login,
    register,
    emailVerify,
    forgotPassword,
    resetPassword,
} = require('../../controllers/auth.controller');
const {
    loginValidation,
    signUpValidation,
    forgotPasswordValidation,
} = require('../../../utility/helper/validationHelper/auth');

const router = express.Router();

router.get('/health', health);
router.post('/register', signUpValidation, register);
router.post('/login', loginValidation, login);
router.get('/mail-verify/:token', emailVerify);
router.post('/forgot-password', forgotPasswordValidation, forgotPassword);
router.post('/reset-password/:token', resetPassword);

module.exports = router;
