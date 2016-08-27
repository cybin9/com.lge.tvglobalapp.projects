/**
	For simple applications, you might define all of your views in this file.
	For more complex applications, you might choose to separate these kind definitions
	into multiple files under this folder.
*/

var
	kind = require('enyo/kind'),
	 $L = require('enyo/hooks').$L;

var
	Panels = require('moonstone/Panels'),
	//Panels = require('moonstone-extra/Panels');
	Panel = require('moonstone/Panel'),
	//Panel = require('moonstone-extra/Panel'),
	Tooltip = require('moonstone/Tooltip'),
	IconButton = require('moonstone/IconButton'),
	BodyText = require('moonstone/BodyText'),
	Item = require('moonstone/Item'),
	Divider = require('moonstone/Divider'),
    TooltipDecorator = require('moonstone/TooltipDecorator'),
	FittableColumns = require('layout/FittableColumns'),
	FittableRows = require('layout/FittableRows'),
	GraphView = require('./GraphView'),
    Tooltip = require('moonstone/Tooltip'),

    // for scroller
    Scroller = require('moonstone/Scroller'),
	TranslateScrollStrategy = require('enyo/TranslateScrollStrategy'),
	TransitionScrollStrategy = require('enyo/TransitionScrollStrategy'),
	TouchScrollStrategy = require('enyo/TouchScrollStrategy');


var	// App Objects
	GraphItem = require('./GraphItem'),
	DataController = require('../controls/DataController'),
	GraphComponent = [];

module.exports = kind({
	name: "myapp.MainView",
	kind: Panels,
	classes: "enyo-fit",
	pattern:"activity",
	/*handleShowing: false,
	handlers: {
		onApplicationClose: "appCloseHandler"
	},*/
	components: [
		{kind: Panel, title: "Watch Statistics", classes: "moon enyo-fit",
			  headerType: 'medium',
			  allowBackKey: false,
			// Header (buttons)
			headerComponents: [
	        {kind: TooltipDecorator, components: [
	            {name: "analogdelete", kind: IconButton, showing:true, small:true, src: "@../../assets/list_action_delete_b.svg",
	                /*ontap: "commonButtonHandler",*/ accessibilityLabel : $L("DELETE")},
	            {kind: Tooltip, content: $L("Erase all history"), accessibilityDisabled: true, position:"above"}
       		 ]}],

			// Body
			components: [{
							kind: FittableColumns,
							//noStretch: true,
							components:[
							{
								components: [
									{
										kind: Item, name: "chStat", content: $L("Most Watched Channels"),
										ontap : "onTapHandlerChStat"/*, onSpotlightFocused: "onFocusHandler", onSpotlightBlur: "onSpotlightBlurHandler" */
									},
									{
										kind: Item, name: "timeStat",  content: $L("Most Watched Time-period"),
										ontap : "onTapHandlerTimePeriodStat"/*, onSpotlightFocused: "onFocusHandler", onSpotlightBlur: "onSpotlightBlurHandler"
										accessibilityHint: "," + $L("You can edit a list of favorites such as add to favorites, delete, etc.")*/
									},
									{
										kind: Item, name: "weekStat",  content: $L("Weekly Statistics"),
										ontap : "onTapHandlerWeekStat"/*, onSpotlightFocused: "onFocusHandler", onSpotlightBlur: "onSpotlightBlurHandler"
										accessibilityHint: "," + $L("You can edit a list of favorites such as add to favorites, delete, etc.")*/
									}

								]
							},
							{
								components:[
								 		{kind: Scroller, horizontal: "hidden", onmousedown: 'mouseDown', components: [
											{
												kind: GraphView,
												classes: 'graph-area',
												name: "GraphArea"
											}
										]}
								]

							}
							]
			}]
		}
		//{kind: Panel, classes: 'enyo-fit', title: 'Watch Statistics', components: [
		//					{kind: Item, name:'chStat', content: 'Most Watched Channels'},
		//					{kind: Item, name:'timeStat', content: 'Most Watched Time-period'},
		//					{kind: Item, name:'weekStat', content: 'Weekly Statistics'},
		//				]}
	],
	onTapHandlerChStat: function (sender, ev) {
		this.$.GraphArea.set('statType', 'ch');
		this.render();
		//GraphArea.render();
		return true;
	},
	onTapHandlerTimePeriodStat: function (sender, ev) {
		this.$.GraphArea.set('statType','timePeriod');
		//GraphArea.render();
		this.render();
		return true;
	},
	onTapHandlerWeekStat: function (sender, ev) {
		this.$.GraphArea.set('statType','week');
		//GraphArea.render();
		this.render();
		return true;
	},
	mouseDown: function (sender, ev) {
		ev.preventDefault();
	}
});
