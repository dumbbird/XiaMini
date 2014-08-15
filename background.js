
var updateTab = function(tab) {
	//alert ("update!");
	if (!/http(.+)xiami\.com/.test(tab.url)) return;	
	if (localStorage.xmCSS != "false") {	
		// Xiamini ON
		// render CSS
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
				
		// render JS in lyricsedit page
		if (/addlyric/.test(tab.url) || /addlrc/.test(tab.url)) 
			chrome.tabs.executeScript(tab.id, {
				file : "renderNotes.js",
				runAt: "document_start"
			}, function() {}); 
		
		// render JS in player page
		if (/play?/.test(tab.url)) {
			chrome.tabs.executeScript(tab.id, {
				file : "Collections.js",
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
	} else {	
		// Xiamini OFF
		// remove CSS
		chrome.tabs.executeScript(tab.id, {
				file : "removeCSS.js",
				runAt: "document_start"
		}, function() {});
		
		// remove JS in player page
		if (/play?/.test(tab.url)) 	
			chrome.tabs.executeScript(tab.id, {
				file : "Collections-off.js",
				runAt: "document_start"
			}, function() {});
	}
};

var updateAfterComplete = function(tab) {
	// render JS in song page
	if (/song/.test(tab.url))
		chrome.tabs.executeScript(tab.id, {
			file : "albumsong.js",
			runAt: "document_start"
		}, function() {});
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

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
      return {redirectUrl: chrome.extension.getURL('player.js')};    
    },
    {
        urls: [
            "http://g.tbcdn.cn/de/music-player/*min.js",
        ],
        types: ["script"]
    },
    ["blocking"]
); 

chrome.extension.onMessage.addListener(function(req) {
  chrome.tabs.getAllInWindow(function(tabs) {
    tabs.forEach(updateTab);
  });
});

chrome.tabs.onUpdated.addListener(function(id, data, tab) {
	//alert ("update1!");
	updateTab(tab);
	if (data.status == "complete") 
		updateAfterComplete(tab);	
});
