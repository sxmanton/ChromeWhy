var answeredTabs = [];
const retriggerThreshold = 5;
var urlChanges = 1; //if exceeds retriggerThreshold, then retrigger WHY
var reasons = [];
var badurls = ["facebook","reddit"];
const minReasonLength = 5;
var WHYshown;

function extLog(logLine)
{
	chrome.extension.getBackgroundPage().console.log(logLine);
}
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
	var url = changeInfo.url;
	extLog("here");
	if(url)
	{	
		urlChanges++;
		if (urlChanges >= retriggerThreshold) answeredTabs.pop(tabId);
		extLog(badurls.length);
		for (i = 0; i < badurls.length; i++)
		{			
			if (url.indexOf(badurls[i]) >= 0)
			{				
				extLog(urlChanges);
				if (answeredTabs.indexOf(tabId) == -1 && !WHYshown) 
					{
						onWhyTab(tabId);
					}
			}
		}		
	} 
});

function onWhyTab(tabId){
	WHYshown = true;
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
		WHYshown = false;
		answeredTabs.push(tabId);
		reasons.push(reason);
		extLog(answeredTabs);
		extLog(reasons);
		urlChanges = 1;
	}
}

function isValidReason(reason)
{
	if (reason == null || reason =="") return false;
	if (reason.length < minReasonLength) return false;
	return true;
}