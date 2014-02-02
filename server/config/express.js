var express = require('express'),
	stylus = require('stylus');

module.exports = function(app, config) {
	function compile(src, path) {
		return stylus(src).set('filename' + path);
	};

	app.configure(function() {
		app.set('views', config.rootPath + '/server/views');
		app.set('view engine', 'jade');
		app.use(express.logger('dev'));
		app.use(express.bodyParser());
		app.use(stylus.middleware({
			src: config.rootPath + '/public',
			compile: compile
		}));
		app.use(express.static(config.rootPath + '/public'));
	});
}