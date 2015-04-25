'use strict';

var article = require('../../services/article');
var marked = require('marked');
var date = require('../../utils/date');

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
      pageTitle: title,
      article: {
        title: title,
        content: marked(content),
        updateTime: date.toDateString(new Date())
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
  renderList(req, res, next, article.findDraft, 'draft', '草稿');
};

exports.published = function (req, res, next) {
  renderList(req, res, next, article.findPublished, 'published', '已发布');
};

exports.recycle = function (req, res, next) {
  renderList(req, res, next, article.findDiscarded, 'recycle', '回收站');
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
      pageTitle: title,
      article: {
        title: title,
        content: marked(content),
        updateTime: date.toDateString(new Date())
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

exports.discard = function (req, res, next) {
  var id = req.params.id;

  article.discard(id, function (err) {
    if (err)
      return next(err);

    res.redirect('/adnia/article/recycle');
  });
};

exports.restore = function (req, res, next) {
  var id = req.params.id;

  article.restore(id, function (err) {
    if (err)
      return next(err);

    res.redirect('/adnia/article/draft');
  });
};

function renderList(req, res, next, queryFunc, current, pageTitle) {
   queryFunc(function (err, articles) {
    if (err)
      return next(err);

    var viewArticles = articles.map(function (article) {
      return {
        _id: article._id,
        title: article.title,
        createTime: date.toDateTimeString(article.createTime, '/'),
        updateTime: date.toDateTimeString(article.updateTime, '/'),
        discarded: article.discarded
      };
    });

    res.render('admin/article/list', {
      current: current,
      pageTitle: pageTitle,
      articles: viewArticles
    });
  });
}