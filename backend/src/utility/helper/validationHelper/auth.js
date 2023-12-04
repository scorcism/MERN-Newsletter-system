const { check } = require('express-validator');

const loginValidation = [
    check('email', 'Email Required').isEmail().normalizeEmail({ gmail_remove_dots: true }),
    check('password', 'Password length should be >6').isLength({ min: 6 }),
];

module.exports = {
    loginValidation,
};
