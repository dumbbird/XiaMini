
(function($,g){var h={},id=1,etid=g+'ETID';$.fn[g]=function(e,f){id++;f=f||this.data(etid)||id;e=e||150;if(f===id)this.data(etid,f);this._hover=this.hover;this.hover=function(c,d){c=c||$.noop;d=d||$.noop;this._hover(function(a){var b=this;clearTimeout(h[f]);h[f]=setTimeout(function(){c.call(b,a)},e)},function(a){var b=this;clearTimeout(h[f]);h[f]=setTimeout(function(){d.call(b,a)},e)});return this};return this};$.fn[g+'Pause']=function(){clearTimeout(this.data(etid));return this};$[g]={get:function(){return id++},pause:function(a){clearTimeout(h[a])}}})(jQuery,'mouseDelay');

$(function () {
	Collections();
	lyricsControl();
	// 修正分号符
	// var pf = $('#J_trackInfo').html();
	// pf = pf.replace("/a> ; <a", "/a> / <a");
	// $('#J_trackInfo').html(pf);
})

function Collections() {
	jQuery(function ($) {
		var saleflag = 1;
		if ($('#J_albumSale').css("display") == "none")
			saleflag = 0;
		//alert (saleflag);
		var group = 'menu_1';
		$('.collect-title').attr({
			style : "cursor:pointer"
		});
		$("#J_collectScrollView [id^='ks-component']").attr("style", "display: none;").animate(null, function () {
			$('#J_albumCover').show();
			if (saleflag)	$('.ui-album-sale').show();
		})
		$('#J_collectList').attr("style", "visibility: hidden;");
		$('.collect-title').mouseDelay(500, group).hover(function () {
			$('#J_collectList').attr("style", "visibility: visible;");
			$("#J_collectScrollView [id^='ks-component']").attr("style", "visibility: visible;");
			$('#J_albumCover').hide();
			if (saleflag)	$('.ui-album-sale').hide();
		}, function () {
			$('#J_collectList').attr("style", "visibility: hidden;");
			$("#J_collectScrollView [id^='ks-component']").attr("style", "visibility: hidden;");
			$('#J_albumCover').show();
			if (saleflag)	$('.ui-album-sale').show();
		});
		$('#J_collectList').mouseDelay(500, group).hover(null, function () {
			$('#J_collectList').attr("style", "visibility: hidden;");
			$("#J_collectScrollView [id^='ks-component']").attr("style", "visibility: hidden;");
			$('#J_albumCover').show();
			if (saleflag)	$('.ui-album-sale').show();
		});
	});
}

function lyricsControl() {

	// lyrics control display
	var trackid = $("div.ui-track-current").attr("data-sid");
	
	if (document.getElementById("lyrics_control")) {
		// reset
		$("#J_lrcWrap").removeAttr("style");
		$("#J_lyricScrollWrap").removeAttr("style");
		$('#lyrics_control').attr("style", "display:block;");
		//var el_new = document.getElementById("lrc_edit");
		//el_new.href = "http://www.xiami.com/wiki/addlrc/id/" + trackid;
		return;
		}
		
	var el = document.createElement("div");
	el.id = "lyrics_control";
	el.innerHTML = '<!--<a id="lrc_edit" title="编辑动态LRC歌词" target="_blank" href="http://www.xiami.com/wiki/addlrc/id/' + trackid + '">编辑歌词</a>--><a id="lrc_fullscreen" title="全屏显示开关">全屏歌词</a><a id="lrc_report" title="去歌词组报错" href="http://www.xiami.com/group/thread-detail/tid/193387" target="_blank">歌词报错</a>';
	headEl = document.getElementById('J_lrcWrap');
	headEl.insertBefore(el, headEl.childNodes[4]);
	
	// lyrics fullscreen
	
	// reset
	$("#J_lrcWrap").removeAttr("style");
	$("#J_lyricScrollWrap").removeAttr("style");
	
	var middlewidth = $("#middle").width();
	var lrcWrapwidth = lrcWrapright = albumCoverwidth = playerCoverwidth = lyricScrollWrapwidth = [];
	lrcWrapwidth.push($("#J_lrcWrap").width());
	lrcWrapright.push($("#J_lrcWrap").css("padding-right"));
	lyricScrollWrapwidth.push($("#J_lyricScrollWrap").width());
	albumCoverwidth.push($("#J_albumCover").width());
	playerCoverwidth.push($("#J_playerCover").width());
	$("#lrc_fullscreen").click(function () {
		if ($("#J_tab").css("display") != "none" && $(".main-sidebar").css("display") != "none") {
			$("#J_tab").hide("fast", function () {
				$(".main-sidebar").hide("fast", function () {
					$("#J_lrcWrap").css("padding-right", "0");
					$("#J_lrcWrap").width(middlewidth);
					//$("#J_albumCover").width("100%");
					$("#J_playerCover").width("1%");
					$("#J_lyricScrollWrap").css("width", "100%");
					$("#lyrics_control").css("width", "100%");
					$("#J_playerLrc").css("font-size", "120%");
					//$(".ui-lrc-line").css("line-height", "30px");
				});
			});
		} else {
			// reset
			$("div#J_playerLrc").removeAttr("style");
			$("div#J_playerCover").removeAttr("style");
			//$("#J_albumCover").width(albumCoverwidth[0]);
			$("div#J_lyricScrollWrap").removeAttr("style");
			$("#J_lrcWrap").css("padding-right", "20px");
			$("#J_lrcWrap").animate({
				width : "350px"
			},
				function () {
				$(".main-sidebar").show("fast", function () {
					$("#J_tab").show("fast");
				});
			})
		}
	})

}