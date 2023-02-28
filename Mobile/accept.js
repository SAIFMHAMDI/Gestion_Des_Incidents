const express = require("express");
const router = express.Router();
const db = require("./dbConnection");

// PUT /missions/:id/accept
router.put("/acceptation/:id", (req, res) => {
  const id = req.params.id;
  const { acceptation } = req.body;

  // Update the mission status to "accepted"
  db.query(
    'UPDATE technicien_incident SET acceptation = "1" WHERE id = ?',
    [id, acceptation],
    (error, results) => {
      console.log(results);
      if (error) {
        res.json({
          result: false,
          result_code: 0,
          result_message: "ERROR !!",
        });
      } else if (results.affectedRows === 0){
         res.json({
          result: false,
          result_code: 1,
          result_message: "Mission Not Found",
        
        });
      } else {
        res.json({
          result: true,
          result_code: 1,
          result_message: "Success",
        
        });
      }
    }
  );
});

module.exports = router;
