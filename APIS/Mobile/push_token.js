const express = require("express");
const router = express.Router();
const db = require("../dbconnection");
const bodyParser = require("body-parser");

router.post("/push_token/:id_technicien", (req, res) => {
  const { id_technicien } = req.params;
  const { push_token,device_type } = req.body;

  db.query(
    `DELETE FROM push_token WHERE id_technicien = ? and device_type=?`,
    [id_technicien,device_type],
    (error, results) => {
      if (error) {
        res
          .status(500)
          .send(`Error while fetching device_type for mission ${id_technicien}`);
        return;
      }

      db.query(
        'INSERT INTO push_token (`device_type`, token, id_technicien) VALUES (?, ?, ?)',
        [device_type, push_token, id_technicien],
        (err, messageResult) => {
          if (err) {
            res.json({
              result: false,
              result_code: 0,
              result_message: "ERROR !! " + err.message,
            });
            return ;
          }
          res.json({
            result: true,
            result_code: 0,
            result_message: "syncronised !!",
          });
        });
    }
  );
});

module.exports = router;
