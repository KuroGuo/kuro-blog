'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest')(app);
var Single_page = require('../../db/single_page');

describe('test/controllers/home.test.js', function () {
  describe('index', function () {
    it('should respond 200', function (done) {
      request
        .get('/')
        .expect(200)
        .end(done);
    });  
  });

  describe('single_pages', function () {
    Single_page.find(function (err, single_pages) {
      if (!single_pages || !single_pages.length) {
        return;
      }

      single_pages.forEach(function (single_page) {
        it('should respond 200', function (done) {
          request
            .get('/' + single_page._id)
            .expect(200)
            .end(function (err, res) {
              res.text.should.containEql(single_page.title);
              done(err);
            });
        });
      });
    });
  });
});