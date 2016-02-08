var CurrentUrl = window.location.href;

chrome.storage.sync.get(null, function (data) {
	if (data.Mode == 'false')
		removeXiaMini();
	else {
		// if (CurrentUrl.indexOf("/play?") != -1) {
			// if (data.TransMode == 'true')
				// removeCSS_trans();
			// else
				// renderCSS_trans();
			// }
			
		// render CSS's
		if (/\/album/.test(CurrentUrl))
			renderCSS_Album();
		else {
			switch (data.Mode) {
				case "default":
					renderCSS();
					feedstatus();
					break;
				case "collection":
					renderCSS_Collection();
					break;
				case "guess":
					renderCSS_Guess();
					break;
				}
		}

		loadGroup();		// render Group icon into header
		
		if (/\/group/.test(CurrentUrl))
			rm_postTitle();		// remove postTitle length
		else if (/\/artist/.test(CurrentUrl) && !document.getElementById("artist_mv_block")) 
			load_MV();
	}
});

function loadGroup() {
	var el = document.getElementById("gr_xiamini");
	if (el) {
		el.parentNode.removeChild(el);
	}
	
	el = document.createElement("a");
	el.id = "gr_xiamini";
	if (/\/group/.test(CurrentUrl))
		el.className = 'bigtext middle current';
	else
		el.className = 'bigtext middle ';
	el.href = '/group';
	el.innerHTML = '小组';
	var headEl = document.getElementsByClassName("subnav")[0];
	if (headEl) {
		headEl.style.width = '320px';
		headEl.insertBefore(el, headEl.childNodes[3]);
	}
	// sale = document.getElementsByClassName['bigtext last'][0];
	// sale.childNodes[0].style.display = 'none';
};

function rm_postTitle() {
	if (document.getElementById("topicpost"))
		$("#topicpost p input[name='title']").attr("maxlength", "1000");
}

function load_MV() {
	var artistName = $('#title h1').contents().filter(function () {
		return this.nodeType == 3;
	}).text();
	var artistID = CurrentUrl.split("artist/")[1];
	if (!document.getElementById("artist_mv_block")) {
		xhr("http://www.xiami.com/artist/mv/id/"+artistID, 'get', 1,"",function(ResultsHtml){
			var mv = $(ResultsHtml).find(".mv_item100_block");
			if (mv.length == 0)
				return;
			
			var html = '<div id="artist_mv_block" class="block sec_Rlt mgt20">';
			html += '<h3><span>'+ artistName + '的音乐视频</span></h3>';
			html += '<div class="content clearfix"><div class="sider_sec"><ul>';
			var cover, mv_url, name;				
																	
			for (var i=0; i<mv.length && i<5; i++) {
				cover = mv.eq(i).find(".cover img").attr("src");
				mv_url =  mv.eq(i).find(".name a").attr("href");
				name = mv.eq(i).find(".name a").text();
				html += '<li><div class="mv_item_side">';
				//html += '<p class="cover"> <a title="" href="' + mv_url + '" ><img src="' + cover + '" width="160" height="90" alt=""></a></p>';
				html += '<div class="info">';
				html += '<p class="name"><a href="' + mv_url +'" title="' + name + '"> <b class="icon mv">MV</b> ' + name + '</a></p>';
				html += '</div></div></li>';
			}
			
			html += '</ul></div></div>';
			html += '<div class="acts"><a href="/artist/mv/id/' + artistID +'" class="more">更多视频</a></div>';
			html += '</div>';
			//alert("render!");
			$("#artist_mv_block").remove();
			$("#artist_tags_block").before(html);
		});
	}

}

function feedstatus() {
	if ( $('#user_extra').length == 0 || $('.f_xiamini').length != 0)
		return;
		
	if ($('#timeline').length == 0) {
		el = document.createElement("div");
		el.id = "timeline";
		el.innerHTML = '<div class="content"><div class="action"><a class="more new" href="/fresh">更多新动态</a></div></div>';
		var headEl = document.getElementsByClassName("primary")[1];
		if (headEl) 		
			headEl.insertBefore(el, headEl.childNodes[5]);
	}
	xhr("http://m.xiami.com/web", 'get', 1,"",function(ResultsHtml){
		var feedlist = $(ResultsHtml).find('.feed_brief');
		//alert(feedlist.text());
		var feedstatus = "";
		var feedhtml, feedevent, feedobj, feedtime;
		var max = 7;
		for (i=0; i<max && i<feedlist.length; i++) {
			var feedhtml = feedlist.eq(i).html();
			var indexa = feedhtml.split("<a href", 2).join("<a href").length;
			if (indexa == feedhtml.length) {
				max++;
				continue;
			}
			feedevent = feedhtml.substring(0, indexa);
			feedevent = feedevent.replace("&lt;", "");
			feedevent = feedevent.replace("web/profile/id", "u");
			//alert(feedevent);
			var indexb = feedhtml.indexOf("<span class");
			feedobj = feedhtml.substring(indexa, indexb);
			feedobj = feedobj.replace("&gt;", "");
			feedobj = feedobj.replace("web/groupthread/tid/", "g/thread-");
			feedobj = feedobj.replace("web/album/id", "album");
			feedobj = feedobj.replace("web/song/id", "song");
			feedobj = feedobj.replace("web/artist/id", "artist");
			//alert(feedobj);
			feedstatus += '<div class="item popup f_xiamini">';
			feedstatus += '<div class="main"><div class="user"><div class="image"><a href="">';
			feedstatus += '<img src="http://img.xiami.net/images/group_photo/76/11376/61/1447236710_i4cI_3.png" alt="Xiamini动态"></a></div></div>';
			
			feedtime = feedlist.eq(i).find(".feed_time").text();
			//alert(feedtime);
			feedstatus += '<div class="info"><p><em style="display: block;">' + feedtime + '</em>';
			feedstatus += feedevent;			
			feedstatus += '<strong>' + feedobj + '</strong></p></div></div>';
			
			//feedstatus += '<b class="icon toplay" onclick="playcollect(15153046);" style="display: none;"></b></p></div></div>';
			//feedstatus += '<div class="extra" style="display: none;"><b class="triangle"><i>◆</i>◆</b><div class="container"><p class="loading"></p></div>';
			feedstatus += '</div>';
		
		}
		
		$('#timeline .content .item').attr('style', 'display:none');
		$('#timeline .content .loading').remove();
		$('#recommend_room').attr('style', 'display:none');
		$(feedstatus).insertBefore('#timeline .content .action');
	});
}

function feed320K() {
	if ($('#personalnav').length == 0)
		return;
	var feed320K = '<span id="feed320k" class="tag" data-tab="/tag/合格320K"><a href="" onclick="return false;">320K专门店</a></span>';
	// var css = '<style type="text/css"> #personalnav .320k {float: right;}'
				// + '#personalnav .320k a {'
				// + 'height: 42px; padding: 0 20px; line-height: 42px; font-size: 14px;'
				// + '}</style>';
	//$('head').append(css);
	$('#feed320k').click(function (){
		xhr("http://www.xiami.com/space/lib-album/u/4275776", 'get', 1,"",function(ResultsHtml){
			var albumlist = $('.album_item100_thread');
			alert(albumlist.length);
		});
	});
	
	$('#personalnav .content').append(feed320K);
}

function rm_guess() {
	if (document.getElementById("artist_recommend"))
		$("#artist_recommend").attr("style", "display:none");
}

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

function renderCSS_trans() {
	removeMini(["t_xiamini"]);
	loadMini("t_xiamini","hideTrans.css");
	$("#J_transdislrc").click();
}

function renderCSS_Guess() {
	removeMini(["g_xiamini","gc_xiamini"]);
	loadMini("gg_xiamini","xiaMini-guess.css");
}

function renderCSS_Collection() {
	removeMini(["g_xiamini","gg_xiamini"]);
	loadMini("gc_xiamini","xiaMini-collection.css");
}

function renderCSS() {
	removeMini(["gc_xiamini","gg_xiamini"]);
	loadMini("g_xiamini","xiaMini.css");
}

function renderCSS_Album() {
	//var link = $('#taobao_cd a').attr("href");
	loadMini("g_xiamini","xiaMini-album.css");
}

function removeXiaMini() {
	removeMini(["g_xiamini","gc_xiamini","gg_xiamini","do_buy","trans_list","album_song","gr_xiamini", "artist_mv_block"]);
	var el = document.getElementById("t_xiamini");
	if (!el) {
		renderCSS_trans();
	}
}
