/**
	For simple applications, you might define all of your views in this file.
	For more complex applications, you might choose to separate these kind definitions
	into multiple files under this folder.
*/

var
	kind = require('enyo/kind'),
	 $L = require('enyo/hooks').$L;

var
	//Panels = require('moonstone/Panels'),
	Panels = require('moonstone-extra/Panels');
	//Panel = require('moonstone/Panel'),
	Panel = require('moonstone-extra/Panel'),
	Tooltip = require('moonstone/Tooltip'),
	IconButton = require('moonstone/IconButton'),
	BodyText = require('moonstone/BodyText'),
	Item = require('moonstone/Item'),
	Divider = require('moonstone/Divider'),
    TooltipDecorator = require('moonstone/TooltipDecorator'),
	FittableColumns = require('layout/FittableColumns'),
	FittableRows = require('layout/FittableRows'),
	GraphView = require('./GraphView'),
	ContextualPopup = require('moonstone/ContextualPopup'),
    ContextualPopupDecorator = require('moonstone/ContextualPopupDecorator'),
    Tooltip = require('moonstone/Tooltip'),
	Dialog = require('moonstone/Dialog'),
	Button = require('moonstone/Button'),
	spotlight = require('spotlight/spotlight'),

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
	editName: null,
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
				{kind: ContextualPopupDecorator, name: "time-unit", components: [
		            {kind: TooltipDecorator, components: [
		                {name: "timeUnitIcon", kind: IconButton, showing:true, small:true, src: "@../../assets/list_action_editchannelnumber_b.svg",
		                    //onSpotlightLeft: "routeLockFocus", onSpotlightRight: "routeLockFocus", onActivate: "toggleButtonHandler",
		                    accessibilityLabel : $L("Select TimeUnit")
		                },
		                {kind: Tooltip, content: $L("TIME UNIT"), accessibilityDisabled: true, position:"above"}
		            ]},
		            {kind: ContextualPopup, name: "timeUnitPopup", /*modal: true, spotlightModal: true,*/ showCloseButton: false, components: [
		                {kind: Item, name: "time_sec", content: $L("Seconds"), 	classes :"itemTextStyle", ontap: "timeUnitButtonHandler"},
		                {kind: Item, name: "time_min", content: $L("Minutes"), 	classes :"itemTextStyle", ontap: "timeUnitButtonHandler"},
						{kind: Item, name: "time_hour", content: $L("Hours"),	classes :"itemTextStyle", ontap: "timeUnitButtonHandler"}
		            ]}
		        ]},
				{kind: ContextualPopupDecorator, name: "SORT", components: [
					{kind: TooltipDecorator, components: [
						{name: "sortIcon", kind: IconButton, showing:true, small:true, src: "@../../assets/list_action_move_y.svg",
							//onSpotlightLeft: "routeLockFocus", onSpotlightRight: "routeLockFocus", onActivate: "toggleButtonHandler",
							accessibilityLabel : $L("Select sort criteria")
						},
						{kind: Tooltip, content: $L("SORT"), accessibilityDisabled: true, position:"above"}
					]},
					{kind: ContextualPopup, name: "sortPopup", /*modal: true, spotlightModal: true,*/ showCloseButton: false, components: [
						{kind: Item, name: "sortLabel", content: $L("Label"), 	classes :"itemTextStyle", ontap: "sortButtonHandler"},
						{kind: Item, name: "sortData", content: $L("Data"), 	classes :"itemTextStyle", ontap: "sortButtonHandler"},
					]}
				]},

		        {kind: TooltipDecorator, components: [
		            {name: "delete", kind: IconButton, showing:true, small:true, src: "@../../assets/list_action_delete_b.svg",
		                ontap: "deleteButtonHandler", accessibilityLabel : $L("DELETE")},
		            {kind: Tooltip, content: $L("Erase all history"), accessibilityDisabled: true, position:"above"}
       		 	]}
			],

			// Body
			components: [{
							kind: FittableColumns,
							name : 'bodyArea',
							components:[
							{
								components: [
									{
										kind: Item, name: "chStat", content: $L("Channel Statistics"),
										ontap : "onTapHandlerChStat"/*, onSpotlightFocused: "onFocusHandler", onSpotlightBlur: "onSpotlightBlurHandler" */
									},
									{
										kind: Item, name: "timeStat",  content: $L("Time-period Statistics"),
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
								 		{kind: Scroller, name:'GraphScoller',horizontal: "hidden", onmousedown: 'mouseDown', components: [
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
								components: [
									{kind: Button, content: 'OK', ontap: 'eraseDataAll'},
									{kind: Button, content: 'Cancel', ontap: 'hideDialog'}
								]
							}
							]
			}]
		}
	],
	sortButtonHandler: function(inSender, inEvent) {
		var watchTimeUnit = 1
        console.log("commonButtonHandler : "+inSender.name)
		if (inSender.name == 'sortLabel'){
			console.log("sort by label")
			this.app.$.StatMainController.set('sortType', 'label')
		}
		else {	// sort data case
			console.log("sort by data")
			this.app.$.StatMainController.set('sortType', 'watchTime')
		}
		this.$.sortPopup.closePopup()
    },
	timeUnitButtonHandler: function(inSender, inEvent) {
		var watchTimeUnit = 1
        console.log("sortButtonHandler : "+inSender.name)
		if (inSender.name == 'time_sec'){
			console.log("seconds case")
			this.$.GraphArea.set('watchTimeUnit', 1)
		}
		else if (inSender.name == 'time_min'){
			console.log("minute case")
			this.$.GraphArea.set('watchTimeUnit', 60)
		}
		else {	// hours case
			console.log("hour case")
			this.$.GraphArea.set('watchTimeUnit', 3600)
		}
		this.$.timeUnitPopup.closePopup()
    },
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
