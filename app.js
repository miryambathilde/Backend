'use strict';

// Node modules node to create the server
var express = require('express');
var bodyParser = require('body-parser');


// Express executation (http)
var app = express()

// Routes


// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS (to allow front request)



// Add prefixes to routes

// Routes to test API REST
app.get('/test', (req, res) => {
	res.status(200).send({
		message: 'Welcome to my API REST',
		course: 'Master JS Frameworks',
		author: 'Miryam Bathilde'
	});
	console.log('Welcome to my API REST');
});


// Export module (current file)
module.exports = app;