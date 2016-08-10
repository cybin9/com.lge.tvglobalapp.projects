
var
	kind = require('enyo/kind'),
	Panel = require('moonstone/Panel'),
	FittableColumns = require('layout/FittableColumns'),
	BodyText = require('moonstone/BodyText'),
	GraphItem = require('./GraphItem'),
	ProgressBar = require('moonstone/ProgressBar');

module.exports = kind({
	name:'myapp.GraphView',
	//kind: FittableColumns,
	classes: 'moon enyo-unselectable',
	components:[
		{
			// No.1 item
			kind: FittableColumns,
			style: 'margin-up:20px;',
			components:[
			{
				kind: BodyText, name: 'item-1', content: '6-1 KBS'
			},
			{
				kind: ProgressBar, progress: 25, style: 'height:30px; width:800px;'
			}
			]
		},
		{
			kind: ProgressBar, progress: 50, style: 'height:30px; width:800px;'
		},
		{
			kind: ProgressBar, progress: 70, style: 'height:30px; width:800px;'
		},
		{
			kind: ProgressBar, progress: 50, style: 'height:30px; width:800px;'
		},
		{
			kind: ProgressBar, progress: 50, style: 'height:30px; width:800px;'
		}
	]
});
