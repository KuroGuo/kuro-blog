'use strict';

var should = require('should');
var helper = require('../../helper');
var Single_page = require('../../../db/single_page');
var app = require('../../../app');
var request = require('supertest')(app);

describe('test/controllers/admin/single_page.test.js', function () {
  var cookie;

  before(function (done) {
    helper.login(function (err, ckie) {
      cookie = ckie;
      done(err);
    });
  });

  describe('view list', function () {
    it('should redirect to login', function (done) {
      request
        .get('/adnia/single_page')
        .expect(302)
        .end(function (err, res) {
          res.text.should.containEql('/login');
          done(err);
        });
    });

    it('should view single_page list', function (done) {
      request
        .get('/adnia/single_page')
        .set('cookie', cookie)
        .expect(200)
        .end(function (err, res) {
          res.text.should.not.containEql('/login');
          done(err);
        });
    });
  });

  describe('update', function () {
    var single_page;

    before(function (done) {
      Single_page.findOne(function (err, sg_page) {
        single_page = sg_page;
        done(err);
      });
    });

    it('should redirect to login', function (done) {
      request
        .get('/adnia/single_page/edit/' + single_page._id)
        .expect(302)
        .end(function (err, res) {
          res.text.should.containEql('/login');
          done(err);
        });
    });

    it('should view single_page edit page', function (done) {
      request
        .get('/adnia/single_page/edit/' + single_page._id)
        .set('cookie', cookie)
        .expect(200)
        .end(function (err, res) {
          res.text.should.not.containEql('/login');
          done(err);
        });
    });

    it('should return message', function (done) {
      request
        .post('/adnia/single_page/update/' + single_page._id)
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
        .post('/adnia/single_page/update/' + single_page._id)
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

    it('should preview single_page', function (done) {
      request
        .post('/adnia/single_page/update/' + single_page._id)
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
        .post('/adnia/single_page/update/' + single_page._id)
        .set('cookie', cookie)
        .send({
          title: single_page.title,
          content: single_page.content + ' ' + new Date().getTime()
        })
        .expect(302)
        .end(function (err, res) {
          res.text.should.containEql('/' + single_page._id);
          done(err);
        });
    })
  });
});