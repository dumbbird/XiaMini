function mp3list() {
	var list = xhr("https://raw.githubusercontent.com/dumbbird/xiaMini/master/wormhole.json", "get",0);
	var mp3list = '<div id="mp3list" style="display:none">'+list+'</div>';
	$('head').after(mp3list);
}

chrome.storage.sync.get(null, function (data) {
	if (data.Wormhole) 
		mp3list();
});