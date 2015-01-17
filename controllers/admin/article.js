'use strict';

var article = require('../../services/article');
var marked = require('marked');
var date = require('../../util/date');

exports.list = function (req, res) {
	res.render('admin/article/list');
};

exports.createView = function (req, res) {
  res.render('admin/article/editor', {
    current: 'create',
    pageTitle: '写文章',
    action: 'create'
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

exports.draft = function (req, res, next) {
  article.query(null, 30, function (err, articles) {
    if (err)
      return next(err);

    var viewArticles = articles.map(function (article) {
      return {
        _id: article._id,
        title: article.title,
        createTime: date.toDateTimeString(article.createTime, '/'),
        updateTime: date.toDateTimeString(article.updateTime, '/')
      };
    });

    res.render('admin/article/draft', {
      current: 'draft',
      pageTitle: '草稿',
      articles: viewArticles
    });
  });
};

exports.edit = function (req, res, next) {
  var id = req.params.id;

  article.findOneById(id, function (err, article) {
    if (err)
      return next(err);

    res.render('admin/article/editor', {
      pageTitle: '编辑',
      action: 'update/' + article._id,
      article: {
        title: article.title,
        content: article.content
      }
    });
  });
};

exports.update = function (req, res, next) {
  var id = req.params.id;
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
    article.updateOneById(id, {
      title: title,
      content: content,
      published: publish
    }, function (err) {
      if (err)
        return next(err);

      res.redirect('/note/' + id);
    });
  }
};