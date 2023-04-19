'use strict';
//User object create
const User = function () {
  this.tableName = 'users_data';
};
User.login = function (username, password, result) {
  global.dbConn.query(
    `SELECT user_id, first_name, last_name, email, company, phone_number, address1, about_me, token FROM ${this.tableName} where username = ? and password = ?`,
    [username, password],
    function (err, res) {
      if (err) {
        console.log('error: ', err, global.dbConnErr());
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};
User.findByKey = function (key, value, result) {
  global.dbConn.query(
    `SELECT user_id, first_name, last_name, email, company, phone_number, address1, about_me, token FROM ${this.tableName} where ${key} = ?`,
    value,
    function (err, res) {
      if (err) {
        console.log('error: ', err, global.dbConnErr());
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};
module.exports = User;
