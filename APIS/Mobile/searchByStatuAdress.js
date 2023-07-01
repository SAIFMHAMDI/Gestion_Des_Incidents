const express = require("express");
const router = express.Router();
const db = require("../dbConnection");



router.get("/searchByStatuAdress/:id/:id_incident", (req, res) => {
    const { id, id_incident } = req.params;
    
  
  
    db.query(
      `SELECT statu FROM technicien_incident WHERE id_incident=?`,
      [id,id_incident],
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
                      result_code: 8,
                      result_message: "Success",
                      data:[{results:{
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