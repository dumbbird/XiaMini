var flag = false;
var cvbright = 99999;
var BR_THRESHOLD = 25000;

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
	$("#lrc_trans").removeClass();
	$("#lrc_trans").addClass("lrc");
	$("#lrc_trans").attr("title", "LRC开启/t-LRC关闭中 (翻译隐藏)");
	if ($('#full_xiamini').length) {
		if (bright < BR_THRESHOLD) {
			$('.ui-lrc-line, .ui-trans-line').css("color", "#fff");
			$('.ui-lrc-line').css("text-shadow", "0 0 10px #6E6E6E");
		}
		else {
			$('.ui-lrc-line, .ui-trans-line').css("color", "black");
			$('.ui-lrc-line').css("text-shadow", "");
		}
	}
	else
		$('.ui-lrc-line, .ui-trans-line').removeAttr("style");
}
function switchtotxt(bright) {
	$("#J_rendertxt").click();	// include remove t_xiamini
	//removeMini(["t_xiamini"]);
	$("#lrc_trans").removeClass();
	//$("#lrc_trans").addClass("txt");
	if ($('#full_xiamini').length) {
		console.log(bright);
		setTimeout(function (){
			if (bright < BR_THRESHOLD) {
				$('.ui-lrc-line, .ui-trans-line').css("color", "#fff");
				$('.ui-lrc-line').css("text-shadow", "0 0 10px #6E6E6E");
			}
			else {
				$('.ui-lrc-line, .ui-trans-line').css("color", "black");
				$('.ui-lrc-line').css("text-shadow", "");
			}
				
		}, 1000);
	}
	else
		$('.ui-lrc-line, .ui-trans-line').removeAttr("style");
}
function switchtotlrc(bright) {
	$("#J_resetlrc").click();
	if ($('#full_xiamini').length) {
		if (bright < BR_THRESHOLD) {
			$('.ui-lrc-line, .ui-trans-line').css("color", "#fff");
			$('.ui-lrc-line').css("text-shadow", "0 0 10px #6E6E6E");
		}
		else {
			$('.ui-lrc-line, .ui-trans-line').css("color", "black");
			$('.ui-lrc-line').css("text-shadow", "");
		}
	}
	else
		$('.ui-lrc-line, .ui-trans-line').removeAttr("style");
}

// 显隐歌词栏
function hideLrc() {
	if (document.getElementById('hl_xiamini')) {
		removeMini(["hl_xiamini"]);
		$('#J_hideLrc').attr("title", "点击隐藏右侧歌词评论栏");
	} else {
		loadMini("hl_xiamini","hidelrc.css");
		$('#J_hideLrc').attr("title", "点击显示右侧歌词评论栏");
	}
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
	$('#comments').attr('title', '恢复歌词显示');
	$('#comments').addClass('loading');
}

// 从comments返回歌词
function reset(bright) {
	$("#J_walllist").hide();
	$("#J_lyricScrollWrap").show();
	$('#comments').attr('status', 'disabled');
	$('#comments').attr('title', '载入评论');
	$('#comments').removeClass('loading');
	$("#J_resetlrc").click();
	if ($('#full_xiamini, #k_xiamini').length) {
		setTimeout(function (){
			if (bright < BR_THRESHOLD) {
				$('.ui-lrc-line, .ui-trans-line').css("color", "#fff");
				$('.ui-lrc-line').css("text-shadow", "0 0 10px #6E6E6E");
			}
			else {
				$('.ui-lrc-line, .ui-trans-line').css("color", "black");
				$('.ui-lrc-line').css("text-shadow", "");
			}
		}, 1000);	// 全屏模式下reset到歌词，取决于背景亮度来设置歌词字体颜色
	}	
	else
		$('.ui-lrc-line, .ui-trans-line').removeAttr("style");	// 非全屏模式reset到歌词，直接remove所有style恢复原状
}

// KTV歌词模式
function ktvLrc(bright) {
	if ($("#comments").attr("status") == "enabled")
		reset(bright);
	if (document.getElementById('k_xiamini')) {
		loadMini("full_xiamini","fullscreenlrc.css");
		removeMini(["k_xiamini"]);
		setTimeout(function (){	
			$("#J_transdislrc").click();
			if (bright < BR_THRESHOLD) {
				$('.ui-lrc-line, .ui-trans-line').css("color", "#fff");
				$('.ui-lrc-line').css("text-shadow", "0 0 10px #6E6E6E");
			}
			else {
				$('.ui-lrc-line, .ui-trans-line').css("color", "black");
				$('.ui-lrc-line').css("text-shadow", "");
			}
		}, 1000);
		$('#J_hideLrc').attr("title", "点击进入KTV全屏模式");
	}
	else {
		loadMini("k_xiamini","ktvlrc.css");
		removeMini(["full_xiamini"]);
		setTimeout(function (){	
		$("#J_transdislrc").click();
			if (bright < BR_THRESHOLD) {
				$('.ui-lrc-line').css("color", "#fff");
				$('.ui-lrc-line').css("text-shadow", "0 0 10px #6E6E6E");
			}
			else {
				$('.ui-lrc-line, .ui-trans-line').css("color", "black");
				$('.ui-lrc-line').css("text-shadow", "");
			}
		}, 1000);
		$('#J_hideLrc').attr("title", "点击返回普通全屏模式");
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

    context.drawImage(imgEl, width*0.25, 0, width*0.5, height, 0, 0, width*0.5, height);

    try {
        data = context.getImageData(0, 0, width*0.5, height);
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

function openmaxlrc(bright) {
	$("#J_tab").hide("fast", function () {
		$(".main-sidebar").hide("fast", function () {
			loadMini("full_xiamini","fullscreenlrc.css");
			$('#J_blurBackground').css("z-index", "5");
			//$("#J_lrcWrap").width(middlewidth);
			//$("#J_lyricScrollWrap").css("width", "100%");
			$("#lyrics_control").css("width", "100%");
			$('#J_hideLrc').attr("title", "点击进入KTV全屏模式");
			$('#J_hideLrc').text("Ｋ");
		});
	});
	setTimeout(function (){	
		$("#J_transdislrc").click();
		if (bright < BR_THRESHOLD) {
			$('.ui-lrc-line, .ui-trans-line').css("color", "#fff");
			$('.ui-lrc-line').css("text-shadow", "0 0 10px #6E6E6E");
		}
		else {
			$('.ui-lrc-line, .ui-trans-line').css("color", "black");
			$('.ui-lrc-line').css("text-shadow", "");
		}
	}, 1000);			
}

function closemaxlrc() {	
	removeMini(["full_xiamini", "k_xiamini"]);
	$('#J_hideLrc').attr("title", "点击隐藏右侧歌词评论栏");
	$('#J_hideLrc').text("s");
	$('#J_blurBackground').css("z-index", "0");
	$("#J_lrcWrap").animate({
		width : "340px"
	},
		function () {
		$(".main-sidebar").show("fast", function () {
			$("#J_tab").show("fast");
			$('.ui-lrc-line, .ui-trans-line').removeAttr("style");
			$("#J_transdislrc").click();				
		});
	});
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
}

function wikialrc(bright) {
	// need songid, songtitle and artist information
	var songid = $('#trackchange').attr("songid");
	var songtitle = $('#trackchange').attr("songtitle");
	var artists = $('<div/>').html($('#trackchange').attr("artist")).text().split(";");
	var artist = artists[0];
	for (var i=1; i<artists.length; i++)
		artist += " / "+artists[i];

	songtitle = songtitle.replace("[", "(").replace("]", ")").replace(" ", "_");
	artist = artist.replace("[", "(").replace("]", ")").replace(" ", "_");;	
	var url = 'http://zh.lyricsinfo.wikia.com/wiki/' + encodeURIComponent(songtitle) + '_(' + encodeURIComponent(artist) + ')';
	var wkrequest = xhr(url+"/lrc", "get",0);
	var lrc = $(wkrequest).find('.poem.lrc.'+songid).text();
	var danmaku = $(wkrequest).find('.poem.damn.'+songid).text();

	if (lrc == "" && danmaku == "") {
		var wkrequest = xhr(url, "get",0);
		var lrc = $(wkrequest).find('.poem').text();
		if (lrc == "") {
			alert("不好意思呢，暂无维基歌词~");
			$('#wikilrc').html("");
			$('#dmlrc').html("");
			return -1;
		}
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
	
	$('#lrc_wikia').addClass("wiki");
	$('#lrc_wikia').css("status", "on");
	$('#J_resetlrc').click();
	if ($('#full_xiamini, #k_xiamini').length) {
		setTimeout(function (){
			if (bright < BR_THRESHOLD) {
				$('.ui-lrc-line, .ui-trans-line').css("color", "#fff");
				$('.ui-lrc-line').css("text-shadow", "0 0 10px #6E6E6E");
			}
			else {
				$('.ui-lrc-line, .ui-trans-line').css("color", "black");
				$('.ui-lrc-line').css("text-shadow", "");
			}
			alert("已加载完毕:)");
		}, 1000);	// 全屏模式下载入wikia歌词，取决于背景亮度来设置歌词字体颜色
	}	
	else {
		$('.ui-lrc-line, .ui-trans-line').removeAttr("style");	// 非全屏模式载入wikia歌词，直接remove所有style恢复原状
		alert("已加载完毕:)");
	}
}

function lyricsControl() {
	if (flag)
		return;
	else
		flag = true;
	
	if ($('#trackchange').length == 0) {
		var trackchange = '<div id="trackchange"></div>';
		$('head').after(trackchange);
	}

	// lyrics fullscreen
	lyricsFull();

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
	if (!document.getElementById("J_hideLrc")) {
		div = "<span id='J_hideLrc' class='icon-lrc' title='右侧歌词评论栏显隐'>s</span>";
		$('.track-controls').append(div); 
	}
	
	// KTV-LRC switch
	$('#J_playerLrc').click(function () {
		if (document.getElementById("full_xiamini") || document.getElementById("k_xiamini")) {
			if ($('#lrc_trans').attr("status") != "txt") 
				ktvLrc(cvbright);
			else
				;
		}
	});
	
	// hide-LRC swith
	$('.icon-lrc').click(function () {
		if (document.getElementById("full_xiamini") || document.getElementById("k_xiamini")) {
			if ($('#lrc_trans').attr("status") != "txt") 
				ktvLrc(cvbright);
			else
				alert("静态文本歌词无法KTV哦～");
		} else
			hideLrc();
	});
	
	// t-LRC switch	
	$("#lrc_trans").click(function () {
		if ($(".no-lrc").length != 0)
			return;
		if ($("#k_xiamini").length != 0) {
			alert("KTV模式下暂时不能使用该功能哦～");
			return;
		}
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
			switchtotxt(cvbright);
			//if ($('.ui-trans-line').length != 0)
				
		} else if ($("#lrc_trans").attr("status") == "txt") {
			//alert("txt");
			switchtotlrc(cvbright);		
		}
	});
	
	// wikia switch
	$('#lrc_wikia').click(function (){
		if (confirm("确定要加载维基歌词么？")) {
			wikialrc(cvbright);
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
		var repeat = $('#trackchange').attr("repeat");
		//console.log(repeat);
		if (repeat == "1" && $('#full_xiamini, #k_xiamini').length) {
			setTimeout(function (){
				//alert(cvbright);
				if (cvbright < BR_THRESHOLD) {
					$('.ui-lrc-line, .ui-trans-line').css("color", "#fff");
					$('.ui-lrc-line').css("text-shadow", "0 0 10px #6E6E6E");
				}
				else {
					$('.ui-lrc-line, .ui-trans-line').css("color", "black");
					$('.ui-lrc-line').css("text-shadow", "");
				}
								
			}, 4000);			
		}
		
		else if (repeat == "0") {
			$('#lrc_wikia').removeClass("wiki");
			$('#wikilrc').html("");
			$('#dmlrc').html("");
			
			setTimeout(function (){
				var cv = document.getElementsByClassName("ui-canvas-current")[0];
				if (cv) {
					cvbright = brightness(cv);
					console.log(cvbright);
					if ($('#full_xiamini, #k_xiamini').length) {
						loadMini("full_xiamini","fullscreenlrc.css");
						removeMini(["k_xiamini"]);
						if (cvbright < BR_THRESHOLD) {
							$('.ui-lrc-line, .ui-trans-line').css("color", "#fff");
							$('.ui-lrc-line').css("text-shadow", "0 0 10px #6E6E6E");
						}
						else {
							$('.ui-lrc-line, .ui-trans-line').css("color", "black");
							$('.ui-lrc-line').css("text-shadow", "");
						}
						$('#J_hideLrc').attr("title", "点击进入KTV全屏模式");
					}
				}
			}, 2000);
			
			// reset lrc from comment
			reset(cvbright);
			$("#J_walllist").remove();
		}
	});
}

function htmlDecode(str) {
	var div = document.createElement("div");
	div.innerHTML = str;
	return div.innerHTML;
}

function updateHeader() {		
	var el, html;
	
	el = $("#J_pagePlayList .ui-playlist-header .ui-row-item-body .ui-row-item-column.c1").eq(0);
	html = el.html().replace("歌曲", "曲名 (古典乐章节)");
	el.html(html);
	
	el = $("#J_pagePlayList .ui-playlist-header .ui-row-item-body .ui-row-item-column.c2").eq(0);
	html = el.html().replace("演唱者", "主艺人");
	el.html(html);
	
	el = $("#J_pagePlayList .ui-playlist-header .ui-row-item-body .ui-row-item-column.c3").eq(0);
	if (el.text().indexOf("(古典作品名)") == -1) {
		html = el.html().replace("专辑", "专辑 (古典作品名)");
		el.html(html);
	}
}

// lyrics control base
$(function (){ 
	var CurrentUrl = window.location.href;	
	if (CurrentUrl.indexOf("#loaded") != -1) {
		updateHeader();
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