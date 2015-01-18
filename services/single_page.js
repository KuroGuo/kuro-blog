'use strict';

var SinglePage = require('../db/single_page');
var async = require('async');

exports.all = function (callback) {
  exports.query(null, callback);
};

exports.query = function (options, callback) {
  var criteria, sort, count;

  if (options) {
    criteria = options.criteria;
    sort = options.sort;
    count = options.count;
  }

  SinglePage
    .find(criteria)
    .sort(sort)
    .limit(count)
    .exec(callback);
};

exports.init = function (callback) {
  async.parallel([function (callback) {
    var aboutMe = new SinglePage({
      _id: 'about_me',
      title: '关于我',
      content: '',
      updateTime: new Date()
    });

    aboutMe.save(callback);
  }], function (err) {
    if (err)
      return callback.call(this, err);

    exports.all(callback);
  });
};

exports.findOneById = function (id, callback) {
  SinglePage.findOne({ _id: id }, callback);
};

exports.updateOneById = function(id, update, callback) {
  update.updateTime = new Date();

  SinglePage.update({ _id: id }, update, callback);
};