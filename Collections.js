(function($,g){var h={},id=1,etid=g+'ETID';$.fn[g]=function(e,f){id++;f=f||this.data(etid)||id;e=e||150;if(f===id)this.data(etid,f);this._hover=this.hover;this.hover=function(c,d){c=c||$.noop;d=d||$.noop;this._hover(function(a){var b=this;clearTimeout(h[f]);h[f]=setTimeout(function(){c.call(b,a)},e)},function(a){var b=this;clearTimeout(h[f]);h[f]=setTimeout(function(){d.call(b,a)},e)});return this};return this};$.fn[g+'Pause']=function(){clearTimeout(this.data(etid));return this};$[g]={get:function(){return id++},pause:function(a){clearTimeout(h[a])}}})(jQuery,'mouseDelay');

$(function () {
	Collections();
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