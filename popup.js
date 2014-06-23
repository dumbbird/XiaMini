
var radioEls = document.querySelectorAll("#xmOption input");
var checkEls = document.querySelectorAll("#transOption input");

if (localStorage.xmCSS == "default") {
  radioEls[0].checked = true;
} else if (localStorage.xmCSS == "guess"){
  radioEls[2].checked = true;
} else if (localStorage.xmCSS == "collection"){
  radioEls[1].checked = true;
} else {
  radioEls[3].checked = true;
}
if (localStorage.trans == "true") {
	checkEls[0].checked = true;
} else {
	checkEls[1].checked = true;
}

radioEls[0].onclick = function() {
  localStorage.xmCSS = "default";
  chrome.extension.sendMessage({"xmCSS": "default"});
};
radioEls[2].onclick = function() {
  localStorage.xmCSS = "guess";
  chrome.extension.sendMessage({"xmCSS": "guess"});
};
radioEls[1].onclick = function() {
  localStorage.xmCSS = "collection";
  chrome.extension.sendMessage({"xmCSS": "collection"});
};
radioEls[3].onclick = function() {
  localStorage.xmCSS = "false";
  chrome.extension.sendMessage({"xmCSS": "false"});
};

checkEls[0].onclick = function(){
	//alert ("click");
	localStorage.trans = "true";
	chrome.extension.sendMessage({"trans": "true"});
};
checkEls[1].onclick = function(){
	//alert ("click");
	localStorage.trans = "false";
	chrome.extension.sendMessage({"trans": "false"});
};