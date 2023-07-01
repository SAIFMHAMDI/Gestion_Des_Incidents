const express = require('express');
const router = express.Router();
const db = require("../dbconnection" );


router.put('/accept/:id/:incidentId', (req, res) => {
  const id = req.params.id;
  const incidentId = req.params.incidentId;
  console.log('id:', id);
  console.log('incidentId:', incidentId);
  db.query(
    'SELECT * FROM techniciens WHERE id = ?',    
    [id],
    (error, results) => {
      if (error) {
        console.log(error);
        res.json({
          result: false,
          result_code: 0,
          result_message: 'ERROR !!',
        });
      } else {
        const technician = results[0];
        console.log('technician:', technician);
        if (technician.disponibilité === 1) {
          db.query(
            'UPDATE techniciens SET acceptation = 1 WHERE id = ?',
            [id],
            (error, results) => {
              if (error) {
                console.log(error);
                res.json({
                  result: false,
                  result_code: 1,
                  result_message: 'ERROR !!',
                });
              } else if (results.affectedRows === 0) {
                res.json({
                  result: false,
                  result_code: 2,
                  result_message: 'Mission Not Found',
                });
              } else {
                db.query(
                  'UPDATE incidents SET accepted_by = ?, etat = ? WHERE id = ?',
                  [technician.id, 'IN PROGRESS', incidentId],
                  (error, results) => {
                    if (error) {
                      console.log(error);
                      res.json({
                        result: false,
                        result_code: 3,
                        result_message: 'ERROR !!',
                      });
                    } else {
                      console.log('results:', results);
                      res.json({
                        result: true,
                        result_code: 1,
                        result_message: 'Success accepted mission !! ',
                      });
                    }
                  },
                );
              }
            },
          );
        } else {
          res.json({
            result: false,
            result_code: 4,
            result_message: 'Technician Unavailable !!',
          });
        }
      }
    },
  );
});

module.exports = router;
