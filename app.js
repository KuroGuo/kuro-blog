'use strict';

var config = require('./config');
var express = require('express');
var session = require('express-session');
var compression = require('compression');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
var MongoStore = require('connect-mongo')(session);
var webRouter = require('./web_router');
var path = require('path');
var errorhandler = require('./middlewares/errorhandler');

mongoose.connection.on('error', function (err) {
  console.error(err);
});

mongoose.connect(config.db);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use('/static', express.static(path.join(__dirname, 'static')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.use(session({
  secret: config.sessionSecret,
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({ db: mongoose.connection.db })
}));

app.use(webRouter);

if (!process.env.TEST) {
  app.use(function (req, res) {
    res.redirect('/');
  });
}

app.use(errorhandler);

app.listen(config.port, function () {
  console.log('Listenning port ' + config.port);
});

module.exports = app;