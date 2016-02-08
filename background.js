
var updateTab = function(tab) {
	//alert ("update!");
	if (!/http(.+)xiami\.com/.test(tab.url)) return;		
	chrome.tabs.executeScript(tab.id, {
		file : "executejs/render.js",
		runAt: "document_start"
	}, function() {});
};

var updateAfterComplete = function(tab) {
	if (!/http(.+)xiami\.com/.test(tab.url)) return;	
	chrome.storage.sync.get(null, function (data) {
		if (data.Mode != "false") {
		// Xiamini ON
			// render JS in player page
			if (/play?/.test(tab.url)) {
				chrome.tabs.executeScript(tab.id, {
					file : "executejs/lyricscontrol.js",
					runAt: "document_idle"
				}, function() {});	
			}
			// render JS in group page
			if (/thread\-/.test(tab.url)) 
				chrome.tabs.executeScript(tab.id, {
					file : "executejs/hidereply.js",
					runAt: "document_end"
				}, function() {});
			
			// render 320k notes, wormholes in album page
			if (/com\/album|com\/artist/.test(tab.url)) {
				chrome.tabs.executeScript(tab.id, {
					file : "executejs/320k.js",
					runAt: "document_start"
				}, function() {});
			}
			
			// render translation posts / album tracklist in song page
			if (/com\/song/.test(tab.url)) {
				chrome.tabs.executeScript(tab.id, {
					file : "executejs/translist.js",
					runAt: "document_start"
				}, function() {});
				chrome.tabs.executeScript(tab.id, {
					file : "executejs/albumsong.js",
					runAt: "document_start"
				}, function() {});		
			}
			
			// load full title for collect-albums
			if (/com\/collect/.test(tab.url)) {
				chrome.tabs.executeScript(tab.id, {
					file : "executejs/collect.js",
					runAt: "document_start"
				}, function() {});
			}
			
			//if (/*classical set*/) 
			if (/com\/album|com\/song|com\/artist/.test(tab.url)) 
				chrome.tabs.executeScript(tab.id, {
					file : "executejs/classical.js",
					runAt: "document_start"
				}, function() {});	
			
			//if (/*lyrics set*/1)
			if (/com\/song|com\/u\//.test(tab.url))
				chrome.tabs.executeScript(tab.id, {
					file : "executejs/lyricsmember.js",
					runAt: "document_start"
				}, function() {});
				
			if ( (tab.url.indexOf("collect/552436") != -1) || (/com\/album|com\/song|com\/collect|com\/space|com\/search/.test(tab.url) && data.Wormhole) ) {
				chrome.tabs.executeScript(tab.id, {
					file : "executejs/wormhole.js",
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
		if (details.url.indexOf("music-player") != -1)
			return {redirectUrl: chrome.extension.getURL('js/player.js')};
		// else if (details.url.indexOf("xiami.js") != -1)
			// return {redirectUrl: chrome.extension.getURL('adminjs/xiami.js')};
		else if (details.url.indexOf("su_album_edit") != -1)
			return {redirectUrl: chrome.extension.getURL('adminjs/albumedit.js')};
		else if (details.url.indexOf("top_player_action") != -1)
			return {redirectUrl: chrome.extension.getURL('adminjs/qqplayer.js')};
		else if (details.url.indexOf("app.js") != -1)
			return {redirectUrl: chrome.extension.getURL('adminjs/app.js')};
		// else if (details.url.indexOf("pt_frame_index") != -1)
			// return {redirectUrl: chrome.extension.getURL('adminjs/netease.js')};
		// else if (details.url.indexOf("core") != -1)
			// return {redirectUrl: chrome.extension.getURL('adminjs/neteasecore.js')};
		else
			return {redirectUrl: details.url};
    },
    {
        urls: [
            "http://g.tbcdn.cn/de/music-player/*min.js", 
			"http://res.xiami.net/res/js/default/su_album_edit.js*", 
			"http://res.xiami.net/res/js/default/xiami.js*",
			"http://imgcache.gtimg.cn/music/portal_v3/y/top_player_action.js",
			"http://s3.music.126.net/s/2/*",
			"https://play.wimpmusic.com/*"
        ],
        types: ["script"]
    },
    ["blocking"]
); 


chrome.webRequest.onBeforeSendHeaders.addListener(
	function (details) {
		
		if ((details.url.indexOf('music.126.net') != -1)) {
			alert(details.url);
			for (var i = 0; i < details.requestHeaders.length; ++i) {
				if (details.requestHeaders[i].name === 'Referer') {
					details.requestHeaders[i].value = 'http://music.163.com/';
					break;
				}
			}
		}
		else if ((details.url.indexOf('tyst.migu.cn') != -1)) {
			alert(details.url);
		}
		else if ((details.url.indexOf('music.meile.com') != -1)) {
			alert(details.url);
			for (var i = 0; i < details.requestHeaders.length; ++i) {
				if (details.requestHeaders[i].name === 'Referer') {
					details.requestHeaders[i].value = 'http://music.meile.com/';
					break;
				}
			}
		}
		else if ((details.url.indexOf('imusicapp.cn') != -1)) {
			alert(details.url);
			for (var i = 0; i < details.requestHeaders.length; ++i) {
				if (details.requestHeaders[i].name === 'Referer') {
					details.requestHeaders[i].value = 'http://music.163.com/';
					break;
				}
			}
		}
		else if ((details.url.indexOf('media.kxting.cn') != -1)) {
			alert(details.url);
			for (var i = 0; i < details.requestHeaders.length; ++i) {
				if (details.requestHeaders[i].name === 'Referer') {
					details.requestHeaders[i].value = 'http://weibo.com/duomimusic';
					break;
				}
			}
		}
		else if (details.url.indexOf('qqmusic.qq.com') != -1) {
			alert(details.url);
			details.requestHeaders.push({name:"Cookie",value:"pgv_info=ssid=s79660525; pgv_pvid=3787736010; qqmusic_uin=12345678; qqmusic_key=12345678; qqmusic_fromtag=30"});
			for (var i = 0; i < details.requestHeaders.length; ++i) {
				if (details.requestHeaders[i].name === 'Referer') {
					details.requestHeaders[i].value = 'http://y.qq.com/';
					break;
				}
			}
		}
		else if (details.url.indexOf('doubanio.com') != -1) {
			alert(details.url);
			for (var i = 0; i < details.requestHeaders.length; ++i) {
				if (details.requestHeaders[i].name === 'Referer') {
					details.requestHeaders[i].value = 'http://music.douban.com/';
					break;
				}
			}		
		}		
	return {
		requestHeaders : details.requestHeaders
	};

}, {
	urls : ["http://*.music.126.net/*mp3", "http://*.qqmusic.qq.com/*mp3", "http://*.imusicapp.cn/*.mp3*", "http://*.migu.cn/*.mp3*", "http://*.kxting.cn/*mp3", "http://*.doubanio.com/*mp4"]
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
