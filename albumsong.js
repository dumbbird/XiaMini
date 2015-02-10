var loadTracklist = function () {
	// 在单曲页面显示专辑里的其它曲目

	if (document.getElementById("album_song"))
		return;

	var CurrentUrl = window.location.href;
	if (CurrentUrl.indexOf("/song/") != -1) {
		var arr = CurrentUrl.split("//");
		var ReUrl = arr[1].match(/\d+/);
		var AlbumUrl = $("#albumCover").attr("href");
		var xmlhttp;
		var MaxShow = 6; // 初始最多显示数量+1

		function AlbumRequest() {
			xmlhttp = new XMLHttpRequest;
			xmlhttp.onreadystatechange = callback;
			xmlhttp.open("GET", AlbumUrl, true);
			xmlhttp.send(null);
		}

		function callback() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				var AlbumHtml = xmlhttp.responseText; // 抓取专辑页
				var AllSongs = $(AlbumHtml).find(".song_name");
				$(AllSongs).find("a.show_zhcn").remove(); // 去除歌曲注释信息
				var AllSongsDo = $(AlbumHtml).find(".song_do");
				$(AllSongsDo).find(".song_menu").remove(); // 去除more按钮
				var SongsNum = (AllSongs.length > MaxShow) ? MaxShow : AllSongs.length; // 列表初始最多显示MaxShow-1首
				var SongID;
				var AlbumSongs = '<div id="album_song" class="block mgt20" >' +
					'<h3><a class="playRank fr" style="margin:-3px 20px 0 0;" href="javascript:void(0)" title="全部播放" onclick="playall(\'ids2\');">全部播放</a>这张专辑还有    ';
				if (AllSongs.length > MaxShow) {
					AlbumSongs += '<a style="font-size:10px;padding-right:18px;width:30px;" title="" href="javascript:void(0)" id="al_show">全部</a>';
				}
				AlbumSongs += '</h3>' +
				'<div class="content clearfix">' +
				'<table cellspacing="0" cellpadding="0" class="track_list">';

				for (var i = 0; i < SongsNum; i++) {
					if (AllSongs.eq(i).html().indexOf(ReUrl) == -1) { //列表不包含当前页歌曲
						SongID = $(AllSongs).eq(i).find("a").attr('href');
						SongID = SongID.match(/\d+/); // 截取歌曲ID
						AlbumSongs += '<tr>' +
						'<input type="hidden" name="ids2" check="checked" value="' + SongID + '"/>' +
						'<td class="song_name"><p class="as_trackname">';
						if (Isoverflow($(AllSongs).eq(i).text())) { //判断显示时是否会超长
							AlbumSongs += '<marquee id="Tmarquee_' + i + '" behavior="alternate" scrollamount="0">' +
							AllSongs.eq(i).html() + '</marquee>';
						} else {
							AlbumSongs += AllSongs.eq(i).html();
						}
						AlbumSongs += '</p></td>' +
						'<td class="song_act">' +
						'<div class="song_do clearfix" style="width:140px;">' +
						AllSongsDo.eq(i).html() +
						'</div></td></tr>';
					}
				}
				if (AllSongs.length > SongsNum) { //超过部分添加
					for (var i = SongsNum; i < AllSongs.length; i++) {
						if (AllSongs.eq(i).html().indexOf(ReUrl) == -1) { //列表不包含当前页歌曲
							SongID = $(AllSongs).eq(i).find("a").attr('href');
							SongID = SongID.match(/\d+/); // 截取歌曲ID
							AlbumSongs += '<tr name="Al_songs_more">' + // 超过初始显示数量部分将不显示
							'<input type="hidden" name="ids2" check="checked" value="' + SongID + '"/>' +
							'<td class="song_name"><p class="as_trackname">';
							if (Isoverflow($(AllSongs).eq(i).text())) { //判断显示时是否会超长
								AlbumSongs += '<marquee id="Tmarquee_' + i + '" behavior="alternate" scrollamount="0">' +
								AllSongs.eq(i).html() + '</marquee>';
						} else {
								AlbumSongs += AllSongs.eq(i).html();
						}
							AlbumSongs += '</p></td>' +
							'<td class="song_act">' +
							'<div class="song_do clearfix" style="width:140px;">' +
							AllSongsDo.eq(i).html() +
							'</div></td></tr>'
						}
					}
				}
				AlbumSongs += '</table></div></div>';
				if (AllSongs.length > 1) { //只有一首的单曲不显示空列表
					var textOverflow = '<style>'
						 + 'p.as_trackname {width:129px;overflow:hidden; white-space:nowrap; text-overflow: ellipsis; word-break:keep-all;}'
						 + 'p.as_trackname:hover {text-overflow:inherit; overflow:visible;}'
						 + '</style>';
					$('head').append(textOverflow);
					$("#relate_song").before(AlbumSongs);
				}

				$("marquee[id^=Tmarquee_]").mouseover(function () {
					var tmid = this.id.split("_")[1];
					$("marquee#Tmarquee_" + tmid).attr('scrollamount', '2');
				});
				$("marquee[id^=Tmarquee_]").mouseleave(function (event) {
					var tmid = this.id.split("_")[1];
					//var x = event.clientX;
					//var y = event.clientY;
					//var x1 = this.offsetLeft + this.getBoundingClientRect().left;
					//var y1 = this.offsetTop - 7 + this.getBoundingClientRect().top;
					//var x2 = x1 + this.offsetWidth;
					//var y2 = y1 + this.offsetHeight -1;
					//alert(x+'_'+y+'_'+x1+'_'+x2+'_'+y1+'_'+y2);
					//if( x < x1 || x > x2 || y < y1 || y > y2) {	// 碰到元素内子元素也会触发mouseout事件，追加验证是否还在元素内
					$("marquee#Tmarquee_" + tmid).attr('scrollamount', '0');
					$("marquee#Tmarquee_" + tmid).attr('scrollLeft', $("marquee#Tmarquee_" + tmid).attr('width'));
					//}
				});
				
				function Isoverflow(str) {  //添加一个容器，通过丢入字符串后的元素相对高度判断是否换行即超长
					if ($("td#hidediv").length <= 0) {
						var hidediv = '<tr id="hidetr"><td id="hidediv" class="song_name"></td><td class="song_act"></td>';
						hidediv += '<div class="song_do clearfix" style="width:140px;"></tr>';
						$("div#relate_song tr").eq(0).before(hidediv);
					}
					$("td#hidediv").html(str);
					return ($("td#hidediv").attr('offsetHeight') > 28);
				};
				
				$("tr#hidetr").remove();
				$("tr[name='Al_songs_more']").hide(); //隐藏超过部分
				$("#al_show").css({
					"background" : "url(http://img.xiami.net/res/img/default/main_bg.gif?v20130402) 12px -578px no-repeat"
				});

				$("#al_show").toggle(
					function () {
					$("tr[name='Al_songs_more']").show();
					$(this).html("部分");
					$(this).css({
						"background" : "url(http://img.xiami.net/res/img/default/main_bg.gif?v20130402) 12px -620px no-repeat"
					});
				},
					function () {
					$("tr[name='Al_songs_more']").hide();
					$(this).html("全部");
					$(this).css({
						"background" : "url(http://img.xiami.net/res/img/default/main_bg.gif?v20130402) 12px -578px no-repeat"
					});
				});
			}
		}
		AlbumRequest();
	}
};

function removeTracklist() {
  var el = document.getElementById("album_song");
  if (el) {
    el.parentNode.removeChild(el);
  }
}

removeTracklist();
loadTracklist();
