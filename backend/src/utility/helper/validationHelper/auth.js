const { check } = require('express-validator');

const signUpValidation = [
    check('name', 'Name Required').exists(),
    check('email', 'Email Required').isEmail().normalizeEmail({ gmail_remove_dots: true }),
    check('password', 'Password length should be >6').isLength({ min: 6 }),
    check('cpassword', 'Confirm Password length should be >6').isLength({ min: 6 }),
];

const loginValidation = [
    check('email', 'Email Required').isEmail().normalizeEmail({ gmail_remove_dots: true }),
    check('password', 'Enter your password').isLength({ min: 1 }),
];

const forgotPasswordValidation = [
    check('email', 'Email required').isEmail().normalizeEmail({ gmail_remove_dots: true }),
];

module.exports = {
    signUpValidation,
    loginValidation,
    forgotPasswordValidation,
};
