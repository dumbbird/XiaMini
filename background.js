
var updateTab = function(tab) {
  if (!/http(.+)xiami\.com/.test(tab.url)) return;
	
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
	} else {
		chrome.tabs.executeScript(tab.id, {
			file : "removeCSS.js",
			runAt: "document_start"
		}, function() {});
	}
	
  if (/play?/.test(tab.url)) {
	//alert ("!!!");
    if (localStorage.xmCSS != "false") 
		chrome.tabs.executeScript(tab.id, {
			file : "Collections.js",
			runAt: "document_start"
		}, function() {});
	else 
		chrome.tabs.executeScript(tab.id, {
			file : "Collections-off.js",
			runAt: "document_start"
		}, function() {});
	
	if (localStorage.trans == "false") 
		chrome.tabs.executeScript(tab.id, {
			file : "renderCSS-trans.js",
			runAt: "document_start"
		}, function() {});
	else 
		chrome.tabs.executeScript(tab.id, {
			file : "removeCSS-trans.js",
			runAt: "document_start"
		}, function() {});
  }
  
  if (/addlyric/.test(tab.url) || /addlrc/.test(tab.url)) {
	chrome.tabs.executeScript(tab.id, {
		file : "renderNotes.js",
		runAt: "document_start"
	}, function() {}); 
  }

};



if (localStorage.xmCSS != "false") {
  localStorage.xmCSS = "default";
}

if (localStorage.trans != "false") {
  localStorage.trans = "true";
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
