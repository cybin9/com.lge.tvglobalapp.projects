var
	FittableColumns = require('layout/FittableColumns'),
	BodyText = require('moonstone/BodyText'),
	ProgressBar = require('moonstone/ProgressBar'),
	kind = require('enyo/kind');

module.exports = kind({
	kind: FittableColumns,
	name : 'GraphItem',
	published : {
		label : "",
		data : 0
	},
	components:[
		{
			kind: BodyText, name: 'graphLabel'
		},
		{
			kind: ProgressBar, name:'graphValue', style: 'height:30px; width:800px;'
		}
	],
	/*
	bindings : [
		{from:this.label, to:this.$.graphLabel.content},
		{from:this.data, to:this.$.graphValue.progress}
	],
	*/

	labelChanged : function(){
		this.$.graphLabel.content = label;
	},
	dataChanged: function(){
		this.$.graphValue.progress = data;
	},

	contructor : function(){
		this.inherited(arguments);
	},

	create: function(){
		this.inherited(arguments);
		if (arguments.length===2)
		{
			label = arguments[0];
			data = arguments[1];
		}
	}
});