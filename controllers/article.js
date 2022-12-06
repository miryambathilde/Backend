'use strict';

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
	}
};

module.exports = controller;