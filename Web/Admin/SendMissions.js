const express = require("express");
const router = express.Router();
const db = require("./dbConnection");

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
        res.json({
          result: false,
          result_code: 0,
          result_message: "Error selecting technicians",
        });
      } else {
        let technicians = results.map((result) => result.id); 
        let i = 0;
        do {
          const id_technicien = technicians[i];
          const insertNotificationQuery = `
            INSERT INTO notification (id_technicien, titre, message)
            VALUES (?, ?, ?)
          `;
  
          db.query(
            insertNotificationQuery,
            [id_technicien, titre, message], 
            (error, results) => {
              if (error) {
                console.log(error);
                if (i === technicians.length - 1) {
                  res.json({
                    result: false,
                    result_code: 0,
                    result_message: "Error Sending...",
                  });
                }
              } else {
                res.json({
                  result: true,
                  result_code: 1,
                  result_message: "Mission Sended Successfully...",
                  data: results,
                });
              }
            }
          );
  
          i++;
        } while (i < technicians.length);
      }
    });
  });
  
  

module.exports = router;
