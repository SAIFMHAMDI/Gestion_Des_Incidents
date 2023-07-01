var mysql = require("mysql");
var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "gestion_des_incidents",  
});

conn.connect(function (err) {     
  if (err) {
    console.log("error connecting to database:", err);  
  }
  console.log("Database is connected successfully !!");
});
module.exports = conn;
