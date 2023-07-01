const express = require("express");
const app = express();
const cors = require('cors');
const router = express.Router();
const db = require("../../dbConnection");
 app.use(cors());

router.get("/ListOperateur", (req, res) => {
 
 const{id,Name,telephone,email}=req.body;

  db.query("SELECT id,Name,email,telephone FROM operateur WHERE id <> 57 ORDER BY (id) DESC;",[id,Name,telephone,email], ( error,results) => {
    if (error ) {
      res.json({
        result: false,
        result_code: 0,
        result_message: "ERROR !! list not found",
      });
    }
    
     else {
      res.json({
        result: true,
        result_code: 1,
        result_message: "Success",
        data :results
     });
     
    }
  });
});

module.exports = router;
