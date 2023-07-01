const express = require('express');
const router = express.Router();
const db = require("../dbconnection" );


router.put('/accept_mission/:incidentId/:idtechnicien', (req, res) => {
  const idtechnicien = req.params.idtechnicien;
  const incidentId = req.params.incidentId;

  db.query(
    'UPDATE incidents SET accepted_by = ?, etat = ? WHERE id = ?',
    [idtechnicien, 'IN PROGRESS', incidentId],
    (error, results) => {
      if (error) {
        console.log(error);
        res.json({
          result: false,
          result_code: 3,
          result_message: 'An error accoured retry',
        });
      } else {
        console.log('results:', results);
        db.query(
          'SELECT * FROM incidents WHERE id = ?',    
          [incidentId],
          (error, results) => {
            if (error) {
              res.json({
                result: false,
                result_code: 3,
                result_message: 'An error accoured retry',
              });
            } else {
              res.json({
                result: true,
                result_code: 1,
                data:results[0],
                result_message: 'Misson accepted!',
              });
            }})
      }
    },
  );
});

module.exports = router;
