const express = require("express");
const router = express.Router();
const db = require("./dbConnection");

router.post("/feedback", (req, res) => {
  
    const { description, signature,image } = req.body;
    db.query("INSERT INTO feedback (description, signature,image) VALUES  (?, ?, ?)", [ description,signature,image],(error,results) =>{
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
          result_message: "Sended successfully",
         
       });
      }
    }); 
    });
    
 



module.exports = router;
