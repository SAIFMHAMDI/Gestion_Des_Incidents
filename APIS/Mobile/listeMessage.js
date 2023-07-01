const express = require("express");
const router = express.Router();
const db = require("../dbconnection");

router.get("/message/:id", (req, res) => {
  const { id } = req.params;
 

  db.query(`SELECT * FROM message WHERE id_technicien = ?`, [id], (error, results) => {
    if (error) {
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



router.get("/messages/:user_id/:admin_id", (req, res) => {
  const {  user_id,admin_id } = req.params;

  // First query to fetch incidents
  const getIncidentsQuery = `SELECT m.*, 
  IF(m.id_admin != 0, a.id, t.id) AS user_id,
  IF(m.id_admin != 0, CONCAT(a.nom, ' ', a.prénom), CONCAT(t.nom, ' ', t.prenom)) AS user_name,
  IF(m.id_admin != 0, 'admin', 'technicien') AS user_type
FROM message AS m
JOIN discussion AS d ON m.id_discussion = d.id
LEFT JOIN admin AS a ON m.id_admin = a.id
LEFT JOIN techniciens AS t ON m.id_technicien = t.id
WHERE d.id_technicien = ? AND d.id_admin = ? order by m.date_envoie asc`;

  db.query(getIncidentsQuery, [user_id,admin_id], (error, incidents) => {
    if (error) {
      console.log(error);
      return res.json({
        result: false,
        result_code: 2,
        result_message: "Error fetching incidents",
      });
    }

    res.json({
      result: true,
      result_code: 3,
      result_message: "Success to get missions",
      data: incidents,
    });

  });
});

module.exports = router;
