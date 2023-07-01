const express = require("express");
const router = express.Router();
const db = require("../../dbconnection");
const { signupValidation, loginValidation } = require("./validation");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/loginAdmin", loginValidation, (req, res) => {
  db.query(
    `SELECT * FROM admin WHERE email = ? `,
    [req.body.email],
    (err, result) => {
      // user does not exists
      console.log(req.body.email);
      if (err) {
        return res.status(400).send({
          msg: err,
        });
      }
      console.log(!result.length);
      if (!result.length) {
        return res.status(401).send({
          msg: "Email or password is incorrect!",
        });
      }
      console.log(result);
      // check password

      // wrong password
      if (result[0]["password"] != req.body.password) {
        return res.status(401).send({
          msg: "Email or password is incorrect!!",
        });
      } else {
        const token = jwt.sign(
          { id: result[0].id },
          "the-super-strong-secrect",
          { expiresIn: "1h" }
        );
        db.query(
          `UPDATE admin SET date_login = now() WHERE id = '${result[0].id}'`
        );
        return res.status(200).send({
          msg: "Logged in!",
          user: result[0],
        });
      }
    }
  );
});

module.exports = router;
