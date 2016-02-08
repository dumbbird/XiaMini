
var radioEls = document.querySelectorAll("#xmOption input");
var checkEls = document.querySelectorAll("#transOption input");

initOptions(function() {

	if (XiaminiOption.Mode == "default") {
	  radioEls[0].checked = true;
	} else if (XiaminiOption.Mode == "guess"){
	  radioEls[2].checked = true;
	} else if (XiaminiOption.Mode == "collection"){
	  radioEls[1].checked = true;
	} else {
	  radioEls[3].checked = true;
	}
	if (XiaminiOption.TransMode == "true") {
		checkEls[0].checked = true;
	} else {
		checkEls[1].checked = true;
	}
});

radioEls[0].onclick = function() {
	//localStorage.xmCSS = "default";
	chrome.storage.sync.set({'Mode': 'default'});
	//chrome.extension.sendMessage({"xmCSS": "default"});
};
radioEls[2].onclick = function() {
	//localStorage.xmCSS = "guess";
	chrome.storage.sync.set({'Mode': 'guess'});
	//chrome.extension.sendMessage({"xmCSS": "guess"});
};
radioEls[1].onclick = function() {
	//localStorage.xmCSS = "collection";
	chrome.storage.sync.set({'Mode': 'collection'});
	//chrome.extension.sendMessage({"xmCSS": "collection"});
};
radioEls[3].onclick = function() {
	//localStorage.xmCSS = "false";
	chrome.storage.sync.set({'Mode': 'false'});
	//chrome.extension.sendMessage({"xmCSS": "false"});
};

checkEls[0].onclick = function(){
	//localStorage.trans = "true";
	chrome.storage.sync.set({'TransMode': 'true'});
	//chrome.extension.sendMessage({"trans": "true"});
};
checkEls[1].onclick = function(){
	//localStorage.trans = "false";
	chrome.storage.sync.set({'TransMode': 'false'});
	//chrome.extension.sendMessage({"trans": "false"});
};