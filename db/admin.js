'use strict';

var mongoose = require('mongoose');

var adminSchema = new mongoose.Schema({
  name: String,
  pwdMD5: String
});

module.exports = mongoose.model('Admin', adminSchema);