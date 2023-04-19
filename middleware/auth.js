'use strict';
const User = require('../models/user.model');

function getTokenFromHeader(req) {
  if (
    (req.headers.authorization &&
      req.headers.authorization.split(' ')[0] === 'Token') ||
    (req.headers.authorization &&
      req.headers.authorization.split(' ')[0] === 'Bearer')
  ) {
    return req.headers.authorization.split(' ')[1];
  }
  return null;
} // END of getTokenFromHeader

const auth = {
  required: (req, res, next) => {
    req.token = getTokenFromHeader(req);
    if (req.token) {
        next();
    } else {
      return res.status(401).send();
    }
  },
  validateUser: (req, res, next) => {
    User.findByToken(req.token, (err, user) => {
      if (err) return res.status(401).send();
      if (user.length > 0) {
        req.user = user[0];
        next();
      } else {
        return res.status(401).send();
      }
    });
  },
}; // END

module.exports = auth;
