var blacklist, whitelist, savebutton;

window.onload = function(){
	blacklist = document.getElementById("blacklist");
	whitelist = document.getElementById("whitelist");	
	savebutton = document.getElementById("submitbutton");
	chrome.storage.sync.get({'blacklist':"",'whitelist':""}, function(items){
		blacklist.value = items.blacklist;
		whitelist.value = items.whitelist;
	});
	blacklist.onkeydown = optionsChanged;
	whitelist.onkeydown = optionsChanged;
	savebutton.onclick = saveConfig;
}

function saveConfig()
{
	savebutton.innerHTML = "Saving...";
	chrome.storage.sync.set({'blacklist':blacklist.value, 'whitelist':whitelist.value}, function()
		{
			savebutton.innerHTML = "Saved!";
		});
}

function optionsChanged()
{
	savebutton.innerHTML = "Save Changes";
}