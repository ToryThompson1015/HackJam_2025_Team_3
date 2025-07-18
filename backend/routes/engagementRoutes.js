const express = require('express');
const router = express.Router();
const engagementController = require('../controller/engagementController');
const auth = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Engagements
 *   description: Community engagement management
 */

/**
 * @swagger
 * /api/engagements:
 *   post:
 *     summary: Create a new engagement
 *     tags: [Engagements]
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
 *                 enum: [mentorship, peer_group, social_event]
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Engagement created
 *       400:
 *         description: Bad request
 */
router.post('/', auth, engagementController.createEngagement);

/**
 * @swagger
 * /api/engagements:
 *   get:
 *     summary: Get all engagements for the user
 *     tags: [Engagements]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of engagements
 */
router.get('/', auth, engagementController.getEngagementsByUser);

/**
 * @swagger
 * /api/engagements/{id}:
 *   put:
 *     summary: Update an engagement
 *     tags: [Engagements]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Engagement ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [mentorship, peer_group, social_event]
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Engagement updated
 *       404:
 *         description: Engagement not found
 */
router.put('/:id', auth, engagementController.updateEngagement);

/**
 * @swagger
 * /api/engagements/{id}:
 *   delete:
 *     summary: Delete an engagement
 *     tags: [Engagements]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Engagement ID
 *     responses:
 *       200:
 *         description: Engagement deleted
 *       404:
 *         description: Engagement not found
 */
router.delete('/:id', auth, engagementController.deleteEngagement);

module.exports = router; 