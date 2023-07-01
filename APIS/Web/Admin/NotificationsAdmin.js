const express = require("express");
const router = express.Router();
const db = require("../../dbConnection");

router.get("/feedback-admin", (req, res) => {
  
    const { description, signature,image,reclamation } = req.body;
    db.query("SELECT * FROM feedback  ORDER BY (id) DESC ", [ description,signature,image,reclamation],(error,results) =>{
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
    
module.exports = router;
