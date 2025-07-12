const express = require('express');
const router = express.Router();
const badgeController = require('../controller/badgeController');
const auth = require('../middleware/auth');

router.post('/', auth, badgeController.createBadge);
router.get('/', auth, badgeController.getAllBadges);
router.put('/:id', auth, badgeController.updateBadge);
router.delete('/:id', auth, badgeController.deleteBadge);

module.exports = router; 