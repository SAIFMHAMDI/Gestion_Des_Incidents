const express = require("express");
const router = express.Router();
const db = require("../dbconnection" );
const { signupValidation, loginValidation } = require("./validation");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/logintechnicien",  loginValidation, (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query(
    `SELECT * FROM techniciens WHERE email = ?  LIMIT 1; `,
    [email, password], 
    (err, result) => {
      
      if (err) {
        return res.status(200).send({
          msg: "An error accured please retry",
          msg_code:1
        });
      }

      if (!result.length) {
        return res.status(200).send({
          msg: "Account not found!",
          msg_code:2
        });
      }

      if (result[0]["password"] != req.body.password) {
        return res.status(200).send({
          msg: "Wrong password",
          msg_code:3
        });
      } else {
        return res.status(200).send({
          msg: "Success logged in!",
          user: result[0],
          msg_code:4
        });
      }
    }
  );
});

module.exports = router;
