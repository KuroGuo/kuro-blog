'use strict';

var should = require('should');
var app = require('../../app');
var auth = require('../../middlewares/auth');
var request = require('supertest')(app);
var helper = require('../helper');

describe('test/middlewares/auth.test.js', function () {
  var cookie;

  before(function (done) {
    helper.login(function (err, ckie) {
      cookie = ckie;
      done(err);
    });
  });

  describe('verify', function () {
    before(function () {
      app.get('/test/auth/verify', auth.verify, function (req, res) {
        res.send('OK');
      });
    });

    it('should redirect to login', function (done) {
      request
        .get('/test/auth/verify')
        .expect(302)
        .end(function (err, res) {
          res.text.should.containEql('/login');
          done(err);
        });
    });

    it('should return OK', function (done) {
      request
        .get('/test/auth/verify')
        .set('cookie', cookie)
        .expect(200)
        .end(function (err, res) {
          res.text.should.equal('OK');
          done(err);
        });
    });
  });
});