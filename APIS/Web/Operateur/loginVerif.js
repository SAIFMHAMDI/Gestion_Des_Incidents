const express = require("express");
const router = express.Router();
const db = require("../../dbconnection");
const { loginValidation } = require("./validation");

router.post("/loginverif", loginValidation, (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const disabled = req.body.disabled;
  db.query(
    `SELECT id,email, password, role FROM operateur WHERE email = ?  AND disabled = 0 LIMIT 1; `,
    [email, password, disabled],
    (err, result) => {
      
      console.log(req.body.email);
      if (err) {
        console.log(err);
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

     
      if (result[0]["password"].toLowerCase() != req.body.password.toLowerCase()) {
        return res.status(401).send({
          msg: "Email or password is incorrect!!",
        });
      } else {
        return res.status(200).send({
          msg: "Logged in!",
          user: result,
        });
      }
    }
  );
});
module.exports = router;
