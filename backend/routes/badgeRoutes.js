const express = require('express');
const router = express.Router();
const badgeController = require('../controller/badgeController');
const auth = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Badges
 *   description: Badge management
 */

/**
 * @swagger
 * /api/badges:
 *   post:
 *     summary: Create a new badge
 *     tags: [Badges]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               icon:
 *                 type: string
 *               criteria:
 *                 type: string
 *     responses:
 *       201:
 *         description: Badge created
 *       400:
 *         description: Bad request
 */
router.post('/', auth, badgeController.createBadge);

/**
 * @swagger
 * /api/badges:
 *   get:
 *     summary: Get all badges
 *     tags: [Badges]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of badges
 */
router.get('/', auth, badgeController.getAllBadges);

/**
 * @swagger
 * /api/badges/{id}:
 *   put:
 *     summary: Update a badge
 *     tags: [Badges]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Badge ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               icon:
 *                 type: string
 *               criteria:
 *                 type: string
 *     responses:
 *       200:
 *         description: Badge updated
 *       404:
 *         description: Badge not found
 */
router.put('/:id', auth, badgeController.updateBadge);

/**
 * @swagger
 * /api/badges/{id}:
 *   delete:
 *     summary: Delete a badge
 *     tags: [Badges]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Badge ID
 *     responses:
 *       200:
 *         description: Badge deleted
 *       404:
 *         description: Badge not found
 */
router.delete('/:id', auth, badgeController.deleteBadge);

module.exports = router; 