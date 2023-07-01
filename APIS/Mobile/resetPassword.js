const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const mysql = require('mysql');
const router = express.Router();
const db = require("../dbConnection"); 


router.post('/ResetPwd', (req, res) => {
  const { email } = req.body;
  
  // check if email exists in database
  const query = `SELECT * FROM techniciens WHERE email = '${email}'`;
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error finding Operator');
    } else if (results.length === 0) {
      res.status(404).send('Operator not found');
    } else {
      // generate verification code
      const code = Math.floor(Math.random() * 1000000);
      
      // save to database for later verification
      const insertQuery = `INSERT INTO verification (email, code) VALUES ('${email}', '${code}')`;
      db.query(insertQuery, (err, results) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error saving verification code');
        } else {
          // send verification code to user's email
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'mhamdisaif035@gmail.com',
              pass: 'jnqmksfoukulswqx'
            }
          });
          
          const mailOptions = {
            from: 'mhamdisaif035@gmail.com',
            to: email,
            subject: 'Password reset verification code',
            text: `Your verification code is: ${code}`
          };
          
          transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
              console.error(err);
              res.status(500).send('Error sending verification code');
            } else {
              res.status(200).send('Verification code sent');
            }
          });
        }
      });
    }
  });
});

// route for verifying verification code and updating password
router.post('/changepwd', (req, res) => {
  const { email, code, password, confirmPassword } = req.body;
  
  // check if verification code matches
  const query = `SELECT * FROM verification WHERE email = '${email}' AND code = '${code}'`;
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error finding verification code');
    } else if (results.length === 0) {
      res.status(401).send('Invalid verification code');

    } else {
      // update password in database
      const updateQuery = `UPDATE techniciens SET password = '${password}' WHERE email = '${email}'`;
      db.query(updateQuery, (err, results) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error updating password');
        } else {
          // delete verification code from database
          const deleteQuery = `DELETE FROM verification WHERE email = '${email}'`;
          db.query(deleteQuery, (err, results) => {
            if (err) {
              console.error(err);
            }else{
              res.json({
                result: true,
                result_code: 1,
              
              
                
              })
            }
          });
          
      
        }
      });
    }
  });
});

module.exports = router; 
