var answeredTabs = [];
const retriggerThreshold = 5;
var urlChanges = 1; //if exceeds retriggerThreshold, then retrigger WHY
var reasons = [];
var badurls = ["facebook","reddit"];
var whitelist = ["https://www.facebook.com/events/1831833307042101/"];
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
				for (j = 0; j<whitelist.length; j++)
				{
					if (url.indexOf(whitelist[i]) == -1)
					{
						extLog(urlChanges);
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
