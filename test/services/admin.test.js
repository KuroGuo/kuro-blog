'use strict';

var should = require('should');
var app = require('../../app');
var admin = require('../../services/admin');

describe('test/services/admin.test.js', function () {
  describe('verify', function () {
    it('should verify without error', function (done) {
      admin.verify('haha', 'hehe', function (err, ok) {
        if (err)
          return done(err);

        ok.should.be.false;

        done();
      });
    });
  });
});