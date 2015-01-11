var mongoose = require('mongoose');

var articleSchema = new mongoose.Schema({
	title: String,
	content: String,
	createTime: Date,
	updateTime: Date
})

module.exports = mongoose.model('Article', articleSchema);