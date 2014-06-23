$(function () {
	DelCollections();
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