
var	// Library
	kind = require('enyo/kind'),
	Panel = require('moonstone/Panel'),
	FittableColumns = require('layout/FittableColumns'),
	FittableRows = require('layout/FittableRows'),
	Item = require('moonstone/Item'),
	ProgressBar = require('moonstone/ProgressBar'),
	EnyoObject = require('enyo/CoreObject'),
	PalmService = require('enyo-webos/PalmService'),
	Scroller = require('moonstone/Scroller');

var	// App Objects
	GraphItem = require('./GraphItem'),
	DataController = require('../controls/DataController'),
	GraphComponent = [];

var CONST_WIDTH_OF_GRAPH = 700;
var CONST_COUNT_OF_GRAPH_ITEM = 7;
var index = 0, numOfVisible=0, updateLabel=false, updateGraph=false;
var maxIndex = 0, bound={};

module.exports = kind({
	name:'GraphView',
	//kind:FittableRows,
	//components:GraphComponent,
	classes : 'graph-area',

	published: {
		statType : ""
	},
	chStatData : null,
	timePeriodStatData : null,
	weekStatData : null,
	bindings : [
		{"from": "app.$.StatMainController.chStat", to:"chStatData"},
		{"from": "app.$.StatMainController.timePeriodStat", to:"timePeriodStatData"},
		{"from": "app.$.StatMainController.weekStat", to:"weekStatData"}
	],

	/*
	components : [
		{kind: Scroller, name:'resultArea', classes:'enyo-fill', horizontal: "hidden"}
	],*/
	create : function(){
		this.inherited(arguments);
	},

	displayResult : function(){
		var GraphData, i;
		var item, itemLabel, graph, valueLabel;
		var prevComps
		if (this.statType==='ch')
		{
			GraphData = this.chStatData;
		}
		else if (this.statType==='timePeriod')
		{
			GraphData = this.timePeriodStatData;
		}
		else {	// weekly Static
			GraphData = this.weekStatData;
		}
		console.log("GraphData len : "+GraphData.length)
		var value = 0;
		
		if (GraphData.length==0) 
			return;

		//GraphComponent = new Array(GraphData.length);
		maxIndex=0;
		for (i = 0; i<GraphData.length;i++){
			if (GraphData[i].watchTime>GraphData[maxIndex].watchTime)
				maxIndex = i;

		}
		console.log("destory components");
		prevComps = this.getComponents();
		if (prevComps.length>0)
			this.destroyComponents();
		this.render();

		for (i=0; i<GraphData.length;i++){
			// Make Each Graph Item
			console.log("create FittableColumns : "+i);
			item = this.createComponent({kind:FittableColumns,  showing:true, classes:'graph-item'});
			itemLabel = item.createComponent({kind:Item, showing:true, classes:'graph-label', content:GraphData[i].label})
			graph = item.createComponent({kind:ProgressBar, showing:true,  showPercentage:false, classes:'graph', popupHeight:50, popupSide:'right', max:GraphData[maxIndex].watchTime})
			graph.animateProgressTo(GraphData[i].watchTime)
			if (GraphData[i].watchTime>0)
			{
				graph.set("popupContent", GraphData[i].watchTime+" hr")
				graph.set("popup",true);
				graph.set("uppercase", false);
			}
			itemLabel.blur();
			console.log("created Label : "+ itemLabel.content +" graph : "+grapH.progress);
			this.addComponent(item);
		}
		this.render();
	},

	chStatDataChanged : function(){
		console.log("chStatDataChanged");
		if (this.statType==='ch' 
			&& this.chStatData!==null
			&& this.chStatData.length>0)
		{
			this.displayResult();
		}
	},
	timePeriodStatDataChanged : function(){
		console.log("timePeriodStatDataChanged");
		if (this.statType==='timePeriod' 
			&& this.timePeriodStatData!==null
			&& this.timePeriodStatData.length>0)
		{
			this.displayResult();
		}
	},
	weekStatDataChanged : function(){
		console.log("weekStatDataChanged");
		if (this.statType==='week'
			&& this.weekStatData !==null
			&& this.weekStatData.length>0)
		{
			this.displayResult();
		}
	},

	statTypeChanged : function(inOId){
		if (this.statType==='ch')
		{
			this.app.$.StatMainController.setStatType(0);
		}
		else if (this.statType==='timePeriod')
		{
			this.app.$.StatMainController.setStatType(1);
		}
		else {	// weekly Static
			this.app.$.StatMainController.setStatType(2);
		}
	}
});

