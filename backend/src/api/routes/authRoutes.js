const express = require('express');

const router = express.Router();

router.use('/', require('./v1/auth'));

module.exports = router;
