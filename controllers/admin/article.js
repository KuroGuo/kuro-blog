'use strict';

var article = require('../../services/article');
var marked = require('marked');
var date = require('../../util/date');

exports.list = function (req, res) {
	res.render('admin/article/list');
};

exports.createView = function (req, res) {
  res.render('admin/article/create', {
    current: 'create',
    pageTitle: '写文章'
  });
};

exports.create = function (req, res, next) {
  var title = req.body.title;
  var content = req.body.content;
  var publish = !req.body.save_as_draft;

  if (!title || !content) {
    return res.send('标题和内容都不能留空啊，喂');
  }

  if (req.body.preview) {
    res.render('note', {
      article: {
        title: title,
        content: marked(content),
        createTime: date.toDateString(new Date())
      }
    });
  } else {
    article.create({
      title: title,
      content: content,
      published: publish
    }, function (err, article) {
      if (err)
        return next(err);

      res.redirect('/note/' + article._id);
    });
  }
};

exports.draft = function (req, res) {
  res.render('admin/article/draft', {
    current: 'draft',
    pageTitle: '草稿'
  });
};