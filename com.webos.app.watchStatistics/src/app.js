/**
	Define and instantiate your enyo.Application kind in this file.  Note,
	application rendering should be deferred until DOM is ready by wrapping
	it in a call to enyo.ready().
*/

var
	kind = require('enyo/kind'),
	Application = require('enyo/Application');

var 
	MainPanelView = require('./views/MainPanelView'),
	StatMainController = require('./controls/StatMainController');



module.exports = kind({
	name: "myapp.Application",
	kind: Application,
	view: MainPanelView,

	components : [
		{
			name : "StatMainController",
			kind : StatMainController
		}
	]
});

