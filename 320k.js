// 从320K专门店获取音质信息，并展示在专辑页面右侧。
// 版本号：1.10.3.1

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
	
// load 320K information
var loadQualitynotes = function() {
	if (document.getElementById("quality_notes")) return;
	var str = document.cookie.split("; ");
	var albumID = CurrentUrl.split("album/")[1];
	
	//alert(albumID);
	//var keywords;		keywords = $("meta[name='keywords']").attr("content").split(", ");
	
	var albumTitle = $('#title h1').contents().filter(function() {
			return this.nodeType == 3;
		}).text();
	var albumArtist = $('#album_info table tbody').children().first().children().last().text();
	
	//keywords[1].replace(albumTitle, "");
	//alert(albumTitle); alert(albumArtist);
	
	var SearchUrl = "/space/lib-album/u/4275776/page/1?mode=list&key="+ Re_title3(albumTitle) + "+" + albumArtist;
	//var SearchUrl = "/space/lib-album?" + token + "&u=4275776?mode=list&key=" + Re_title3(albumTitle) + "+" + albumArtist;
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
			var searchingID = "#album_" + albumID;
			var AllResults = $(ResultsHtml).find(searchingID);
			var ResultsNum = AllResults.length;
			if (ResultsNum == 1) {
				//alert (ResultsNum);
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
		}
	}
	AlbumRequest();	
};

var removeQualitynotes = function() {
  var el = document.getElementById("quality_notes");
  if (el) {
    el.parentNode.removeChild(el);
  }
}

removeQualitynotes();
var CurrentUrl = window.location.href;
CurrentUrl = CurrentUrl.split("?")[0].split("#")[0];
if (CurrentUrl.indexOf("xiami.com/album/") != -1) {
	loadQualitynotes();		
}
