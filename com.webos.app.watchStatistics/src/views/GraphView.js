
var	// Library
	kind = require('enyo/kind'),
	Panel = require('moonstone/Panel'),
	FittableColumns = require('layout/FittableColumns'),
	BodyText = require('moonstone/BodyText'),
	ProgressBar = require('moonstone/ProgressBar'),
	EnyoObject = require('enyo/CoreObject');

var	// App Objects
	GraphItem = require('./GraphItem'),
	DataController = require('../controls/DataController'),
	GraphComponent = [];

module.exports = kind({
	name:'GraphView',
	kind: Panel,
	components:GraphComponent,

	published: {
		statType : "ch",
		GraphData : {}
	},

	statTypeChanged : function(inOId){
		if (this.statType==='ch')
		{
			GraphData = DataController.getChStat();
		}
		else if (this.statType==='timePeriod')
		{
			GraphData = DataController.getTimePeriodStat();
		}
		else {	// weekly Static
			GraphData = DataController.getWeekStat();
		}
		GraphComponent = [];
		for (var item=0; item<GraphData.length; item++)
		{
			var item = new GraphItem();
			item.set('label', GraphItem[item].label);
			item.set('data', GraphItem[item].watchTime);
			GraphComponent.push(item);
		}
	}
});

