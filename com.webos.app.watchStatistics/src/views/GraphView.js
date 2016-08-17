
var	// Library
	kind = require('enyo/kind'),
	Panel = require('moonstone/Panel'),
	FittableColumns = require('layout/FittableColumns'),
	FittableRows = require('layout/FittableRows'),
	BodyText = require('moonstone/BodyText'),
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
	kind: FittableRows,

	//components:GraphComponent,

	published: {
		statType : "",
		GraphData : []
	},

	components : [
		//{kind: Scroller, classes: "enyo-fit", components: [
			{
				kind: FittableColumns, classes:'graph-item', components : [
						{
							kind:BodyText,  classes: 'graph-label', content:''//, content:DataController.chStat[0].label
						},
						{
							kind:ProgressBar, classes: 'graph'//, data:DataController.chStat[0].watchTime
						},


				]
			},
			{
				kind: FittableColumns, classes:'graph-item', components : [
						{
							kind:BodyText,  classes: 'graph-label', content:''//,content:DataController.chStat[1].label
						},
						{
							kind:ProgressBar, classes: 'graph'//, data:DataController.chStat[1].watchTime
						}
				]
			},
			{
				kind: FittableColumns, classes:'graph-item', components : [
						{
							kind:BodyText,  classes: 'graph-label', content:''//,content:DataController.chStat[2].label
						},
						{
							kind:ProgressBar, classes: 'graph'//, data:DataController.chStat[2].watchTime
						}
				]
			},
			{
				kind: FittableColumns, classes:'graph-item', components : [
						{
							kind:BodyText,  classes: 'graph-label', content:''//, content:DataController.chStat[3].label
						},
						{
							kind:ProgressBar, classes: 'graph'//, data:DataController.chStat[3].watchTime
						}
				]
			},
			{
				kind: FittableColumns, classes:'graph-item', components : [
						{
							kind:BodyText,  classes: 'graph-label', content:''//, content:DataController.chStat[4].label
						},
						{
							kind:ProgressBar, classes: 'graph'//, data:DataController.chStat[4].watchTime
						}
				]
			},
			{
				kind: FittableColumns, classes:'graph-item', components : [
						{
							kind:BodyText,  classes: 'graph-label', content:''//m content:DataController.chStat[5].label
						},
						{
							kind:ProgressBar, classes: 'graph'//, data:DataController.chStat[5].watchTime
						}
				]
			},
			{
				kind: FittableColumns, classes:'graph-item', components : [
						{
							kind:BodyText,  classes: 'graph-label', content:''//m content:DataController.chStat[6].label
						},
						{
							kind:ProgressBar, classes: 'graph'//, data:DataController.chStat[6].watchTime
						}
				]
			},
			{
				kind: FittableColumns, classes:'graph-item', components : [
						{
							kind:BodyText,  classes: 'graph-label', content:''//m content:DataController.chStat[6].label
						},
						{
							kind:ProgressBar, classes: 'graph'//, data:DataController.chStat[6].watchTime
						}
				]
			},
			{
				kind: FittableColumns, classes:'graph-item', components : [
						{
							kind:BodyText,  classes: 'graph-label', content:''//m content:DataController.chStat[6].label
						},
						{
							kind:ProgressBar, classes: 'graph'//, data:DataController.chStat[6].watchTime
						}
				]
			},
			{
				kind: FittableColumns, classes:'graph-item', components : [
						{
							kind:BodyText,  classes: 'graph-label', content:''//m content:DataController.chStat[6].label
						},
						{
							kind:ProgressBar, classes: 'graph'//, data:DataController.chStat[6].watchTime
						}
				]
			},
			{
				kind: FittableColumns, classes:'graph-item', components : [
						{
							kind:BodyText,  classes: 'graph-label', content:''//m content:DataController.chStat[6].label
						},
						{
							kind:ProgressBar, classes: 'graph'//, data:DataController.chStat[6].watchTime
						}
				]
			},
			{
				kind: FittableColumns, classes:'graph-item', components : [
						{
							kind:BodyText,  classes: 'graph-label', content:''//m content:DataController.chStat[6].label
						},
						{
							kind:ProgressBar, classes: 'graph'//, data:DataController.chStat[6].watchTime
						}
				]
			},
			{
				kind: FittableColumns, classes:'graph-item', components : [
						{
							kind:BodyText,  classes: 'graph-label', content:''//m content:DataController.chStat[6].label
						},
						{
							kind:ProgressBar, classes: 'graph'//, data:DataController.chStat[6].watchTime
						}
				]
			},
			{
				kind: FittableColumns, classes:'graph-item', components : [
						{
							kind:BodyText,  classes: 'graph-label', content:''//m content:DataController.chStat[6].label
						},
						{
							kind:ProgressBar, classes: 'graph'//, data:DataController.chStat[6].watchTime
						}
				]
			},
			{
				kind: FittableColumns, classes:'graph-item', components : [
						{
							kind:BodyText,  classes: 'graph-label', content:''//m content:DataController.chStat[6].label
						},
						{
							kind:ProgressBar, classes: 'graph'//, data:DataController.chStat[6].watchTime
						}
				]
			},
			{
				kind: FittableColumns, classes:'graph-item', components : [
						{
							kind:BodyText,  classes: 'graph-label', content:''//m content:DataController.chStat[6].label
						},
						{
							kind:ProgressBar, classes: 'graph'//, data:DataController.chStat[6].watchTime
						}
				]
			},
			{
				kind: FittableColumns, classes:'graph-item', components : [
						{
							kind:BodyText,  classes: 'graph-label', content:''//m content:DataController.chStat[6].label
						},
						{
							kind:ProgressBar, classes: 'graph'//, data:DataController.chStat[6].watchTime
						}
				]
			},
			{
				kind: FittableColumns, classes:'graph-item', components : [
						{
							kind:BodyText,  classes: 'graph-label', content:''//m content:DataController.chStat[6].label
						},
						{
							kind:ProgressBar, classes: 'graph'//, data:DataController.chStat[6].watchTime
						}
				]
			},
			{
				kind: FittableColumns, classes:'graph-item', components : [
						{
							kind:BodyText,  classes: 'graph-label', content:''//m content:DataController.chStat[6].label
						},
						{
							kind:ProgressBar, classes: 'graph'//, data:DataController.chStat[6].watchTime
						}
				]
			},
			{
				kind: FittableColumns, classes:'graph-item', components : [
						{
							kind:BodyText,  classes: 'graph-label', content:''//m content:DataController.chStat[6].label
						},
						{
							kind:ProgressBar, classes: 'graph'//, data:DataController.chStat[6].watchTime
						}
				]
			},
			{
				kind: FittableColumns, classes:'graph-item', components : [
						{
							kind:BodyText,  classes: 'graph-label', content:''//m content:DataController.chStat[6].label
						},
						{
							kind:ProgressBar, classes: 'graph'//, data:DataController.chStat[6].watchTime
						}
				]
			},
			{
				kind: FittableColumns, classes:'graph-item', components : [
						{
							kind:BodyText,  classes: 'graph-label', content:''//m content:DataController.chStat[6].label
						},
						{
							kind:ProgressBar, classes: 'graph'//, data:DataController.chStat[6].watchTime
						}
				]
			},
			{
				kind: FittableColumns, classes:'graph-item', components : [
						{
							kind:BodyText,  classes: 'graph-label', content:''//m content:DataController.chStat[6].label
						},
						{
							kind:ProgressBar, classes: 'graph'//, data:DataController.chStat[6].watchTime
						}
				]
			},
			{
				kind: FittableColumns, classes:'graph-item', components : [
						{
							kind:BodyText,  classes: 'graph-label', content:''//, content:DataController.chStat[6].label
						},
						{
							kind:ProgressBar, classes: 'graph'//, data:DataController.chStat[6].watchTime
						}
				]
			}
		//]}
	],

	create : function(){
		var value = 0;
		this.inherited(arguments);
		bound = this.getBounds();
		console.log("Pannel x:"+bound.left+", y:"+bound.top+", w:"+bound.width+", h:"+bound.height);

		for (var i in this.$) {
			/*
			if (this.$[i].kind == ProgressBar) {
				bound = this.$[i].getBounds();
				value = (this.$[i].data / DataController.chStat[0].watchTime) *  100;
				this.$[i].animateProgressTo(value);
				if(!window.PalmSystem){
						console.log("i:"+i+"] progress : "+value+", x:"+bound.left+", y:"+bound.top+", w:"+bound.width+", h:"+bound.height);
				}
			}
			else if(this$[i].kind == BodyText){

			}
			*/
			if(this.$[i].kind == FittableColumns){
				this.$[i].showing = false;
				if(!window.PalmSystem){
					bound = this.$[i].getBounds();
					console.log("FittableColumns x:"+bound.left+", y:"+bound.top+", w:"+bound.width+", h:"+bound.height);
				}
			}
		}

	},

	statTypeChanged : function(inOId){
		var value = 0;
		if (this.statType==='ch')
		{
			GraphData = DataController.chStat;
		}
		else if (this.statType==='timePeriod')
		{
			GraphData = DataController.timePeriodStat;
		}
		else {	// weekly Static
			GraphData = DataController.weekStat;
		}

		//GraphComponent = new Array(GraphData.length);
		maxIndex=0;
		for (var i = 0; i<GraphData.length;i++){
			if (GraphData[i].watchTime>GraphData[maxIndex].watchTime)
				maxIndex = i;
		}
		index=0;
		numOfVisible = 0;
		for (i in this.$) {
			if (this.$[i].kind == BodyText) {
				if (index<GraphData.length){
					this.$[i].content = GraphData[index].label;
					this.$[i].render();
					updateLabel=true;
					console.log("[index:"+index+"] log : "+GraphData[index].label);
					if (updateLabel && updateGraph)
					{
						index++;
						updateLabel=false;
						updateGraph=false;
					}
				}
			}
			else if (this.$[i].kind == ProgressBar) {
				if (index<GraphData.length){
					value = GraphData[index].watchTime;
					this.$[i].max = GraphData[maxIndex].watchTime;
					this.$[i].animateProgressTo(value);
					/*this.$[i].popup=true;
					this.$[i].showPercentage = false;
					this.$[i].popupContent = value.toString();
					this.$[i].render();
					*/
					bound = this.$[i].getBounds();
					console.log("index:"+index+"] progress : "+value+", x:"+bound.left+", y:"+bound.top+", w:"+bound.width+", h:"+bound.height);
					updateGraph=true;
					if (updateLabel && updateGraph)
					{
						index++;
						updateLabel=false;
						updateGraph=false;
					}
				}
				else if (this.$[i].popup){
					this.$[i].popup=false;
				}

			}
			
			else if(this.$[i].kind == FittableColumns){
				if (numOfVisible>=GraphData.length){
					//this.$[i].showing = false;
					this.$[i].hide();
					this.$[i].render();
					console.log("(i:"+numOfVisible+"FittableColumns show!!! x:"+bound.left+", y:"+bound.top+", w:"+bound.width+", h:"+bound.height);
				}
				else {
					this.$[i].show();
					this.$[i].render();
					bound = this.$[i].getBounds();
					console.log("(i:"+numOfVisible+"FittableColumns show!!! x:"+bound.left+", y:"+bound.top+", w:"+bound.width+", h:"+bound.height);
					numOfVisible++;
				}
			}
		}
	}
});

