'use strict';

var config = require('../../../config');
var should = require('should');
var helper = require('./helper');
var app = require('../../../app');
var request = require('supertest')(app);

describe('test/controllers/admin/home.test.js', function () {
  var cookie;

  before(function (done) {
    helper.login(function (err, ckie) {
      cookie = ckie;
      done(err);
    });
  });

  describe('index', function () {
    it('should redirect to login', function (done) {
      request
        .get('/adnia')
        .expect(302)
        .end(function (err, res) {
          res.text.should.containEql('login');

          done(err);
        });
    });

    it('should view index', function (done) {
      request
        .get('/adnia')
        .set('cookie', cookie)
        .expect(302)
        .end(function (err, res) {
          res.text.should.not.containEql('login');

          done(err);
        });
    });
  });

  describe('login', function () {
    it('should 200', function (done) {
      request
        .get('/adnia/login')
        .expect(200)
        .end(function (err, res) {
          res.text.should.containEql('login');
          done(err);
        });
    });

    it('should redirect to nologin', function (done) {
      request
        .post('/adnia/login')
        .send({
          name: config.adminUsername,
          pwd: config.adminPassword
        })
        .expect(302)
        .end(function (err, res) {
          res.text.should.not.containEql('login');
          done(err);
        });
    });

    it('should redirect to login', function (done) {
      request
        .post('/adnia/login')
        .send({
          name: 'aaa',
          pwd: 'aaa'
        })
        .expect(302)
        .end(function (err, res) {
          res.text.should.containEql('login');
          done(err);
        });
    })
  });
});