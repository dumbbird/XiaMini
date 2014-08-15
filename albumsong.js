var loadTracklist = function() {
	// 在单曲页面显示专辑里的其它曲目
	
	if (document.getElementById("album_song")) return;
		
	var CurrentUrl = window.location.href;
	if (CurrentUrl.indexOf("/song/") != -1) {
		var arr = CurrentUrl.split("//");
		var ReUrl = arr[1].substring(arr[1].indexOf("/"));
		var AlbumUrl = $("#albumCover").attr("href");
		var xmlhttp;

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
				var AllSongsDo = $(AlbumHtml).find(".song_do");
				$(AllSongsDo).find(".song_menu").remove(); // 去除more按钮
				var SongsNum = (AllSongs.length > 16) ? 16 : AllSongs.length; // 列表初始最多显示15首
				var SongID;
				var AlbumSongs = '<div id="album_song" class="block mgt20" >' +
					'<h3><a class="playRank fr" style="margin:-3px 20px 0 0;" href="javascript:void(0)" title="全部播放" onclick="playall(\'ids2\');">全部播放</a>这张专辑还有    ';
				if (AllSongs.length > 16) {
					AlbumSongs += '<a style="font-size:10px" title="" href="javascript:void(0)" id="al_show">全部</a>';
				}
				AlbumSongs += '</h3>' +
				'<div class="content clearfix">' +
				'<table cellspacing="0" cellpadding="0" class="track_list">';

				for (var i = 0; i < SongsNum; i++) {
					if (AllSongs.eq(i).html().indexOf(ReUrl) == -1) { //列表不包含当前页歌曲
						SongID = $(AllSongs).eq(i).find("a").attr('href');
						SongID = SongID.substring(6); // 截取歌曲ID
						AlbumSongs += '<tr>' +
						'<input type="hidden" name="ids2" check="checked" value="' + SongID + '"/>' +
						'<td class="song_name"><p>' +
						AllSongs.eq(i).html() +
						'</p></td>' +
						'<td class="song_act">' +
						'<div class="song_do clearfix" style="width:140px;">' +
						AllSongsDo.eq(i).html() +
						'</div></td></tr>'
					}
				}
				if (AllSongs.length > SongsNum) { //超过部分添加
					for (var i = SongsNum; i < AllSongs.length; i++) {
						if (AllSongs.eq(i).html().indexOf(ReUrl) == -1) { //列表不包含当前页歌曲
							SongID = $(AllSongs).eq(i).find("a").attr('href');
							SongID = SongID.substring(6); // 截取歌曲ID
							AlbumSongs += '<tr name="Al_songs_more">' + // 超过初始显示数量部分将不显示
							'<input type="hidden" name="ids2" check="checked" value="' + SongID + '"/>' +
							'<td class="song_name"><p>' +
							AllSongs.eq(i).html() +
							'</p></td>' +
							'<td class="song_act">' +
							'<div class="song_do clearfix" style="width:140px;">' +
							AllSongsDo.eq(i).html() +
							'</div></td></tr>'
						}
					}
				}
				AlbumSongs += '</table></div></div>';
				if (AllSongs.length > 1) { //只有一首的单曲不显示空列表
					$("#relate_song").before(AlbumSongs);
				}
				$("tr[name='Al_songs_more']").hide(); //隐藏超过部分
				$("#al_show").css({
					"background" : "url(http://img.xiami.net/res/img/default/main_bg.gif?v20130402) 12px -578px no-repeat",
					"padding-right" : "18px",
					"width" : "30px"
				});
				$("#al_show").toggle(
					function () {
					$("tr[name='Al_songs_more']").show();
					$(this).html("部分");
					$(this).css({
						"background" : "url(http://img.xiami.net/res/img/default/main_bg.gif?v20130402) 12px -620px no-repeat",
						"padding-right" : "18px",
						"width" : "30px"
					});
				},
					function () {
					$("tr[name='Al_songs_more']").hide();
					$(this).html("全部");
					$(this).css({
						"background" : "url(http://img.xiami.net/res/img/default/main_bg.gif?v20130402) 12px -578px no-repeat",
						"padding-right" : "18px",
						"width" : "30px"
					});
				});
			}
		}
		AlbumRequest();
	}
}

loadTracklist();
