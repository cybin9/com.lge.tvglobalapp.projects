
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
		var GraphData, i, value;
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

		if (GraphData==undefined || GraphData==null)
			GraphData=[];

		console.log("GraphData len : "+GraphData.length)

		this.app.$.StatMainController.getStatBeginDate();
		this.destroyComponents();
		this.render();

		//GraphComponent = new Array(GraphData.length);
		maxIndex=0;
		for (i = 0; i<GraphData.length;i++){
			if (GraphData[i].watchTime>GraphData[maxIndex].watchTime)
				maxIndex = i;
		}
		console.log("destory components");
		prevComps = this.getComponents();

		for (i=0; i<GraphData.length;i++){
			// Make Each Graph Item
			console.log("create FittableColumns : "+i);

			// create component for each graph item (label + graph)
			item = this.createComponent(
																{kind:FittableColumns,
																 showing:true,
																 classes:'graph-item'});

      // create component for each label of graph item
			itemLabel = item.createComponent(
																 {kind:Item,
																 showing:true,
																 classes:'graph-label',
																 content:GraphData[i].label})
			itemLabel.blur();

		  // create component for each graph of graph item
			graph = item.createComponent(
																{kind:ProgressBar,
																	showing:true,
																	showPercentage:false,
																	classes:'graph',
																	popupHeight:50,
																	popupSide:'right',
																	uppercase:false
																	})
			graph.animateProgressTo(GraphData[i].watchTime)
			if (GraphData[i].watchTime>0)
			{
        graph.set("max", GraphData[maxIndex].watchTime);
				graph.set("popupContent", GraphData[i].watchTime+" sec")
				graph.set("popup",true);
			}

			// add component to this scroller area
			this.addComponent(item);
		}
		this.render();
	},

	chStatDataChanged : function(){
		console.log("chStatDataChanged");
		if (this.statType==='ch')
			//&& this.chStatData!==null)
		{
			this.displayResult();
		}
	},
	timePeriodStatDataChanged : function(){
		console.log("timePeriodStatDataChanged");
		if (this.statType==='timePeriod')
			//&& this.timePeriodStatData!==null
			//&& this.timePeriodStatData.length>0)
		{
			this.displayResult();
		}
	},
	weekStatDataChanged : function(){
		console.log("weekStatDataChanged");
		if (this.statType==='week')
			//&& this.weekStatData !==null
			//&& this.weekStatData.length>0)
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
