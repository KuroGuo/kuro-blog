'use strict';

var should = require('should');
var crypto = require('../../util/crypto');

describe('test/util/crypto.test.js', function () {
  it('should return MD5-String', function () {
    crypto.createMD5('kuro').should.equal('53861aa015b53456915f6a6ccf8456f5');
  });
});