var blacklist, whitelist, savebutton, reasonCount, reasonTable;

window.onload = function(){
	blacklist = document.getElementById("blacklist");
	whitelist = document.getElementById("whitelist");	
	savebutton = document.getElementById("submitbutton");
	clearbutton = document.getElementById("clearbutton");
	reasonTable = document.getElementById("reason-list");
	chrome.storage.sync.get({'blacklist':"",'whitelist':"","reasonCount":{}}, function(items){
		blacklist.value = items.blacklist;
		whitelist.value = items.whitelist;
		reasonCount = items.reasonCount;
		fillTable();
	});
	blacklist.onkeydown = optionsChanged;
	whitelist.onkeydown = optionsChanged;
	savebutton.onclick = saveConfig;
	clearbutton.onclick = clearReasons;

	
}

function fillTable()
{
	
	for (var key in reasonCount)
	{
		var row = reasonTable.insertRow();
		var reasonCell = row.insertCell(0);
		var countCell = row.insertCell(1);

		reasonCell.innerHTML = key;
		countCell.innerHTML = reasonCount[key].toString();
	}
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

function clearReasons()
{
	chrome.storage.sync.set({"reasonCount":{}},function()
	{
		for (i = reasonTable.rows.length - 1; i > 0; i--)
		{
			reasonTable.deleteRow(i);
		}
	});
}
