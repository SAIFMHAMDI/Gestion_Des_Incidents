const express = require("express");
const router = express.Router();
const db = require("../../dbconnection");

router.post("/AccountTechnicien", (req, res) => {
    const {nom,prenom,code_postal,telephone,email,password,device_type} = req.body;
    db.query(
    `INSERT INTO techniciens(nom,prenom,code_postal,telephone,email,password,device_type) VALUES  (?, ?, ?, ?, ?, ?, ? ) `,[nom,prenom,code_postal,telephone,email,password,device_type]
   , (error, results) =>{

    if (error) { {
        res.json({
          result: false,
          result_code: 0,
          result_message: "Failed To Create Technicien Account",
        })
      }
    }else {
        res.json({
      result: true,
      result_code: 1,
      result_message: "Account Created Successfully"
      
    })
  }
   }
  )
})
router.delete("/technicienDelete/:id", (req, res) => {
  
    const {id} = req.params;
    db.query("DELETE FROM techniciens WHERE id = ?", [id],
    (error, results) =>{
     console.log(results);
 
     if (error) {
       console.error(error);
       res.status(500).json({ message: "Server error" });
     }else {
         res.json({
       result: true,
       result_code: 1,
       result_message: "Technicien Removed Successfuly",
     })
 } });
  
});
router.post('/updateTechnicien/:id',(req,res)=>{
  const {id}= req.params
  const {nom ,prenom, code_postal,telephone,password,email,device_type} = req.body;
  db.query("UPDATE techniciens SET nom = ? , prenom = ? , code_postal = ?, telephone = ? , password = ?, email = ? , device_type = ? WHERE id = ? ;",[id,nom ,prenom, code_postal,telephone,password,email,device_type],(error,results)=>{
    console.log(results);
 
    if (error) { {
      res.json({
        result: false,
        result_code: 0,
        result_message: "Failed To Update Technicien Account",
      })
    }
  }else {
      res.json({
    result: true,
    result_code: 1,
    result_message: "Account Updated Successfully",
  
    
  })
}

  })
})




module.exports = router;