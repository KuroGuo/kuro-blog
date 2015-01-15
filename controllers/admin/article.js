'use strict';

var article = require('../../services/article');

exports.list = function (req, res) {
	res.render('admin/article/list');
};

exports.createView = function (req, res) {
  res.render('admin/article/create', {
    current: 'create'
  });
};

exports.create = function (req, res, next) {
  var title = req.body.title;
  var content = req.body.content;
  var publish = !req.body.save_as_draft;

  if (req.body.preview) {
    res.render('note', {
      article: {
        title: title,
        content: content
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