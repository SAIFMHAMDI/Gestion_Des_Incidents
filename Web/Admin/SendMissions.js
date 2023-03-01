const express = require("express");
const router = express.Router();
const db = require("../../dbconnection");

router.post("/SendMissions", (req, res) => {
  const { disponibilité, titre, message } = req.body;
  if(titre && message){
  const selectTechnicianQuery = `
    SELECT id
    FROM techniciens
    WHERE disponibilité = 1
  `;

  db.query(selectTechnicianQuery, [disponibilité], (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
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
           return res.send("Error Sending Missions...")
            } 
          }
        );
        if (j === technicians.length - 1) {
         
         return  res.status(200).json({
            result: true,
            result_code: 1,
            result_message: "Mission Sended Successfully...",
          });
        } 
        j++;
      }   while (j  <  technicians.length );
    }
  });
}else {
  return  res.status(500).json({
    result: false,
    result_code: 0,
    result_message: "Error Sending Missions...",
  });
}}); 

module.exports = router;
