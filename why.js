var answeredTabs = [];
const retriggerThreshold = 5;
var urlChanges = 0; //if exceeds retriggerThreshold, then retrigger WHY
var reasons = [];

function extLog(logLine)
{
	chrome.extension.getBackgroundPage().console.log(logLine);
}
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
	var url = changeInfo.url;
	if(url)
	{
		var badurls = ["facebook","reddit"];
		for (i = 0; i < 3; i++)
		{			
			if (url.indexOf(badurls[i]) >= 0)
			{
				urlChanges++;
				extLog(urlChanges);
				if (answeredTabs.indexOf(tabId) == -1 || urlChanges >= retriggerThreshold) onWhyTab(tabId);
			}
		}
		
	} 
});

function onWhyTab(tabId){
	var whywhy = "WHY? ";
	for (i = 1; i < 666;  i++) whywhy += "WHY? "
	var reason = prompt(whywhy);
	if (reason == null || reason == "")
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
		extLog(reasons);
		urlChanges = 0;
	}
}