// Project Wormhole，呵呵你懂的。
// 版本号：1.4

// title rearrange
function Re_title4(ti){ 
	ti = ti.replace(/\&/g,"&amp;");   //&
	return ti;   
}
function Re_title3(ti){ //中断类
	ti = ti.replace(/['|"|“|”|‘|＇|＂|｀|〃|’|`|;|:|,]/g,"+");
	ti = ti.replace(/\s+/g,"+");
	ti = ti.toLowerCase();
	return ti;
}

var cd2play = function() {
	var id_name;
	if (CurrentUrl.indexOf("album/") != -1) 
		id_name = "recommendids";
	else if (CurrentUrl.indexOf("collect/") != -1) 
		id_name = "ids";
	var wormhole_cd = '<a title="立即开始虫洞穿越" href="javascript:void(0)" onclick="';
	wormhole_cd += 'selectAll(\'' + id_name +'\');playsongs(\'' +id_name + '\');">开始虫洞穿越</a>';
	$('div.cd2play').html(wormhole_cd);
}
var cd2play_entrance = function() {
	var wormhole_cd = '<a title="立即开始虫洞穿越" href="javascript:void(0)" onclick="';
	wormhole_cd += 'selectAll(\'ids\');playsongs(\'ids\');">开始虫洞穿越</a>';
	$('div.cd2play').html(wormhole_cd);
}

var loadControl = function() {
	// $(document).ready(function(){
		// $('body').click(function(e){
			// $(".ctrl_gears_more").addClass('hidden');
			// $(".bt_cdgears").removeClass('active');	
		// });
		// $(".bt_cdgears").mouseover(function(){$(this).addClass('active').next().removeClass('hidden').show();});
		
	// });

	var control_html = '<div class="chapter_ctrl cd_count">';
	control_html += '<div class="ctrl_play">';
	control_html += '<a onclick="selectAll(\'recommendids\')" title="" href="javascript:void(0)" class="bt_choose"><span>全选</span></a>';
	control_html += '<a title="" onclick="inverse(\'recommendids\');" href="javascript:void(0);" class="bt_choose"><span>反选</span></a>';
	control_html += '<a onclick="playsongs(\'recommendids\');" title="" href="javascript:void(0);" class="bt_play"><span>播放选中歌曲</span></a> </div>';
	//control_html += '<div class="ctrl_gears"> <a title="" href="javascript:void(0)" class="bt_cdgears"><span>更多</span></a>';
	//control_html += '<div class="ctrl_gears_more hidden"><em></em> <a onclick="collects(\'recommendids\');" title="添加选中歌曲到精选集" href="javascript:void(0);">添加选中歌曲到精选集</a>';
	//control_html += '</div></div></div>';
	control_html += '</div>';
	//alert(control_html);
	$("#track").append(control_html);
}

var wormhole = function() {
	$.getJSON("https://raw.githubusercontent.com/dumbbird/xiaMini/master/wormhole.json", function(json){
		var songid = 0, wormhole_html = "";
		var flag = 0;
		if (CurrentUrl.indexOf("xiami.com/song/") != -1) {
			songid = CurrentUrl.split("song/")[1];
			if (json[songid]) {				
				wormhole_html = '<div class="song_info"><div class="player">'; 
				wormhole_html += '<div class="cd2play"><a onclick="play(';
				wormhole_html += "'" + songid + "');" + '" title="穿越虫洞，到高维空间去试听这首歌" href="javascript:void(0);">开始虫洞穿越 GO！</a>';
				wormhole_html += '</div></div></div>';
				$('.unpublished').remove();
				$('#song_acts').before(wormhole_html);
			}
		}
		else {
			$(".chkbox, .chk").each(function(){
				if ($(this).find("input").length > 0)
					songid = $(this).find("input").eq(0).attr("value");
				//alert (songid);
				if (json[songid] && $(this).parent().find(".song_play").length == 0) {
					//alert("wormhole enabled");
					flag = 1;
					$(this).parent().find('input[type=checkbox]').attr({'disabled':false, 'checked':true});
					
					if (CurrentUrl.indexOf("album/") != -1) {
						wormhole_html = '<a class="song_play wormhole" href="javascript:void(0)" title="试听" onclick="play(';
						wormhole_html += "'" + songid + "');";
						wormhole_html += '"><span>试听</span></a>';
						//alert(wormhole_html);
						$(this).parent().find(".song_do").append(wormhole_html);
						if ($(".chapter_ctrl").length == 0)
							loadControl();
					}
					else if (CurrentUrl.indexOf("collect/") != -1) {
						var item = $(this).parent();
						
						var songname_html = $(item).find('.song_name').html().split(" -- ");
						var buffer = '<a href="/song/' + songid +'" title>' + songname_html[0] + '</a>' + ' -- ' + songname_html[1];
						//alert(buffer);
						$(item).find('.song_name').html(buffer);
		
						wormhole_html = '<p> <a class="song_play" href="javascript:void(0)" title="穿越虫洞，到高维空间试听这首歌" onclick="play(\'' + songid + '\',\'collect\',\'552436\');">试听</a>';
						wormhole_html += '<a class="song_digg" href="javascript:void(0)" title="分享" onclick="recommend(' + songid + ',\'32\');">分享</a>';
						wormhole_html += '<a class="song_toclt" href="javascript:void(0)" onclick="collect(\'' + songid + '\');" title="添加这首高次元歌曲到精选集">添加到精选集</a></p>';
		
						$(item).append(wormhole_html);
					}
				}
			});
			if (flag)
				cd2play();
		}
	});
};

var wormhole_entrance = function(){
	if ($("head title").text().indexOf("虫洞穿越") == -1)
		return;
	if ($("#edit_bars").length == 0 && $(".bar__for__unfaved_552436").css("display") != "none")
		return;
		
	//alert ("您已到达虫洞穿越的入口，点击确定之后，您会发现包括本页面在内的许多虾米的网页会出现一些变化，虫洞会在某些角落中出现……预祝您在四次元(或五次元)世界里旅行愉快！~ A message from Xiamini")
	
	
	items = $("#list_collect .Qsong_item .s_info");
	//alert(items.length);
	for (var i=0; i<items.length; i++) {
		$(items[i]).find('input[type=checkbox]').attr({'disabled':false, 'checked':true});
		var songid = $(items[i]).find('input[type=checkbox]').attr('value');
		//alert(songid);
		var songname_html = $(items[i]).find('.song_name').html().split(" -- ");
		var buffer = '<a href="/song/' + songid +'" title>' + songname_html[0] + '</a>' + ' -- ' + songname_html[1];
		//alert(buffer);
		$(items[i]).find('.song_name').html(buffer);
		
		buffer = '<p> <a class="song_play" href="javascript:void(0)" title="穿越虫洞，到高维空间试听这首歌" onclick="play(\'' + songid + '\',\'collect\',\'552436\');">试听</a>';
		buffer += '<a class="song_digg" href="javascript:void(0)" title="分享" onclick="recommend(' + songid + ',\'32\');">分享</a>';
		buffer += '<a class="song_toclt" href="javascript:void(0)" onclick="collect(\'' + songid + '\');" title="添加这首高次元歌曲到精选集">添加到精选集</a></p>';
		
		$(items[i]).append(buffer);
	}
	cd2play_entrance();
}

var CurrentUrl = window.location.href;
CurrentUrl = CurrentUrl.split("?")[0].split("#")[0];

if (CurrentUrl == "http://www.xiami.com/collect/552436" || CurrentUrl == "https://www.xiami.com/collect/552436") {
	wormhole_entrance();
} else if (CurrentUrl.indexOf("xiami.com/album/") != -1 || CurrentUrl.indexOf("xiami.com/collect/") != -1) {
	if ($(".trackid").length != $(".song_play").length)
		wormhole();		
} else if (CurrentUrl.indexOf("xiami.com/song/") != -1) {
	if ($(".unpublished").length != 0)
		wormhole();		
}