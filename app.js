'use strict';

// Node modules node to create the server
var express = require('express');
var bodyParser = require('body-parser');


// Express executation (http)
var app = express()

// Routes
var article_routes = require('./routes/article');


// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS (to allow front request)

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});



// Add prefixes to routes / Load routes
app.use('/api', article_routes);

// Export module (current file)
module.exports = app;