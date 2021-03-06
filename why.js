var answeredTabs = [];
const retriggerThreshold = 5;
var urlChanges = 1; //if exceeds retriggerThreshold, then retrigger WHY
var reasonCount = {};
var blacklist, whitelist;
const minReasonLength = 5;

// Some links might include redirects, which triggers the event twice. This prevents the two unncessary calls.
var tabsBeingProcessed = [];

function extLog(logLine)
{
	chrome.extension.getBackgroundPage().console.log(logLine);
}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
	if (tabsBeingProcessed.indexOf(tabId) != -1)
		return;
	tabsBeingProcessed.push(tabId);

	chrome.storage.sync.get({'blacklist':"",'whitelist':"","reasonCount":{}}, function(items){
		blacklist = items.blacklist.split(',');
		whitelist = items.whitelist.split(',');
		reasonCount = items.reasonCount;
	});

	var url = changeInfo.url;
	if(url && blacklist != null)
	{
		urlChanges++;
		if (urlChanges >= retriggerThreshold) answeredTabs.pop(tabId);
		for (i = 0; i < blacklist.length; i++)
		{
			if (url.indexOf(blacklist[i]) >= 0)
			{
				for (j = 0; j<whitelist.length; j++)
				{
					if (url.indexOf(whitelist[i]) == -1)
					{
						if (answeredTabs.indexOf(tabId) == -1)
						{
							onWhyTab(tabId);
						}
					}
				}
				
			}
		}
	}

	tabsBeingProcessed.pop(tabId);
});

function onWhyTab(tabId){
	var whywhy = "WHY? ";
	for (i = 1; i < 666;  i++) whywhy += "WHY? "
	var reason = prompt(whywhy);
	if (!isValidReason(reason))
	{
		chrome.tabs.getCurrent(function(tab)
		{
			chrome.tabs.remove(tabId);
		});
		console.log("Closing tab");
	}
	else
	{
		answeredTabs.push(tabId);
		if (reasonCount[reason] == undefined)
		{
			reasonCount[reason] = 1;
		}
		else reasonCount[reason] += 1;
		chrome.storage.sync.set({'reasonCount':reasonCount},function(){
			extLog("Reasons saved");
		})
		urlChanges = 1;
	}
}

function isValidReason(reason)
{
	if (reason == null || reason =="") return false;
	if (reason.length < minReasonLength) return false;

	return true;
}
