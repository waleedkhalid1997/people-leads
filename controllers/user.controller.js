'use strict';
const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require('../models/user.model');
exports.login = (req, res) => {
  req = req.body;
  if (req.password !== null && req.email !== null) {
    const salt = bcrypt.genSaltSync(saltRounds);
    req.password = bcrypt.hashSync(req.password, salt);
    User.login(req.username, req.password, (err, user) => {
      if (err) return res.json({ success: false });
      if (user.length > 0) {
        return res.json({ success: true, data: user[0] });
      } else {
        return res.json({ success: false });
      }
    });
  } else {
    return res.json({ success: false });
  }
};
