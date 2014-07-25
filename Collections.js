(function($,g){var h={},id=1,etid=g+'ETID';$.fn[g]=function(e,f){id++;f=f||this.data(etid)||id;e=e||150;if(f===id)this.data(etid,f);this._hover=this.hover;this.hover=function(c,d){c=c||$.noop;d=d||$.noop;this._hover(function(a){var b=this;clearTimeout(h[f]);h[f]=setTimeout(function(){c.call(b,a)},e)},function(a){var b=this;clearTimeout(h[f]);h[f]=setTimeout(function(){d.call(b,a)},e)});return this};return this};$.fn[g+'Pause']=function(){clearTimeout(this.data(etid));return this};$[g]={get:function(){return id++},pause:function(a){clearTimeout(h[a])}}})(jQuery,'mouseDelay');

$(function () {
	Collections();
	fullscreenLyrics();
})
function Collections() {
	jQuery(function ($) {
		var group = 'menu_1';
		$('.collect-title').attr({
			style : "cursor:pointer"
		});
		$("#J_collectScrollView [id^='ks-component']").attr("style", "display: none;").animate(null, function () {
			$('#J_albumCover').show();
			$('.ui-album-sale').show();
			
		})
		$('#J_collectList').attr("style", "visibility: hidden;");
		$('.collect-title').mouseDelay(500, group).hover(function () {
			$('#J_collectList').attr("style", "visibility: visible;");
			$("#J_collectScrollView [id^='ks-component']").attr("style", "visibility: visible;");
			$('#J_albumCover').hide();
			$('.ui-album-sale').hide();
		}, function () {
			$('#J_collectList').attr("style", "visibility: hidden;");
			$("#J_collectScrollView [id^='ks-component']").attr("style", "visibility: hidden;");
			$('#J_albumCover').show();
			$('.ui-album-sale').show();
		});
		$('#J_collectList').mouseDelay(500, group).hover(null, function () {
			$('#J_collectList').attr("style", "visibility: hidden;");
			$("#J_collectScrollView [id^='ks-component']").attr("style", "visibility: hidden;");
			$('#J_albumCover').show();
			$('.ui-album-sale').show();
		});
	});
}

function fullscreenLyrics() {
	var middlewidth = $("#middle").width();
	var lrcWrapwidth = lrcWrapright = albumCoverwidth = playerCoverwidth = lyricScrollWrapwidth = [];
	lrcWrapwidth.push($("#J_lrcWrap").width());
	lrcWrapright.push($("#J_lrcWrap").css("padding-right"));
	lyricScrollWrapwidth.push($("#J_lyricScrollWrap").width());
	albumCoverwidth.push($("#J_albumCover").width());
	playerCoverwidth.push($("#J_playerCover").width());
	$("#J_lyricScrollWrap").click(function () {
		if ($("#J_tab").css("display") != "none" && $(".main-sidebar").css("display") != "none") {
			$("#J_tab").hide("fast", function () {
				$(".main-sidebar").hide("fast", function () {
					$("#J_lrcWrap").css("padding-right", "0");
					$("#J_lrcWrap").width(middlewidth);
					//$("#J_albumCover").width("100%");
					$("#J_playerCover").width("1%");
					$("#J_lyricScrollWrap").css("width", "100%");
					$("#J_playerLrc").css("font-size", "120%");
					//$(".ui-lrc-line").css("line-height", "30px");
				});
			});
		} else {
			$("#J_playerLrc").css("font-size", "");
			$("#J_playerCover").width(playerCoverwidth[0]);
			//$("#J_albumCover").width(albumCoverwidth[0]);
			$("#J_lyricScrollWrap").css("width", "350px");
			//$(".ui-lrc-line").css("line-height", "");
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