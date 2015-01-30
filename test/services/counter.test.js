'use strict';

var should = require('should');
var app = require('../../app');
var counter = require('../../services/counter');

describe('test/services/counter.test.js', function () {
  describe('generateId', function () {
    var testCounter;

    before(function (done) {
      counter.generateId('test', function (err, seq, counter) {
        if (err)
          return done(err);

        testCounter = counter;

        done();
      });
    });

    after(function (done) {
      testCounter.remove(done);
    });

    it('should generate articleId without error', function (done) {
      counter.generateId('test', function (err, seq) {
        if (err)
          return done(err);

        (seq - testCounter.seq).should.equal(1);

        done();
      });
    });
  })
});