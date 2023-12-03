const express = require('express');

const router = express.Router();

router.use('/audience', require('./v1/audience'));
router.use('/audienceType', require('./v1/audienceType'));
router.use('/contact', require('./v1/contact'));

module.exports = router;
