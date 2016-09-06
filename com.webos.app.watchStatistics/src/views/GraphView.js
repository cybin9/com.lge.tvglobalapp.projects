
var	// Library
	kind = require('enyo/kind'),
	Panel = require('moonstone-extra/Panel'),
	FittableColumns = require('layout/FittableColumns'),
	FittableRows = require('layout/FittableRows'),
	Item = require('moonstone/Item'),
	ProgressBar = require('moonstone/ProgressBar'),
	EnyoObject = require('enyo/CoreObject'),
	PalmService = require('enyo-webos/PalmService'),
	Scroller = require('moonstone/Scroller');

var	// App Objects
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
		statType : "",
		watchTimeUnit : 1
	},
	chStatData : null,
	timePeriodStatData : null,
	weekStatData : null,
	sortType : null,
	bindings : [
		{"from": "app.$.StatMainController.chStat", to:"chStatData"},
		{"from": "app.$.StatMainController.timePeriodStat", to:"timePeriodStatData"},
		{"from": "app.$.StatMainController.weekStat", to:"weekStatData"},
		{"from": "app.$.StatMainController.sortType", to:"sortType"}
	],

	/*
	components : [
		{kind: Scroller, name:'resultArea', classes:'enyo-fill', horizontal: "hidden"}
	],*/
	create : function(){
		this.inherited(arguments);
	},

	displayResult : function(){
		var GraphData, i, value, colorIndex;
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
		var colors = ['graph-color-0', 'graph-color-1','graph-color-2', 'graph-color-3', 'graph-color-4']
		for (i=0; i<GraphData.length;i++){
			colorIndex = i%5

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
												popupHeight:50,
												popupSide:'right',
												uppercase:false,
												classes:'graph'
												})
			if (GraphData[i].watchTime>0)
			{
				var timeUnit = 0, value = 0;
				var timeUnitLabel=''
				if (this.get('watchTimeUnit')==undefined
					|| this.get('watchTimeUnit')==null)
					timeUnit = 1
				else {
					timeUnit = this.get('watchTimeUnit')
				}
				if (timeUnit==1)
					timeUnitLabel = ' sec.'
				else if (timeUnit==60)
					timeUnitLabel = ' min.'
				else
					timeUnitLabel = ' hours.'
				graph.set("max", GraphData[maxIndex].watchTime);
				console.log("watch time : "+GraphData[i].watchTime+" -> "+(GraphData[i].watchTime/timeUnit))

                if (timeUnit>1)
                {
                    timeUnitLabel = (GraphData[i].watchTime/timeUnit).toFixed(1) +timeUnitLabel
                }
                else {
                    timeUnitLabel = (GraphData[i].watchTime/timeUnit) +timeUnitLabel
                }
				graph.animateProgressTo(GraphData[i].watchTime)
				graph.set("popupContent", timeUnitLabel);
				graph.set("popup",true);
			}

			// add component to this scroller area
			this.addComponent(item);
			item.render();
		}
		this.render();
	},

	watchTimeUnitChanged : function(){
		console.log('Watch time unit changed')
		this.statTypeChanged()
		this.displayResult()
	},
	sortTypeChanged : function(){
		console.log("sort type changed ")
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
