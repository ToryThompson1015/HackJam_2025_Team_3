const express = require('express');
const router = express.Router();
const dashboardController = require('../controller/dashboardController');
const auth = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: User dashboard summary and aggregation endpoints
 */

/**
 * @swagger
 * /api/dashboard/summary:
 *   get:
 *     summary: Get dashboard summary for the logged-in user
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard summary including achievements, engagements, points, and badges
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 achievements:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Achievement'
 *                 engagements:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Engagement'
 *                 points:
 *                   $ref: '#/components/schemas/Point'
 *                 badges:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/UserBadge'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get('/summary', auth, dashboardController.getDashboardSummary);

module.exports = router;
