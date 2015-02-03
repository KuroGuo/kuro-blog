'use strict';

var router = require('express').Router();

var auth = require('./middlewares/auth');

var home = require('./controllers/home');
var article = require('./controllers/article');
var admin = require('./controllers/admin/home');
var adminArticle = require('./controllers/admin/article');
var adminSinglePage = require('./controllers/admin/single_page');

router.get('/', home.index);
router.get('/list', article.list);
router.get('/note/:id', article.view)
router.get('/about_me', home.aboutMe);
router.get('/projects', home.projects);

router.get('/adnia', auth.verify, admin.index);

router.get('/adnia/login', admin.loginView);
router.post('/adnia/login', admin.login);

router.get('/adnia/article/create', auth.verify, adminArticle.createView);
router.post('/adnia/article/create', auth.verify, adminArticle.create);
router.get('/adnia/article/edit/:id', auth.verify, adminArticle.edit);
router.post('/adnia/article/update/:id', auth.verify, adminArticle.update);
router.get('/adnia/article/draft', auth.verify, adminArticle.draft);
router.get('/adnia/article/published', auth.verify, adminArticle.published);
router.get('/adnia/article/recycle', auth.verify, adminArticle.recycle);
router.all('/adnia/article/discard/:id', auth.verify, adminArticle.discard);
router.all('/adnia/article/restore/:id', auth.verify, adminArticle.restore);

router.get('/adnia/single_page', auth.verify, adminSinglePage.list);
router.get('/adnia/single_page/edit/:id', auth.verify, adminSinglePage.edit);
router.post('/adnia/single_page/update/:id', auth.verify, adminSinglePage.update);

module.exports = router;
