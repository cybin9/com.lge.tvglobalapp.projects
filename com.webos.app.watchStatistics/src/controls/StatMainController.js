var
	kind = require('enyo/kind'),
	model = require('enyo/Model'),
	PalmService = require('enyo-webos/PalmService'),
	ModelController = require('enyo/ModelController');

var statModel = kind({
	name: "StatModel",
	kind: model,
	attributes: {
		statType : 0,
		maxCount : 0,
		nCount	 : 0,
		chStat : null,
		timePeriodStat : null,
		weekStat : null,
		statBeginDate : null,
		sortType : null
	},

	defaults: {
		statType : 0,
		maxCount : 7,
		nCount	 : 0,
		chStat : null,
		timePeriodStat : null,
		weekStat : null,
		statBeginDate : null,
		sortType : null
	}
});

module.exports = kind({
	name: "StatMainController",
	kind: ModelController,

	components: [
		{	//getChannelStat
			name: "getChannelStat",
			kind: PalmService,
			service: "luna://com.webos.service.tv.channel",
			method: "getChannelStat",
			onResponse: "getChannelStatResponse"
		},

		{	// get begin date of statistics
			name: "getChannelStatBeginDate",
			kind: PalmService,
			service: "luna://com.webos.service.tv.channel",
			method: "getChannelStatBeginDate",
			onResponse: "getChannelStatBeginDateResponse"
		},

		{ 	// clear all stat. data
			name: "clearChannelStatAll",
			kind: PalmService,
			service: "luna://com.webos.service.tv.channel",
			method: "clearChannelStatAll",
			onResponse: "clearChannelStatAllResponse"
		}
	],

	create: function() {
		this.inherited(arguments);
		this.set("model", new statModel());
		this.set("maxCount", 24);
	},
	clearStatDataAll : function(inRequest, inResponse){
		console.log("clearStatDataAll called !!!!")
		var param = {};
		this.$.clearChannelStatAll.send(param);
	},

	getStatBeginDate : function(){
		console.log("getStatBeginDate Start !!!! send luna to getStatBeginDate")
		var param = {};
		this.$.getChannelStatBeginDate.send(param);
	},

	getChannelStatBeginDateResponse: function(inSender, inResponse){
		console.log("getChannelStatBeginDateResponse Start.")
		if(inResponse !== undefined && inResponse !== null){
			console.log("inResponse is  NOT Null !!!")
			if(inResponse.statBeginDate !== null){
				console.log("statBeginDate and NOT Null !!!")
				this.set("statBeginDate", inResponse.statBeginDate);
			}
			else{
				this.set("statBeginDate", null);
			}
		}
	},

	clearChannelStatAllResponse: function(inSender, inResponse){
		console.log("clearChannelStatAllResponse Start !!!")
		this.getStatBeginDate();
		//this.updateStatResult(this.get('statType'));

		this.set("chStat", null);
		this.set("weekStat", null);
		this.set("weekStat", null);

	},
	getChannelStatResponse:function(inSender, inResponse){
		console.log("getChannelStatResponse start  !!!")
		if(inResponse !== undefined && inResponse !== null){
			console.log("inResponse is  NOT Null !!!")
			if(inResponse.statList !== null && inResponse.nCount!==null){
				console.log("statList and nCount NOT Null !!!")
				if (this.get("statType")===0)
				{
					this.set("chStat", inResponse.statList);
					this.set("nCount", inResponse.nCount);
				}
				else if (this.get("statType")===1)
				{
					this.set("timePeriodStat", inResponse.statList);
					this.set("nCount", inResponse.nCount);
				}
				else if (this.get("statType")===2)
				{
					this.set("weekStat", inResponse.statList);
					this.set("nCount", inResponse.nCount);
				}
				else {}
			}
		}
	},

	setStatType : function(sType){
		var orderType = "1"
		console.log("Controller:setStatType start!! : "+sType+ " sort : "+this.get("sortType"));
		if (this.get("sortType")=='watchTime')
			orderType = "1"
		else // sort type is label
			orderType = "0"

		if(this.get("statType")===null || this.get("statType") != sType)
		{
			this.set("statType", sType);
		}
		if (sType === 0){
			var paramCh = {"statType":"0", "maxCount":"24", "order":orderType};
			this.$.getChannelStat.send(paramCh);
			console.log("called --!!lunca service with 0 + "+this.get("maxCount")+" !!!!!!!");
		}
		else if (sType ===1 ){
			var paramTimePeriod = {"statType":"1", "maxCount":"24", "order":orderType};
			this.$.getChannelStat.send(paramTimePeriod);
			console.log("called --!!lunca service with 1 + "+this.get("maxCount")+" !!!!!!!");
		}
		else
		{
			var paramWeek = {"statType":"2", "maxCount":"24", "order":orderType};
			this.$.getChannelStat.send(paramWeek);
			console.log("called --!!lunca service with 2 + "+this.get("maxCount")+" !!!!!!!");
		}
	},
	setChStat : function(chStatistic){
		if(this.get("chStat")===null || this.get("chStat") != chStatistic)
			this.set("chStat", chStatistic);
	},
	setTimePeriodStat : function(timePeriodStatistics){
		if(this.get("timePeriodStat")===null || this.get("timePeriodStat") != timePeriodStatistics)
			this.set("timePeriodStat", timePeriodStatistics);
	},
	setWeekStat : function(weekStatistics){
		if(this.get("weekStat")===null || this.get("weekStat") != weekStatistics)
			this.set("weekStat", weekStatistics);
	},
	setNCount : function(nCount){
		if(this.get("nCount")===null || this.get("nCount")!=nCount)
			this.set("nCount", nCount);
	},
	setMaxCount: function(maxCnt){
		if(this.get("maxCount")===null)
			this.set("maxCount", maxCnt);
	},
	setSortType: function(sortType){
		console.log("setSortType : "+sortType);

		if(this.get("sortType")===null || this.get("sortType")!=sortType)
		{
			this.set("sortType", sortType);
		}
	}
});
