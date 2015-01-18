'use strict';

var article = require('../services/article');
var marked = require('marked');
var pygmentizeBundled = require('pygmentize-bundled');
var highlightJS = require('highlight.js');
var date = require('../util/date');
var singlePage = require('../services/single_page');

marked.setOptions({
  highlight: function (code) {
    return highlightJS.highlightAuto(code).value;
  }
});

exports.index = function (req, res, next) {
  article.query({
    criteria: {
      published: true,
      discarded: { $ne: true }
    },
    count: 3
  }, function (err, articles) {
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

exports.aboutMe = function (req, res, next) {
  singlePage.findOneById('about_me', function (err, singlePage) {
    if (err)
      return next(err);

    res.render('note', {
      current: 'about_me',
      pageTitle: '关于我',
      hideTitle: true,
      article: {
        _id: singlePage._id,
        title: singlePage.title,
        content: marked(singlePage.content),
        updateTime: date.toDateString(singlePage.updateTime)
      }
    });
  });
};