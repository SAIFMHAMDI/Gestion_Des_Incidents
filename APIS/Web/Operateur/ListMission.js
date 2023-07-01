const express = require("express");
const multer = require('multer');
const path = require('path');
const router = express.Router();
const db = require("../../dbconnection");



router.get("/ListMission/:id_operateur", (req, res) => {
  const { id_operateur } = req.params;


  db.query(`SELECT * FROM incidents WHERE id_operateur = ? ORDER BY (id) DESC`, [id_operateur], ( error,results) => {
    if (error ) {
      res.json({
        result: false,
        result_code: 0,
        result_message: "ERROR !! list not found",
      });
    }
    
     else {
      res.json({
        result: true,
        result_code: 1,
        result_message: "Success",
        data :results
     });
     
    }
  });
});

module.exports = router;
