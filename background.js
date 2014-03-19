
var updateTab = function(tab) {
  if (!/http(.+)xiami\.com/.test(tab.url)) return;
  // file = localStorage.xmCSS === "true" ? "renderCSS.js" : "removeCSS.js";
  // chrome.tabs.executeScript(tab.id, {
    // file : file,
    // runAt: "document_start"
  // }, function() {/* chrome.tabs.sendMessage(tab.id, tab.url); */});
	
	 if (localStorage.xmCSS != "false") {
		 if (/album/.test(tab.url))
			file = "renderCSS-album.js";
		 else if (localStorage.xmCSS == "collection")
			file = "renderCSS-collection.js";
		 else if (localStorage.xmCSS == "guess")
		 	file = "renderCSS-guess.js";
		 else
			file = "renderCSS.js";
		chrome.tabs.executeScript(tab.id, {
			file : file,
			runAt: "document_start"
		}, function() {});
	}
	else 
		chrome.tabs.executeScript(tab.id, {
			file : "removeCSS.js",
			runAt: "document_start"
		}, function() {});
  };


if (localStorage.xmCSS != "false") {
  localStorage.xmCSS = "default";
}

chrome.tabs.getAllInWindow(function(tabs) {
  tabs.forEach(updateTab);
});

chrome.extension.onMessage.addListener(function(req) {
  chrome.tabs.getAllInWindow(function(tabs) {
    tabs.forEach(updateTab);
  });
});

chrome.tabs.onUpdated.addListener(function(id, data, tab) {
  updateTab(tab);
});
