/*chrome.webNavigation.onBeforeNavigate.addListener(function(e){
	console.log("going to facebook");
	alert("TESTa");
}, {url: [{hostContains: '.facebook.'}]});*/

var answered = [];

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
	var url = changeInfo.url;
	console.log("got here");
	if(url)
	{
		var badurls = ["facebook","reddit"];
		for (i = 0; i < 3; i++)
		{			
			if (url.indexOf(badurls[i]) >= 0 && answered.indexOf(tabId) == -1) onWhyTab(tabId);
		}
		
	} 
});


function onWhyTab(tabId){
var whywhy = "WHY? ";
for (i = 0; i < 200;  i++) whywhy += "WHY? "
var reason = prompt(whywhy,"");
if (reason == null || reason == "")
{
	chrome.tabs.getCurrent(function(tab)
	{
		chrome.tabs.remove(tabId);
	})
	console.log("tried to close");
}
else answered.push(tabId);
}