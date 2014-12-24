$(function () {
	Collections();
	lyricsControl();
	//showSongwriters(); 
})

function removeMini(id) {
	var el;
	for (var i = 0; i < id.length; i++) {
		el = document.getElementById(id[i]);
		if (el) {
			el.parentNode.removeChild(el);
		}	
	}
}

function loadMini(id,css) {
	if (document.getElementById(id))
			return;
	var el = document.createElement("link");
	el.id = id;
	el.rel = 'stylesheet';
	el.href = chrome.extension.getURL(css);
	headEl = document.getElementsByTagName("head")[0];
	headEl.appendChild(el);
}

function removeCSS_trans() {
	removeMini(["t_xiamini"]);
	$("#J_transdislrc").click();
}

function switchtolrc() {
	loadMini("t_xiamini","hideTrans.css");			
	$("#J_transdislrc").click();
	$("#lrc_trans").attr("status", "lrc");
	$("#lrc_trans").attr("title", "LRC开启/t-LRC关闭中 (翻译隐藏)");
}

function switchtotxt() {
	$("#J_rendertxt").click();
}

function switchtotlrc() {
	$("#J_resetlrc").click();
}

function Collections() {
	(function($,g){var h={},id=1,etid=g+'ETID';$.fn[g]=function(e,f){id++;f=f||this.data(etid)||id;e=e||150;if(f===id)this.data(etid,f);this._hover=this.hover;this.hover=function(c,d){c=c||$.noop;d=d||$.noop;this._hover(function(a){var b=this;clearTimeout(h[f]);h[f]=setTimeout(function(){c.call(b,a)},e)},function(a){var b=this;clearTimeout(h[f]);h[f]=setTimeout(function(){d.call(b,a)},e)});return this};return this};$.fn[g+'Pause']=function(){clearTimeout(this.data(etid));return this};$[g]={get:function(){return id++},pause:function(a){clearTimeout(h[a])}}})(jQuery,'mouseDelay');

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
// lyrics control base
	var script = "<script type='text/javascript' src='http://g.tbcdn.cn/de/music-player/0.9.10/??common/global-min.js,pages/index/page/init-min.js'></script>"; 
		$(document.body).append(script); 
		
	if (!document.getElementById("J_rendertxt")) {
		var div = "<div id='J_rendertxt' onclick='rendertxt()'></div>";
		$(document.body).append(div);
	}
	if (!document.getElementById("J_resetlrc")) {
		div = "<div id='J_resetlrc' onclick='resetlrc()'></div>";
		$(document.body).append(div); 				
	}
	if (!document.getElementById("J_transdislrc")) {
		div = "<div id='J_transdislrc' onclick='transdislrc()'></div>";
		$(document.body).append(div); 
	}
	
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
	el.innerHTML = '<!--<a id="lrc_edit" title="编辑动态LRC歌词" target="_blank" href="http://www.xiami.com/wiki/addlrc/id/' + trackid + '">编辑歌词</a>-->';
	el.innerHTML += '<a id="lrc_fullscreen" title="歌词全屏显示开关">f</a>';
	el.innerHTML += '<a id="lrc_report" title="歌词报错" href="http://www.xiami.com/group/thread-detail/tid/193387" target="_blank">r</a>';
	if (document.getElementsByClassName("no-lrc").length == 0)
		el.innerHTML += '<a id="lrc_trans" title="LRC/t-LRC开启中" status="tlrc">s</a>';
	else
		el.innerHTML += '<a id="lrc_trans" title="文本歌词" status="txt" style="color:lightgray">s</a>';
		
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
		var palyingtabdisplay = $(".enter-button").css("display");
		if (palyingtabdisplay == "none") {
			var palyingdisplay = $(".seiya-chatroom").css("display");
			if (palyingdisplay == "block") {
				openmaxlrc();
				$(".seiya-chatroom").hide();
			} else {
				closemaxlrc();
				$(".seiya-chatroom").show();
			}
		} else {
			if ($("#J_tab").css("display") != "none" && $(".main-sidebar").css("display") != "none") {
				openmaxlrc();				
			} else {
				// reset
				closemaxlrc();
			}
		}
	});

function openmaxlrc() {
	$("#lrc_fullscreen").hover(function(){
		$(this).css("color", "black");
	}, function() {
		$(this).css("color", "#f60");
	});
	
	$("#J_tab").hide("fast", function () {
		$(".main-sidebar").hide("fast", function () {
			$("#J_lrcWrap").css("padding-right", "0");
			$("#J_lrcWrap").width(middlewidth);
			//$("#J_albumCover").width("100%");
			$("#J_playerCover").width("1%");
			$("#J_lyricScrollWrap").css("width", "100%");
			$("#lyrics_control").css("width", "100%");
			$("#J_playerLrc").css("font-size", "120%");
		});
	});
}

function closemaxlrc() {
	$("#lrc_fullscreen").hover(function(){
		$(this).css("color", "#f60");
	}, function() {
		$(this).css("color", "black");
	});
	
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
	});
}

// t-LRC switch
	
	$("#lrc_trans").click(function () {
		if ($(".no-lrc").length != 0)
			return;
		$("#lrc_trans").removeAttr("style");
		// removeMini(["t_xiamini"]);
		if ($("#lrc_trans").attr("status") == "tlrc") {
			//alert("tlrc");
			if ($('.ui-trans-line').length != 0) {
				// alert("tlrc->lrc");
				switchtolrc();
			}
			else {
				//alert("tlrc->txt");
				switchtotxt();
			}
		} else if ($("#lrc_trans").attr("status") == "lrc") {
			//alert("lrc");
			if ($('.ui-trans-line').length != 0)
				removeMini(["t_xiamini"]);
			switchtotxt();
		} else if ($("#lrc_trans").attr("status") == "txt") {
			//alert("txt");
			switchtotlrc();		
		}
	});
	
}

function showSongwriters() {
	// //alert("234");
	// document.getElementById("J_trackInfo").bind('contentchanged', function(e) {
		// alert("123");
	// });
}