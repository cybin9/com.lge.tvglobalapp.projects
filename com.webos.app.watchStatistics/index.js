var options = require('enyo/options');
options.accessibility = true;

//require('enyo-ilib');

var
	ready = require('enyo/ready'),
	logger = require('enyo/logger');

var
	App = require('./src/app');

ready(function () {

	new App({name: 'app'});
	logger.setLogLevel(-1);
});
