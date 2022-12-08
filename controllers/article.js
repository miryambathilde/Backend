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
		console.log(params)

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
			return res.status(200).send({
				status: 'success',
				message: 'Validation Success'
			});
			// create the object to save

			// assign values to the object

			// save the article

			// return a response

			return res.status(200).send({
				message: 'I am the action save from the controller of articles',
				article: params
			});
		} else {
			return res.status(200).send({
				status: 'error',
				message: 'The data is not valid'
			});
		}
	},

};

module.exports = controller;