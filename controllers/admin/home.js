'use strict';

var admin = require('../../services/admin');

exports.index = function (req, res) {
	res.redirect('/adnia/article/create');
};

exports.loginView = function (req, res, next) {
  res.render('admin/login');
};

exports.login = function (req, res, next) {
  var name = req.body.name;
  var pwd = req.body.pwd;

  if (!name || !pwd)
    return res.redirect('/adnia/login');

  admin.verify(name, pwd, function (err, ok) {
    if (err)
      return next(err);

    if (ok) {
      req.session.accountName = name;
      return res.redirect('/adnia');
    }
    else {
      return res.redirect('/adnia/login');
    }
  });
};