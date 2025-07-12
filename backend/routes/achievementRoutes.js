const express = require('express');
const router = express.Router();
const achievementController = require('../controller/achievementController');
const auth = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Achievements
 *   description: Achievement management
 */

/**
 * @swagger
 * /api/achievements:
 *   post:
 *     summary: Create a new achievement
 *     tags: [Achievements]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [interview, internship, job, certification]
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Achievement created
 *       400:
 *         description: Bad request
 */
router.post('/', auth, achievementController.createAchievement);

/**
 * @swagger
 * /api/achievements:
 *   get:
 *     summary: Get all achievements for the user
 *     tags: [Achievements]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of achievements
 */
router.get('/', auth, achievementController.getAchievementsByUser);

/**
 * @swagger
 * /api/achievements/{id}:
 *   put:
 *     summary: Update an achievement
 *     tags: [Achievements]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Achievement ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [interview, internship, job, certification]
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Achievement updated
 *       404:
 *         description: Achievement not found
 */
router.put('/:id', auth, achievementController.updateAchievement);

/**
 * @swagger
 * /api/achievements/{id}:
 *   delete:
 *     summary: Delete an achievement
 *     tags: [Achievements]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Achievement ID
 *     responses:
 *       200:
 *         description: Achievement deleted
 *       404:
 *         description: Achievement not found
 */
router.delete('/:id', auth, achievementController.deleteAchievement);

module.exports = router; 