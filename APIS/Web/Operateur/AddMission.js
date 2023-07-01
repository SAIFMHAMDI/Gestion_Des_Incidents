const express = require("express");
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const router = express.Router();
const db = require("../../dbconnection");


/*
########################################
*/
const upload = multer({ dest: 'uploads/' });

const generateRandomFileName = (file) => {

  const fileExtension = path.extname(file.originalname);
  //console.log(file.originalname);
  const randomString = crypto.randomBytes(10).toString('hex');
  const timestamp = Date.now().toString();
  //const extension = '.jpg'; // Change the extension based on your requirements
  return `${randomString}-${timestamp}${fileExtension}`;
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const randomName = generateRandomFileName(file);
    cb(null, randomName);
  },
});

const uploadWithRename = multer({ storage: storage }).fields([
  { name: 'fiche_technique', maxCount: 1 },
 /*{ name: 'signature', maxCount: 1 },*/
]);


function insertNotification(technicianId,details, titre) {
  const notification = {
    id_technicien: technicianId,
    date_notification: new Date(),
    titre: titre,
    message: details
  };

  db.query(
    'INSERT INTO notification SET ?',
    notification,
    (err, result) => {
      if (err) {
        console.error('Error inserting notification:', err);
        return;
      }
      console.log('Notification inserted successfully.');
    }
  );
}

router.post('/AddMission/:id_operateur', (req, res) => { 
  const {id_operateur} = req.params;


  var is_uploaded = true;

  uploadWithRename(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      is_uploaded = false;
    } else if (err) {
      console.log(err);;
      is_uploaded = false;
    }

    // Files uploaded successfully
    const imageFile = req.files['fiche_technique'][0];
    //const description = req.body.description;
    //const signature = req.body.signature;

  
    
    if(is_uploaded){
      //imageFile.filename

      const {nom,adresse,code_postal,fiche_technique,telephone, details, titre}= req.body; 

      db.query(`INSERT INTO incidents (id_operateur,nom,adresse,code_postal,fiche_technique,telephone, details, titre) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, 
      [id_operateur,nom,adresse,code_postal,imageFile.filename,telephone, details, titre], (err, result) => {
        console.log(result);
        console.log(err);
        if (err) {
          console.log(err);
          console.error('Error inserting incident into database: ', err); 
          res.status(500).send('Internal server error');
        } else {
          console.log('Incident inserted successfully');
    
    
    
          db.query(`SELECT id FROM techniciens WHERE code_postal = ?`,[code_postal],(err, results) => {
              if (err) {
                //console.error('Error retrieving technicians:', err);
                res.status(500).send('Internal server error');
                return;
              }
          
              // Process the retrieved technician IDs
              const technicianIds = results.map((row) => row.id);
              technicianIds.forEach((technicianId) => {
                // Perform the notification insertion for each technician
                insertNotification(technicianId,details, titre);
              });
    
              res.status(200).send('Mission inserted successfully');
            }
          );
            }
          });



    }else{
      res.status(500).send('Internal server error');
    }

  });

});



module.exports = router;
