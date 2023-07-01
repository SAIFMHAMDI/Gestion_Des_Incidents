const express = require("express");
const router = express.Router();
const db = require("../dbconnection");

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
          `UPDATE technicien_incident SET statu = "ENDED" WHERE id = ?`,
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
        db.query(`UPDATE technicien_incident SET statu = "IN PROGRESS" WHERE id = ?`,[id],
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
          `UPDATE technicien_incident SET statu = "IN PROGRESS" WHERE id = ?`,
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


router.get("/getMission/:code_postal/:user_id", (req, res) => {
  const { code_postal, user_id } = req.params;

  // First query to fetch incidents
  const getIncidentsQuery = "SELECT * FROM incidents WHERE code_postal = ?";
  db.query(getIncidentsQuery, [code_postal], (error, incidents) => {
    if (error) {
      console.log(error);
      return res.json({
        result: false,
        result_code: 2,
        result_message: "Error fetching incidents",
      });
    }

    // Array to store the final results
    const finalResults = [];

    // Loop through each incident
    incidents.forEach((incident) => {
      // Second query to fetch feedback for each incident
      const getFeedbackQuery =
        "SELECT * FROM feedback WHERE id_incident = ? ORDER BY id DESC LIMIT 1";
      db.query(getFeedbackQuery, [incident.id], (error, feedback) => {
        if (error) {
          console.log(error);
          incident.feedback = null; // Set feedback to null if error occurs
        } else {
          incident.feedback = feedback[0] || null; // Assign the feedback record if found, otherwise null
        }

        // Third query to check if the incident is marked as favorite for the user
        const checkFavoriteQuery =
          "SELECT * FROM favoris WHERE id_technicien = ? AND id_incident = ?";
        db.query(checkFavoriteQuery, [user_id, incident.id], (error, favorite) => {
          if (error) {
            console.log(error);
            incident.is_favorite = false; // Set is_favorite to false if error occurs
          } else {
            incident.is_favorite = favorite.length > 0; // Check if the incident is marked as a favorite
          }

          finalResults.push(incident); // Add the updated incident to final results

          // Check if all incidents have been processed
          if (finalResults.length === incidents.length) {
            console.log("Final Results:", finalResults);
            res.json({
              result: true,
              result_code: 3,
              result_message: "Success to get missions",
              data: finalResults,
            });
          }
        });
      });
    });
  });
});
module.exports = router;
