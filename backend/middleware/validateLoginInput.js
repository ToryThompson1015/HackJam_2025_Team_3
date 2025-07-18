// validator
const { check, validationResult } = require("express-validator");

const validateLoginInput = [
  check("email", "email is required").not().isEmpty(),
  check("password", "Password is required").not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateLoginInput;
