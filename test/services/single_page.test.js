'use strict';

var should = require('should');
var app = require('../../app');
var Single_page = require('../../db/single_page');
var single_page = require('../../services/single_page');
var async = require('async');

describe('test/services/single_page.test.js', function () {
  describe('tempSingle_page', function () {
    var tempSingle_page;

    before(function (done) {
      tempSingle_page = new Single_page({
        _id: 'test',
        title: 'Test',
        content: '',
        updateTime: new Date()
      });

      tempSingle_page.save(done);
    });

    after(function (done) {
      tempSingle_page.remove(done);
    });

    it('should findOneById without error', function (done) {
      single_page.findOneById(tempSingle_page._id, function (err, single_page) {
        if (err)
          return done(err);

        single_page._id.should.equal(tempSingle_page._id);

        done();
      });
    });

    it('should query without error', function (done) {
      single_page.query({
        criteria: { _id: tempSingle_page._id }
      }, function (err, single_pages) {
        if (err)
          return done(err);

        single_pages.length.should.equal(1);
        single_pages[0]._id.should.equal(tempSingle_page._id);

        done();
      });
    });

    it('should find all without error', function (done) {
      single_page.all(function (err, single_pages) {
        if (err)
          return done(err);

        single_pages.length.should.above(0);

        done();
      });
    });

    it('should updateOneById without error', function (done) {
      single_page.updateOneById(tempSingle_page._id, { content: 'erhuo' }, done);
    });
  });

  describe('allAndCreate', function () {
    before(function (done) {
      Single_page.find(null, function (err, single_pages) {
        if (err)
          return done(err);

        async.each(single_pages, function (single_page, done) {
          single_page.title = 'testbak_' + single_page.title;
          single_page.save(done);
        }, done);
      });
    });

    after(function (done) {
      Single_page.remove({ title: { $not: /^testbak_.+$/ } }, function (err) {
        if (err)
          return done(err);

        Single_page.find(null, function (err, single_pages) {
          if (err)
            return done(err);

          async.each(single_pages, function (single_page, done) {
            single_page.title = single_page.title.substring('testbak_'.length);
            single_page.save(done);
          }, done);
        });
      });
    });

    it('should allAndCreate without error', function (done) {
      single_page.allAndCreate(function (err, single_pages) {
        if (err)
          return done(err);

        single_pages.length.should.above(0);

        done();
      });
    });
  });
});