const express = require("express");
const router = express.Router();
const db = require("../dbconnection");

router.get('/searchByStatuOrder/:id_incident/:id',(req,res)=> {
const {id,id_incident} =req.params;
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

        if ( statu) {
            
            db.query(
              `SELECT titre FROM incidents WHERE id = ? ORDER BY date_insertion ASC;`,
              [id],
              (error, results) => {
                console.log(results);
                const titre = results[0].titre || false;
                if (error) {
                  res.json({
                    result: false,
                    result_code: 0,
                    result_message: "ERROR !! titre not found",
                  });
                }
                
                 else {
                  res.json({
                    result: true,
                    result_code: 7,
                    result_message: "Success",
                    data :[{results:{
                        titre,
                        statu}}]
                  });
                }
              }
             )};
     } )

})



module.exports = router;