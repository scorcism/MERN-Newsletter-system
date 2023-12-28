const express = require('express');
const { health, getListMember } = require('../../controllers/contact.controller');
const verifyUser = require('../../middlewares/auth.middleware');

const router = express.Router();

router.get('/health', health);
router.get('/getListMembers', verifyUser, getListMember);

module.exports = router;
