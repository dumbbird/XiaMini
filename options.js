var XiaminiOption={ Mode:'default',
					TransMode:'true',
					Wormhole:'false'};

function initOptions(callback) {
    chrome.storage.sync.get(null, function(data) {
        $.extend(XiaminiOption, data);
        chrome.storage.sync.set(XiaminiOption);
        callback && callback();
    });
}

function xhr(u, m, a, d, c) {
	var xmlhttp,
	S_Result;
	var url = u || '';
	var method = m || 'get';
	var async = a || 0;
	var postdata = d || '';
	xmlhttp = new XMLHttpRequest;
	xmlhttp.onreadystatechange = callback;
	xmlhttp.open(method, url, async);
	xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xmlhttp.send(postdata);
	function callback() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			S_Result = xmlhttp.responseText;
			if (c) {
				c.call(this, S_Result);
			} //异步方式使用回调函数处理
		}
	}
	return S_Result; //同步方式可以取得返回值
}

function removeMini(id) {
	var el;
	for (var i = 0; i < id.length; i++) {
		el = document.getElementById(id[i]);
		if (el) {
			el.parentNode.removeChild(el);
		}	
	}
}

function loadMini(id,css) {
	if (document.getElementById(id))
			return;
	var el = document.createElement("link");
	el.id = id;
	el.rel = 'stylesheet';
	el.href = chrome.extension.getURL(css);
	headEl = document.getElementsByTagName("head")[0];
	headEl.appendChild(el);
}

chrome.storage.onChanged.addListener(function(changes, namespace) {
  for (key in changes) {
    var storageChange = changes[key];
    XiaminiOption[key]=storageChange.newValue;
	chrome.extension.sendMessage('update');
  }
});

var CurrentUrl = window.location.href;
CurrentUrl = CurrentUrl.split("?")[0].split("#")[0];
if (CurrentUrl == "http://www.xiami.com/collect/552436" || CurrentUrl == "https://www.xiami.com/collect/552436") {
	if ($('#edit_bars').length != 0) {
		// alert("您好，主人！~ A message from XIAMINI");
		chrome.storage.sync.set({
			Wormhole:true
		},function(){});	
		//location.reload();
	} 
	else if ($(".bar__for__unfaved_552436").css("display") == "none") {
		// alert("您好，虫洞穿越者！~ A message from XIAMINI");
		chrome.storage.sync.set({
			Wormhole:true
		},function(){});	
	}
	else {
		alert("您好，要想进入虫洞穿越模式，请收藏并刷新此精选集。 ~ A message from XIAMINI");
		chrome.storage.sync.set({
			Wormhole:false
		},function(){});
			
		// var t="";
		// $(".bar__for__unfaved_552436").click(function(){
			// $("input#tag_btn").click(function(evt){
				// alert("您已到达虫洞穿越的入口，点击确定刷新本页之后，您会发现包括本页面在内的许多虾米的网页会出现一些变化，虫洞会在某些角落中出现……预祝您在四次元(或五次元)世界里旅行愉快！~ A message from XIAMINI");
				// chrome.storage.sync.set({
					// Wormhole:true
				// },function(){});	
				// location.reload();
			// });			
		// });
		$(".bar__for__faved_552436 a").click(function(){
			alert("您将回归三次元世界！下次想要穿越旅行的时候别忘了回来找我哦！么么哒！~ A message from XIAMINI");
			chrome.storage.sync.set({
				Wormhole:false
			},function(){});	
			location.reload();
		});
	}
}