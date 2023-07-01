const express = require("express");
const router = express.Router();
const db = require("../dbconnection");


router.get("/getFavoris/:user_id", (req, res) => {
  const { code_postal, user_id } = req.params;

  // First query to fetch incidents
  const getIncidentsQuery = "SELECT incidents.* FROM incidents INNER JOIN favoris ON favoris.id_incident = incidents.id WHERE favoris.id_technicien = ?";
  
  db.query(getIncidentsQuery,[user_id],  (error, incidents) => {
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

    let not_favorites=0;
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

        finalResults.push(incident);
        if (finalResults.length === incidents.length) {
          console.log("Final Results:", finalResults);
          res.json({
            result: true,
            result_code: 3,
            result_message: "Success to get missions",
            data: finalResults,
          });
        }

        return ;
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

          if(incident.is_favorite){
            finalResults.push(incident);
          }else{
            not_favorites++;
          }
           // Add the updated incident to final results

          // Check if all incidents have been processed

        });
      });
    });
  });
});



router.post("/addFavoris/:id_technicien/:id_incident/:add_remove",(req,res)=>{
  const {id_technicien,id_incident,add_remove} = req.params;
  if(add_remove=="true"){
    db.query("INSERT INTO favoris (id_technicien,id_incident) VALUES(?,?)",[id_technicien,id_incident],(error,results)=>{
      console.log(results);
      if (error) {
        console.log(error);
        res.json({
          result: false,
          result_code: 0,
          result_message: 'Error to Add Favourite Missions' ,
        });
      }
      
       else {
        res.json({
          result: true,
          result_code: 1,
          result_message: 'Success To Add Favourite Missions' ,
        });
      } 
    })
  }else{
      
    const {id} = req.params;
    db.query("DELETE FROM favoris WHERE id_technicien = ? and id_incident=?", [id_technicien,id_incident],
    (error, results) =>{
     console.log(results);
 
     if (error) {
       console.error(error);
       res.status(500).json({ message: "Server error" });
     }else {
     res.json({
       result: true,
       result_code: 1,
       result_message: "Removed Successfuly",
     })
 } });
  
  }
  
})
/*
router.delete("/favorisDelete/:id", (req, res) => {

});*/

module.exports = router;
