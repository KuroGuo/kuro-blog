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

exports.query = function (startId, count, callback) {
  var criteria = {published: true};
  if (startId)
    criteria._id = { $lt: startId }

  Article
    .find(criteria)
    .sort({ _id: -1 })
    .limit(count)
    .exec(callback);
};

exports.findOneById = function (id, callback) {
  Article.findOne({ _id: id }, callback);
};