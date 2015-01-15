'use strict';

var article = require('../services/article.js');
var marked = require('marked');

exports.view = function (req, res) {
  var id = req.params.id;

  article.findOneById(id, function (err, article) {
    article.content = marked(article.content);
    res.render('note', {
      article: article
    });
  });
};