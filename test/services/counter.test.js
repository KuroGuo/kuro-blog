'use strict';

var should = require('should');
var app = require('../../app');
var counter = require('../../services/counter');

describe('test/services/counter.test.js', function () {
  describe('generateId', function () {
    var testCounter;

    before(function (done) {
      counter.generateId('test', function (err, seq, counter) {
        testCounter = counter;

        done(err);
      });
    });

    after(function (done) {
      testCounter.remove(done);
    });

    it('should generate articleId without error', function (done) {
      counter.generateId('test', function (err, seq) {
        (seq - testCounter.seq).should.equal(1);

        done(err);
      });
    });
  })
});