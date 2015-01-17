'use strict';

var article = require('../services/article.js');
var marked = require('marked');
var date = require('../util/date');

exports.view = function (req, res) {
  var id = req.params.id;

  article.findOneById(id, function (err, article) {
    res.render('note', {
      article: {
        _id: article._id,
        title: article.title,
        content: marked(article.content),
        updateTime: date.toDateString(article.updateTime)
      },
      pageTitle: article.title + ' - ' + '文章'
    });
  });
};