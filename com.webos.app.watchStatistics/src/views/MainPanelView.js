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
	Dialog = require('moonstone/Dialog'),
	Button = require('moonstone/Button'),

    // for scroller
    Scroller = require('moonstone/Scroller'),
	TranslateScrollStrategy = require('enyo/TranslateScrollStrategy'),
	TransitionScrollStrategy = require('enyo/TransitionScrollStrategy'),
	TouchScrollStrategy = require('enyo/TouchScrollStrategy');


var	// App Objects
	GraphComponent = [];

module.exports = kind({
	name: "myapp.MainView",
	kind: Panels,
	classes: "enyo-fit",
	pattern:"activity",

	statBeginDate : null,
	bindings : [
		{"from": "app.$.StatMainController.statBeginDate", to:"statBeginDate"}
	],

	/*handleShowing: false,
	handlers: {
		onApplicationClose: "appCloseHandler"
	},*/
	components: [
		{kind: Panel, title: "Watch Statistics", classes: "moon enyo-fit",
			  headerType: 'medium',
			  allowBackKey: false,
			headerComponents: [
			//	components : [
				{kind: Item, classes:'date-label', name:'dateHeaderLabel', spotlight: false},
		        {kind: TooltipDecorator, components: [
		            {name: "delete", kind: IconButton, showing:true, small:true, src: "@../../assets/list_action_delete_b.svg",
		                ontap: "deleteButtonHandler", accessibilityLabel : $L("DELETE")},
		            {kind: Tooltip, content: $L("Erase all history"), accessibilityDisabled: true, position:"above"}
       		 	]}
			],

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

							},
							{
									name: 'dialog',
									kind: Dialog,
									title: 'Confirm',
									message: 'All data of statistics will be deleted. Do you want to continue?',
									// message: [
									// 	{kind: Button, content: 'Fancy button'}
									// ],
									components: [
										{kind: Button, content: 'OK', ontap: 'eraseDataAll'},
										{kind: Button, content: 'Cancel', ontap: 'hideDialog'}
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
		ev.preventDefault()
	},
	hideDialog: function (sender, ev){
		this.$.dialog.hide()
	},
	deleteButtonHandler: function(sender, ev){
		this.$.dialog.show()
	},
	eraseDataAll: function(sender, ev){
		this.app.$.StatMainController.clearStatDataAll();
		this.$.dialog.hide()
	},
	statBeginDateChanged: function(){
		console.log("statBeginDateChanged")
		//if (this.statBeginDate!=null)
		if (this.statBeginDate==null)
			this.statBeginDate = '';
		console.log("bein date : "+this.statBeginDate)
		this.$.dateHeaderLabel.set('content', 'Histroy from date : '+this.statBeginDate)
		this.$.dateHeaderLabel.render();

	}
});
