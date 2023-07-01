const { check } = require("express-validator");

exports.loginValidation = [
  check("email", "Please include a valid email")
    .isEmail()
    .normalizeEmail({ gmail_remove_dots: true }),
  check("password_tech", "Password must be 8 or more characters").isLength({
    min: 8,
  }), 
];
