'use strict';

var express = require('express');
var ArticleController = require('../controllers/article');

var router = express.Router();

// configure the connect module multiparty
var multiparty = require('connect-multiparty');

var md_upload = multiparty({ uploadDir: './upload/articles' });

// test routes
router.get('/test-controller', ArticleController.test);
router.post('/data-course', ArticleController.dataCourse);

// article's routes
router.post('/save', ArticleController.save);
router.get('/articles/:last?', ArticleController.getArticles);
router.get('/article/:id', ArticleController.getArticlebyId);
router.put('/article/:id', ArticleController.updateArticle);
router.delete('/article/:id', ArticleController.deleteArticle);
router.post('/upload-image/:id', md_upload, ArticleController.uploadImage);

module.exports = router;