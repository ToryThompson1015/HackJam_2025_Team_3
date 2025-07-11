const express = require("express");
const router = express.Router();
const { register, login, logout } = require("../controller/authController");
const validateLoginInput = require("../middleware/validateLoginInput");
const validateRegisterInput = require("../middleware/validateRegisterInput");

// Basic GET route for testing
router.get("/test", (req, res) => {
  res.send("Auth route is working");
});
router.route("/login").post(validateLoginInput, login);
router.route("/register").post(validateRegisterInput, register);
router.route("/logout").post(logout);

module.exports = router;
