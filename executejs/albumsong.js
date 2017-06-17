/*
version: 2.14
log: fix songID code issue
*/

var loadTracklist = function () {
	// 在单曲页面显示专辑里的其它曲目

	function getFeatArtists (songids, i){
		var feat_artists = $(songids).eq(i).contents().filter(function () {
			return this.nodeType == 3;
		}).text();
		feat_artists = feat_artists.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
		//alert(feat_artists);
		if (feat_artists == "" || /\<\/b\>/.test(feat_artists))
			return Artist;
		else
			return feat_artists;
	}

	if (document.getElementById("album_song"))
		return;

	var CurrentUrl = window.location.href;
	var ArtistItems = $('#albums_info tbody').find("tr").eq(1).find("a");
	var Artist = ArtistItems.eq(0).text();

	for (var i=1; i<ArtistItems.length; i++)
		if (ArtistItems.eq(i).attr("href") != "http://i.xiami.com")
			Artist += " / " + ArtistItems.eq(i).text();
	Artist = Artist.replace("[", "(").replace("]", ")");

	if (CurrentUrl.indexOf("/song/") != -1) {
		//var arr = CurrentUrl.split("//");
		var ReUrl = $('#qrcode').find(".acts").text(); // get current songID

		var AlbumUrl = $("#albumCover").attr("href");
		var MaxShow = 6; // 初始最多显示数量+1

		xhr(AlbumUrl, 'get', 1, "", function (AlbumHtml) {
			var AllSongs = $(AlbumHtml).find(".song_name");
			var AllSongIDs = $(AlbumHtml).find("#track .chkbox");
			$(AllSongs).find("a.show_zhcn").remove(); // 去除歌曲注释信息
			var AllSongsDo = $(AlbumHtml).find(".song_do");
			$(AllSongsDo).find(".song_menu").remove(); // 去除more按钮
			var SongsNum = (AllSongs.length > MaxShow) ? MaxShow : AllSongs.length; // 列表初始最多显示MaxShow-1首
			var SongID;
			var TrackNum = 1;
			var AlbumSongs = '<div id="album_song" class="block mgt20" >' +
				'<h3><a class="playRank fr" style="margin:-3px 20px 0 0;" href="javascript:void(0)" title="全部播放" onclick="playall(\'ids2\');">全部播放</a>这张专辑还有    ';
			if (AllSongs.length > MaxShow) {
				AlbumSongs += '<a style="font-size:10px;padding-right:18px;width:30px;" title="" href="javascript:void(0)" id="al_show">全部</a>';
			}
			AlbumSongs += '</h3>' +
			'<div class="content clearfix">' +
			'<table cellspacing="0" cellpadding="0" class="track_list">';

			for (var i = 0; i < SongsNum; i++) {
				if (AllSongIDs.eq(i).html().indexOf(ReUrl) == -1) { //列表不包含当前页歌曲
					SongID = $(AllSongIDs).eq(i).find("input").attr('value');
					//SongID = SongID.match(/\d+/); // 截取歌曲ID
					AlbumSongs += '<tr>' +
					'<input type="hidden" name="ids2" check="checked" value="' + SongID + '"/>' +
					'<td class="song_name"><p class="as_trackname">';
					AlbumSongs += AllSongs.eq(i).html();
					AlbumSongs += '</p></td>' +
					'<td class="song_act">' +
					'<div class="song_do clearfix" style="width:140px;">' +
					AllSongsDo.eq(i).html() +
					'</div></td></tr>';
				} else
					TrackNum = i+1;
			}
			if (AllSongs.length > SongsNum) { //超过部分添加
				for (var i = SongsNum; i < AllSongs.length; i++) {
					if (AllSongIDs.eq(i).html().indexOf(ReUrl) == -1) { //列表不包含当前页歌曲
						SongID = $(AllSongs).eq(i).find("a").attr('href');
						SongID = SongID.match(/\d+/); // 截取歌曲ID
						AlbumSongs += '<tr name="Al_songs_more">' + // 超过初始显示数量部分将不显示
						'<input type="hidden" name="ids2" check="checked" value="' + SongID + '"/>' +
						'<td class="song_name"><p class="as_trackname">';
						AlbumSongs += AllSongs.eq(i).html();
						AlbumSongs += '</p></td>' +
							'<td class="song_act">' +
							'<div class="song_do clearfix" style="width:140px;">' +
							AllSongsDo.eq(i).html() +
							'</div></td></tr>'
					} else
						TrackNum = i+1;
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
			$('#lrc').attr("tracknum", TrackNum);
			var lastTrack = $(AllSongs).eq(TrackNum-2).find("a").eq(0).text();
			var nextTrack = $(AllSongs).eq(TrackNum).find("a").eq(0).text();
			var lastArtist, nextArtist = Artist;
			lastArtist = getFeatArtists(AllSongs, TrackNum-2);
			nextArtist = getFeatArtists(AllSongs, TrackNum);

			$('#lrc').attr("last", lastTrack);
			$('#lrc').attr("next", nextTrack);
			$('#lrc').attr("lastA", lastArtist);
			$('#lrc').attr("nextA", nextArtist);

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
				//if( x < x1 || x > x2 || y < y1 || y > y2) 	// 碰到元素内子元素也会触发mouseout事件，追加验证是否还在元素内
				$("marquee#Tmarquee_" + tmid).attr('scrollamount', '0');
				$("marquee#Tmarquee_" + tmid).attr('scrollLeft', $("marquee#Tmarquee_" + tmid).attr('width'));

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
				}
			);
		});
	}
}

function removeTracklist() {
  var el = document.getElementById("album_song");
  if (el) {
    el.parentNode.removeChild(el);
  }
}

removeTracklist();
loadTracklist();
