'use strict';

var mongoose = require('mongoose');

var singlePageSchema = new mongoose.Schema({
  _id: String,
  title: String,
  content: String,
  updateTime: Date
});

module.exports = mongoose.model('SinglePage', singlePageSchema);