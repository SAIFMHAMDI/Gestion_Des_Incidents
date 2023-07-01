const express = require("express");
const router = express.Router();
const db = require("../../dbConnection");

router.get("/all-missions", (req, res) => {
  const id = req.body;
  db.query("SELECT COUNT(id) AS missions FROM incidents", [id], (error, results) => {
    
    if (error) {
      console.log(error);
      res.json({
        result: false,
        result_code: 0,
        result_message: "Server error",
      });
    } else {
      res.json({
        result: true,
        result_code: 1,
        result_message: "Success ",
        data:[results[0].missions],
      });
    }
  });
});

router.get("/onhold-missions", (req, res) => {
  const id = req.body;
  db.query("SELECT COUNT(id) AS missions FROM incidents WHERE etat ='ON HOLD'", [id], (error, results) => {
    
    if (error) {
      console.log(error);
      res.json({
        result: false,
        result_code: 0,
        result_message: "Server error",
      });
    } else {
      res.json({
        result: true,
        result_code: 1,
        result_message: "Success ",
        data:[results[0].missions],
      });
    }
  });
});
router.get("/inprogress-missions", (req, res) => {
  const id = req.body;
  db.query("SELECT COUNT(id) AS missions FROM incidents WHERE etat ='IN PROGRESS'", [id], (error, results) => {
    
    if (error) {
      console.log(error);
      res.json({
        result: false,
        result_code: 0,
        result_message: "Server error",
      });
    } else {
      res.json({
        result: true,
        result_code: 1,
        result_message: "Success ",
        data:[results[0].missions],
      });
    }
  });
});
router.get("/done-missions", (req, res) => {
  const id = req.body;
  db.query("SELECT COUNT(id) AS missions FROM incidents WHERE etat ='DONE'", [id], (error, results) => {
    
    if (error) {
      console.log(error);
      res.json({
        result: false,
        result_code: 0,
        result_message: "Server error",
      });
    } else {
      res.json({
        result: true,
        result_code: 1,
        result_message: "Success ",
        data:[results[0].missions],
      });
    }
  });
});


router.get("/all-technicien", (req, res) => {
  const id = req.body;
  db.query("SELECT COUNT(id) AS techniciens FROM techniciens", [id], (error, results) => {
    
    if (error) {
      console.log(error);
      res.json({
        result: false,
        result_code: 0,
        result_message: "Server error",
      });
    } else {
      res.json({
        result: true,
        result_code: 1,
        result_message: "Success ",
        data:[results[0].techniciens],
      });
    }
  });
});

router.get("/all-operateur", (req, res) => {
  const id = req.body;
  db.query("SELECT COUNT(id) AS operateurs FROM operateur", [id], (error, results) => {
    
    if (error) {
      console.log(error);
      res.json({
        result: false,
        result_code: 0,
        result_message: "Server error",
      });
    } else {
      res.json({
        result: true,
        result_code: 2,
        result_message: "Success ",
        data:[results[0].operateurs],
      });
    }
  }); 
});



router.get("/dispo-technicien", (req, res) => {
  const id = req.body;
  db.query("SELECT COUNT(id) AS dispo FROM techniciens WHERE acceptation =1 ", [id], (error, results) => {
    
    if (error) {
      console.log(error);
      res.json({
        result: false,
        result_code: 0,
        result_message: "Server error",
      });
    } else {
      res.json({
        result: true,
        result_code: 5,
        result_message: "Success ",
        data:[results[0].dispo],
      });
    }
  });
});
module.exports = router;
