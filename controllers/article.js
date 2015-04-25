'use strict';

var article = require('../services/article.js');
var marked = require('marked');
var date = require('../utils/date');

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
          createTime: date.toDateString(article.createTime),
          updateTime: date.toDateString(article.updateTime)
        },
        pageTitle: article.title + ' - ' + '文章'
      });  
    } else {
      res.status(404).render('note', {
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
          list: []
        };

        viewArticles.push(yearArticles);
      }

      var monthArticles = yearArticles.list.filter(function (monthArticles) {
        return monthArticles.month === month;
      })[0];

      if (!monthArticles) {
        monthArticles = {
          month: month,
          list: []
        };

        yearArticles.list.push(monthArticles);
      }

      monthArticles.list.push(article);
    });

    res.render('list', {
      articles: viewArticles,
      current: 'list',
      pageTitle: '所有文章'
    });
  });
};