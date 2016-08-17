var
	FittableColumns = require('layout/FittableColumns'),
	BodyText = require('moonstone/BodyText'),
	ProgressBar = require('moonstone/ProgressBar'),
	kind = require('enyo/kind');

module.exports = kind({
	kind: FittableColumns,
	name : 'GraphItem',
	label : "",
	data : 0,
	components:[
		{
			kind: BodyText, name: 'graphLabel', content: '????'
		},
		{
			kind: ProgressBar, name:'graphValue', style: 'height:30px; width:800px;', progress:300
		}
	],
	

	labelChanged : function(){
		this.$.graphLabel.content = this.label;
	},
	dataChanged: function(){
		this.$.graphValue.animateProgressTo(this.data);
	},

	contructor : function(){
		this.inherited(arguments);
	},

	create: function(){
		this.inherited(arguments);
	}
});