var
	FittableColumns = require('layout/FittableColumns'),
	BodyText = require('moonstone/BodyText'),
	ProgressBar = require('moonstone/ProgressBar'),
	kind = require('enyo/kind');

module.exports = kind({
	name : 'GraphItem',
	kind: FittableColumns,
	classes:'graph-item',
	showing: true,
	components : [
					{
						kind:BodyText,  name:"itemLabel", classes: 'graph-label', content:''//m content:DataController.chStat[6].label
					},
					{
						kind:ProgressBar, name:"itemValue", classes: 'graph'//, data:DataController.chStat[6].watchTime
					}
				],
	create: function(){
		this.inherited(arguments);
	}
});