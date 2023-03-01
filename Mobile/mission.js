const express = require("express");
const router = express.Router();
const db = require("../dbConnection");

router.get("/mission/:id", (req, res) => {
  const { id } = req.params;

  db.query(
    `SELECT acceptation, id_feedback FROM technicien_incident WHERE id = ?`,
    [id],
    (error, results) => {
     if (error) {
                  res.json({
                    result: false,
                    result_code: 0,
                    result_message: "ERROR !! mission not found",
                  });
                }
                
                

      const acceptation = results[0].acceptation;
      const id_feedback = results[0].id_feedback || false;
      if (acceptation === 1 && id_feedback) {
        db.query(
          `UPDATE technicien_incident SET statu = "Terminé" WHERE id = ?`,
          [id],
          (error, results) => {
            console.log(results);
            if (error) {
              res.json({
                result: false,
                result_code: 1,
                result_message: `Error while updating mission ${id} to Terminé: ${error.message}`,
              });
            }
            
             else {
              res.json({
                result: true,
                result_code: 2,
                result_message: `Mission ${id} has been set to Terminé`,
                
                   
              });
            }
          }
        );
      } else if (acceptation === 1) {
        db.query(
          `UPDATE technicien_incident SET statu = "EN COURS" WHERE id = ?`,
          [id],
          (error, results) => {
            console.log(results);
          if (error) {
              res.json({
                result: false,
                result_code: 2,
                result_message: `Error while updating mission ${id} to EN COURS: ${error.message}`,
              });
            }
            
             else {
              res.json({
                result: true,
                result_code: 3,
                result_message: `Mission ${id} has been set to EN COURS`,
                
                   
              });
            }  
          }
        );
      } else {
        db.query(
          `UPDATE technicien_incident SET statu = "EN ATTENTE" WHERE id = ?`,
          [id],
          (results) => {
           
              res.json({
                result: true,
                result_code: 3,
                result_message: `Mission ${id} still EN ATTENTE`,
              
                   
              });
            }
          
        );
      }
    }
  );
});
module.exports = router;
