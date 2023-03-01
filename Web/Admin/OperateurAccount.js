const express = require("express");
const router = express.Router();
const db = require("../../dbconnection");

router.post("/AccountOperateur", (req, res) => {
    const {nom,telephone,email,password} = req.body;
    db.query(
    `INSERT INTO operateur(nom,telephone,email,password) VALUES  (?, ?, ?, ?) `,[nom,telephone,email,password]
   , (error, results) =>{
    console.log(results);

    if (error) { {
        res.json({
          result: false,
          result_code: 0,
          result_message: "Failed To Create Operateur Account",
        })
      }
    }else {
        res.json({
      result: true,
      result_code: 1,
      result_message: "Account Created Successfully",
    })
  }
   }
  )
})
router.delete("/operateurDelete/:id", (req, res) => {
  
    const {id} = req.params;
    db.query("DELETE FROM operateur WHERE id = ?", [id],
    (error, results) =>{
     console.log(results);
 
     if (error) {
       console.error(error);
       res.status(500).json({ message: "Server error" });
     }else {
         res.json({
       result: true,
       result_code: 1,
       result_message: "Operateur Removed Successfuly",
     })
 } });
  
});




module.exports = router;