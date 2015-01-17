var mongoose = require('mongoose');

var articleSchema = new mongoose.Schema({
  _id: Number,
	title: String,
	content: String,
	createTime: Date,
	updateTime: Date,
  published: Boolean,
  discarded: Boolean
})

module.exports = mongoose.model('Article', articleSchema);