var loadTranslist = function() {
	if (document.getElementById("trans_list")) return;

	var CurrentUrl = window.location.href;
	if (CurrentUrl.indexOf("/song/") != -1) {
		var str = document.cookie.split("; ");
		//var token = str.match(/_xiamitoken=\w+/);
		//alert (token);
		var token;
		for (var i = 0; i < str.length; i++) {
			if (str[i].indexOf("_xiamitoken") != -1) {
				token = str[i];
			}
		}
		var arr = CurrentUrl.split("//");
		var ReUrl = arr[1].substring(arr[1].indexOf("/"));
		//ReUrl = "The+Dance"; // test
		var SearchUrl = "/group/searchingroup/id/13001?" + token + "&key=" + ReUrl + "&submit=搜+索";
		//alert (SearchUrl);
		var xmlhttp;
	
		function AlbumRequest() {
			xmlhttp = new XMLHttpRequest;
			xmlhttp.onreadystatechange = callback;
			xmlhttp.open("GET", SearchUrl, true);
			xmlhttp.send(null);
		}

		function callback() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				var ResultsHtml = xmlhttp.responseText; // 抓取
				var AllResults = $(ResultsHtml).find(".title");
				var ResultsNum = AllResults.length;
				//alert (ResultsNum);
				var postUrl, postTitle, authorUrl, authorName;
				var transList = '<div id="trans_list" class="block sec_Rlt mgt20" ><h3>歌词翻译及含义解读</h3>' 
				+ '<div class="content clearfix">' 
				+ '<table class="track_list"><tbody>';
				for (var i = 1; i < ResultsNum; i++) {
					postUrl = $(AllResults).eq(i).find("a").attr('href');
					postTitle = $(AllResults).eq(i).text();
					authorUrl = $(AllResults).eq(i).next().find("a").attr('href');
					authorName = $(AllResults).eq(i).next().text();
					//alert(authorUrl);alert(authorName);
					//postTitle += ' - ' + authorName;
					transList += '<tr class="clearfix">';
					transList += '<td class="tit"><a href="' + postUrl + '" title>' + postTitle + '</a></td>';
					transList += '<td class="author"><a href="' + authorUrl + '" author>' + authorName + '</a></td>';
					transList += '</tr>';					
				}
				transList += '</tbody></table>';
				transList += '<div id="trans_note" class="blank10"><p>想分享更好的翻译版本？或写写自己对歌词的理解？请点击上方的添加版本按钮。</p></div>';				
				transList += '</div>';
				transList += '<div class="acts"><a class="more" href="/group/join/id/13001?done=/group/thread-new/id/13001" target="_blank">添加版本</a></div>';
				transList += '</div>';
				$("#relate_song").before(transList);
			}
		}
		AlbumRequest();
	}
	
};

loadTranslist();

