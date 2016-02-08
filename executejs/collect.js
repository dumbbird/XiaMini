String.prototype.trim=function(){
return this.replace(/(^\s*)|(\s*$)/g,"");
}

function load_fulltitle() {
	if ($('.song_name').length <= 1)
		return;
	var fullTitle = title = "";
	var songID = 0;
	$('.song_name').each(function(){
		title = $(this).find("a").eq(0).text().trim();
		//alert(title);
		if (title.indexOf("...") != -1) {
			fullTitle = $(this).find("a").eq(0).attr("title");
			if (fullTitle.indexOf(title.split("...")[0]) != -1)
				//alert(fullTitle);
				$(this).find("a").eq(0).text(fullTitle);
			//songID = $(this).find("a").eq(0).attr("href");
			//alert(songID);
			//xhr("http://www.xiami.com"+songID, 'get', 1,"",function(ResultsHtml){			
			//}
		}
	});
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
	testremoved();
	load_fulltitle();	
}