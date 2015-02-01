'use strict';

var should = require('should');
var date = require('../../util/date');

describe('test/util/date.test.js', function () {
  it('should return date-string', function () {
    var dateString = date.toDateString(new Date('1993/06/11'));
    dateString.should.containEql('年');
    dateString.should.containEql('月');
    dateString.should.containEql('日');

    dateString = date.toDateString(new Date('1993/06/11'), '.');
    dateString.should.containEql('.');
  });

  it('should return datetime-string', function () {
    var datetimeString = date.toDateTimeString(new Date('1993/06/11 11:11:11'));
    datetimeString.should.containEql('年');
    datetimeString.should.containEql('月');
    datetimeString.should.containEql('日');
    datetimeString.should.containEql(':');

    datetimeString = date.toDateTimeString(new Date('1993/06/11 11:11:11'), '/');
    datetimeString.should.containEql(':');
    datetimeString.should.containEql('/');
  })
});