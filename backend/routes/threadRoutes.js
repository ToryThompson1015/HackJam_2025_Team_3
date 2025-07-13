const express = require('express');
const router = express.Router();
const threadController = require('../controller/threadController');
const auth = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Threads
 *   description: Forum thread management
 */

/**
 * @swagger
 * /threads:
 *   post:
 *     summary: Create a new thread
 *     tags: [Threads]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Thread created
 *       400:
 *         description: Bad request
 */
router.post('/', auth, threadController.createThread);

/**
 * @swagger
 * /threads:
 *   get:
 *     summary: Get all threads
 *     tags: [Threads]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of threads
 */
router.get('/', auth, threadController.getThreads);

/**
 * @swagger
 * /threads/{id}:
 *   get:
 *     summary: Get a thread by ID
 *     tags: [Threads]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Thread ID
 *     responses:
 *       200:
 *         description: Thread found
 *       404:
 *         description: Thread not found
 */
router.get('/:id', auth, threadController.getThreadById);

/**
 * @swagger
 * /threads/{id}:
 *   put:
 *     summary: Update a thread
 *     tags: [Threads]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Thread ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Thread updated
 *       404:
 *         description: Thread not found
 */
router.put('/:id', auth, threadController.updateThread);

/**
 * @swagger
 * /threads/{id}:
 *   delete:
 *     summary: Delete a thread
 *     tags: [Threads]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Thread ID
 *     responses:
 *       200:
 *         description: Thread deleted
 *       404:
 *         description: Thread not found
 */
router.delete('/:id', auth, threadController.deleteThread);

module.exports = router;
