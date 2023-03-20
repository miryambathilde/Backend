'use strict';

var validator = require('validator');
var Article = require('../models/article');
var fs = require('fs');
var path = require('path');

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

	getArticles: (req, res) => {

		var last = req.params.last;

		var query = Article.find({});
		if (last || last != undefined) {
			query.limit(5);
		}


		// find to get de data from database
		query.sort('-_id').exec((err, articles) => {
			// return error 
			if (err) {
				return res.status(500).send({
					status: 'error',
					message: 'Error to get the articles'
				});
			}
			if (!articles) {
				return res.status(404).send({
					status: 'error',
					message: 'No articles to show'
				});
			}
			// or return a response with data from database
			return res.status(200).send({
				status: 'success',
				articles: articles
			});
		});
	},

	getArticlebyId: (req, res) => {
		var articleId = req.params.id;
		if (!articleId || articleId == null) {
			return res.status(404).send({
				status: 'error',
				article: "The article doesn't exist"
			});
		}
		Article.findById(articleId, (err, article) => {
			// return error
			if (err || !article) {
				return res.status(404).send({
					status: 'error',
					message: 'The article doesn\'t exist'
				});
			}
			// or return a response with data from database
			return res.status(200).send({
				status: 'success',
				article: article
			});
		}
		);
	},

	// update article
	// update the article with the new data from the request body
	// and save it to the database

	updateArticle: (req, res) => {
		// 1. get the params from article request
		var articleId = req.params.id;
		// 2. Collect the data get from put method
		var params = req.body;

		// 3. validations data
		try {
			var validate_title = !validator.isEmpty(params.title);
			var validate_content = !validator.isEmpty(params.content);
		} catch (error) {
			return res.status(404).send({
				status: 'error',
				article: "The article doesn't exist"
			});
		}

		if (validate_title && validate_content) {
			// find and update
			Article.findOneAndUpdate({ _id: articleId }, params, { new: true }, (err, articleUpdated) => {
				//  return error
				if (err) {
					return res.status(500).send({
						status: 'error',
						message: 'Error to update the article'
					});
				}
				if (!articleUpdated) {
					return res.status(404).send({
						status: 'error',
						article: "The article doesn't exist"
					});
				}
				// or return a response with data from database
				return res.status(200).send({
					status: 'success',
					article: articleUpdated
				});
			});
		} else {
			return res.status(200).send({
				status: 'error',
				message: 'Missing data to update'
			});
		}
	},

	deleteArticle: (req, res) => {
		// get de id from url param
		var articleId = req.params.id;
		// find and delete
		Article.findOneAndDelete({ _id: articleId }, (err, articleDeleted) => {
			// return error
			if (err) {
				return res.status(500).send({
					status: 'error',
					message: 'Error to delete the article'
				});
			}
			if (!articleDeleted) {
				return res.status(404).send({
					status: 'error',
					message: 'The article doesn\'t exist'
				});
			}
			// find and delete
			return res.status(200).send({
				status: 'success',
				message: 'Article deleted correctly',
				article: articleDeleted
			});
		});
	},

	// method to upload files/images
	uploadImage: (req, res) => {
		// configure the connect module multiparty router/article.js
		// get the file from request
		var file_name = 'Image not uploaded...';

		console.log(req.files);

		if (!req.files) {
			return res.status(404).send({
				status: 'error',
				message: file_name
			});
		}
		// get the name and extension file
		var file_path = req.files.file0.path;
		var file_split = file_path.split('\\');
		var file_name = file_split[2];
		var extension_split = file_name.split('\.');
		var file_extension = extension_split[1];

		// Check the extension, only allows images, and if not and image extension valid deleted the file
		if (file_extension != 'jpg' && file_extension != 'jpeg' && file_extension != 'png' && file_extension != 'gif') {
			// delete the file upload
			fs.unlink(file_path, (err) => {
					return res.status(200).send({
						status: 'error',
						message: 'The extension image is not valid',
					});
			});
		} else {
			// if all validations are ok, find the article by id and to assign the image and updated the article with the image
			var articleId = req.params.id;
			Article.findOneAndUpdate({ _id: articleId }, { image: file_name }, { new: true }, (err, articleUpdated) => {
				if (err || !articleUpdated) { 
					return res.status(404).send({
            status: 'error',
            message: 'Error to save the image of article'
          });
				}
				return res.status(200).send({
					status: 'sucess',
					article: articleUpdated
				});
			});
		}
	}
	// end upload file

};

module.exports = controller;