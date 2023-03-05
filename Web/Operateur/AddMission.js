const express = require("express");
const router = express.Router();
const db = require("../../dbConnection");

router.post('/AddMission/:id_operateur/:Name/:id_incident/:id_technicien', (req, res) => {
  const { Name, id_operateur,id_technicien,id  } = req.params;
  const { nom, adresse, code_postal, fiche_technique, telephone, details, titre,disponibilité,message} = req.body;

  const sqlQuery = `INSERT INTO incidents (id_operateur,nom,adresse,code_postal,fiche_technique,telephone, details, titre) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  const sqlParams = [id_operateur, nom, adresse, code_postal, fiche_technique, telephone, details, titre];

  db.query(sqlQuery, sqlParams, (err, result1) => {
    console.log(result1);
    console.log(err);
    if (err) {
      console.error('Error inserting incident into database: ', err);
      res.status(500).send('Internal server error');
    } else {
      console.log('Incident inserted successfully');




          const notificationSqlQuery = `
          INSERT INTO notification (id_technicien, titre, message)
          SELECT id, ?, ?
          FROM techniciens
          WHERE techniciens.code_postal = ?
          AND techniciens.disponibilité = 1;          
        `;
          const notificationSqlParams = [titre,message,code_postal];

          db.query(notificationSqlQuery, notificationSqlParams, (err,result3) => {
            console.log(result3);
            console.log(err);
            if (err) {
              console.error('Error creating notification: ', err);
            } else {
              console.log('Notification created successfully');
            }
          });

          res.status(200).send('Mission inserted successfully');
        }
      });
    }
  );
module.exports = router;
