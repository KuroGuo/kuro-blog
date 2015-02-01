'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest')(app);

describe('test/controllers/home.test.js', function () {
  it('should / 200', function (done) {
    request.get('/').end(function (err, res) {
      res.status.should.equal(200);
      res.text.should.containEql('的博客');
      done(err);
    });
  });
});