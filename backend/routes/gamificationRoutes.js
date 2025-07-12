const express = require('express');
const router = express.Router();
const gamificationController = require('../controller/gamificationController');
const auth = require('../middleware/auth');

// Points
router.get('/points', auth, gamificationController.getUserPoints);
router.post('/points', auth, gamificationController.addPoints);

// Daily login bonus
router.post('/daily-login', auth, gamificationController.dailyLoginBonus);

// Badges
router.get('/badges', auth, gamificationController.getUserBadges);
router.post('/badges', auth, gamificationController.awardBadge);

// Tasks
router.get('/tasks', auth, gamificationController.getUserTasks);
router.post('/tasks/complete', auth, gamificationController.completeTask);

module.exports = router; 