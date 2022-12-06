'use strict';

var express = require('express');
var ArticleController = require('../controllers/article');

var router = express.Router();

router.get('/test-controller', ArticleController.test);
router.post('/data-course', ArticleController.dataCourse);

module.exports = router;