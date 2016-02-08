// Project Wormhole，呵呵你懂的。
// 版本号：2.1	四维、六维穿越

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
	if (CurrentUrl.indexOf("album/") != -1 || CurrentUrl.indexOf("lib-song/") != -1) 
		id_name = "recommendids";
	else if (CurrentUrl.indexOf("collect/") != -1) 
		id_name = "ids";
	var wormhole_cd = '<a title="立即开始虫洞穿越" href="javascript:void(0)" onclick="';
	wormhole_cd += 'selectAll(\'' + id_name +'\');playsongs(\'' +id_name + '\');">开始虫洞穿越</a>';
	try {
		$('div.cd2play').html(wormhole_cd);
	} catch (err) {
		console.log(err);
	}
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

var wormhole = function(jsonstr) {
	//alert(jsonstr);
	var json = $.parseJSON(jsonstr);
	var unpub = (($('.unpub').length)) ? true : false;
	//alert(unpub);
	var songid = 0, wormhole_html = "";

	var flag = 0;
	if (CurrentUrl.indexOf("xiami.com/song/") != -1) {
		unpub = ($('.unpublished').text().indexOf('下架') == -1) ? true : false;
		// Single page
		songid = CurrentUrl.split("song/")[1];
		if (!unpub || json[songid]) {		
			wormhole_html = '<div id="wormhole" class="song_info"><div class="player">'; 
			wormhole_html += '<div class="cd2play"><a onclick="play(';
			if (json[songid])
				wormhole_html += "'" + songid + "','default', 0, 'Singapore', '孙燕姿');" + '" title="穿越虫洞，到高维空间去试听这首歌" href="javascript:void(0);">开始虫洞穿越 GO！</a>';
			else
				wormhole_html += "'" + songid + "','default', 0, 'Singapore', '孙燕姿');" + '" title="打开穿越任意门，到五维空间去试听这首歌" href="javascript:void(0);">开始五维任意穿越 GO！(仅VIP)</a>';

			wormhole_html += '</div></div></div>';
			$('.unpublished').remove();
			$('#song_acts').before(wormhole_html);
		}
	}
	else {
		// album or collection or space lib or search page
		// Detect and add 6D wormholes
		if (CurrentUrl.indexOf("xiami.com/album/") != -1) {
			var wh_albumid = "a" + CurrentUrl.split("album/")[1];
			//alert(wh_albumid);
			if (json[wh_albumid]) {
				var stitle, sid, sindex, sdisc, position;
				for (var i=0; i<json[wh_albumid].length; i++) {
					stitle = json[wh_albumid][i]['title'];
					sid = json[wh_albumid][i]['song_id'];
					sindex = json[wh_albumid][i]['index'];
					sdisc = parseInt(json[wh_albumid][i]['cd']);
					//alert(sdisc);
					wormhole_html = '<tr class="_6dwormhole">';
					wormhole_html += '<td class="chkbox"><input type="checkbox" value="' + sid + '" name="recommendids" checked></td>';
					wormhole_html += '<td class="trackid">' + sindex + '</td>';
					wormhole_html += '<td class="song_name" data-sid="' + sid + '"><a>' + stitle + '</a><span style="padding:3px"></span><span style="padding:3px"></td>';
					wormhole_html += '<td class="song_hot"></td><td class="song_hot_bar"></td>';
					wormhole_html += '<td class="song_act"><div class="song_do" style="width:170px;_width:180px;">';
					wormhole_html += '<a class="song_digg" href="javascript:void(0)" title="推荐" onclick="recommend(\''
									+ sid + "','32')" + '"><span>推荐</span></a>';
					wormhole_html += '<a class="song_toclt" href="javascript:void(0)" title="添加到精选集" onclick="collect(\''
							+ sid + "');" + '"><span>添加到am精选集</span></a>';
					wormhole_html += '<div class="song_menu"><a class="song_more" href="javascript:void(0)" title="">更多</a>';
					wormhole_html += '<span class="song_menu_drop"><em></em><a href="javascript:;" onclick="tag(' + sid + ',3);" title="">添加标签</a></span>';
					wormhole_html += '</div>';
					wormhole_html += '<a class="song_play wormhole" href="javascript:void(0)" title="试听" onclick="play(\'' + sid + "');" + '"><span>试听</span></a><img src="http://img.xiami.net/images/group_photo/51/80651/27/1449148459_MBOS_4.png" style="vertical-align: middle;" height="15" title="六维穿越"></div>';
					wormhole_html += '</td></tr>"';
					//alert(wormhole_html);
					
					position = parseInt(sindex)-1;
					//alert(position);
					if ( position >= $('.track_list tbody').eq(sdisc-1).find("tr").length )
						//$(this).eq(position-1).after(wormhole_html);
						$('.track_list tbody').eq(sdisc-1).find("tr").eq(position-1).after(wormhole_html);
					else
						$('.track_list tbody').eq(sdisc-1).find("tr").eq(position).before(wormhole_html);
				}
			} 
			//else	alert("error");
		}
		
		// Detect and add 4D/5D wormholes
		$(".chkbox, .chk").each(function(){
			if ($(this).parent().find(".song_play").length != 0)
				;
			else {
				if ($(this).find("input").length > 0)
					songid = $(this).find("input").eq(0).attr("value");
				//alert (songid);
				
				if (!json[songid] && !unpub && CurrentUrl.indexOf("album/") != -1){
					//alert("5D auto wormholes!");
					// wormhole_html = '<span style="padding:3px"></span><span style="padding:3px">';
					// $(wormhole_html).insertAfter($(this).parent().find(".song_name a").eq(0));
					flag = 1;
					$(this).parent().find('input[type=checkbox]').attr({'disabled':false, 'checked':true});		
					wormhole_html = '<a class="song_play wormhole" href="javascript:void(0)" title="试听" onclick="play(';
					wormhole_html += "'" + songid + "','default', 0, 'Singapore', '孙燕姿');"
					wormhole_html += '"><span>试听</span></a><img src="http://www.xiami.com/images/group_photo/51/80651/27/1449570516_Nro1_4.png" style="vertical-align: middle;" height="15" title="五维穿越任意门，仅限VIP点击右边试听按钮即可使用">';
					//alert(wormhole_html);
					$(this).parent().find(".song_do").append(wormhole_html);
					if ($(".chapter_ctrl").length == 0)
						loadControl();
				} else if (json[songid]) {
					//alert("4D wormhole detected.");
					flag = 1;
					$(this).parent().find('input[type=checkbox]').attr({'disabled':false, 'checked':true});	
				
					if (CurrentUrl.indexOf("collect/") == -1 ) {
						// album, lib, search page
						wormhole_html = '<a class="song_play wormhole" href="javascript:void(0)" title="试听" onclick="play(';
						wormhole_html += "'" + songid + "');";
						wormhole_html += '"><span>试听</span></a>';
						//alert(wormhole_html);
						$(this).parent().find(".song_do").append(wormhole_html);
						if ($(".chapter_ctrl").length == 0)
							loadControl();					
					} else  {
						// collect page
						var item = $(this).parent();					
						var songname_html = $(item).find('.song_name').html().split(" -- ");
						var buffer = '<a href="/song/' + songid +'" title>' + songname_html[0] + '</a>' + ' -- ' + songname_html[1];
						//alert(buffer);
						$(item).find('.song_name').html(buffer);
		
						wormhole_html = '<a class="song_play" href="javascript:void(0)" title="穿越虫洞，到高维空间试听这首歌" onclick="play(\'' + songid + '\',\'collect\',\'552436\');">试听</a>';
						wormhole_html += '<a class="song_digg" href="javascript:void(0)" title="分享" onclick="recommend(' + songid + ',\'32\');">分享</a>';
						wormhole_html += '<a class="song_toclt" href="javascript:void(0)" onclick="collect(\'' + songid + '\');" title="添加这首高次元歌曲到精选集">添加到精选集</a>';
		
						$(item).find("p").prepend(wormhole_html);
					}
				}
			}
		});
		
		if (flag)
			cd2play();
	}
	
	//$.getJSON("https://raw.githubusercontent.com/dumbbird/xiaMini/master/wormhole.json", function(json){
	//});
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
		
		buffer = '<a class="song_play" href="javascript:void(0)" title="穿越虫洞，到高维空间试听这首歌" onclick="play(\'' + songid + '\',\'collect\',\'552436\');">试听</a>';
		buffer += '<a class="song_digg" href="javascript:void(0)" title="分享" onclick="recommend(' + songid + ',\'32\');">分享</a>';
		buffer += '<a class="song_toclt" href="javascript:void(0)" onclick="collect(\'' + songid + '\');" title="添加这首高次元歌曲到精选集">添加到精选集</a>';
		
		if ($(items[i]).find(".song_play").length == 0)
			$(items[i]).find("p").prepend(buffer);
	}
	cd2play_entrance();
}

function whList() {
	if ($('#wormhole').length)
		return;
	if ($('.song_info .player .cd2play').length)
		return;
		
	chrome.storage.local.get({WormholeList:''}, function (data) {	//需要在local区存储/读取,local区容量是5M
		var list = data.WormholeList;
		
		if (list == '') {	//初始化
			//list = xhr("https://raw.githubusercontent.com/dumbbird/xiaMini/master/wormhole.json", "get",0);
			list = xhr(chrome.extension.getURL('database/wormhole.json'),"get",0); //或者增加一个本地文件，从本地读取比较快
			wormhole(list);
			chrome.storage.local.set({
				WormholeList:list
			},function(){});			
		} else {
			wormhole(list);
			// 异步方式更新列表
			xhr("https://raw.githubusercontent.com/dumbbird/xiaMini/master/wormhole.json", 'get', 1, "", function (wormlist) {
				chrome.storage.local.set({
					WormholeList:wormlist
				},function(){});
			});
		}
		
	});
}

var CurrentUrl = window.location.href;
CurrentUrl = CurrentUrl.split("?")[0].split("#")[0];

if (CurrentUrl == "http://www.xiami.com/collect/552436" || CurrentUrl == "https://www.xiami.com/collect/552436") {
	wormhole_entrance();
} else if (CurrentUrl.indexOf("xiami.com/album/") != -1 
		|| CurrentUrl.indexOf("xiami.com/collect/") != -1 
		|| CurrentUrl.indexOf("xiami.com/song/") != -1 
		|| CurrentUrl.indexOf("xiami.com/space/") != -1 
		|| CurrentUrl.indexOf("xiami.com/search") != -1 ) {
	whList();
} 
// else if (CurrentUrl.indexOf("xiami.com/song/") != -1 && $(".unpublished").length != 0) 
	// whList();	
