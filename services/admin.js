'use strict';

var Admin = require('../db/admin');
var crypto = require('../util/crypto');

exports.verify = function (name, pwd, callback) {
  var pwdMD5 = crypto.createMD5(pwd);

  Admin.findOne({
    name: name.trim(),
    pwd: pwdMD5
  }, function (err, admin) {
    if (err)
      return callback.call(this, err);

    if (!admin)
      callback.call(this, null, false);
    else
      callback.call(this, null, true);
  });
};