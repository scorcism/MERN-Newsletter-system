const express = require('express');
const {
    health,
    createType,
    deleteType,
    getTypes,
} = require('../../controllers/audienceType.controller');

const router = express.Router();

router.get('/health', health);

router.get('/types', getTypes);
router.post('/create-type', createType);
router.post('/delete-type', deleteType);

module.exports = router;
