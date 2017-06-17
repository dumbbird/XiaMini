// Project Wormhole，呵呵你懂的。
// 版本号：2.10.7	四维、六维穿越

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
	var control_html = "";	
	if ($(".chapter_ctrl").length == 0) {
		control_html += '<div class="chapter_ctrl cd_count">';
		control_html += '<div class="ctrl_play">';
		control_html += '<a onclick="selectAll(\'recommendids\')" title="" href="javascript:void(0)" class="bt_choose"><span>全选</span></a>';
		control_html += '<a title="" onclick="inverse(\'recommendids\');" href="javascript:void(0);" class="bt_choose"><span>反选</span></a>';
		control_html += '<a onclick="playsongs(\'recommendids\');" title="" href="javascript:void(0);" class="bt_play"><span>播放选中歌曲</span></a>';
		//control_html += '<a onclick="sendsongs(\'recommendids\');" title="" href="javascript:void(0);" class="bt_play"><span>发送选中歌曲</span></a></div>';
		
		control_html += '<div class="ctrl_gears"> <a title="" href="javascript:void(0)" class="bt_cdgears"><span>更多</span></a>';
		control_html += '<div class="ctrl_gears_more hidden"><em></em> <a onclick="collects(\'recommendids\');" title="添加选中歌曲到精选集" href="javascript:void(0);">添加选中歌曲到精选集</a>';
		control_html += '</div></div></div>';
		//alert(control_html);
		$("#track").append(control_html);
	} 
	$(".bt_cdgears").mouseover(function(){$(this).addClass('active').next().removeClass('hidden').show();});
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
		songid = $("#qrcode .acts").text();
		//alert(json[songid]);
		if (json[songid] && !unpub) {
			var wormhole_song = '<div class="song_info" data-needpay="0" data-playstatus="1" data-downloadstatus="0" data-json="">';
            wormhole_song += '<div class="player">'; 
			wormhole_song += '<div class="cd2play"><a onclick="play(\'' + songid + "', 'default', 0, this);" + '" title="立即播放" href="javascript:void(0);">开始虫洞穿越 GO！</a>';
			wormhole_song += '</div></div></div>';
			
			$('.unpublished').remove();
			$('.players_actions').prepend(wormhole_song);
			//$('.song_info').attr("data-playstatus", "1");
			//$('.song_info .player .cd2play a').text("开始虫洞穿越 GO！");
		}
	}
	else {
		// album or collection or space lib or search page		
		
		// album page - Detect and add 6D wormholes
		if (CurrentUrl.indexOf("xiami.com/album/") != -1) {
			var wh_albumid = "a" + CurrentUrl.split("album/")[1];
			//alert(wh_albumid);

			if (json[wh_albumid] && $("._6dwormhole").length == 0) {
				var stitle, sid, sindex, sdisc, position, tracksize;
				for (var i=0; i<json[wh_albumid].length; i++) {
					stitle = json[wh_albumid][i]['songName'];
					sid = json[wh_albumid][i]['song_id'];
					sindex = json[wh_albumid][i]['index'];
					sdisc = parseInt(json[wh_albumid][i]['cd']);
					//alert(sdisc);
					wormhole_html = '<tr class="_6dwormhole">';
					wormhole_html += '<td class="chkbox"><input type="checkbox" value="' + sid + '" name="recommendids" checked></td>';
					wormhole_html += '<td class="trackid">' + sindex + '</td>';
					wormhole_html += '<td class="song_name" title="六维虫洞只能试听，暂时无法查看歌曲详情" data-sid="' + sid + '"><a>' + stitle + '</a><span style="padding:3px"></span><span style="padding:3px"></td>';
					wormhole_html += '<td class="song_hot"></td>';
					wormhole_html += '<td class="song_hot_bar"></td>';
					wormhole_html += '<td class="song_act"><div class="song_do" style="width:170px;_width:180px;">';
					wormhole_html += '<a class="song_play wormhole" href="javascript:void(0)" title="试听" onclick="play(\'' + sid + "');" + '"><span>试听</span></a>';
					wormhole_html += '<a class="song_digg" href="javascript:void(0)" title="推荐" onclick="recommend(\''
									+ sid + "','32')" + '"><span>推荐</span></a>';
					wormhole_html += '<a class="song_toclt" href="javascript:void(0)" title="添加到精选集" onclick="collect(\''
							+ sid + "');" + '"><span>添加到am精选集</span></a>';
					wormhole_html += '<div class="song_menu"><a class="song_more" href="javascript:void(0)" title="">更多</a>';
					wormhole_html += '<span class="song_menu_drop"><em></em><a href="javascript:;" onclick="tag(' + sid + ',3);" title="">添加标签</a></span>';
					wormhole_html += '</div>';
					wormhole_html += '<img src="http://img.xiami.net/images/group_photo/51/80651/27/1449148459_MBOS_4.png" style="vertical-align: middle;" height="15" title="六维穿越"></div>';
					
					wormhole_html += '</td></tr>';
					//alert(wormhole_html);
					
					position = parseInt(sindex);	
					disc_count = $('#track_list tbody tr .trackname').length;
					//alert ("disc_count" + disc_count);
					if (disc_count == 0) {
						// If no disc title, then prepend
						disc_html = '<tr><td style="border:none;padding:0;" colspan="5">'
									+ '<strong class="trackname" style="border-bottom: 1px solid #E5E5E5; padding: 10px 5px;">disc 1</strong>'
									+ '</td></tr>';
						$('#track_list tbody').prepend(disc_html);
					}					
						
					disc_finder = $('#track_list tbody tr .trackname').eq(sdisc-1).parent().parent();
					postion_finder = disc_finder.nextAll();
					
					if (postion_finder.length == 0 || position == 1)
						disc_finder.after(wormhole_html);				// 如果disc中无曲目或者第一首，插入在disc后面

					else {
						$(postion_finder).each(function(){
							thisIndex = $(this).find('.trackid');
							
							// reach next track or reach the next disc title element
							if ( (thisIndex.length == 0) || (position < thisIndex.text()) ) {							
								//alert(position - thisIndex.text());
								$(this).before(wormhole_html);
								return false;
							}
							
							// reach the end of entire tracklist
							else if ( thisIndex.text() == postion_finder.length ) {
								$(this).after(wormhole_html);
								return false;
							}
						});
					}
				}
			} 
		}
		
		// album & collection & others - Detect and add 4D/5D wormholes
		$(".chkbox, .chk").each(function(){
			if ($(this).parent().attr('data-playstatus') == '2') 
				$(this).parent().attr('data-playstatus', '1');	// escape payable message
			
			if ($(this).find("input").length > 0)
				songid = $(this).find("input").eq(0).attr("value");
			// //alert (songid);
			if ($(this).parent().attr("class") != "_6dwormhole" && $(this).parent().find(".song_tel").length == 0) {
				wormhole_html = '<a onclick="showDialog(\'/music/send/id/' + songid + '\');" title="" href="javascript:void(0)" class="song_tel">发送到其他设备</a>'
				$(this).parent().find(".song_menu").before(wormhole_html);
			}
			if ($(this).parent().find(".song_play").length != 0)
				;
			else {
				if ($(this).parent().attr('data-needpay') == '1') {
					// payable titles					
					wormhole_html = '<a class="song_play unpayed" href="javascript:void(0)" title="需购买后试听" onclick="play(';
					wormhole_html += "'" + songid + "');";
					wormhole_html += '"><span>试听</span></a>';
					//alert(wormhole_html);
					$(this).parent().find(".song_do").prepend(wormhole_html);
				}
				
				// 5d wormhole - unavailable
				//if (!json[songid] && !unpub && CurrentUrl.indexOf("album/") != -1){
					//alert("5D auto wormholes!");
					// wormhole_html = '<span style="padding:3px"></span><span style="padding:3px">';
					// $(wormhole_html).insertAfter($(this).parent().find(".song_name a").eq(0));
					// flag = 1;
					// $(this).parent().find('input[type=checkbox]').attr({'disabled':false, 'checked':true});		
					// wormhole_html = '<a class="song_play wormhole" href="javascript:void(0)" title="试听" onclick="play(';
					// wormhole_html += "'" + songid + "','default', 0, 'Singapore', '孙燕姿');"
					// wormhole_html += '"><span>试听</span></a><img src="http://www.xiami.com/images/group_photo/51/80651/27/1449570516_Nro1_4.png" style="vertical-align: middle;" height="15" title="五维穿越任意门，仅限VIP点击右边试听按钮即可使用">';
					// //alert(wormhole_html);
					// $(this).parent().find(".song_do").prepend(wormhole_html);
					// if ($(".chapter_ctrl").length == 0)
						// loadControl();
				//} else 
				
				if (json[songid]) {
					//alert("4D wormhole detected.");
					flag = 1;
					$(this).parent().find('input[type=checkbox]').attr({'disabled':false, 'checked':true});	
					
					if (CurrentUrl.indexOf("collect/") == -1 ) {
						// album, lib, search page
						$(this).parent().attr('data-playstatus', '1');
						wormhole_html = '<a class="song_play wormhole" href="javascript:void(0)" title="试听" onclick="play(';
						wormhole_html += "'" + songid + "');";
						wormhole_html += '"><span>试听</span></a>';
						//alert(wormhole_html);
						$(this).parent().find(".song_do").prepend(wormhole_html);
						loadControl();
					} else  {
						// collect page
						var collectid = CurrentUrl.split("collect/")[1];
						console.log(collectid);
						$("#totle_" + songid).attr('data-playstatus', '1');
						var item = $(this).parent();
						
						wormhole_html = '<a class="song_play" href="javascript:void(0)" title="穿越虫洞，到高维空间试听这首歌" onclick="play(\'' + songid + '\',\'collect\',\'552436\');">试听</a>';
						if ($(item).find(".song_digg, .song_toclt, .song_tel").length == 0) {
							wormhole_html += '<a class="song_digg" href="javascript:void(0)" title="分享" onclick="recommend(' + songid + ',\'32\');">分享</a>';
							wormhole_html += '<a class="song_tel" href="javascript:void(0)" title="发送到我的设备" onclick="onclick="showDialog(\'/music/send/id/' + songid + ');">发送到我的设备</a>';
							wormhole_html += '<a class="song_toclt" href="javascript:void(0)" onclick="collect(\'' + songid + '\');" title="添加这首高次元歌曲到精选集">添加到精选集</a>';
							// if ($("#edit_bars").length) {
								// wormhole_html += '<a class="song_edit" title="编辑">编辑</a>';
								// wormhole_html += '<a class="song_delete" title="删除" rel="' + songid +'" href="/collect/ajaxdelsong/cid/' + collectid + '/sid/' + songid + '">删除</a>';
							// }
						}
						if ($(item).find("p").length == 0) 
							$(item).append("<p>" + wormhole_html) + "</p>";
						else
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
		
		buffer = "";
		buffer += '<a class="song_play" href="javascript:void(0)" title="穿越虫洞，到高维空间试听这首歌" onclick="play(\'' + songid + '\',\'collect\',\'552436\');">试听</a>';
		//buffer += '<a class="song_digg" href="javascript:void(0)" title="分享" onclick="recommend(' + songid + ',\'32\');">分享</a>';
		//buffer += '<a class="song_toclt" href="javascript:void(0)" onclick="collect(\'' + songid + '\');" title="添加这首高次元歌曲到精选集">添加到精选集</a>';
		
		if ($(items[i]).find(".song_play").length == 0)
			$(items[i]).find("p").prepend(buffer);
	}
	cd2play_entrance();
}

function whList() {
	if ($('#wormhole').length)
		return;
	if ($('.song_info').attr("data-playstatus") == "1")
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
