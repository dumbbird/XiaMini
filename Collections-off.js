$(function () {
	DelCollections();
	DelFullscreen();
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
	$Salediv.show();
	$ksdiv.attr("style", "visibility: visible;");
	$('.collect-title').removeAttr("style");
}
function DelFullscreen() {
	$("#J_playerLrc").css("font-size", "");
	$("#J_playerCover").width("250px");
	//$("#J_albumCover").width(albumCoverwidth[0]);
	$("#J_lyricScrollWrap").css("width", "250px");
	//$(".ui-lrc-line").css("line-height", "");
	$("#J_lrcWrap").css("padding-right", "5px");
	$("#J_lrcWrap").css("width", "250px");
	$("#J_lrcWrap").not("#J_playerCover a").unbind('click');
	}
