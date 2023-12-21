const express = require('express');
const verifyUser = require('../middlewares/auth.middleware');
const router = express.Router();

router.use('/audience', verifyUser, require('./v1/audience'));
router.use('/audience-type', verifyUser, require('./v1/audienceType'));
router.use('/contact', require('./v1/contact'));
router.use('/audience-api', require('./v1/audienceApi'));

module.exports = router;
