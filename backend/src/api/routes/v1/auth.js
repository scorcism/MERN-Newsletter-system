const express = require('express');
const { health, login, register } = require('../../controllers/auth.controller');
const { loginValidation } = require('../../../utility/helper/validationHelper/auth');

const router = express.Router();

router.get('/health', health);
router.post('/login', loginValidation, login);
router.post('/register', register);

module.exports = router;
