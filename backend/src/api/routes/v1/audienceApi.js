const express = require('express');
const {
    health, createApi, getAPis,
} = require('../../controllers/audienceApi.controller');

const router = express.Router();

router.get('/health', health);
router.post('/create', createApi);
router.get('/get', getAPis);
module.exports = router;
