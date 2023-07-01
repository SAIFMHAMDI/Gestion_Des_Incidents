const express = require("express");
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const router = express.Router();
const db = require("../dbconnection");


/*
########################################
*/
const upload = multer({ dest: 'uploads/' });

const generateRandomFileName = () => {
  const randomString = crypto.randomBytes(10).toString('hex');
  const timestamp = Date.now().toString();
  const extension = '.jpg'; // Change the extension based on your requirements
  return `${randomString}-${timestamp}${extension}`;
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const randomName = generateRandomFileName();
    cb(null, randomName);
  },
});

const uploadWithRename = multer({ storage: storage }).fields([
  { name: 'image', maxCount: 1 },
 /*{ name: 'signature', maxCount: 1 },*/
]);
/*
########################################
*/

function saveBase64ImageToFile(base64Image, filePath) {
  // Remove the data URL prefix (e.g., 'data:image/png;base64,')
  const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');

  // Create a buffer from the base64 data
  const imageBuffer = Buffer.from(base64Data, 'base64');

  // Write the buffer to a file
  fs.writeFile(filePath, imageBuffer, (error) => {
    if (error) {
      console.error('Error saving image:', error);
    } else {
      console.log('Image saved successfully!');
    }
  });
}

router.post("/feedback/:id_technicien/:id_incident", (req, res) => {
  const { id_technicien, id_incident } = req.params;

  var is_uploaded = true;

  uploadWithRename(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      is_uploaded = false;
    } else if (err) {
      console.log(err);;
      is_uploaded = false;
    }

    // Files uploaded successfully
    const imageFile = req.files['image'][0];
    const description = req.body.description;
    const signature = req.body.signature;

    /*BASE64*/
    saveBase64ImageToFile(signature, "./uploads/" + id_incident + '_signature.png');
    /*################""""""*/
    
    if(is_uploaded){

      db.query(
        'UPDATE incidents SET  etat = ? WHERE id = ?',
        ['DONE', id_incident],
        (error, results) => {
          if (error) {
            console.log(error);
            res.json({
              result: false,
              result_code: 3,
              result_message: 'An error accoured retry',
            });
          } else {
            db.query("INSERT INTO feedback (description, signature, image, id_technicien, id_incident) VALUES (?, ?, ?, ?, ?)"
              , [description, id_incident + '_signature.png', imageFile.filename, id_technicien, id_incident], (error, results) => {
                console.log(results);
                if (error) {
                  console.log(error);
                  res.json({
                    result: false,
                    result_code: 0,
                    result_message: 'An error accoured retry'
                  });
                }else{

                  let last_id= results.insertId;
                  db.query(
                    'SELECT * FROM feedback WHERE id = ?',    
                    [last_id],
                    (error, results) => {
                      if (error) {
                        res.json({
                          result: false,
                          result_code: 3,
                          result_message: 'An error accoured retry',
                        });
                      } else {
                        res.json({
                          result: false,
                          result_code: 1,
                          data:results[0],
                          result_message: "Feedback created"
                        });
                      }})
                }
              }
            );
    
          }
        }
      );
    }else{
      res.json({
        result: false,
        result_code: 3,
        result_message: 'An error accoured retry',
        data:[]
      });
    }

  });
});

module.exports = router;
