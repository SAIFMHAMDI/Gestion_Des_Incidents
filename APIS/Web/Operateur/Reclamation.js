const express = require("express");
const router = express.Router();
const db = require("../../dbConnection");

router.post('/Reclamation/:id',(req,res)=>{
 
    const {reclamation} = req.body;
    const {id}=  req.params;

    
    db.query("UPDATE feedback SET reclamation = ? WHERE id = ?  ; ",[reclamation,id],(error,results)=>{
        
        if (error) {
          console.log(error);
          res.json({
            result: false,
            result_code: 0,
            result_message: "ERROR !! Send Reclamation",
          });
        } else {
          res.json({
            result: true,
            result_code: 1,
            result_message: "Reclamation Sended Successfully..."
          });
        }
      }
    );
  })
  module.exports = router;