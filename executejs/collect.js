String.prototype.trim=function(){
return this.replace(/(^\s*)|(\s*$)/g,"");
}

function formatTitles() {
	if ($('.song_name').length <= 1)
		return;
	var fullTitle = title = "";
	var songid = 0;
	$('.song_name').each(function(){
		
		// Add href link and buttons to unavailable tracks
		var ua = $(this).html().trim().split(" --");
		var item = $(this).parent();
		songid = $(item).find(".chk input").attr("value");
		if (ua[0].indexOf("<a href=") == -1) {	
			//console.log(ua);						
			if (ua[0].indexOf("</label>") != -1)
				title = $(ua[0]).text();
			else
				title = ua[0];
			$(this).html('<a href="/song/' + songid + '" title="' + title + '">' + ua[0] + '</a>' + " -- " + ua[1]);
			
			var collectid = CurrentUrl.split("collect/")[1];
			//console.log(collectid);
			$("#totle_" + songid).attr('data-playstatus', '1');
			
			var button_html = '';
			if ($(item).find('.song_digg, .song_toclt').length == 0) {
				button_html += '<a class="song_digg" href="javascript:void(0)" title="分享" onclick="recommend(' + songid + ',\'32\');">分享</a>';
				button_html += '<a class="song_tel" href="javascript:void(0)" title="发送到我的设备" onclick="onclick="showDialog(\'/music/send/id/' + songid + ');">发送到我的设备</a>';
				button_html += '<a class="song_toclt" href="javascript:void(0)" onclick="collect(\'' + songid + '\');" title="添加这首歌曲到精选集">添加到精选集</a>';
				// if ($("#edit_bars").length) {
					// button_html += '<a class="song_edit" title="编辑">编辑</a>';
					// button_html += '<a class="song_delete" title="删除" rel="' + songid +'" href="/collect/ajaxdelsong/cid/' + collectid + '/sid/' + songid + '">删除</a>';
				// }
			}
			if ($(item).find("p").length == 0) 
				$(item).append("<p>" + button_html) + "</p>";
			else
				$(item).find("p").prepend(button_html);
		}		
		else {
			title = $(this).find("a").eq(0).text().trim();
			//var button_html = '<a class="song_tel" href="javascript:void(0)" title="发送到我的设备" onclick="onclick="showDialog(\'/music/send/id/' + songid + ');">发送到我的设备</a>';
			//$(item).find("p .song_digg").after(button_html);
			//alert(title);
		}
		
		// Load fulltitle to long tracks
		if (title.indexOf("...") != -1) {
			fullTitle = $(this).find("a").eq(0).attr("title");
			if (fullTitle.indexOf(title.split("...")[0]) != -1)
				//alert(fullTitle);
				$(this).find("a").eq(0).text(fullTitle);
			//songid = $(this).find("a").eq(0).attr("href");
			//alert(songid);
			//xhr("http://www.xiami.com"+songid, 'get', 1,"",function(ResultsHtml){			
			//}
		}
	});
}

function songidDecode() {
	// alert("semi");
	try {
		var tracks = $('.song_name');
		var decodedSongID = "";
		var decodedSong = "";
		//alert(tracks.length);
		for (var i=0; i<tracks.length; i++) {
			//encodedSongID = $(tracks).eq(i).find("a").eq(0).attr("href");	// 直接获取html
			//console.log(encodedSongID);
			decodedSongID = $(tracks).eq(i).parent().find(".chk input").attr("value");
			//console.log(decodedSongID);
			decodedSong = $(tracks).eq(i).find("a");
			$(decodedSong).each(function() {
				if($(this).attr("href").indexOf("/song/") != -1)
					$(this).attr("href", "/song/" + decodedSongID);
			});
			//$(tracks).eq(i).find("a.show_zhcn").attr("href", "/song/" + decodedSongID);
		}
	}
	catch (err) {
		console.log(err);
	}
}

function testremoved(){
	if (!/xiami.com\/collect\//.test(window.location.href))
		return;

	var link = '<li class="do_widget" id="bar_for_test"><a href="javascript:void(0)" class="wrap" title="检查曲目数据丢失情况并备份现有曲目列表"><span><i></i>检查备份</span></a></li>';
	$('#album_acts .acts_list').append(link);
	
	$('#bar_for_test').live('click',function(){
		if ($('#loader').length && $('#loader').attr("style") != "display: none;") {
			alert("这张精选集曲目多于50首，请在下方点击加载全部曲目列表之后再使用本功能。")
			return false;
		}
		var songnum = $(".Qsong_item").length;
		//alert(songnum);
		var infonum = $('.cdinfo ul li').eq(1).text().split("：")[1];
		//alert(infonum);
		//var lasttrackid = $(".trackid").last().text();
		//alert(lasttrackid);
		if (songnum == infonum)
			alert("一切正常！");
		else
			alert("有丢失现象！" + songnum + "/" + infonum);
		var tracklist = "<strong>请复制下面曲目列表信息，粘贴到其他地方作为备份。</strong><br><br>";
		var track, trackid;
		for (var i=0; i<songnum; i++) {
			track = $('.song_name').eq(i).text();
			trackid = $('.song_name').eq(i).find("a").eq(0).attr("href").split("song/")[1];
			tracklist += parseInt(i+1) + ". " + track + "	[" + trackid +  "]<br>";
		}
		//alert(tracklist);
		$('.info_intro_full').html(tracklist);
	});
}

var CurrentUrl = window.location.href;
CurrentUrl = CurrentUrl.split("?")[0].split("#")[0];
if (CurrentUrl.indexOf("xiami.com/collect/") != -1) {
	songidDecode();
	testremoved();
	formatTitles();	
}