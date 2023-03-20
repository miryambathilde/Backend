'use strict';

var express = require('express');
var ArticleController = require('../controllers/article');

var router = express.Router();

// test routes
router.get('/test-controller', ArticleController.test);
router.post('/data-course', ArticleController.dataCourse);

// article's routes
router.post('/save', ArticleController.save);
router.get('/articles', ArticleController.getArticles);

module.exports = router;