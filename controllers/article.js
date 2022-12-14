'use strict';

var validator = require('validator');
var Article = require('../models/article');

var controller = {
	dataCourse: (req, res) => {
		res.status(200).send({
			message: 'Welcome to my API REST',
			course: 'Master JS Frameworks',
			author: 'Miryam Bathilde'
		});
		console.log('Welcome to my API REST');
	},

	test: (req, res) => {
		return res.status(200).send({
			message: 'I am the action test from the controller of articles'
		});
	},

	// method to save de articles
	save: (req, res) => {
		// 1. get the params from post request
		var params = req.body;
		console.log(params);

		// 2. validate the data (validator)
		try {
			var validate_title = !validator.isEmpty(params.title);
			var validate_content = !validator.isEmpty(params.content);
		} catch (err) {
			return res.status(200).send({
				status: 'error',
				message: 'Missing data to send'
			});
		}

		if (validate_title && validate_content) {
			// create the object to save
			var article = new Article();

			// assign values to the object
			article.title = params.title;
			article.content = params.content;
			article.image = null;

			// save the article
			article.save((err, articleSaved) => {
				// return error 
				if (err || !articleSaved) {
					return res.status(404).send({
						status: 'error',
						message: 'The article has not been saved!'
					});
				}
				// or return a response
				return res.status(200).send({
					status: 'success',
					article: articleSaved
				});
			});
		}
		else {
			return res.status(200).send({
				status: 'error',
				message: 'The data is not valid'
			});
		}
	},

};

module.exports = controller;