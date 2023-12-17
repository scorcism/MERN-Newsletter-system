const express = require('express');
const verifyUser = require('../../middlewares/auth.middleware');
const { health, sendNewsletters } = require('../../controllers/utility.controller');

const router = express.Router();

router.get('/health', health);
router.post('/send-mail',verifyUser, sendNewsletters);

module.exports = router;
