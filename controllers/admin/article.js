'use strict';

var article = require('../../services/article');

exports.index = function (req, res) {
	res.render('admin/article/index');
};

exports.create = function (req, res) {
	var title = req.body.title;
	var content = req.body.content;

	article.create(title, content, function () {
		res.send('ok');
	});
};