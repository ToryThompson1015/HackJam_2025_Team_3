const express = require('express');
const router = express.Router();
const engagementController = require('../controller/engagementController');
const auth = require('../middleware/auth');

router.post('/', auth, engagementController.createEngagement);
router.get('/', auth, engagementController.getEngagementsByUser);
router.put('/:id', auth, engagementController.updateEngagement);
router.delete('/:id', auth, engagementController.deleteEngagement);

module.exports = router; 