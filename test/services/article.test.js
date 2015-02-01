'use strict';

var should = require('should');
var app = require('../../app.js');
var Article = require('../../db/article');
var article = require('../../services/article');

describe('test/services/article.test.js', function () {
  describe('create', function () {
    it('should create without error', function (done) {
        article.create({
          title: 'I\'m Kuro',
          content: 'Haha.',
          published: true
        }, function (err, article) {
          if (err) {
            should.not.exist(article._id);
            return done(err);
          }

          article.createTime.should.equal(article.updateTime);
          should.exist(article._id);

          article.remove(done);
        });
    });
  });

  describe('tempArticle', function () {
    var tempArticle;

    before(function (done) {
      article.create({
        title: 'Test',
        content: 'Test update.',
        published: true
      }, function (err, article) {
        tempArticle = article;

        done(err);
      });
    });

    after(function (done) {
      tempArticle.remove(done);
    });

    it('should query without error', function (done) {
      article.query({
        criteria: { _id: tempArticle._id }
      }, function (err, dbArticle) {
        dbArticle.length.should.be.above(0);

        done(err);
      });
    });

    it('should findPublished without error', function (done) {
      article.findPublished(function (err, articles) {
        articles.length.should.above(0);

        done(err);
      });
    });

    it('should findDraft without error', function (done) {
      article.updateOneById(tempArticle._id, { published: false }, function (err) {
        if (err)
          return done(err);

        article.findDraft(function (err, articles) {
          articles.length.should.above(0);

          done(err);
        });
      });
    });

    it('should findDiscarded without error', function (done) {
      article.discard(tempArticle._id, function (err) {
        article.findDiscarded(function (err, articles) {
          articles.length.should.above(0);

          done(err);
        });
      });
    });

    it('should findOneById without error', function (done) {
      article.findOneById(tempArticle._id, function (err, article) {
        article._id.should.equal(tempArticle._id);

        done(err);
      });
    });

    it('should updateOneById without error', function (done) {
      article.updateOneById(tempArticle._id, {
        title: 'haha'
      }, done);
    });

    it('should discard without error', function (done) {
      article.discard(tempArticle._id, done);
    });

    it('should restore without error', function (done) {
      article.restore(tempArticle._id, done);
    });
  });
});