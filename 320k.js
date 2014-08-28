var loadQualitynotes = function() {
	if (document.getElementById("quality_notes")) return;

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
			ti = ti.replace(/['|"|“|”|‘|＇|＂|｀|〃|’|`|;|:]/g,"+");
			ti = ti.replace(/\s+/g,"");
			ti = ti.toLowerCase();
			return ti;
		}
		
	var CurrentUrl = window.location.href;
	if (CurrentUrl.indexOf("/album/") != -1) {
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
		var albumID = ReUrl.replace(/\/album\//, "");
		albumID = albumID.replace(/\?spm=.+/, "");
		var keywords;
		keywords = $("meta[name='keywords']").attr("content").split(", ");
		var albumTitle = keywords[0].replace(/专辑/, "");
		var albumArtist = keywords[1].replace(albumTitle, "");
		//alert(albumTitle); alert(albumArtist);
		var SearchUrl = "/space/lib-album?" + token + "&u=4275776&key=" + Re_title3(albumTitle) + "+" + albumArtist;
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
	}
	
};

var removeQualitynotes = function() {
  var el = document.getElementById("quality_notes");
  if (el) {
    el.parentNode.removeChild(el);
  }
}

removeQualitynotes();
loadQualitynotes();

