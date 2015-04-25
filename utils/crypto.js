'use strict';

var crypto = require('crypto');

exports.createMD5 = function (str) {
  var md5 = crypto.createHash('md5');
  md5.update(str);
  var result = md5.digest('hex');
  return result;
};