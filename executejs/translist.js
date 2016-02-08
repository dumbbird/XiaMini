// 从歌词组帖子中获取翻译贴，并展示在单曲页面右侧。
// 显示ISRC号
// 版本号：2.3

var loadTranslist = function () {
	
	function Re_title(ti) { 
		// 调整曲目名称与帖子标题的格式
		ti = ti.replace(/\'|‘|＇|｀|’|`/g, "'");				// 统一单撇
		ti = ti.replace(/"|“|”|＂|〃/g, "\"");					// 统一双撇
		ti = ti.replace(/~|～/g, "~");							// 统一波浪
		return ti;
	}

	function Re_title2(ti) { 
		// 调整曲目名称与帖子标题的格式
		ti = ti.replace(/[ \t]+$/, ""); 						// 去掉行首行末空格
		ti = ti.replace(/^[ \t]+/, ""); 						// 去掉行首行末空格
		ti = ti.replace(/[\(|（|\[|\-].*[\)|）|\]|\-]$/g, "");	// 去括号/- -内容
		ti = ti.replace(/[ \t]+$/, ""); 						// 去掉行首行末空格
		ti = ti.replace(/^[ \t]+/, ""); 						// 去掉行首行末空格
		return ti;
	}

	if (document.getElementById("trans_list"))		return;
	if (/纯音乐|\[Instrumental\]|无词歌/.test($('#lrc').html()))		return;
	var str = document.cookie.split("; ");
	var token;
	for (var i = 0; i < str.length; i++) {
		if (str[i].indexOf("_xiamitoken") != -1) {
			token = str[i];
		}
	}
	// var arr = CurrentUrl.split("//");
	// var ReUrl = arr[1].match(/\/song\/\d+/);
	// var lyricsKey;
	// var keyLength = 3;
	// if ($('#lrc').find('.lrc_main').length != 0) {
		// lyricsKey = $('.lrc_main').text().split(/\s+/, keyLength);
		// for (i = 0; i < keyLength; i++)
			// lyricsKey[i] = Re_title2(lyricsKey[i]);
		// //alert(lyricsKey);
	// }
	
	var realSongtitle = Re_title(Songtitle);			// 获取真正的曲目标题，去掉标题中的括号等信息
	var SearchKey = Re_title2(realSongtitle).replace("'", "%27");	// 根据真正曲目标题来设定搜索关键词
	//alert(Songtitle+"...."+"...."+realSongtitle+"...."+SearchKey);
	
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

			// 根据帖子标题筛选翻译赏析贴
			if (/【翻译|【赏析|虾翻|\| t\-LRC/.test(postTitle)) {

				// 获取真正的帖子标题，去掉帖子【翻译】等前缀以及括号、中文标题等后缀
				var realPosttitle = postTitle.split("】")[1];
				
				// 根据翻译赏析贴的格式确定该贴对应的原曲目标题
				if (realPosttitle.indexOf(" | ") != -1) {
					realPosttitle = realPosttitle.split(" | ")[0];
				}
				else if (realPosttitle.indexOf(" \/ ") != -1) {
					realPosttitle = realPosttitle.split(" \/ ")[0];				
				}
				else {
					if (postTitle.indexOf('【赏析') != -1)
						;
					else {
						var lastIndex = realPosttitle.lastIndexOf(" ");
						realPosttitle = realPosttitle.substring(0,lastIndex);
					}
				}		
				realPosttitle = Re_title(realPosttitle);
				//alert(realSongtitle+'....'+postTitle+'....'+realPosttitle);
			
				// 判断帖子对应的曲目标题与真实曲目标题是否match + 判断是否帖子重复
				if (realPosttitle.toLowerCase() == realSongtitle.toLowerCase() && TransArr.indexOf(postUrl) == -1) {
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
	}	
	
	/*function 检查歌词内容(result){
		处理;
		if 为真 return 1;
		else return 0;		
	}
	*/

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
		el.innerHTML = el.innerHTML.replace(/演唱者：/, "主艺人：");
}

var semicolConvert = function() {
	if (!/\/song/.test(CurrentUrl))
		return;
	try {
		var el = $("#albums_info tbody").find("tr").eq(1);
		var txt = el.html();
		if (txt.indexOf(";") != -1) {		
			//alert(txt);
			txt = txt.replace(/<\/a>; <a href/g, "</a>/ <a href");
			el.html(txt);
		}
	} catch (error) {
		console.log(error);
	}
	
	// if (/\/song/.test(CurrentUrl)) {
		// el = document.getElementById("share_bar");
		// if (el) {
			// el.setAttribute("style", "visibility:hidden")
		// }
		// el = $('li.do_share');
		// if (el.length > 0) {
			// txt = '<a class="weibo" style="top: 10px; left:125px; position: relative;" title="分享到微博" onclick="return shareWeibo();" href="">';
			// txt += '<i style="display: inline-block;width: 16px;height: 16px;margin-right: 2px;background: url(\'http://img.xiami.net/static/img/common/share_icon.png\') no-repeat -32px 0;vertical-align: middle;"></i></a>';
			// txt += '<a class="laiwang" style="top: 10px; left:130px; position: relative;" title="分享到来往" onclick="return shareLaiwang();" href=""><i style="display: inline-block;width: 16px;height: 16px;margin-right: 2px;background: url(\'http://img.xiami.net/static/img/common/share_icon.png\') no-repeat -263px 0;vertical-align: middle;"></i></a>';
			// el.append(txt);
		// }
	// }

};

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

var loadfromWikia = function (){
	lyricstext = $("#lrc .lrc_main").html();
	var wikiaR = xhr(url, 'get', 0);
	var p_items = $(wikiaR).find(".poem");
	var datasid = 0;
	var songid = CurrentUrl.split("song/")[1];
	var wikialyrics = "";
	for (var i=0; i<p_items.length; i++) {
		datasid = p_items.eq(i).data("sid");
		//alert(datasid);
		if (datasid !== undefined) {
			var arr = datasid.toString().split(" ");
			for (var j = 0; j < arr.length; j++) {
				if (songid == arr[j])
					wikialyrics += p_items.eq(i).html() + "<br /><br />";
			}
		}
		else {
			wikialyrics += p_items.eq(i).html() + "<br /><br />";
		}
	}
	if (wikialyrics == "") {
		wikialyrics += "Sorry, LyricsInfo Wikia 暂时未收录这首歌的文本歌词资料。<br />";
		wikialyrics += "如果您想要自主添加歌词本精确对照的文本歌词或Credits信息，欢迎点击下方的「维基歌词」按钮进行编辑。<br />";
		wikialyrics += '不懂格式的同学请点击查看<a target="_blank" href="http://zh.lyricsinfo.wikia.com/wiki/Help:%E7%BC%96%E8%BE%91%E6%AD%8C%E8%AF%8D%E9%A1%B5">编辑详解</a>。<br />';
		wikialyrics += '<br />谢谢您支持民间虾友成立的<a target="_blank" href="http://zh.lyricsinfo.wikia.com/wiki/LyricsInfo_%E7%BB%B4%E5%9F%BA"><strong>LyricsInfo</strong></a>非营利维基歌词小组！<br />';
	}	
	wikialyrics += '<p style="float:right;font-family:monospace;"><strong>Powered by <a target="_blank" href="http://zh.lyricsinfo.wikia.com/wiki/LyricsInfo_%E7%BB%B4%E5%9F%BA">LyricsInfo Wikia Group</a></strong></p>';

	if ($(".lrc_main").length == 0) {
		wikialyrics = '<div class="lrc_main">' + wikialyrics + '</div>';
		//alert(wikialyrics);
		$("#lrc").html(wikialyrics);
	}
	else
		$("#lrc .lrc_main").html(wikialyrics);
	$("#lyric p").not('.wikialrc').hide();
	
}

var backtoXiami = function (){
	$("#lrc .lrc_main").html(lyricstext);
	$("#lyric p").not('.wikialrc').show();
	
}

var loadLRCwikia = function (){
	var songid = CurrentUrl.split("song/")[1];
	var codes = '&lt;poem class="lrc ' + songid + '"&gt;' + '<br />';
	var wkrequest = xhr("http://www.xiami.com/wiki/addlrc/id/"+songid, "get",0);
	codes += $(wkrequest).find('#editLrcText').text().replace(/\n/g, "<br />");
	//alert(codes);
	codes += '<br />&lt;/poem&gt;<br />';
	return codes;
}
var loadWikia = function () {
	if (document.getElementById("wikia"))
		return;
	if (document.getElementById("transwikia"))
		return;
		
	var wikia = '<p id="wikia" class="wikialrc">';
	wikia += '<input name="wikia" type="checkbox" style="vertical-align:middle;">';
	wikia += '<span style="margin:0 20px 0 5px;color:#666;">载入精准歌词资料</span>';
	wikia += '<a href="' + url + '?action=edit" target="_blank">维基歌词</a>';
	wikia += '&nbsp;&nbsp;&nbsp;&nbsp; <a href="' + url + '/翻译?action=edit" target="_blank">维基翻译</a>';
	wikia += '&nbsp;&nbsp;&nbsp;&nbsp; <a href="' + url + '/lrc?action=edit" target="_blank">维基动态歌词</a>';
	wikia += '</p>';
	$("#lyric").append(wikia);
	
	var transwikia = '<a href="javascript:void(0)" id="transwikia" title="Transfer to Wikia""><span>生成维基代码</span></a>';
	if ($('.cd_pay').length == 0) {
		transwikia = '<div class="song_pays"><div class="cd_pay clearfix">' + transwikia + '</div></div>';
		//alert(link);
		$('#lrc').before(transwikia);
	} else 
		$('.cd_pay').append(transwikia);
	
	$('input[name="wikia"]').click(function() {
		if ($(this).attr('checked')) {
			if (confirm("是否从LyricsInfo Wikia加载文本歌词？")) {
				loadfromWikia();
			}
			else
				$(this).attr('checked', 0);
		}
		else {
			if (confirm("是否从虾米系统加载文本歌词？")) {
				backtoXiami();
			}	
			else
				$(this).attr('checked', 1);			
		}
	});

	$("#transwikia").click(function (){
		if ($("#lrc .lrc_main").length) {
			lyricstext = $("#lrc .lrc_main").html();
			lyricstext = lyricstext.replace(/\'|‘|＇|｀|’|`/g, "'");
			lyricstext = lyricstext.replace(/"|“|”|＂|〃/g, "\"");
		}
		//alert(lyricstext);
		var info = $("#albums_info tbody").find("tr");
		var lyricist = composer = arranger = ISRC = "";
		var buffer;
		for (var i=2; i<info.length; i++) {
			buffer = $(info).eq(i).text();
			if (buffer.indexOf("作词：") != -1)
				lyricist = buffer.split("：")[1].slice();
			else if (buffer.indexOf("作曲：") != -1)
				composer = buffer.split("：")[1].slice();
			else if (buffer.indexOf("编曲：") != -1)
				arranger = buffer.split("：")[1].slice();
			else if (buffer.indexOf("ISRC：") != -1)
				ISRC = buffer.split("：")[1].slice();
		}
		
		var wikiacodes = "{{歌曲" + "<br />" + 
						 "| 歌名 = " + Songtitle + "<br />" + 
						 "| 副标题 = " + "<br />" + 
						 "| 艺人 = " + Artist + "<br />" + 
						 "| 专辑 = " + Album + "<br />" + 
						 "| 语言 = " + "<br />" + 
						 "| 作词 = " + lyricist +"<br />" + 
						 "| 作曲 = " + composer + "<br />" + 
						 "| 编曲 = " + arranger + "<br />" + 
						 "| 制作人 = " + "<br />" + 
						 "| 版权 =  "+ "<br />" + 
						 "| ISRC = " + ISRC + "<br />" + 
						 "| 原唱 = " + "<br />" + 
						 "| 原曲 = " + "<br />";
		var tracknum = $("#lrc").attr("tracknum");
		wikiacodes += "| 曲序 = " + tracknum + "<br />";
		
		var title; 		
		if (parseInt(tracknum)-1) {
			title = $("#lrc").attr("last");
			feat_artist = $("#lrc").attr("lasta");
			var lastTrack = "[[" + title + " (" + feat_artist + ")|" + title + "]]";
			wikiacodes += "| 上一首 = " + lastTrack + "<br />";
			wikiacodes += "| 上一首曲序 = " + (parseInt(tracknum)-1).toString() + "<br />";
		}
		else
			wikiacodes += "| 上一首 = —<br />";

		title = $("#lrc").attr("next");
		feat_artist = $("#lrc").attr("nexta");
		if (title != "") {
			var nextTrack = "[[" + title + " (" + feat_artist + ")|" + title + "]]";
			wikiacodes += "| 下一首 = " + nextTrack + "<br />" + 
					  "| 下一首曲序 = " + (parseInt(tracknum)+1).toString() + "<br />";
		}
		else
			wikiacodes += "| 下一首 = —<br />";
		wikiacodes += "}}<br /><br />";
		
		wikiacodes += "&lt;verbatim&gt;" + Songtitle + "&lt;/verbatim&gt;" + "<br /><br />";
		wikiacodes += "&lt;poem&gt;" + "<br />";
		var index = lyricstext.indexOf("<br>\n<br>\n<br>");
		if (index == -1)
			wikiacodes += lyricstext + "<br />" + "&lt;/poem&gt;";
		else {
			wikiacodes += lyricstext.substring(0, index) + "<br />" + "&lt;/poem&gt;" + "<br /><br />";
			wikiacodes += "==制作信息==<br />" + "&lt;poem&gt;" + "<br />" + lyricstext.substring(index+15) + "<br />" + "&lt;/poem&gt;" + "<br />";
		}
		//alert(wikiacodes);
		var lrccodes = "";
		if (confirm("是否一并生成LRC维基代码？")) {
			lrccodes += "<br /><br />=======================<br />";
			lrccodes += "<p><strong>动态歌词维基代码：</strong><br /><br />";
			lrccodes += loadLRCwikia();
		}
		if ($(".lrc_main").length == 0) {			
			wikiacodes = '<div class="lrc_main">' + wikiacodes + lrccodes + '</div>';
			//alert(wikialyrics);
			$("#lrc").html(wikiacodes);
		} else {
			wikiacodes = wikiacodes + lrccodes;
			$("#lrc .lrc_main").html(wikiacodes);
		}
		
		
	});
}

var CurrentUrl = window.location.href;
CurrentUrl = CurrentUrl.split("?")[0].split("#")[0];
if (/com\/song/.test(CurrentUrl)) {
	var transList = "";
	var lyricstext = "";	
	
	var Songtitle = $('#title h1').contents().filter(function () {
		return this.nodeType == 3;
	}).text();
	Songtitle = Songtitle.replace("[", "(").replace("]", ")");
	
	var ArtistItems = $('#albums_info tbody').find("tr").eq(1).find("a");
	var Artist = ArtistItems.eq(0).text();
	for (var i=1; i<ArtistItems.length; i++)
		if (ArtistItems.eq(i).attr("href") != "http://i.xiami.com")
			Artist += " / " + ArtistItems.eq(i).text();	
	Artist = Artist.replace("[", "(").replace("]", ")");
	
	var Albumtitle = $("meta[property='og:music:album']").attr("content");
	var Album = "[[" + $("meta[property='og:music:artist']").attr("content") + "《" + Albumtitle + "》|" + Albumtitle + "]]";
	//alert(Artist + "///" + Album);
	
	var url = 'http://zh.lyricsinfo.wikia.com/wiki/' + encodeURIComponent(Songtitle) + ' (' + encodeURIComponent(Artist) + ')';
	//alert(url);
	
	removeTranslist();
	headerModify();
	semicolConvert();
	loadWikia();
	loadTranslist();	
	loadISRC();	
}
