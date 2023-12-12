const express = require('express');
const { health, addListMember, getListMember } = require('../../controllers/contact.controller');
const verifyUser = require('../../middlewares/auth.middleware');

const router = express.Router();

router.get('/health', health);
router.post('/addListMember', addListMember);
// For admin to get all the contacts 
router.get('/getListMembers', verifyUser, getListMember);

module.exports = router;
