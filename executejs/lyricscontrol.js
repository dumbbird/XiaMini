var flag = false;
var cvbright = 99999;
var BR_THRESHOLD = 15000;

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
	el.href = chrome.extension.getURL("css/"+css);
	headEl = document.getElementsByTagName("head")[0];
	headEl.appendChild(el);
}

function removeCSS_trans() {
	removeMini(["t_xiamini"]);
	$("#J_transdislrc").click();
}

function switchtolrc(bright) {
	loadMini("t_xiamini","hideTrans.css");			
	$("#J_transdislrc").click();
	$("#lrc_trans").attr("status", "lrc");
	$("#lrc_trans").attr("title", "LRC开启/t-LRC关闭中 (翻译隐藏)");
	if ($('#full_xiamini').length) {
		if (bright < BR_THRESHOLD)
			$('.ui-lrc-line, .ui-trans-line').css("color", "#fff");
		else
			$('.ui-lrc-line, .ui-trans-line').css("color", "black");
	}
	else
		$('.ui-lrc-line, .ui-trans-line').removeAttr("style");
}
function switchtotxt(bright) {
	$("#J_rendertxt").click();
	if ($('#full_xiamini').length) {
		setTimeout(function (){
			if (bright < BR_THRESHOLD)
				$('.ui-lrc-line, .ui-trans-line').css("color", "#fff");
			else
				$('.ui-lrc-line, .ui-trans-line').css("color", "black");
		}, 1000);
	}
	else
		$('.ui-lrc-line, .ui-trans-line').removeAttr("style");
}
function switchtotlrc(bright) {
	$("#J_resetlrc").click();
	if ($('#full_xiamini').length) {
		if (bright < BR_THRESHOLD)
			$('.ui-lrc-line, .ui-trans-line').css("color", "#fff");
		else
			$('.ui-lrc-line, .ui-trans-line').css("color", "black");
	}
	else
		$('.ui-lrc-line, .ui-trans-line').removeAttr("style");
}

// 加载comments
function loadcomments() {
	$("#J_lyricScrollWrap").hide();
	if ($("#J_walllist").length && $("#J_walllist").attr("style") == "display: none;")
		;
	else
		$("#J_comments").click();
	$("#J_walllist").show();
	$('#comments').attr('status', 'enabled');
	$('#comments').attr('style', 'color:#f60');
}

// 从comments返回歌词
function reset(bright) {
	if ($('.no-lrc').length)
		//loadcomments()
		;
	else {
		$("#J_walllist").hide();
		$("#J_lyricScrollWrap").show();
		$('#comments').attr('status', 'disabled');
		$('#comments').attr('style', 'color:lightgray');
		$("#J_resetlrc").click();
		if ($('#full_xiamini').length) {
			setTimeout(function (){
				if (bright < BR_THRESHOLD)
					$('.ui-lrc-line, .ui-trans-line').css("color", "#fff");
				else
					$('.ui-lrc-line, .ui-trans-line').css("color", "black");
			}, 1000);	// 全屏模式下reset到歌词，取决于背景亮度来设置歌词字体颜色
		}	
		else
			$('.ui-lrc-line, .ui-trans-line').removeAttr("style");	// 非全屏模式reset到歌词，直接remove所有style恢复原状
	}
}

function brightness(imgEl) {

    var blockSize = 5, // only visit every 5 pixels
        defaultRGB = {r:0,g:0,b:0}, // for non-supporting envs
		brightness = 0,
        canvas = document.createElement('canvas'),
        context = canvas.getContext && canvas.getContext('2d'),
        data, width, height,
        i = -4,
        length,
        rgb = {r:0,g:0,b:0},
        count = 0;

    if (!context) {
        return brightness;
    }

    height = canvas.height = imgEl.height;
    width = canvas.width = imgEl.width;

    context.drawImage(imgEl, 0, 0);

    try {
        data = context.getImageData(0, 0, width, height);
    } catch(e) {
        /* security error, img on diff domain */
        return brightness;
    }

    length = data.data.length;

    while ( (i += blockSize * 4) < length ) {
        ++count;
        rgb.r += data.data[i];
        rgb.g += data.data[i+1];
        rgb.b += data.data[i+2];
    }

    // ~~ used to floor values
    rgb.r = ~~(rgb.r/count);
    rgb.g = ~~(rgb.g/count);
    rgb.b = ~~(rgb.b/count);

	brightness = ~~(rgb.r * rgb.r* .241 + rgb.g * rgb.g * .691 + rgb.b * rgb.b * .068);
	  
	return brightness;
    //return rgb;

}


function lyricsFull() {
	// reset
	$("#J_lrcWrap").removeAttr("style");
	$("#J_lyricScrollWrap").removeAttr("style");
	
	//var middlewidth = $("#middle").width();
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
				openmaxlrc(cvbright);
				$(".seiya-chatroom").hide();
			} else {
				closemaxlrc();
				$(".seiya-chatroom").show();
			}
		} else {
			if ($("#J_tab").css("display") != "none" && $(".main-sidebar").css("display") != "none") {
				openmaxlrc(cvbright);
			} else {
				// reset
				closemaxlrc();
			}
		}
	});
	
	function openmaxlrc(bright) {
		$("#lrc_fullscreen").hover(function(){
			$(this).css("color", "lightgray");
		}, function() {
			$(this).css("color", "#f60");
		});
		
		$("#J_tab").hide("fast", function () {
			$(".main-sidebar").hide("fast", function () {
				loadMini("full_xiamini","fullscreenlrc.css");
				$('#J_blurBackground').css("z-index", "5");
				//$("#J_lrcWrap").width(middlewidth);
				//$("#J_lyricScrollWrap").css("width", "100%");
				$("#lyrics_control").css("width", "100%");
			});
		});
		setTimeout(function (){	
			$("#J_resetlrc").click();
			if (bright < BR_THRESHOLD)
				$('.ui-lrc-line, .ui-trans-line').css("color", "#fff");
			}, 1000);			
	}

	function closemaxlrc() {
		$("#lrc_fullscreen").hover(function(){
			$(this).css("color", "#f60");
		}, function() {
			$(this).css("color", "lightgray");
		});		
		
		removeMini(["full_xiamini"]);
		$('#J_blurBackground').css("z-index", "0");
		$("#J_lrcWrap").animate({
			width : "340px"
		},
			function () {
			$(".main-sidebar").show("fast", function () {
				$("#J_tab").show("fast");
				$('.ui-lrc-line, .ui-trans-line').removeAttr("style");
				$("#J_resetlrc").click();				
			});
		});
	}
}

function wikialrc() {
	// need songid, songtitle and artist information
	var songid = $('#trackchange').attr("songid");
	var songtitle = $('#trackchange').attr("songtitle");
	var artists = $('<div/>').html($('#trackchange').attr("artist")).text().split(";");
	var artist = artists[0];
	for (var i=1; i<artists.length; i++)
		artist += " / "+artists[i];
	//alert(artist);
	songtitle = songtitle.replace("[", "(").replace("]", ")");
	artist = artist.replace("[", "(").replace("]", ")");	
	var url = 'http://zh.lyricsinfo.wikia.com/wiki/' + encodeURIComponent(songtitle) + '_(' + encodeURIComponent(artist) + ')/lrc';
	//alert(url);
	var wkrequest = xhr(url, "get",0);
	var lrc = $(wkrequest).find('.poem.lrc.'+songid).text();
	var danmaku = $(wkrequest).find('.poem.damn.'+songid).text();
	//alert(lrc);
	if (lrc == "" && danmaku == "") {
		alert("不好意思呢，暂无维基歌词~");
		$('#wikilrc').html("");
		$('#dmlrc').html("");
		return -1;
	}	
		
	if ($('#wikilrc').length == 0) {
		var wikilrc = '<div id="wikilrc" style="display:none">'+lrc+'</div>';
		$('head').after(wikilrc);
	}
	else
		$('#wikilrc').html(lrc);
	if ($('#dmlrc').length == 0) {
		var dmlrc = '<div id="dmlrc" style="display:none">'+danmaku+'</div>';
		$('head').after(dmlrc);
	}
	else
		$('#dmlrc').html(danmaku);
	
	$('#lrc_wikia').css("color", "#f60");
	$('#J_resetlrc').click();
	alert("已加载完毕:)");
}



function lyricsControl() {
	if (flag)
		return;
	else
		flag = true;
	
	//alert("begin");
	if ($('#trackchange').length == 0) {
		var trackchange = '<div id="trackchange"></div>';
		$('head').after(trackchange);
	}
	if ($('#lrc_wikia').length == 0) {
		var lrc_wikia = '<a id="lrc_wikia" title="载入维基歌词" status="wiki" style="color:lightgray">k</a>';
		//alert(lrc_wikia);
		$('lyrics_control').append(lrc_wikia);
	} 	// else alert("hi");

	// lyrics fullscreen
	lyricsFull();

	//alert("lyricscontrol-full");
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
	if (!document.getElementById("J_comments")) {
		div = "<div id='J_comments' onclick='rendercomment()'></div>";
		$(document.body).append(div); 
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
				//alert("tlrc->lrc");
				switchtolrc(cvbright);
			}
			else {
				//alert("tlrc->txt");
				switchtotxt(cvbright);
			}
		} else if ($("#lrc_trans").attr("status") == "lrc") {
			//alert("lrc");
			if ($('.ui-trans-line').length != 0)
				removeMini(["t_xiamini"]);
			switchtotxt(cvbright);
		} else if ($("#lrc_trans").attr("status") == "txt") {
			//alert("txt");
			switchtotlrc(cvbright);		
		}
	});
	
	// wikia switch
	$('#lrc_wikia').click(function (){
		if (confirm("确定要加载维基歌词么？")) {
			wikialrc();
		}
	});
	
	// comment switch
	$('#comments').click(function (){
		if ($("#comments").attr("status") == "disabled") {
			if (confirm("确定要加载评论么？")) {
				loadcomments();
			}
		} else 
			reset(cvbright);		
	});
	
	$('#trackchange').click(function (){
		$('#lrc_wikia').css("color", "lightgray");
		$('#wikilrc').html("");
		$('#dmlrc').html("");
		setTimeout(function (){
			var cv = document.getElementsByClassName("ui-canvas-current")[0];
			if (cv) {
				cvbright = brightness(cv);
				console.log(cvbright);
				if ($('#full_xiamini').length) {
					if (cvbright < BR_THRESHOLD)
						$('.ui-lrc-line, .ui-trans-line').css("color", "#fff");
					else
						$('.ui-lrc-line, .ui-trans-line').css("color", "black");
				}
			}
		}, 2000);
		reset(cvbright);
		$("#J_walllist").remove();
	});
}

function htmlDecode (str){
	var div = document.createElement("div");
	div.innerHTML = str;
	return div.innerHTML;
}

// lyrics control base
$(function (){ 
	var CurrentUrl = window.location.href;
	if (CurrentUrl.indexOf("#loaded") != -1) {
		setTimeout(function (){	
			var cv = document.getElementsByClassName("ui-canvas-current")[0];
			if (cv) {
				cvbright = brightness(cv);
				console.log(cvbright);
			}
			lyricsControl(); 
         }, 2000);
	}
});
