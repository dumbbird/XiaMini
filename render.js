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
		if (/\/album|\/song|\/artist/.test(CurrentUrl))
			semicolConvert();	// convert ; to /	
			
		if (/\/album/.test(CurrentUrl))
			load_Taobao();		// load music.taobao.com ad
		else if (/\/group/.test(CurrentUrl))
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
	headEl = document.getElementsByClassName('subnav')[0];
	headEl.style.width = '320px';
	headEl.insertBefore(el, headEl.childNodes[3]);
	// sale = document.getElementsByClassName['bigtext last'][0];
	// sale.childNodes[0].style.display = 'none';
};

function semicolConvert() {
	var el = $("#albums_info tbody").find("tr").eq(1);
	if (el.length > 0) {
		var txt = el.html();
		if (txt.indexOf(";") != -1) {		
			//alert(txt);
			txt = txt.replace(/<\/a>; <a href/g, "</a>/ <a href");
			el.html(txt);
		}
	}

	el = $('#album_song, #track, #relate_song').find('.song_name');
	for (var i=0; i<el.length; i++) {
		txt = $(el).eq(i).html();	// 直接获取html
		
		if(txt.indexOf(";") != -1){
			txt = txt.replace(/\&amp;/g, "&");
			txt = txt.replace(/\&nbsp;/g, " ");
			txt = txt.replace(/\&quot;/g, "\"");
			txt = txt.replace(/\&lt;/g, "<");
			txt = txt.replace(/\&gt;/g, ">");

			// 如果检测到;，就做以下的替换。
			txt = txt.replace(/;/g, " / ");	
			//alert(txt);
			$(el).eq(i).html(txt);		// 将html赋值回去	
		}
	}	
	
	// if (/\/song/.test(CurrentUrl)) {
		// el = document.getElementById("share_bar");
		// if (el) {
			// el.setAttribute("style", "visibility:hidden")
		// }
		// el = $('li.do_share');
		// if (el.length > 0) {
			// txt = '<a class="weibo" style="top: 10px; left:125px; position: relative;" title="分享到微博" onclick="return shareWeibo();" href="">';
			// txt += '<i style="display: inline-block;width: 16px;height: 16px;margin-right: 2px;background: url(\'http://img.xiami.net/static/img/common/share_icon.png\') no-repeat -32px 0;vertical-align: middle;"></i></a>';
			// txt += '<a class="laiwang" style="top: 10px; left:130px; position: relative;" title="分享到来往" onclick="return shareLaiwang();" href=""><i style="display: inline-block;width: 16px;height: 16px;margin-right: 2px;background: url(\'http://img.xiami.net/static/img/common/share_icon.png\') no-repeat -263px 0;vertical-align: middle;"></i></a>';
			// el.append(txt);
		// }
	// }

}

function load_Taobao() {
	if (document.getElementById("do_buy"))
		return;
	var link = $('#taobao_cd a').attr('href');
	
	if (link) {
		//alert(link);
		var do_buy = '<li id="do_buy" class="do_buy"><a href="' + link + '" target="_blank" class="wrap" title="去淘宝音乐馆淘碟">';
		do_buy += '<span><i></i>淘碟</span></a></li>';
		$('.acts_list').append(do_buy);
	}
}

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
	el.href = chrome.extension.getURL(css);
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
