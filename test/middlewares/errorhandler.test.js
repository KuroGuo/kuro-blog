'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest')(app);
var errorhandler = require('../../middlewares/errorhandler');

describe('test/middlewares/errorhandler.test.js', function () {
  before(function () {
    app.get('/test/errorhandler/error', function (req, res, next) {
      next(new Error('Test error'));
    });

    app.get('/test/errorhandler/noerror', function (req, res) {
      res.send('OK');
    });
  });

  it('should respond 500', function (done) {
    request
      .get('/test/errorhandler/error')
      .expect(500)
      .end(function (err, res) {
        res.text.should.containEql('error');
        done(err);
      });
  });

  it('should respond 200', function (done) {
    request
      .get('/test/errorhandler/noerror')
      .expect(200)
      .end(function (err, res) {
        res.text.should.equal('OK');
        done(err);
      });
  });
});