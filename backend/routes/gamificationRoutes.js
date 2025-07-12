const express = require('express');
const router = express.Router();
const gamificationController = require('../controller/gamificationController');
const auth = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Gamification
 *   description: Gamification features (points, badges, tasks, daily login)
 */

/**
 * @swagger
 * /api/gamification/points:
 *   get:
 *     summary: Get user points
 *     tags: [Gamification]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User points
 */
router.get('/points', auth, gamificationController.getUserPoints);

/**
 * @swagger
 * /api/gamification/points:
 *   post:
 *     summary: Add points to user
 *     tags: [Gamification]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Updated points object
 */
router.post('/points', auth, gamificationController.addPoints);

/**
 * @swagger
 * /api/gamification/daily-login:
 *   post:
 *     summary: Claim daily login bonus
 *     tags: [Gamification]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Daily login bonus awarded
 *       400:
 *         description: Already claimed today
 */
router.post('/daily-login', auth, gamificationController.dailyLoginBonus);

/**
 * @swagger
 * /api/gamification/badges:
 *   get:
 *     summary: Get user badges
 *     tags: [Gamification]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user badges
 */
router.get('/badges', auth, gamificationController.getUserBadges);

/**
 * @swagger
 * /api/gamification/badges:
 *   post:
 *     summary: Award a badge to user
 *     tags: [Gamification]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               badgeId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Badge awarded
 *       400:
 *         description: Badge already awarded or not found
 */
router.post('/badges', auth, gamificationController.awardBadge);

/**
 * @swagger
 * /api/gamification/tasks:
 *   get:
 *     summary: Get user tasks
 *     tags: [Gamification]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user tasks
 */
router.get('/tasks', auth, gamificationController.getUserTasks);

/**
 * @swagger
 * /api/gamification/tasks/complete:
 *   post:
 *     summary: Complete a user task
 *     tags: [Gamification]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userTaskId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Task completed and points awarded
 *       400:
 *         description: Task already completed or not found
 */
router.post('/tasks/complete', auth, gamificationController.completeTask);

module.exports = router; 