const express = require("express");
const router = express.Router();
const db = require("./dbConnection");

// API endpoint to enable/disable notifications
router.put("/ToggleNotif/:id", (req, res) => {
  const id = req.params.id;
  const { disponibilité } = req.body;

  db.query(
    "UPDATE techniciens SET disponibilité = ? WHERE id = ?",
    [disponibilité, id],
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
          result_message: "Disponibilité updated successfully" 
        });
      }
    }
  );
});

module.exports = router;
