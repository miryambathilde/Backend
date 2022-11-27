'use strict';

var mongoose = require('mongoose');


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/api_rest_blog', { useNewUrlParser: true })
	.then(() => {
		console.log('Connection to database done successfully');
	
	});