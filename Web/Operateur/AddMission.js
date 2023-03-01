const express = require("express");
const router = express.Router();
const db = require("../../dbConnection");

router.post("/AddMission/:Name", (req, res) => {
  const {
    nom,
    adresse,
    code_postal,
    fiche_technique,
    telephone,
    details,
    titre,
    id
  } = req.body;

  const { Name } = req.params; 

 

db.query( `
SELECT id FROM operateur WHERE Name = ?`, [Name], (error, results) => { 
 
 console.log(results);
const id_operateur = results[0].id;
  db.query(
    "INSERT INTO incidents(id_operateur,nom ,adresse, code_postal,fiche_technique, telephone, details, titre) VALUES(?,?,?,?,?,?,?,?)",
    [id_operateur,nom, adresse, code_postal, fiche_technique, telephone, details, titre],
    (error, results) => {
        console.log(error);
      if (error) {
        res.json({
          result: false,
          result_code: 0,
          result_message: "ERROR !! Cannot Add Mission",
        });
      } else {
        res.json({
          result: true,
          result_code: 1,
          result_message: "Mission Added Successfully..."
        });
      }
    }
  );
})
});

module.exports = router;
