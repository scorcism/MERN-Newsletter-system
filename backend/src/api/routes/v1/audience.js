const express = require('express');
const {
    health,
    createAudience,
    deleteAudience,
    updateAudience,
    getAudiences,
} = require('../../controllers/audience.controller');

const router = express.Router();

router.get('/health', health);
router.post('/create-audience', createAudience);
router.post('/delete-audience', deleteAudience);
router.post('/update-audience', updateAudience);
router.get('/audiences', getAudiences);

module.exports = router;
