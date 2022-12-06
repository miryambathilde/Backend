'use strict';

var mongoose = require('mongoose');
var app = require('./app');
// localhost:3900
var port = 3900;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/api_rest_blog', { useNewUrlParser: true })
	.then(() => {
		console.log('Connection to database done successfully');

		// Create server and listen to http requests
		app.listen(port, () => {
			console.log('Server running on http://localhost:' + port);
		});
	});