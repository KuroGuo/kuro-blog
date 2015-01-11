'use strict';

var router = require('express').Router();

var home = require('./controllers/home');
var adminHome = require('./controllers/admin/home');
var adminArticle = require('./controllers/admin/article');

router.get('/', home.index);

router.get('/about_me', home.aboutMe);

router.get('/admin', adminHome.index);
router.get('/admin/article', adminArticle.index);
router.post('/admin/article/create', adminArticle.create);

module.exports = router;
