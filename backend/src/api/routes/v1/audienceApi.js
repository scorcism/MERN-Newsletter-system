const express = require('express');
const { health, createApi, joinAudience } = require('../../controllers/audienceApi.controller');
const verifyUser = require('../../middlewares/auth.middleware');

const router = express.Router();

router.get('/health', health);
router.post('/create', verifyUser, createApi);
router.post('/join', joinAudience);
module.exports = router;
