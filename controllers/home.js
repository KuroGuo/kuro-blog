'use strict';

var article = require('../services/article');
var marked = require('marked');
var pygmentizeBundled = require('pygmentize-bundled');
var highlightJS = require('highlight.js');
var date = require('../util/date');

marked.setOptions({
  highlight: function (code) {
    return highlightJS.highlightAuto(code).value;
  }
});

exports.index = function (req, res, next) {
  article.query(null, 3, function (err, articles) {
    if (err) {
      return next(err);
    }

    var viewArticles = articles.map(function (article) {
      return {
        _id: article._id,
        title: article.title,
        content: marked(article.content),
        updateTime: date.toDateString(article.updateTime)
      };
    });

    res.render('index', {
      articles: viewArticles,
      current: 'home'
    });
  });
};

exports.aboutMe = function (req, res) {
  res.render('about_me', {
    current: 'about_me',
    pageTitle: '关于我'
  });
};