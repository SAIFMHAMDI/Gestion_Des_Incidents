const express = require("express");
const router = express.Router();
const db = require("../dbConnection");

router.get("/search/:id", (req, res) => {
  const { id } = req.params;

  db.query(
    `SELECT titre FROM incidents WHERE id = ?`,
    [id],
    (error, results) => {
      if (error) {
        res.json({
          result: false,
          result_code: 0,
          result_message: "titre not found",
        });
      } else {
        console.log(results);
        res.json({
          result: true,
          result_code: 1,
          result_message: "Success",
          data: results,
        });
      }
    }
  );
});
 
router.get("/searchAdresse/:adresse", (req, res) => {
  const { adresse } = req.params;

  db.query(
    `SELECT titre FROM incidents WHERE adresse= ?`,
    [adresse],
    (error, results) => {
      const titre = results[0].titre || false;

      console.log(results);
      if (error) {
        res.json({
          result: false,
          result_code: 0,
          result_message: "adresse not found",
        });
      } else {
        res.json({
          result: true,
          result_code: 2,
          result_message: "Success",
          data: [{results:{
            titre,
            adresse,
            }}]
        });
      }
    }
  );
});

router.get("/searchStatus/:statu", (req, res) => {
  const { statu } = req.params;
  db.query(
    `SELECT titre FROM incidents WHERE id IN (SELECT id_incident FROM technicien_incident WHERE statu =?);`,
    [statu],
    (error, results) => {
      const titre = results[0].titre || false;
      if (error) {
        res.json({
          result: false,
          result_code: 0,
          result_message: "Error occurred while searching status.",
        });
      } else if (results.length === 0) {
        res.json({
          result: false,
          result_code: 0,
          result_message: "No incidents found with the given status.",
        });
      } else {
        console.log(results);
        res.json({
          result: true,
          result_code: 3,
          result_message: "Success",
          data: [{results:{
            titre,
           statu}}]
        });
      }
    }
  );
});

router.get("/search_incidents", (req, res) => {
  db.query(
    `SELECT titre  FROM incidents ORDER BY date_insertion ASC`,
    (error, results) => {
      console.log(results);
      if (error) {
        res.json({
          result: false,
          result_code: 0,
          result_message: "ERROR !! titre not found",
        });
      } else {
        res.json({
          result: true,
          result_code: 4,
          result_message: "Success",
          data: results,
        });
      }
    }
  );
});

router.get("/searchOptions/:id/:id_incident", (req, res) => {
  const { id, id_incident } = req.params;
  const { titre, adresse } = req.body;

  const { statu } = req.body;
  db.query(
    `SELECT statu FROM technicien_incident WHERE id_incident=?`,
    [id_incident],
    (error, results) => {
      console.log(results);
      if (error) {
        console.log(` ${id} not found`);
        res.status(404).send(` ${id} not found`);
        return;
      }
      const statu = results[0].statu || false;
      db.query(
        `SELECT titre,adresse FROM incidents WHERE id= ?`,
        [id],
        (error, results) => {
          console.log(results);
          if (error) {
            console.log(` ${id} not found`);
            res.status(404).send(` ${id} not found`);
            return;
          }

          const titre = results[0].titre || false;
          const adresse = results[0].adresse || false;

          if (titre && adresse && statu) {
       
            db.query(
              `SELECT titre FROM incidents WHERE id = ? ORDER BY date_insertion ASC;`,
              [id, titre],
              (error, results) => {
              
                console.log(results);
                if (error) {
                  res.json({
                    result: false,
                    result_code: 0,
                    result_message: "ERROR !! titre not found",
                  });
                } else {
                  res.json({
                    result: true,
                    result_code: 5,
                    result_message: "Success",
                    data: [{results:{
                      titre,
                      adresse,
                       statu}}]
                  });
                }
              }
            );
          }
        }
      );
    }
  );
});
module.exports = router;
