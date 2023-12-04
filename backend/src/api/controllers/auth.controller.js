const { validationResult } = require('express-validator');
const { loginUser } = require('../services/auth.service');
const { ERROR_MESSAGE } = require('../../config/constants');
const { ERROR_RESPONSE } = require('../../utility/helper');

const health = (req, res) => {
    res.send('Auth controller health');
};

const login = async (req, res) => {
    // Validate body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(ERROR_RESPONSE(ERROR_MESSAGE[8002], errors));
    }
    const response = await loginUser(req.body);
    console.log('response: ', response);
};

const register = (req, res) => {
    res.send('auth login');
};

module.exports = {
    health,
    login,
    register,
};
