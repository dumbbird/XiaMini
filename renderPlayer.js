	document.body.innerHTML = document.body.innerHTML.replace('music-player/0.9.11', 'music-player/0.9.10');
		//'<script src=' + chrome.extension.getURL("player.js") + '  type="text/javascript" charset="utf-8"></script>*/');
	var el = document.createElement("script");
	el.id = "trans_xiamini";
	el.type = "text/javascript";
	el.charset = "utf-8";
	el.src = chrome.extension.getURL("player.js");
	headEl = document.getElementsByTagName("head")[0];
	headEl.appendChild(el);
	
	alert ("success!");