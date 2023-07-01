const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const router = express.Router();
const db = require("../dbconnection");

router.post("/envoie_message/:id_technicien/:id_admin", (req, res) => {
  const {content } = req.body;
  const { id_technicien,id_admin } = req.params;


  db.query(
    'SELECT id FROM discussion WHERE id_technicien = ? AND id_admin = ?',
    [id_technicien, id_admin],
    (err, rows) => {
      if (err) {
        res.json({
          result: false,
          result_code: 0,
          result_message: "ERROR !!",
        });
      }

      let discussionId;

      if (rows.length > 0) {
        // Discussion exists, get the discussion ID
        discussionId = rows[0].id;
      } else {
        // Discussion does not exist, insert a new discussion row
        db.query(
          'INSERT INTO discussion (id_technicien, id_admin, date_discussion) VALUES (?, ?, CURRENT_TIMESTAMP)',
          [id_technicien, id_admin],
          (err, result) => {
            if (err) {
              res.json({
                result: false,
                result_code: 0,
                result_message: "ERROR !!",
              });
            }

            discussionId = result.insertId;
          }
        );
      }

      // Insert the message row
      db.query(
        'INSERT INTO message (id_technicien, id_admin, id_discussion, content, date_envoie) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)',
        [id_technicien, id_admin, discussionId, content],
        (err, messageResult) => {
          if (err) {
            res.json({
              result: false,
              result_code: 0,
              result_message: "ERROR !!",
            });
          }

          db.query(
            `SELECT m.*, IF(m.id_admin != 0, a.id, t.id) AS user_id,
              IF(m.id_admin != 0, CONCAT(a.nom, ' ', a.prénom), CONCAT(t.nom, ' ', t.prenom)) AS user_name,
              IF(m.id_admin != 0, 'admin', 'technicien') AS user_type
            FROM message AS m
            JOIN discussion AS d ON m.id_discussion = d.id
            LEFT JOIN admin AS a ON m.id_admin = a.id
            LEFT JOIN techniciens AS t ON m.id_technicien = t.id
            WHERE d.id_technicien = ? AND d.id_admin = ?
            ORDER BY m.id DESC
            LIMIT 1`,
            [id_technicien, id_admin],
            (err, lastRowResult) => {
              if (err) {
                res.json({
                  result: false,
                  result_code: 0,
                  result_message: "ERROR !!",
                });
              }

              res.json({
                result: true,
                result_code: 1,
                message:lastRowResult[0],
                result_message: "Message Envoyé !!",
               
             });

            }
          );
        }
      );
    }
  );
}); 



router.get("/messages/:id", (req, res) => {
  const{id} =req.params

   db.query( "SELECT message_admin FROM message WHERE id = ?",[id],(error, results) => {
   
     if (error) {
       console.log(error);
       res.json({
         result: false,
         result_code: 0,
         result_message: "ERROR !!",
       });
     }
     
      else {
       res.json({
         result: true,
         result_code: 2, 
        data: results,
      });
     }
   });
   });



module.exports = router;
