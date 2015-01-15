'use strict';

exports.verify = function (req, res, next) {
  if (req.session.accountName) {
    next();
  } else {
    res.redirect('/adnia/login');
  }
};