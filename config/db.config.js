'use strict';
const mysql = require('mysql');
const Connect = () => {
  //local mysql db connection
  global.dbConn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  });
  global.dbConn.connect(function (err) {
    if (err) {
      console.log(err.message);
      Connect();
    }
    console.log('Database Connected!');
  });
};
module.exports = Connect;
