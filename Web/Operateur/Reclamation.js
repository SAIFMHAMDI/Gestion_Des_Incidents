const express = require("express");
const router = express.Router();
const db = require("../../dbConnection");

router.post('/Reclamation/:Name/:email',(req,res)=>{
    const {Name,email} = req.params;
    const {reclamation} = req.body;

    db.query( `SELECT id FROM operateur WHERE Name = ?`, [Name], (error, results) => { 
        const id_operateur = results[0].id;
        db.query( `
SELECT id FROM admin WHERE email = ?`, [email], (error, results) => { 
    const id_admin = results[0].id;
    db.query("INSERT INTO reclamation(id_admin, id_operateur, reclamation) VALUES(?,?,?)",[id_admin, id_operateur, reclamation],(error,results)=>{
        
        if (error) {
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
  }); 
})

module.exports = router;