const express = require('express');
const { health, createType, deleteType, getAudiences } = require('../../controllers/audienceType.controller');

const router = express.Router();

router.get('/health', health);

router.get('/get-types', getAudiences);
router.post('/create-type', createType);
router.post('/delete-type', deleteType);

module.exports = router;
