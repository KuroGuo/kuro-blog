'use strict';

var article = require('../services/article.js');
var marked = require('marked');
var date = require('../util/date');

exports.view = function (req, res, next) {
  var id = req.params.id;

  article.findOneById(id, function (err, article) {
    if (err)
      return next(err);

    if (article) {
      res.render('note', {
        article: {
          _id: article._id,
          title: article.title,
          content: marked(article.content),
          updateTime: date.toDateString(article.updateTime)
        },
        pageTitle: article.title + ' - ' + '文章'
      });  
    } else {
      res.render('note', {
        article: {
          _id: 'not found',
          title: '未找到',
          content: '没有找到这篇文章'
        },
        pageTitle: '未找到 - 文章'
      });
    }
  });
};