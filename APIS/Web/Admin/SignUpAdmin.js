const express = require("express");
const router = express.Router();
const db = require("../../dbconnection");

router.post("/SignUpAdmin", (req, res) => {
    const {nom,prenom,email,password,telephone} = req.body;
    db.query(
    `INSERT INTO admin(nom,prenom,email,password,telephone) VALUES  (?, ?, ?, ?, ?) `,[nom,prenom,email,password,telephone]
   , (error, results) =>{

    if (error) { {
        console.log(error);
        res.json({
          result: false,
          result_code: 0,
          result_message: "Failed To Create Admin Account",
        })
      } 
    }else {
        res.json({
      result: true,
      result_code: 1,
      result_message: "Admin Account Created Successfully"
      
    })
  }
   }
  )
})
router.delete("/DeleteAdmin/:id", (req, res) => {
  
    const {id} = req.params;
    db.query("DELETE FROM admin WHERE id = ?", [id],
    (error, results) =>{
     console.log(results);
 
     if (error) {
       console.error(error);
       res.status(500).json({ message: "Server error" });
     }else {
         res.json({
       result: true,
       result_code: 1,
       result_message: "Admin Removed Successfuly",
     })
 } });
  
});
router.post('/updateAdmin/:id',(req,res)=>{
  const {id}= req.params;
  const {nom,prenom,email,password,telephone} = req.body;
  db.query("UPDATE admin SET nom = ? , prenom = ? , email = ? , password = ? , telephone = ? WHERE id = ? ;",[nom,prenom,email,password,telephone,id],(error,results)=>{
    console.log(results);
 
    if (error) { {
        console.log(error);
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