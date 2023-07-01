const express = require("express");
const app = express();
const cors = require('cors');
const router = express.Router();
const db = require("../../dbconnection"); 
 app.use(cors());

router.get("/ListTechniciens", (req, res) => {
 
 const{id,nom,prenom,code_postal,telephone,email}=req.body;

  db.query("SELECT id,nom,prenom,code_postal,telephone,email FROM techniciens ORDER BY(id) DESC ;",[id,nom,prenom,code_postal,telephone,email], ( error,results) => {
    if (error ) {
      res.json({
        result: false,
        result_code: 0,
        result_message: "ERROR !! list not found",
      });
    }
    
     else {
      res.json({
        result: true,
        result_code: 1,
        result_message: "Success",
        data :results
     });
     
    }
  });
});

router.get("/ListTechnicien/:id", (req, res) => {
 const{id}=req.params;
  const{nom,prenom,code_postal,telephone,email}=req.body;
 
   db.query("SELECT nom,prenom,code_postal,telephone,email FROM techniciens WHERE id = ? ORDER BY(id) DESC ;",[id,nom,prenom,code_postal,telephone,email], ( error,results) => {
     if (error ) {
       res.json({
         result: false,
         result_code: 0,
         result_message: "ERROR !! list not found",
       });
     }
     
      else {
       res.json({
         result: true,
         result_code: 1,
         result_message: "Success",
         data :results
      });
      
     }
   });
 });
module.exports = router;
