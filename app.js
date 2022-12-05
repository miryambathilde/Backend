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



// Add prefixes to routes / Load routes
app.use('/api', article_routes);

// Export module (current file)
module.exports = app;