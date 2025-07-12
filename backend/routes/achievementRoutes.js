const express = require('express');
const router = express.Router();
const achievementController = require('../controller/achievementController');
const auth = require('../middleware/auth');

router.post('/', auth, achievementController.createAchievement);
router.get('/', auth, achievementController.getAchievementsByUser);
router.put('/:id', auth, achievementController.updateAchievement);
router.delete('/:id', auth, achievementController.deleteAchievement);

module.exports = router; 