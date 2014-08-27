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
		var ReUrl = arr[1].match(/\/song\/\d+/);
		var Songtitle = $("meta[name='keywords']");
		Songtitle = $(Songtitle).attr('content').split(",")[0];
		var SearchUrl = "/group/searchingroup/id/13001?" + token + "&key=" + ReUrl + "&submit=搜+索";
		var SearchUrl_baidu = "//www.baidu.com/s?wd=翻译%20赏析%20" + Songtitle + "%20site%3Awww.xiami.com"
			+ "&ie=utf-8&tn=baiduhome_pg&f=8&rsv_bp=1&rsv_spt=1&rsv_enter=1&rsv_sug3=56&rsv_sug4=4530&rsv_sug2=0&inputT=2104&rsv_n=2&rsv_sug1=2";
		var SearchUrl_google = "//www.google.com.hk/?gws_rd=ssl#newwindow=1&q=" 
			+"翻译+赏析+" + Songtitle + "+site:xiami.com";
			
		var blacklist = new Array(/*'/group/thread-detail/tid/227587', 
									'/group/thread-detail/tid/472861',
									'/group/thread-detail/tid/477257'*/); //搜索黑名单
									
		var xmlhttp;
		var TransArr = new Array(); //存放贴子地址，防止搜索结果重复
		var flag = 0;
		var transList = '<div id="trans_list" class="block sec_Rlt mgt20" ><h3>歌词翻译及赏析</h3>' 
		+ '<div class="content clearfix">' 
		+ '<table class="track_list"><tbody>';
		var buffer = transList;
		
		function Re_title(ti){ // 歌名处理，可增加
			ti = ti.replace(/[\(|（|\[].*[\)|）|\]]/g,"");   //去括号内容
			ti = ti.replace(/\-.*\-/g,""); // 去- -内容
			ti = ti.replace(/['|"|“|”|‘|＇|＂|｀|〃|’|`]/g," "); //去引号
			ti = ti.replace(/\s+/g,"");  // 去空格
			ti = ti.toLowerCase(); // 小写
			return ti;   
		}
		function Re_title2(ti){ //隔离类
			ti = ti.replace(/[\(|（|\[].*[\)|）|\]]/g,"");
			ti = ti.replace(/\-.*\-/g,"");
			ti = ti.replace(/['|"|“|”|‘|＇|＂|｀|〃|’|`]/g," ");
			return ti;   
		}
		function Re_title3(ti){ //中断类
			ti = ti.replace(/['|"|“|”|‘|＇|＂|｀|〃|’|`]/g," ");
			ti = ti.replace(/\s+/g,"");
			ti = ti.toLowerCase();
			return ti;
		}
		
		function AlbumRequest(url) {
			xmlhttp = new XMLHttpRequest;
			xmlhttp.onreadystatechange = callback;
			xmlhttp.open("GET", url, false);  //要采用同步请求
			xmlhttp.send(null);
		}

		function callback() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200 && flag != 1) {
				var ResultsHtml = xmlhttp.responseText; // 抓取				
				var AllResults = $(ResultsHtml).find(".title");
				var ResultsNum = AllResults.length;
				//alert (ResultsNum);
				var postUrl, postTitle, authorUrl, authorName;				
				for (var i = 1; i < ResultsNum; i++) {
					postUrl = $(AllResults).eq(i).find("a").attr('href');
					if (blacklist.indexOf(postUrl) != -1)	continue;
					
					postTitle = $(AllResults).eq(i).text();
					authorUrl = $(AllResults).eq(i).next().find("a").attr('href');
					authorName = $(AllResults).eq(i).next().text();
					//alert(Re_title(postTitle)+'....'+Re_title(Songtitle));
					
					if (postTitle.indexOf('翻译') == -1 && postTitle.indexOf('虾翻') == -1 && postTitle.indexOf('赏析') == -1)
						continue;
					
					if (flag == 0 || (TransArr.indexOf(postUrl) == -1 
					&& Re_title3(postTitle).indexOf(Re_title(Songtitle)) != -1)){
					// 检查地址是否重复并且标题包含了歌名 || 通过id搜索的
						TransArr.push(postUrl);  //加入地址数组 
						transList += '<tr class="clearfix">';
						transList += '<td class="tit""><div style="width:220px; overflow:hidden; white-space:nowrap; text-overflow: ellipsis; word-break:keep-all;">';
						transList += '<a href="' + postUrl + '" target="_blank" title>' + postTitle + '</a> </div></td>';
						transList += '<td class="author"><a href="' + authorUrl + '" author>' + authorName + '</a></td>';
						transList += '</tr>';	
					}
				}
				if (buffer == transList)
					flag+=1;
			}	// 虾米站内搜索
	
			else if (xmlhttp.readyState == 4 && xmlhttp.status == 200 && flag == 1) {
				var ResultsHtml = xmlhttp.responseText;
				var AllResults = $(ResultsHtml).find('.t');
				var ResultsNum = AllResults.length;
				//alert (SearchUrl_baidu);	//alert (ResultsNum);
				
				var postUrl, postTitle, authorUrl, authorName;				
				for (var i = 0; i < ResultsNum; i++) {
					postUrl = $(AllResults).eq(i).find("a").attr('href');
					if (blacklist.indexOf(postUrl) != -1)	continue;
					
					postTitle = $(AllResults).eq(i).text();
					authorUrl = "/g/lyrics";
					authorName = "虾米歌词组";
					//alert(Re_title(postTitle)+'....'+Re_title(Songtitle));				
					
					if (postTitle.indexOf('翻译') == -1 && postTitle.indexOf('虾翻') == -1 && postTitle.indexOf('赏析') == -1)
						continue;
					if (Re_title3(postTitle).indexOf(Re_title(Songtitle)) != -1){
						transList += '<tr class="clearfix">';
						transList += '<td class="tit""><div style="width:220px; overflow:hidden; white-space:nowrap; text-overflow: ellipsis; word-break:keep-all;">';
						transList += '<a href="' + postUrl + '" target="_blank" title>' + postTitle + '</a> </div></td>';
						transList += '<td class="author"><a href="' + authorUrl + '" author>' + authorName + '</a></td>';
						transList += '</tr>';	
					}
				}
				if (buffer == transList)
					flag+=1;
			}	// 百度搜索
			
		}
		
		if (flag == 0) 	AlbumRequest(SearchUrl);
		if (flag == 1)	
			AlbumRequest(SearchUrl_baidu);
			//AlbumRequest(SearchUrl_google);
			
		if (flag == 2){	
			var lyricsKey;
			if ($('#lrc').find('.lrc_main').length != 0) {
				lyricsKey = $('.lrc_main').text().split(/\s+/, 3);
				//alert(lyricsKey);
				var SearchUrl2 = "/group/searchingroup/id/13001?" + token + "&key=" + Re_title2(Songtitle) + lyricsKey + "&submit=搜+索";
				AlbumRequest(SearchUrl2);
			}
		}
		// if (flag == 3){
			// if ($('#lrc').find('.lrc_main').length != 0) {
				// lyricsKey = $('.lrc_main').text().split(/\s+/, 3);
				// //alert(lyricsKey);
				// var SearchUrl3 = "/group/searchingroup/id/13001?" + token + "&key=" + Re_title2(Songtitle) + lyricsKey + "&submit=搜+索";
				// AlbumRequest(SearchUrl3);
			// }
		// }
		
		transList += '</tbody></table>';
		transList += '<div id="trans_note" class="blank10"><p>想分享更好的翻译版本？或写写自己对歌词的理解？请点击上方的添加版本按钮。</p></div>';				
		transList += '</div>';
		transList += '<div class="acts"><a class="more" href="/group/join/id/13001?done=/group/thread-new/id/13001" target="_blank">添加版本</a></div>';
		transList += '</div>';
		$("#relate_song").before(transList);

	}
	
};

function removeTranslist() {
  var el = document.getElementById("trans_list");
  if (el) {
    el.parentNode.removeChild(el);
  }
}

removeTranslist();
loadTranslist();

