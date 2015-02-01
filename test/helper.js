'use strict';

var config = require('../config');
var app = require('../app');
var request = require('supertest')(app);

exports.login = function (callback) {
  request
    .post('/adnia/login')
    .send({
      name: config.adminUsername,
      pwd: config.adminPassword
    })
    .expect(302)
    .end(function (err, res) {
      var cookie = res.headers['set-cookie'][0].split(';')[0];
      callback.call(this, err, cookie);
    });
};