const express = require("express");
const router = express.Router();
const { register, login, logout } = require("../controller/authController");
// Example controller functions (replace with your actual logic)
const validateLoginInput = require("../middleware/validateLoginInput");
const validateRegisterInput = require("../middleware/validateRegisterInput");

// Basic GET route for testing
/**
 * @swagger
 * /auth/test:
 *   get:
 *     summary: Test the auth route
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Auth route is working
 */
router.get("/test", (req, res) => {
  res.send("Auth route is working");
});
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: secret123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 userId:
 *                   type: string
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
router.route("/login").post(validateLoginInput, login);
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - email
 *               - password
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: secret123
 *               location:
 *                 type: string
 *                 example: New York
 *               role:
 *                 type: string
 *                 example: user
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 userId:
 *                   type: string
 *                 token:
 *                    type: string
 *       400:
 *         description: User already exists
 *       500:
 *         description: Server error
 */
router.route("/register").post(validateRegisterInput, register);
/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout a user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logged out successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.route("/logout").post(logout);

module.exports = router;
