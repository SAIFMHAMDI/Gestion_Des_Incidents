const express = require("express");
const router = express.Router();
const db = require("../../dbConnection");

router.get("/feedback", (req, res) => {
  
    const { description} = req.body;
    db.query("SELECT id,description,date_feedback FROM feedback ORDER BY (id) DESC ", [description],(error,results) =>{
      console.log(results);
      if (error) {
        console.log(error);
        res.json({
          result: false,
          result_code: 0,
          result_message: "Server error"
        });
      }
      
       else {
        res.json({
          result: true,
          result_code: 1,
          result_message: "Success",
          data:results
         
       });
      }
    }); 
    });

    

    router.get("/technicien_incident/:id", (req, res) => {
  
      const { statu} = req.body;
      db.query("SELECT statu FROM technicien_incident", [statu],(error,results) =>{
        console.log(results);
        if (error) {
          res.json({
            result: false,
            result_code: 0,
            result_message: "Server error"
          });
        }
        
         else {
          res.json({
            result: true,
            result_code: 1,
            result_message: "Success",
            data:results
           
         });
        }
      }); 
      });

module.exports = router;
