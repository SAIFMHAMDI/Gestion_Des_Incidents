const express = require("express");
const router = express.Router();
const db = require("./dbConnection");
const bcrypt = require("bcryptjs");

router.post("/setMail/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.body;

    const results = await db.query(`SELECT email FROM techniciens WHERE id = ?`, [id, email]);
    console.log(results);

    res.json({
      result: true,
      result_code: 1,
      result_message: "Success"
    });
  } catch (error) {
    res.json({
      result: false,
      result_code: 0,
      result_message: "Email not found"
    });
  }
});


//The token code not yet done (matansouuch*********************************)


router.post("/resetPassword", (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    // Hash the new password
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
      } else {
        const query = `UPDATE techniciens SET password = '${hash}' WHERE email = '${email}' `;
        db.query(query, (error, results) => {
            console.log(results);
          if (error) {
            console.log(error);
            res.status(500).send("Internal Server Error");
          } else {
            res.send("Password reset successful");
          }
        });
      }
    });
  });
  
 


module.exports = router;