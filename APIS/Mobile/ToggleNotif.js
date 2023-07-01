const express = require("express");
const router = express.Router();
const db = require("../dbconnection");

// API endpoint to enable/disable notifications
router.post("/ToggleNotif/:id", (req, res) => {
  const id = req.params.id;
 

  db.query(
    "UPDATE techniciens SET acceptation	 = 1 WHERE id = ?",
    [ id],
    (error, results) => {
     
      if (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
      } else if (results.affectedRows === 0) {
        res.status(404).json({ message: "Disponibilité not found" });
      } else {
        res.json({ 
          result:true,
          result_code:1,
          result_message: "technicien send On !!" ,
          data: results
        });
      }
    }
  );
});
router.post("/ToggleNotifOff/:id", (req, res) => {
  const id = req.params.id;
 

  db.query(
    "UPDATE techniciens SET acceptation	 = 0 WHERE id = ?",
    [ id],
    (error, results) => {
      console.log(results);
      if (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
      } else if (results.affectedRows === 0) {
        res.status(404).json({ message: "Disponibilité not found" });
      } else {
        res.json({ 
          result:true,
          result_code:1,
          result_message: "technicien send off !!" ,
          data: results
        });
      }
    }
  );
});

module.exports = router;





