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

exports.list = function (req, res, next) {
  article.query({
    criteria: {
      published: true,
      discarded: { $ne: true }
    }
  }, function (err, articles) {
    if (err) {
      return next(err);
    }

    articles = articles.map(function (article) {
      return {
        _id: article._id,
        title: article.title,
        createTime: article.createTime,
        createTimeString: date.toDateString(article.createTime)
      };
    });

    var viewArticles = [];

    articles.forEach(function (article) {
      var year = 1900 + article.createTime.getYear();
      var month = 1 + article.createTime.getMonth();

      var yearArticles = viewArticles.filter(function (yearArticles) {
        return yearArticles.year === year;
      })[0];

      if (!yearArticles) {
        yearArticles = {
          year: year,
          articles: []
        };

        viewArticles.push(yearArticles);
      }

      var monthArticles = yearArticles.articles.filter(function (monthArticles) {
        return monthArticles.month === month;
      })[0];

      if (!monthArticles) {
        monthArticles = {
          month: month,
          articles: []
        };

        yearArticles.articles.push(monthArticles);
      }

      monthArticles.articles.push(article);
    });
console.log(viewArticles);
    res.render('list', {
      articles: viewArticles,
      current: 'list'
    });
  });
};

exports.aboutMe = function (req, res, next) {
  singlePage.findOneById('about_me', function (err, singlePage) {
    if (err)
      return next(err);

    if (!singlePage)
      return next(new Error('不存在此独立页'));

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

exports.projects = function (req, res, next) {
  singlePage.findOneById('projects', function (err, singlePage) {
    if (err)
      return next(err);

    if (!singlePage)
      return next(new Error('不存在此独立页'));

    res.render('note', {
      current: 'projects',
      pageTitle: '项目',
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