const express = require('express');
const router = express.Router();
const postController = require('../controller/postController');
const auth = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Forum post management
 */

/**
 * @swagger
 * /threads/{threadId}/posts:
 *   post:
 *     summary: Create a new post in a thread
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: threadId
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
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Post created
 *       400:
 *         description: Bad request
 */
router.post('/threads/:threadId/posts', auth, postController.createPost);

/**
 * @swagger
 * /threads/{threadId}/posts:
 *   get:
 *     summary: Get all posts in a thread
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: threadId
 *         schema:
 *           type: string
 *         required: true
 *         description: Thread ID
 *     responses:
 *       200:
 *         description: List of posts
 */
router.get('/threads/:threadId/posts', auth, postController.getPostsByThread);

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Get a post by ID
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Post ID
 *     responses:
 *       200:
 *         description: Post found
 *       404:
 *         description: Post not found
 */
router.get('/posts/:id', auth, postController.getPostById);

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Update a post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Post ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post updated
 *       404:
 *         description: Post not found
 */
router.put('/posts/:id', auth, postController.updatePost);

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Delete a post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Post ID
 *     responses:
 *       200:
 *         description: Post deleted
 *       404:
 *         description: Post not found
 */
router.delete('/posts/:id', auth, postController.deletePost);

module.exports = router;
