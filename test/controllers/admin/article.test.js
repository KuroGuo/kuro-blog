'use strict';

var should = require('should');
var helper = require('../../helper');
var Article = require('../../../db/article');
var app = require('../../../app');
var request = require('supertest')(app);

describe('test/controllers/admin/article.test.js', function () {
  var cookie;

  before(function (done) {
    helper.login(function (err, ckie) {
      cookie = ckie;
      done(err);
    });
  });

  describe('create', function () {
    it('should redirect to login', function (done) {
      request
        .get('/adnia/article/create')
        .expect(302)
        .end(function (err, res) {
          res.text.should.containEql('/login');
          done(err);
        });
    });

    it('should view create', function (done) {
      request
        .get('/adnia/article/create')
        .set('cookie', cookie)
        .expect(200)
        .end(function (err, res) {
          res.text.should.containEql('写文章');
          done(err);
        });
    });

    it('should redirect to login', function (done) {
      request
        .post('/adnia/article/create')
        .send({
          title: 'hehe',
          content: 'haha'
        })
        .expect(302)
        .end(function (err, res) {
          res.text.should.containEql('/login');
          done(err);
        });
    });

    it('should response message', function (done) {
      request
        .post('/adnia/article/create')
        .send({
          title: '',
          content: 'hehe'
        })
        .set('cookie', cookie)
        .expect(200)
        .end(function (err, res) {
          res.text.should.containEql('留空');
          done(err);
        });
    });

    it('should response message', function (done) {
      request
        .post('/adnia/article/create')
        .send({
          title: 'fsfsd',
          content: ''
        })
        .set('cookie', cookie)
        .expect(200)
        .end(function (err, res) {
          res.text.should.containEql('留空');
          done(err);
        });
    });

    it('should preview article', function (done) {
      request
        .post('/adnia/article/create')
        .set('cookie', cookie)
        .send({
          title: 'Preview',
          content: 'Test Preview',
          preview: true
        })
        .expect(200)
        .end(function (err, res) {
          res.text.should.containEql('Test Preview');
          done(err);
        });
    });

    it('should create a article', function (done) {
      request
        .post('/adnia/article/create')
        .send({
          title: '呵呵-测试发布文章 ' + new Date().getTime(),
          content: '测试发布文章'
        })
        .set('cookie', cookie)
        .expect(302)
        .end(function (err, res) {
          res.text.should.containEql('/note/');
          done(err);
        });
    });
  });

  describe('view list', function () {
    it('should redirect to login', function (done) {
      request
        .get('/adnia/article/draft')
        .expect(302)
        .end(function (err, res) {
          res.text.should.containEql('/login');
          done(err);
        });
    });

    it('should view draft', function (done) {
      request
        .get('/adnia/article/draft')
        .set('cookie', cookie)
        .expect(200)
        .end(function (err, res) {
          res.text.should.containEql('/list');
          res.text.should.containEql('草稿');
          done(err);
        });
    });

    it('should redirect to login', function (done) {
      request
        .get('/adnia/article/published')
        .expect(302)
        .end(function (err, res) {
          res.text.should.containEql('/login');
          done(err);
        });
    });

    it('should view published', function (done) {
      request
        .get('/adnia/article/published')
        .set('cookie', cookie)
        .expect(200)
        .end(function (err, res) {
          res.text.should.containEql('/list');
          res.text.should.containEql('已发布');
          done(err);
        });
    });

    it('should redirect to login', function (done) {
      request
        .get('/adnia/article/recycle')
        .expect(302)
        .end(function (err, res) {
          res.text.should.containEql('/login');
          done(err);
        });
    });

    it('should view recycle', function (done) {
      request
        .get('/adnia/article/recycle')
        .set('cookie', cookie)
        .expect(200)
        .end(function (err, res) {
          res.text.should.containEql('/list');
          res.text.should.containEql('回收站');
          done(err);
        });
    });
  });

  describe('update', function () {
    var article;

    before(function (done) {
      Article.findOne(function (err, atcle) {
        article = atcle;
        done(err);
      });
    });

    it('should redirect to login', function (done) {
      request
        .get('/adnia/article/edit/' + article._id)
        .expect(302)
        .end(function (err, res) {
          res.text.should.containEql('/login');
          done(err);
        });
    });

    it('should view edit', function (done) {
      request
        .get('/adnia/article/edit/' + article._id)
        .set('cookie', cookie)
        .expect(200)
        .end(function (err, res) {
          res.text.should.containEql(article.title);
          done(err);
        });
    });

    it('should return message', function (done) {
      request
        .post('/adnia/article/update/' + article._id)
        .set('cookie', cookie)
        .send({
          title: '',
          content: 'hehe'
        })
        .expect(200)
        .end(function (err, res) {
          res.text.should.containEql('留空');
          done(err);
        });
    });

    it('should return message', function (done) {
      request
        .post('/adnia/article/update/' + article._id)
        .set('cookie', cookie)
        .send({
          title: 'hehe',
          content: ''
        })
        .expect(200)
        .end(function (err, res) {
          res.text.should.containEql('留空');
          done(err);
        });
    });

    it('should preview article', function (done) {
      request
        .post('/adnia/article/update/' + article._id)
        .set('cookie', cookie)
        .send({
          title: 'Preview',
          content: 'Test Preview',
          preview: true
        })
        .expect(200)
        .end(function (err, res) {
          res.text.should.containEql('Test Preview');
          done(err);
        });
    });

    it('should redirect to note', function (done) {
      request
        .post('/adnia/article/update/' + article._id)
        .set('cookie', cookie)
        .send({
          title: article.title,
          content: article.content + ' ' + new Date().getTime()
        })
        .expect(302)
        .end(function (err, res) {
          res.text.should.containEql('/note/');
          done(err);
        });
    })
  });

  describe('discard', function () {
    var article;

    before(function (done) {
      Article.findOne(function (err, atcle) {
        article = atcle;
        done(err);
      });
    });

    it('should redirect to login', function (done) {
      request
        .post('/adnia/article/discard/' + article._id)
        .expect(302)
        .end(function (err, res) {
          res.text.should.containEql('/login');
          done(err);
        });
    });

    it('should discard a article', function (done) {
      request
        .post('/adnia/article/discard/' + article._id)
        .set('cookie', cookie)
        .expect(302)
        .end(function (err, res) {
          res.text.should.not.containEql('/login');
          done(err);
        });
    });
  });

  describe('restore', function () {
    var article;

    before(function (done) {
      Article.findOne(function (err, atcle) {
        article = atcle;
        done(err);
      });
    });

    it('should redirect to login', function (done) {
      request
        .post('/adnia/article/restore/' + article._id)
        .expect(302)
        .end(function (err, res) {
          res.text.should.containEql('/login');
          done(err);
        });
    });

    it('should restore a article', function (done) {
      request
        .post('/adnia/article/restore/' + article._id)
        .set('cookie', cookie)
        .expect(302)
        .end(function (err, res) {
          res.text.should.not.containEql('/login');
          done(err);
        });
    });
  });
});