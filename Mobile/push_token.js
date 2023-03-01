const express = require("express");
const router = express.Router();
const db = require("../dbConnection");
const bodyParser = require("body-parser");

router.post("/push_token/:id", (req, res) => {
  const { id } = req.params;
  const { device_type, push_token } = req.body;

  db.query(
    `SELECT device_type FROM techniciens WHERE id = ?`,
    [id],
    (error, results) => {
      if (error) {
        console.error(
          `Error while fetching device_type for mission ${id}: ${error.message}`
        );
        res
          .status(500)
          .send(`Error while fetching device_type for mission ${id}`);
        return;
      }

      const deviceTypeFromDb = results[0].device_type || "";
      let tableName;

      if (deviceTypeFromDb === "ios") {
        tableName = "ios_push_token";
      } else if (deviceTypeFromDb === "android") {
        tableName = "android_push_token";
      } else {
        console.error(`Unknown device type: ${deviceTypeFromDb}`);
        res.status(500).send(`Unknown device type: ${deviceTypeFromDb}`);
        return;
      }

      const query = `INSERT INTO ${tableName} ( push_token) VALUES ( ?)`;
      const values = [ push_token];

      db.query(query, values, (error, results) => {
        if (error) {
          console.error(error);
          res.status(500).send("Error saving push token");
        } else {
          res.json({ success: true, message: "Push token saved successfully" });
        }
      });
    }
  );
});

module.exports = router;
