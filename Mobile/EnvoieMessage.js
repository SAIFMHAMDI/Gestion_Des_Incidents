const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const router = express.Router();
const db = require("../dbConnection");

router.post("/envoie_message/:id_technicien/:id_admin/:id_discussion", (req, res) => {
  const {content } = req.body;
  const {  id_discussion,id_technicien, id_admin } = req.params;

 
  
  db.query( `INSERT INTO message (id_technicien, id_admin,id_discussion,content) VALUES (?,?,?,?)`,[ id_technicien, id_admin,id_discussion,content],(error, results) => {
    console.log(results);
    if (error) {
      res.json({
        result: false,
        result_code: 0,
        result_message: "ERROR !!",
      });
    }
    
     else {
      res.json({
        result: true,
        result_code: 1,
        result_message: "Message Envoyé !!",
       
     });
    }
  });
});

module.exports = router;
