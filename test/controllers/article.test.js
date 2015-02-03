'use strict';

var should = require('should');
var Article = require('../../db/article');
var app = require('../../app');
var request = require('supertest')(app);

describe('test/controllers/article.test.js', function () {
  describe('list', function () {
    it('should respond 200', function (done) {
      request
        .get('/list')
        .expect(200)
        .end(done);
    });
  });

  describe('note', function () {
    it('should view 200', function (done) {
      Article.findOne(function (err, article) {
        if (err)
          return done(err);

        if (article) {
          request.get('/note/' + article._id).end(function (err, res) {
            res.status.should.equal(200);
            res.text.should.containEql(article.title);
            done(err);
          });
        } else {
          done();  
        }
      })
    });

    it('should respond 500', function (done) {
      request
        .get('/note/string')
        .expect(500)
        .end(done);
    });

    it('should respond 404', function (done) {
      request
        .get('/note/999999999999999999999999999999999')
        .expect(404)
        .end(done);
    });
  });
});