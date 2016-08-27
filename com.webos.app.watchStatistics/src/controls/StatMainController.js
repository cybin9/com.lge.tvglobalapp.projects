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
		weekStat : null
	},

	defaults: {
		statType : 0,
		maxCount : 7,
		nCount	 : 0,
		chStat : null,
		timePeriodStat : null,
		weekStat : null
	}
});

module.exports = kind({
	name: "StatMainController",
	kind: ModelController,

	components: [
		//getChannelStat
		{
			name: "getChannelStat",
			kind: PalmService,
			service: "luna://com.webos.service.tv.channel",
			method: "getChannelStat",
			onResponse: "getChannelStatResponse"
		},
		{
			name: "getChannelStatBeginDate",
			kind: PalmService,
			service: "luna://com.webos.service.tv.channel",
			method: "getChannelStatBeginDate",
			onResponse: "getChannelStatBeginDateResponse"
		},
		{
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

	getChannelStatResponse:function(inSender, inResponse){
		console.log("getChannelStatResponse start  !!!")
		if(inResponse !== undefined && inResponse !== null){
			console.log("inResponse is  NOT Null !!!")
			if(inResponse.statList !== null && inResponse.nCount!==null){
				console.log("getChannelStatResponse and NOT Null !!!")
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
				else
				{
					this.set("weekStat", inResponse.statList);
					this.set("nCount", inResponse.nCount);
				}
			}

		}
		else
			console.log ("inResponse.statList === null || inResponse.nCount===null ("+ (inResponse.statList === null)+","+(inResponse.nCount === null)+")");
	},

	setStatType : function(sType){
		console.log("Controller:setStatType start!! : "+sType);

		if(this.get("statType")===null || this.get("statType") != sType)
		{
			this.set("statType", sType);
		}
		if (sType === 0){
			var paramCh = {"statType":"0", "maxCount":"24"};
			this.$.getChannelStat.send(paramCh);
			console.log("called --!!lunca service with 0 + "+this.get("maxCount")+" !!!!!!!");
		}
		else if (sType ===1 ){
			var paramTimePeriod = {"statType":"1", "maxCount":"24"};
			this.$.getChannelStat.send(paramTimePeriod);
			console.log("called --!!lunca service with 1 + "+this.get("maxCount")+" !!!!!!!");
		}
		else
		{
			var paramWeek = {"statType":"2", "maxCount":"24"};
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
	}
});
