'use strict';

var singlePage = require('../../services/single_page');
var date = require('../../util/date');
var marked = require('marked');

exports.list = function (req, res, next) {
  singlePage.all(function (err, singlePages) {
    if (err)
      return next(err);

    if (!singlePages.length) {
      singlePage.init(function (err, singlePages) {
        if (err)
          return next(err);

        renderList(res, singlePages);
      });
      return;
    }

    renderList(res, singlePages);
  });
};

exports.edit = function (req, res, next) {
  var id = req.params.id;

  singlePage.findOneById(id, function (err, singlePage) {
    if (err)
      return next(err);

    res.render('admin/single_page/editor', {
      pageTitle: '编辑',
      action: 'update/' + singlePage._id,
      singlePage: {
        title: singlePage.title,
        content: singlePage.content,
        action: 'update'
      }
    });
  });
};

exports.update = function (req, res, next) {
  var id = req.params.id;
  var title = req.body.title;
  var content = req.body.content;

  if (!title || !content) {
    return res.send('标题和内容都不能留空啊，喂');
  }

  if (req.body.preview) {
    res.render('note', {
      current: id,
      pageTitle: title,
      hideTitle: true,
      article: {
        title: title,
        content: marked(content),
        updateTime: date.toDateString(new Date())
      }
    });
  } else {
    singlePage.updateOneById(id, {
      title: title,
      content: content
    }, function (err) {
      if (err)
        return next(err);

      res.redirect('/' + id);
    });
  }
};

function renderList (res, singlePages) {
  singlePages = singlePages.map(function (singlePage) {
    return {
      _id: singlePage._id,
      title: singlePage.title,
      updateTime: date.toDateString(singlePage.updateTime)
    };
  });

  res.render('admin/single_page/list', {
    current: 'single_page',
    titlePage: '独立页',
    single_pages: singlePages
  });
}