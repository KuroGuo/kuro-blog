'use strict';

var router = require('express').Router();

var auth = require('./middlewares/auth');

var home = require('./controllers/home');
var article = require('./controllers/article');
var admin = require('./controllers/admin/home');
var adminArticle = require('./controllers/admin/article');

router.get('/', home.index);
router.get('/note/:id', article.view)
router.get('/about_me', home.aboutMe);

router.get('/adnia', auth.verify, admin.index);
router.get('/adnia/login', admin.loginView);
router.post('/adnia/login', admin.login);
router.get('/adnia/article/create', auth.verify, adminArticle.createView);
router.post('/adnia/article/create', auth.verify, adminArticle.create);
router.get('/adnia/article/edit/:id', auth.verify, adminArticle.edit);
router.post('/adnia/article/update/:id', auth.verify, adminArticle.update);
router.get('/adnia/article/draft', auth.verify, adminArticle.draft);

module.exports = router;
