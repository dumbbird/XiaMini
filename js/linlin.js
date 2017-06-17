function mp3list() {
	if ($('#mp3list').length)
		return;
	chrome.storage.local.get({WormholeList:''}, function (data) {	//需要在local区存储/读取,local区容量是5M
		var list = data.WormholeList;
		if (list == '') {	//初始化
			//list = xhr("https://raw.githubusercontent.com/dumbbird/xiaMini/master/wormhole.json", "get",0);
			list = xhr(chrome.extension.getURL('database/wormhole.json'),"get",0); //或者增加一个本地文件，从本地读取比较快
			var mp3list = '<div id="mp3list" style="display:none">'+list+'</div>';
			$('head').after(mp3list);
			chrome.storage.local.set({
				WormholeList:list
			},function(){});
		} else {
			var mp3list = '<div id="mp3list" style="display:none">'+list+'</div>';
			$('head').after(mp3list);
			// 异步方式更新列表
			xhr("https://raw.githubusercontent.com/dumbbird/xiaMini/master/wormhole.json", 'get', 1, "", function (wormlist) {
				chrome.storage.local.set({
					WormholeList:wormlist
				},function(){});
			});
		}
	});

}

chrome.storage.sync.get(null, function (data) {
	if (data.Wormhole)
		mp3list();
});