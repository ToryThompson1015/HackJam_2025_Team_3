const { check, validationResult } = require("express-validator");

const validateRegisterInput = [
  check("name", "Username is required").not().isEmpty(),
  check("password", "Password is required").isLength({ min: 6 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateRegisterInput;
