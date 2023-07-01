const express = require("express");
const router = express.Router();
const db = require("../dbconnection");

router.get("/notifications/:id_technicien", (req, res) => {
    const {id_technicien} = req.params;
    const {id,date_notification,titre,message}=req.body;
    
  
    db.query(  `SELECT id, date_notification, titre, message FROM notification WHERE id_technicien = ?`, [id_technicien],
     (error, results)=>{
        console.log(results); 
        if (error) {
          res.json({
            result: false,
            result_code: 0,
            result_message: `Error !!`,
          });
        }
        
         else {
          res.json({
            result: true,
            result_code: 1,
            result_message: `success`,
            data: results 
               
          });
        }
    })

});

module.exports = router;