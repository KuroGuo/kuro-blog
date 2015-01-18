'use strict';

var counter = require('./counter.js');
var Article = require('../db/article');

exports.create = function (article, callback) {
  var title = article.title;
  var content = article.content;
  var published = article.published;
  var now = new Date();

  counter.generateId('articleId', function (err, id) {
    if (err)
      return callback.call(this, err);

    var article = new Article({
      _id: id,
      title: title,
      content: content,
      createTime: now,
      updateTime: now,
      published: published
    });

    article.save(callback);
  })
};

exports.findPublished = function (callback) {
  exports.query({
    criteria: {
      published: true,
      discarded: { $ne: true }
    },
    sort: { updateTime: -1 },
    count: 30
  }, callback);
};

exports.findDraft = function (callback) {
  exports.query({
    criteria: {
      published: false,
      discarded: { $ne: true }
    },
    sort: { updateTime: -1 },
    count: 30
  }, callback);
};

exports.findDiscarded = function (callback) {
  exports.query({
    criteria: { discarded: true },
    sort: { updateTime: -1 },
    count: 30
  }, callback);
};

exports.discard = function (id, callback) {
  exports.updateOneById(id, { discarded: true, published: false }, callback);
};

exports.restore = function (id, callback) {
  exports.updateOneById(id, { discarded: false }, callback);
};

exports.findOneById = function (id, callback) {
  Article.findOne({ _id: id }, callback);
};

exports.updateOneById = function(id, update, callback) {
  update.updateTime = new Date();

  Article.update({ _id: id }, update, callback);
};

exports.query = function (options, callback) {
  var criteria = options.criteria;
  var sort = options.sort || { _id: -1 };
  var count = options.count;

  Article
    .find(criteria)
    .sort(sort)
    .limit(count)
    .exec(callback);
}