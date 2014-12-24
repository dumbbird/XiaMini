
var updateTab = function(tab) {
	//alert ("update!");
	if (!/http(.+)xiami\.com/.test(tab.url)) return;	
	
	chrome.tabs.executeScript(tab.id, {
		file : "render.js",
		runAt: "document_start"
	}, function() {});
	
	chrome.storage.sync.get(null, function (data) {		
		if (data.Mode != "false") {	
		// Xiamini ON					
			// render JS in player page
			// if (/play?/.test(tab.url)) {
				// chrome.tabs.executeScript(tab.id, {
					// file : "Collections.js",
					// runAt: "document_start"
				// }, function() {});	
			// }			
		} else {	
		// Xiamini OFF
			// remove JS in player page
			if (/play?/.test(tab.url)) 	
				chrome.tabs.executeScript(tab.id, {
					file : "Collections-off.js",
					runAt: "document_start"
				}, function() {});
		}
	});
};

var updateAfterComplete = function(tab) {
	chrome.storage.sync.get(null, function (data) {
		if (data.Mode != "false") {
		// Xiamini ON
			// render JS in group page
			if (/group\/thread\-detail/.test(tab.url)) 
				chrome.tabs.executeScript(tab.id, {
					file : "hidereply.js",
					runAt: "document_end"
				}, function() {});
			
			// render 320k notes, wormholes in album page
			if (/album/.test(tab.url)) {
				chrome.tabs.executeScript(tab.id, {
					file : "320k.js",
					runAt: "document_start"
				}, function() {});
			}
			
			// render translation posts / album tracklist in song page
			if (/com\/song/.test(tab.url)) {
				chrome.tabs.executeScript(tab.id, {
					file : "translist.js",
					runAt: "document_start"
				}, function() {});
				chrome.tabs.executeScript(tab.id, {
					file : "albumsong.js",
					runAt: "document_start"
				}, function() {});		
			}
			
			//if (/*classical set*/) 
			if (/com\/album|com\/song|com\/artist/.test(tab.url)) 
				chrome.tabs.executeScript(tab.id, {
					file : "classical.js",
					runAt: "document_start"
				}, function() {});	
			
			//if (/*lyrics set*/1)
			if (/com\/song|com\/u\//.test(tab.url))
				chrome.tabs.executeScript(tab.id, {
					file : "lyricsmember.js",
					runAt: "document_start"
				}, function() {});
				
			if ( (tab.url.indexOf("collect/552436") != -1) || (/com\/album|com\/song|com\/collect/.test(tab.url) && data.Wormhole) ) {
				chrome.tabs.executeScript(tab.id, {
					file : "wormhole.js",
					runAt: "document_start"
				}, function() {});		
			}
		}
	});
};


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

chrome.webRequest.onBeforeSendHeaders.addListener(
	function (details) {
		
		if ((details.url.indexOf('music.126.net') != -1)) {
			//alert(details.url);
			for (var i = 0; i < details.requestHeaders.length; ++i) {
				if (details.requestHeaders[i].name === 'Referer') {
					details.requestHeaders[i].value = '';
					break;
				}
			}
		}
		else if ((details.url.indexOf('tyst.migu.cn') != -1)) {
			//alert(details.url);
		}
		else if ((details.url.indexOf('imusicapp.cn') != -1)) {
			for (var i = 0; i < details.requestHeaders.length; ++i) {
				if (details.requestHeaders[i].name === 'Referer') {
					details.requestHeaders[i].value = 'http://music.163.com/';
					break;
				}
			}
		}
		else if (details.url.indexOf('qqmusic.qq.com') != -1) {
			//alert(details.url);
			for (var i = 0; i < details.requestHeaders.length; ++i) {
				if (details.requestHeaders[i].name === 'Referer') {
					details.requestHeaders[i].value = '';
					break;
				}
			}
		}
	return {
		requestHeaders : details.requestHeaders
	};

}, {
	urls : ["http://*.music.126.net/*mp3", "http://*.qqmusic.qq.com/*m4a*", "http://*.imusicapp.cn/*.mp3*", "http://*.migu.cn/*.mp3*"]
},
	["blocking", "requestHeaders"]);
	
	
chrome.extension.onMessage.addListener(function(req) {
	// if (req.indexOf("alert") != -1) {
		// alert(req);
		// XiaminiNoti(req);
	// }
	// else
		chrome.tabs.getAllInWindow(function(tabs) {
			tabs.forEach(updateTab);
		});
});

chrome.tabs.onUpdated.addListener(function(id, data, tab) {
	updateTab(tab);
	if (data.status == "complete") 
		updateAfterComplete(tab);	
});

function XiaminiNoti(type){
	var title = 'title';
	var message = 'message';
	switch (type) {
		// case "alert-cuson":
			// title = '激动人心！您开启了自定义功能！';
			// message = '可以在主菜单里选择自定义风格了哦！';
			// break;
		// case "alert-cusoff":
			// title = '好桑心！您关闭了自定义功能！';
			// message = '主菜单里不能选择自定义风格了哦！';
			// break;
		// case "alert-mvon":
			// title = '激动人心！您开启了显示MV功能！';
			// message = '在单曲页如果存在这首歌的MV，就会在标题上显示MV链接哦！';
			// break;
		// case "alert-mvoff":
			// title = '好桑心！您关闭了显示MV功能！';
			// message = '在单曲页上不会显示MV链接了哦！';
			// break;
		case "alert-wormhole":
			title = 'A message from Xiamini';
			message = '您已到达虫洞穿越的入口，点击确定并刷新本页之后，您会发现包括本页面在内的许多虾米的网页会出现一些变化，虫洞会在某些角落中出现……预祝您在四次元(或五次元)世界里旅行愉快！';
			break;
	}
	function getNotificationId() {
      var id = Math.floor(Math.random() * 9007199254740992) + 1;
      //chrome.storage.local.set({'id': id});
      return id.toString();
    }
	
	chrome.notifications.create(getNotificationId(), {
		title: title,
		iconUrl: 'xiami.png',
		type: 'basic',
		message: message
    }, function(){});
  }