// 从歌词组帖子中获取翻译贴，并展示在单曲页面右侧。
// 显示ISRC号
// 版本号：1.10.2.3

var loadTranslist = function () {

	function Re_title(ti) { // 歌名处理，可增加
		ti = ti.replace(/[\(|（|\[].*[\)|）|\]]/g, ""); 		//去括号内容
		ti = ti.replace(/\-.*\-/g, ""); 						// 去- -内容
		ti = ti.replace(/['|"|“|”|‘|＇|＂|｀|〃|’|`]/g, " "); 	//去引号
		ti = ti.replace(/\s+/g, ""); 							// 去空格
		ti = ti.toLowerCase(); 									// 小写
		return ti;
	}
	function Re_title2(ti) { //隔离类
		ti = ti.replace(/[\(|（|\[].*[\)|）|\]]/g, "");	// 去括号内容
		ti = ti.replace(/ \-.*\-/g, "");				// 去- -内容
		ti = ti.replace(/\'|‘|＇|｀|’|`/g, "'");		// 统一单撇
		ti = ti.replace(/"|“|”|＂|〃/g, "\"");		// 统一双撇
		ti = ti.replace(/~|～/g, "~");				// 统一波浪
		ti = ti.replace(/[ \t]+$/, ""); 				// 去掉行首行末空格
		ti = ti.replace(/^[ \t]+/, ""); 				// 去掉行首行末空格
		return ti;
	}
	function Re_title3(ti) { //中断类
		ti = ti.replace(/['|"|“|”|‘|＇|＂|｀|〃|’|`]/g, " ");
		ti = ti.replace(/\s+/g, "");
		ti = ti.toLowerCase();
		return ti;
	}

	if (document.getElementById("trans_list"))
		return;
	if (/纯音乐|\[Instrumental\]|无词歌/.test($('#lrc').html()))
		return;
	var str = document.cookie.split("; ");
	var token;
	for (var i = 0; i < str.length; i++) {
		if (str[i].indexOf("_xiamitoken") != -1) {
			token = str[i];
		}
	}
	var arr = CurrentUrl.split("//");
	var ReUrl = arr[1].match(/\/song\/\d+/);
	var lyricsKey;
	var keyLength = 3;
	if ($('#lrc').find('.lrc_main').length != 0) {
		lyricsKey = $('.lrc_main').text().split(/\s+/, keyLength);
		for (i = 0; i < keyLength; i++)
			lyricsKey[i] = Re_title2(lyricsKey[i]);
		//alert(lyricsKey);
	}	
	var SearchKey = Re_title2(Songtitle);
	SearchKey = SearchKey.replace("'", "%27");
	//alert(Songtitle+"...."+SearchKey);
	var SearchUrl = "/group/searchingroup/id/13001?" + token + "&key=" + SearchKey + "&submit=搜+索";
	var SearchUrl_baidu = "//www.baidu.com/s?wd=翻译%20赏析%20" + SearchKey + "%20site%3Awww.xiami.com"
		 + "&ie=utf-8&tn=baiduhome_pg&f=8&rsv_bp=1&rsv_spt=1&rsv_enter=1&rsv_sug3=56&rsv_sug4=4530&rsv_sug2=0&inputT=2104&rsv_n=2&rsv_sug1=2";
	var SearchUrl_google = "//www.google.com.hk/?gws_rd=ssl#newwindow=1&q="
		 + "翻译+赏析+" + SearchKey + "+site:xiami.com";

	var blacklist_post = new Array('/group/thread-detail/tid/480745',
			'/group/thread-detail/tid/330310'); //搜索黑名单

	var TransArr = new Array(); //存放贴子地址，防止搜索结果重复
	transList += '<div id="trans_list" class="block sec_Rlt mgt20" ><h3>歌词翻译及赏析</h3>'
		 + '<div class="content clearfix">'
		 + '<table class="track_list"><tbody>';

	var buffer = transList;
	Search_xiami(xhr(SearchUrl, 'get', 0));  //处理虾米小组内搜索结果

	transList += '</tbody></table>';
	transList += '<div id="trans_note" class="blank10"><p>想分享更好的翻译版本？或写写自己对歌词的理解？请点击上方的添加版本按钮。</p></div>';
	transList += '</div>';
	transList += '<div class="acts"><a class="more" href="/group/thread-new/id/13001" target="_blank">添加版本</a></div>';
	transList += '</div>';
	$("#relate_song").before(transList);

	function Search_xiami(result) {
		var ResultsHtml = result;
		var AllResults = $(ResultsHtml).find(".title");
		var ResultsNum = AllResults.length;
		var postUrl,
			postTitle,
			authorUrl,
			authorName;
		for (var i = 1; i < ResultsNum; i++) {
			postUrl = $(AllResults).eq(i).find("a").attr('href');
			if (blacklist_post.indexOf(postUrl) != -1)
				continue;

			postTitle = $(AllResults).eq(i).text();
			authorUrl = $(AllResults).eq(i).next().find("a").attr('href');
			authorName = $(AllResults).eq(i).next().text();
			//alert(Re_title(postTitle)+'....'+Re_title(Songtitle));

			var realSongtitle = Re_title2(Songtitle).toLowerCase(); // 获取真正的曲目标题，去掉标题中的括号等信息
			if (postTitle.indexOf('翻译') == -1 && postTitle.indexOf('虾翻') == -1 
				&& postTitle.indexOf('赏析') == -1 && postTitle.indexOf('| t-LRC') == -1
				 /*|| Re_title3(postTitle).indexOf(Re_title(Songtitle)) == -1*/)
				continue;

			// 获取真正的帖子标题，去掉帖子【翻译】等前缀以及括号、中文标题等后缀
			var realPosttitle = postTitle.split("】")[1];				
			realPosttitle = Re_title2(realPosttitle);
			if (realPosttitle == "")
				continue;

			if (realPosttitle.indexOf(" | ") != -1) {
				realPosttitle = realPosttitle.split(" | ")[0].toLowerCase();
			}
			else if (realPosttitle.indexOf(" \/ ") != -1) {
				realPosttitle = realPosttitle.split(" \/ ")[0].toLowerCase();				
			}
			else {
				var lastIndex = realPosttitle.lastIndexOf(" ");
				realPosttitle = realPosttitle.substring(0,lastIndex).toLowerCase();
			}			
			//alert(realSongtitle+'....'+postTitle+'....'+realPosttitle);
			
			if (realPosttitle != realSongtitle)
				continue;

			if (TransArr.indexOf(postUrl) == -1) {
				// 检查地址是否重复
				//alert(postUrl);
				
				// if (检查歌词内容(xhr(postUrl, 'get', 0)) == 0) 跳过;

				TransArr.push(postUrl); //加入地址数组
				transList += '<tr class="clearfix">';
				transList += '<td class="tit""><div style="width:220px; overflow:hidden; white-space:nowrap; text-overflow: ellipsis; word-break:keep-all;">';
				transList += '<a href="' + postUrl + '" target="_blank" title="' + postTitle + '">' + postTitle + '</a> </div></td>';
				transList += '<td class="author"><a href="' + authorUrl + '" author>' + authorName + '</a></td>';
				transList += '</tr>';

			}
		}
	}	
	
	/*function 检查歌词内容(result){
		处理;
		if 为真 return 1;
		else return 0;		
	}
	*/
	
	function Search_baidu(result) {
		var ResultsHtml = result;
		var AllResults = $(ResultsHtml).find('.t');
		var ResultsNum = AllResults.length;
		//alert (SearchUrl_baidu);	//alert (ResultsNum);

		var postUrl,
		postTitle,
		authorUrl,
		authorName;
		for (var i = 0; i < ResultsNum; i++) {
			postUrl = $(AllResults).eq(i).find("a").attr('href');
			if (blacklist_post.indexOf(postUrl) != -1)
				continue;

			postTitle = $(AllResults).eq(i).text();
			authorUrl = "/g/lyrics";
			authorName = "虾米歌词组";
			//alert(Re_title(postTitle)+'....'+Re_title(Songtitle));

			if (postTitle.indexOf('翻译') == -1 && postTitle.indexOf('虾翻') == -1 && postTitle.indexOf('赏析') == -1)
				continue;
			if (postTitle.indexOf('百度翻译') != -1)
				continue;

			if (Re_title3(postTitle).indexOf(Re_title(Songtitle)) != -1) {
				transList += '<tr class="clearfix">';
				transList += '<td class="tit""><div style="width:220px; overflow:hidden; white-space:nowrap; text-overflow: ellipsis; word-break:keep-all;">';
				transList += '<a href="' + postUrl + '" target="_blank" title>' + postTitle + '</a> </div></td>';
				transList += '<td class="author"><a href="' + authorUrl + '" author>' + authorName + '</a></td>';
				transList += '</tr>';
			}
		}

	}

};

var removeTranslist = function () {
	var el = document.getElementById("trans_list");
	if (el) {
		el.parentNode.removeChild(el);
	}
}

var headerModify = function() {
	var el = document.getElementById("lrc").getElementsByTagName("strong")[0];
	if (el)
		el.innerHTML = el.innerHTML.replace(/歌词：/, "歌词及制作信息：");
	el = document.getElementById("albums_info");
	if (el)
		el.innerHTML = el.innerHTML.replace(/演唱者：/, "主表演者：");
}

var loadISRC = function () {
	if ((CurrentUrl.indexOf("xiami.com/song/") != -1) && (/ISRC/.test($('#lrc').html()))) {
		if (document.getElementById("isrc"))
			return;
		if ($('#lrc').text().match(/ISRC |ISRC: |ISRC：|ISRC-/g).length == 0)
			return;
		
		var lyricsLine = $('#lrc').text().split('\n');
		var ISRC;
		for (var i = 0; i < lyricsLine.length; i++)
			if (lyricsLine[i].match("ISRC")) {
				ISRC = lyricsLine[i].replace(/ISRC |ISRC: |ISRC：|ISRC-/, "");
				break;
			}
		//alert(ISRC);
		var ISRC_html = '<tr id="isrc">';
		ISRC_html += '<td class="item" valign="top">ISRC：</td>';
		ISRC_html += '<td valign="top"><div title="' + ISRC + '" style="white-space:nowrap; width:140px; overflow:hidden; text-overflow:ellipsis;">'
		 + ISRC + '</div></td>';
		ISRC_html += '</tr>';

		$('#albums_info tbody').append(ISRC_html);
	}
}


var CurrentUrl = window.location.href;
if (/com\/song/.test(CurrentUrl)) {
	var transList = "";
	removeTranslist();
	var Songtitle = $('#title h1').contents().filter(function () {
		return this.nodeType == 3;
	}).text();
	loadTranslist();
	headerModify();
	loadISRC();
}
