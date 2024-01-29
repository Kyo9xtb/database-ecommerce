const mysql = require("mysql");
const mySqlDB = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "database_ecommerce",
});
mySqlDB.connect((err) => {
  if (err) {
    console.log("Database Connection Failed !!!", err);
  } else {
    console.log("Connected to Database");
  }
});
// mySqlDB.end();
module.exports = mySqlDB;
