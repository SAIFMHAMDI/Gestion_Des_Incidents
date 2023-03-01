const express = require("express");
const router = express.Router();
const db = require("../../dbconnection");

router.post("/SendMissions", (req, res) => {
  const { disponibilité, titre, message } = req.body;
  const selectTechnicianQuery = `
    SELECT id
    FROM techniciens
    WHERE disponibilité = 1
  `;

  db.query(selectTechnicianQuery, [disponibilité], (error, results) => {
    if (error) {
      console.log(error);
      res.setHeader('Content-Type', 'application/json');
      res.status(500).json({
        result: false,
        result_code: 0,
        result_message: "Error selecting technicians",
      });
    } else {
      let technicians = results.map((result) => result.id); 
      a = technicians.length;
      let j = 0; 
      
    do {
        const id_technicien = technicians[j]; 
        console.log(technicians[j]);

        db.query(
          `INSERT INTO notification (id_technicien, titre, message)   
           VALUES (?, ?, ?)`,
          [id_technicien, titre, message], 
          (error, results) => {
            if (error) {
              console.log(error);
              if (j === technicians.length - 1) {
                res.setHeader('Content-Type', 'application/json');
                res.status(500).json({
                  result: false,
                  result_code: 0,
                  result_message: "Error Sending...",
                });
              } 
            } else {
              if (j === technicians.length - 1) {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json({
                  result: true,
                  result_code: 1,
                  result_message: "Mission Sent Successfully...",
                });
              }
            }
          }
        );
        j++;
      }   while (j  <  technicians.length );
    }
  });
}); 

module.exports = router;
