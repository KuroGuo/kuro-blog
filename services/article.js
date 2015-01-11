'use strict';

var Article = require('../db/article');

exports.create = function (title, content, callback) {
	var now = new Date();

	var article = new Article({
		title: title,
		content: content,
		createTime: now,
		updateTime: now
	});

	article.save(callback);
};

exports.query =function (startId, count, callback) {
	var criteria = startId ? { _id: { $lt: startId } } : null;

	Article
		.find(criteria)
		.sort({ _id: -1 })
		.limit(count)
		.exec(callback);
};