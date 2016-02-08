// 从320K专门店获取音质信息，并展示在专辑页面右侧。
// 增加DiscPlay、taobao音乐馆、wikia等。
// 版本号：1.10.4

// title rearrange
function Re_title4(ti){ 
	ti = ti.replace(/\&/g,"&amp;");   //&
	return ti;   
}
function Re_title3(ti){ //中断类
	ti = ti.replace(/['|"|“|”|‘|＇|＂|｀|〃|’|`|;|:|,]/g,"+");
	ti = ti.replace(/\s+/g,"+");
	ti = ti.toLowerCase();
	return ti;
}

// get track artists
function getFeatArtists (songids, i){
	var feat_artists = $(songids).eq(i).contents().filter(function () {
		return this.nodeType == 3;
	}).text();
	feat_artists = feat_artists.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
	//alert(feat_artists);
	if (feat_artists == "" || /\<\/b\>/.test(feat_artists))
		return artist;
	else
		return feat_artists;
}
	
// load 320K information
var loadQualitynotes = function() {
	if (document.getElementById("quality_notes")) return;
	//var str = document.cookie.split("; ");
	//var keywords;		keywords = $("meta[name='keywords']").attr("content").split(", ");	
	// var albumTitle = $('#title h1').contents().filter(function() {
			// return this.nodeType == 3;
		// }).text();
	var albumArtist = $('#album_info table tbody').children().first().children().last().text();	
	//keywords[1].replace(albumTitle, "");
	//alert(albumTitle); 
	//alert(albumArtist);
	
	var SearchUrl = "/space/lib-album/u/4275776/page/1?mode=list&key="+ Re_title3(albumname) + "+" + artist;
	//var SearchUrl = "/space/lib-album?" + token + "&u=4275776?mode=list&key=" + Re_title3(albumTitle) + "+" + albumArtist;
	//alert (SearchUrl);
	
	xhr(SearchUrl, 'get', 1, "", function (ResultsHtml) {
		var searchingID = "#album_" + albumid;
		//alert (searchingID);
		var AllResults = $(ResultsHtml).find(searchingID);
		var ResultsNum = AllResults.length;
		//alert (ResultsNum);
		if (ResultsNum == 1) {
			var tag;
			var notes = '<div id="quality_notes" class="block sec_Rlt mgt20" style="align:center"><h3>本专辑的音质是</h3>' 
				+ '<div class="content clearfix">';
			tag = $(AllResults).eq(0).find(".tag_block").html();
			notes += tag;
			notes += '<div id="quality_note" class="blank10"><p>Powered by <a href="/u/4275776">320K专门店</a> & <a href="/g/hquality">一切为了高品质小组</a></p></div>';				
			notes += '</div>';					
			notes += '<div class="acts"><a class="more" href="/group/thread-detail/tid/430005" target="_blank">报告错误</a></div>';
			notes += '</div>';
			//alert(notes);
			if ($("#other_albums").length > 0)
				$("#other_albums").before(notes);
			else
				$("#album_tags_block").before(notes);
		}
	});
};

var removeQualitynotes = function() {
  var el = document.getElementById("quality_notes");
  if (el) {
    el.parentNode.removeChild(el);
  }
}

// load discplay, taobao & wikia
function addDiscplay() {
	if ($('#track .mgt10 strong').length <= 1)
		return;
	if ($('.discplay').length)
		return;
	var discnum = $('#track .mgt10 strong').length;
	var discplay = '';
	for(var x=0; x<discnum; x++) {
		discplay = $('#track .mgt10 strong').eq(x).html();
		discplay += '<b class="ico_cd ele_inline mah discplay"><a href="javascript:void(0)" title="选中此碟并播放"\
		onclick="$(\'[name=recommendids]\').attr(\'checked\',false);\
		$(\'#track .mgt10 table\').eq('+x+').find(\'[name=recommendids]\').attr(\'checked\',true);\
		playsongs(\'recommendids\');">试听</a></b>';
		$('#track .mgt10 strong').eq(x).html(discplay);
	}
}

function addAlbumWikia() {
	if ($('#wikiabtn').length)
		return;
	var link = '<a id="wikiabtn" class="cd_download" href="javascript:void(0)" title="一键生成Wikia专辑页代码"><span>生成维基代码</span></a>';
	if (/\/album\//.test(CurrentUrl)) {
		if ($('.cd_pay').length == 0) {
			link = '<div class="cd_info clearfix"><div class="cd_pay" style="position:relative;">' + link + '</div></div>';
			//alert(link);
			$('div.chapter').before(link);
		} else
			$('.cd_pay').append(link);
	}
	
	function lang2dep(lang) {
		var dep = "欧美分部";
		switch(lang) {
			case "国语":
			case "粤语":
			case "闽南语":
				dep = "华语分部";
				break;
			case "日语":
			case "韩语":
				dep = "日韩分部";
				break;
			default:
				break;	
		}		
		return dep;
	}
	
	$('#wikiabtn').live('click',function(){
		var id, title;
		var songids = $('.song_name');	// get most updated tracklist

		var tracklist = "<p>";
		tracklist += "{{专辑" + "<br>" +
					 "| 专辑名 = " + albumname + "<br>" +
					 "| 艺人 = " + artist + "<br>" +
					 "| 类型 = " + type + "<br>" +
					 "| 首发时间 = " + date + "<br>" +
					 "| 分部 = " + lang2dep(language) + "<br>" +
					 "| 整理编号 = " + "<br>" +
					 "| 整理人 = [[User:]]" + "<br>" +
					 "| 制作信息 = 有/无/部分" + "<br>" +
					 "| 校对 = 是/否/部分" + "<br>" +
					 "| 封面 = " + "<br>" +
					 "| 上一张 = " + "<br>" +
					 "| 下一张 = " + "<br>" +
					 "| 上一编号 = " + "<br>" +
					 "| 下一编号 = " + "<br>" +
					 "}}<br>";

		tracklist += "<br>==曲目列表==<br>";
		for (var i = j = 0; i < songids.length; i++) {
			try {
				j = $(songids).eq(i).find("a").attr('href').split('song/')[1];
			} catch(err) {
				j = $(songids).eq(i).attr("data-sid");
				//alert(j);
			}
			
			if(j) {
				id = j;
				title = $(songids).eq(i).find("a").eq(0).text().replace(/^\s\s*/, '').replace(/\s\s*$/, '');
				var feat_artists = getFeatArtists(songids, i);				
				tracklist += "# [[" + title + " (" + feat_artists + ")|" + title + "]]<br />";
			}
		}
		tracklist += "</p>"
		//alert(albumid + " ... " + albumname + ' ... ' + pic);
		//alert(tracklist);
		if ($('.album_intro_brief').length)
			$('.album_intro_brief').html(tracklist);
		else
			$('#share_bar').after('<div id="album_intro"><div class="album_intro_brief">' + tracklist + '</div></div>');
	});
}

function load_Taobao() {
	if (document.getElementById("do_buy"))
		return;
	var link = $('#taobao_cd a').attr('href');
	
	if (link) {
		//alert(link);
		var do_buy = '<li id="do_buy" class="do_buy"><a href="' + link + '" target="_blank" class="wrap" title="去淘宝音乐馆淘碟">';
		do_buy += '<span><i></i>淘碟</span></a></li>';
		$('.acts_list').append(do_buy);
	}
}

function addwormhole() {
	if (document.getElementById("wh_generator"))
		return;

		var link = '<li><a id="wh_generator" class="report" href="javascript:void(0)" title="虫洞生成器" style="margin: 10px 0;"><i></i>生成虫洞 (观光团导游专用)</a></li>';
	if (/\/album\//.test(window.location.href))
		$('.amend ul').append(link);
	else ;
	
	$('#wh_generator').live('click',function(){
		var id, title, wormhole;
		var avail = true;
		var wh_songids = $('.song_name');	// get most updated tracklist
		wormhole = '<p><strong>想提交自己的虫洞申请？或更多了解如何成为虫洞穿越观光团导游吗？在<a href="http://www.xiami.com/collect/552436">这张精选集</a>下面留言联系我哈。</strong></p>'
		wormhole += '<br /><table cellspacing="0" cellpadding="0" class="track_list"><tbody>';
		for (var i = j = 0; i < wh_songids.length; i++) {
			avail = ($(wh_songids).eq(i).parent().find(".song_hot").text() == "") ? false : true;
			//alert(avail);
			if (avail)	continue;
			try {
				j = $(wh_songids).eq(i).find("a").attr('href').split('song/')[1];
			} catch(err) {
				j = $(wh_songids).eq(i).attr("data-sid");
				//alert(j);
			}

			if(j) {
				id = j;
				title = $(wh_songids).eq(i).find("a").eq(0).text().replace(/^\s\s*/, '').replace(/\s\s*$/, '');
				var feat_artists = getFeatArtists(wh_songids, i);
					
				wormhole += '&nbsp;&nbsp;"' + id + '": { "song_id":"' + id + '", "title":"' + title 
						+ '", "album_id":"' + albumid + '", "album_name":"' + albumname 
						+ '", "artist":"' + feat_artists + '", "location":"", "pic":"' + pic + '"},<br />';
			}
		}
		
		wormhole += "<br /><p><strong>六维穿越代码模板：<br />"
					+ "把下面代码中的1234567 (请最好填入消失曲目的实际ID)、XXX (曲目名称)、x (disc序号，1/2/3 etc.)、yy(曲序，01/02/03 etc.) "
					+ "分别替换成你想要生成的虫洞数据，然后在location处加入虫洞地址。</strong><br />";
		wormhole += '&nbsp;&nbsp;"a' + albumid + '": [{ "song_id": "1234567", "title":"XXX", "cd":"x", "index":"yy"}],<br />';
		wormhole += '&nbsp;&nbsp;"1234567": { "song_id":"1234567", "title":"XXX", "album_id":"' + albumid + '", "album_name":"' + albumname 
						+ '", "artist":"' + artist + '", "location":"", "pic":"' + pic + '"},<br />';
		wormhole += "</p>"
		wormhole += "</tbody></table>";

		//alert(albumid + " ... " + albumname + ' ... ' + pic);
		//alert(wormhole);
		if ($('.album_intro_brief').length)
			$('.album_intro_brief').html(wormhole);
		else
			$('#share_bar').after('<div id="album_intro"><div class="album_intro_brief">' + wormhole + '</div></div>');
	});
	
}

function semicolConvert() {
	// alert("semi");
	try {
		el = $('#album_song, #track, #relate_song').find('.song_name');
		for (var i=0; i<el.length; i++) {
			txt = $(el).eq(i).html();	// 直接获取html
			
			if (txt.indexOf(";") != -1){
				txt = txt.replace(/\&amp;/g, "&");
				txt = txt.replace(/\&nbsp;/g, " ");
				txt = txt.replace(/\&quot;/g, "\"");
				txt = txt.replace(/\&lt;/g, "<");
				txt = txt.replace(/\&gt;/g, ">");

				// 如果检测到;，就做以下的替换。
				txt = txt.replace(/;/g, " / ");	
				//alert(txt);
				$(el).eq(i).html(txt);		// 将html赋值回去	
			}
		}
	}
	catch (err) {
		console.log(err);
	}
}

removeQualitynotes();
var CurrentUrl = window.location.href;
CurrentUrl = CurrentUrl.split("?")[0].split("#")[0];
if (CurrentUrl.indexOf("xiami.com/album/") != -1 || CurrentUrl.indexOf("xiami.com/artist/") != -1)
	semicolConvert();
if (CurrentUrl.indexOf("xiami.com/album/") != -1) {
	addDiscplay();
	load_Taobao();		// load music.taobao.com ad
	
	// get album info
	var albumid = CurrentUrl.split("album/")[1];
	var albumname = $("meta[property='og:title']").attr("content");
	var artist = $("meta[property='og:music:artist']").attr("content");
	var pic = $("meta[property='og:image']").attr("content");
	var albumInfo = $('#album_info table tbody').find("tr");
	var language = $(albumInfo).eq(1).find("td").eq(1).text();
	var date = $(albumInfo).eq(3).find("td").eq(1).text();
	var type = $(albumInfo).eq(4).find("td").eq(1).text();
	
	loadQualitynotes();	
	addAlbumWikia();
	var tab = "	";
	addwormhole();
	//alert("123");
}
