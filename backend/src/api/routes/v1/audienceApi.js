const express = require('express');
const {
    health,
    createApi,
    getAPis,
    joinAudience,
} = require('../../controllers/audienceApi.controller');

const router = express.Router();

router.get('/health', health);
router.post('/create', createApi);
router.get('/get', getAPis);
router.post('/join', joinAudience);
module.exports = router;
