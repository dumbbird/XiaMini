// 首页显示好友动态
// 版本号：1.0

var loadFeed = function() {
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
	
	var feedHTML = xhr("http://www.xiami.com/web", 'get', 0);
	
	
	if (ismember.length > 0) {
		var add_on = '<div id="xiamini_feed" data-spm="1478643733"><h2><strong class="bigtext">好友近况</strong></h2>';
		
		if (member_id.indexOf("JID") != -1)
			add_on += 'medal_lyricmember1" title="' + member_id + '"></span></a>';
		else 
			add_on += 'medal_lyricmember2" title="' + member_id + '"></span></a>'; 
		//alert(add_on);
		$(".usr_info .p_name").append(add_on);
	}
}

var CurrentUrl = window.location.href;
CurrentUrl = CurrentUrl.split("?spm")[0];
if (CurrentUrl == "http://www.xiami.com/" && !document.getElementById("xiamini_feed")) {
	loadFeed();
}