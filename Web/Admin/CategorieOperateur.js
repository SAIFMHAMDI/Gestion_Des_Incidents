const express = require("express");
const router = express.Router();
const db = require("../../dbconnection");

router.post("/categorieOperateur/:nom", (req, res) => {
    const {nom} = req.params;
    
    db.query("SELECT * FROM operateur WHERE nom = ?",[nom],(error,results)=>{
        if (error ||  results=='') {
            res.json({
              result: false,
              result_code: 0,
              result_message: "Operateur Not Found",
              
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
    })

});

module.exports = router;