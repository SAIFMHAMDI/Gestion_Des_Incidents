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
  { name: 'file', maxCount: 1 },
 /*{ name: 'signature', maxCount: 1 },*/
]);


router.post("/AccountTechnicien", (req, res) => {
  



  var is_uploaded = true;

  uploadWithRename(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      is_uploaded = false;
    } else if (err) {
      console.log(err);;
      is_uploaded = false;
    }


    const { nom, prenom, code_postal, telephone, email, password } = req.body;

    // Files uploaded successfully
    const imageFile = req.files['file'][0];
    //const description = req.body.description;
    //const signature = req.body.signature;

  
    
    if(is_uploaded){

      db.query("SELECT COUNT(*) AS count FROM operateur WHERE telephone = ? OR email = ?",
      [telephone, email],
      (error, results) => {
        if (error) {
          res.json({
            result: false,
            result_code: 0,
            result_message: "Failed to create Operateur Account",
          });
          return ;
        } else {
          // If count is greater than 0, then either the email or telephone already exists in the database
          if (results[0].count > 0) {
            res.json({
              result: false,
              result_code: 1,
              result_message:
                "Account with the provided email or telephone already exists",
            });
            return ;
          } else {
          

            db.query(
              `INSERT INTO techniciens(
                nom, 
                prenom, 
                code_postal, 
                telephone, 
                email, 
                password, 
                file
              ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
              [nom, prenom, code_postal, telephone, email, password, imageFile.filename],
              (error, results) => {
                //console.log(results);
                if (error) {
                  //console.log(error);
                  res.json({
                    result: false,
                    result_code: 4,
                    result_message: "Failed to create Technicien Account",
                  });
                  return ;
                } else {
                  res.json({
                    result: true,
                    result_code: 5,
                    result_message: "Account created successfully",
                  });
                  return ;
                }
              }
            ); 
          }
        }
      }
    );

      
    }else{
      res.json({
        result: false,
        result_code: 4,
        result_message: "Failed to create Technicien Account",
      });
    }
  
  });




});

router.delete("/technicienDelete/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM techniciens WHERE id = ?", [id], (error, results) => {
    console.log(results);

    if (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    } else {
      res.json({
        result: true,
        result_code: 1,
        result_message: "Technicien Removed Successfuly",
      });
    }
  });
});
router.post("/updateTechnicien/:id", (req, res) => {
  const { id } = req.params;
  const { nom, prenom, code_postal, telephone, password, email } = req.body;
  db.query(
    "UPDATE techniciens SET nom = ? , prenom = ? , code_postal = ?, telephone = ? , password = ?, email = ? WHERE id = ? ;",
    [nom, prenom, code_postal, telephone, password, email, id],
    (error, results) => {
      console.log(results);

      if (error) {
        {
          console.log(error);
          res.json({
            result: false,
            result_code: 0,
            result_message: "Failed To Update Technicien Account",
          });
        }
      } else {
        res.json({
          result: true,
          result_code: 1,
          result_message: "Account Updated Successfully",
        });
      }
    }
  );
});

module.exports = router;
