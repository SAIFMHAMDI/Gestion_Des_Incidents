const express = require("express");
const router = express.Router();
const db = require("../dbConnection");
 
router.post("/favoris/:id", (req, res) => {
  const { id} = req.params;
    const {  id_technicien, id_incident } = req.body; 
    db.query(
      "SELECT  id_technicien , id_incident FROM technicien_incident WHERE id = ? AND statu = 'EN COURS' ",
      [id,id_technicien, id_incident] 
     , (error, results) =>{
    
      if (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server error" });
      }else{
        console.log(results);
      }

     const   id_technicien = results[0].id_technicien || false;
      const  id_incident = results[0].id_incident || false;


if ( id_incident && id_technicien){

  db.query(
    `INSERT INTO favoris ( id_technicien, id_incident)  VALUES  ( ?, ? ) `,
    [ id_technicien, id_incident]
   , (error, results) =>{
    console.log(results);

    if (error) { {
        res.json({
          result: false,
          result_code: 0,
          result_message: "Failed To Add Favoris",
        })
      }
    }else {
        res.json({
      result: true,
      result_code: 1,
      result_message: "Added Successfuly",
    })
  }
   }
  )
} 
   
     });
   
});

router.delete("/favorisDelete/:id", (req, res) => {
  
    const {id} = req.params;
    db.query("DELETE FROM favoris WHERE id = ?", [id],
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
  
});

module.exports = router;
