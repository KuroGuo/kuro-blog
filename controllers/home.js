'use strict';

var article = require('../services/article');
var marked = require('marked');
var pygmentizeBundled = require('pygmentize-bundled');
var highlightJS = require('highlight.js');

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

    articles.forEach(function (article) {
      article.content = marked(article.content);
    });

    res.render('index', {
      articles: articles,
      current: 'home'
    });
  });
};

exports.aboutMe = function (req, res) {
  res.render('about_me', {
    current: 'about_me'
  });
};