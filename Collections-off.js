$(function () {
	DelCollections();
	DelLyricsControl();
})
function DelCollections() {
	$titlediv = $('.collect-title'),
	$Listdiv = $('#J_collectList'),
	$Coverdiv = $('#J_albumCover');
	$Salediv = $('.ui-album-sale')
	$ksdiv = $("#J_collectScrollView [id^='ks-component']");
	$titlediv.unbind('mouseenter').unbind('mouseleave');
	$Listdiv.unbind('mouseenter').unbind('mouseleave');
	$Listdiv.attr("style", "visibility: visible;");
	$Coverdiv.show();
	//$Salediv.show();
	$ksdiv.attr("style", "visibility: visible;");
	$('.collect-title').removeAttr("style");
}
function DelLyricsControl() {
	$("#lyrics_control").attr("style", "display:none;");
	$("#J_playerLrc").css("font-size", "");
	$("#J_playerCover").width("250px");
	//$("#J_albumCover").width(albumCoverwidth[0]);
	$("#J_lyricScrollWrap").css("width", "250px");
	if ($('#J_albumSale').css("display") != "none")
		$("#J_lyricScrollWrap").css("top", "257px");
	//$(".ui-lrc-line").css("line-height", "");
	$('#J_lrcWrap').removeAttr("style");
	
	}
