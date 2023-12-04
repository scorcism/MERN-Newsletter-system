const { validationResult } = require('express-validator');
const { ERROR_MESSAGE } = require('../../config/constants');
const httpStatus = require('http-status');
const { debugLog, ERROR_RESPONSE } = require('../../utility/helper');

const health = (req, res) => {
    res.send('Auth controller health');
};

const login = async (req, res) => {
    debugLog('Im here in login');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json(ERROR_RESPONSE(400, 8002, errors));
    }

    try {

        
    } catch (error) {
        debugLog('Login error: ', error);
        res.status(500).json(ERROR_RESPONSE(500, 8001));
    }
};

const register = (req, res) => {
    res.send('auth login');
};

module.exports = {
    health,
    login,
    register,
};
