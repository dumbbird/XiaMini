// 识别歌词信任用户
// 版本号：1.0.3

function getid() {
	//xhr("http://zh.xiami.wikia.com/wiki/Member-list", 'get', 1,"",function(ResultsHtml){
	xhr("https://raw.githubusercontent.com/dumbbird/xiaMini/master/member-list.xml", 'get', 1,"",function(ResultsHtml){
		var memberid;
		//var member_xml = $(ResultsHtml).find("#member-list").text();
		var member_xml = ResultsHtml;
		
		if (CurrentUrl.indexOf("com/song/") != -1) {
			var editor = $("div#lyric a");
			for (var i=0; i<editor.length;i++) {
				memberid = "";
				var href = editor.eq(i).attr('href');
				if (href.indexOf("wiki") != -1) 
					continue;				
				var uid = href.split("u/")[1];
				if (lyricmembers[uid]) {
					memberid = lyricmembers[uid];
				}
				else {
					var url = 'http://www.xiami.com/u/' + uid;
					var ismember = $('homepage', member_xml).filter(function(){ return $(this).text() === url && $(this).parent().attr('type') != "invalid";});
					if (ismember.length > 0) {
						memberid = ismember.eq(0).parent().find('id').text();
					}				
					if (memberid == "")
						memberid = "非信任用户或音乐人";
				}
				//alert(memberid);
				editor.eq(i).attr('title', memberid);
			}
		}
		else if (CurrentUrl.indexOf("xiami.com/u/") != -1 && !document.getElementById("lyricsmember")) {
			var uid = CurrentUrl.split("u/")[1];
			var url = 'http://www.xiami.com/u/' + uid;
			var ismember = $('homepage', member_xml).filter(function(){ return $(this).text() === url && $(this).parent().attr('type') != "invalid";});
			if (ismember.length > 0) {
				memberid = ismember.eq(0).parent().find('id').text();
			}		
			loadMember(memberid);		
		}
	});
}
	
// load member medal
var loadMember = function(member_id) {
	var lyricmembers = {}; //本页缓存id
	if (member_id != "" && CurrentUrl.indexOf("xiami.com/u/") != -1) {
		var add_on = '<a target="_blank" href="/group/thread-detail/tid/192719" id="lyricsmember"><span class="member_medal ';
		if (member_id.indexOf("JID") != -1)
			add_on += 'medal_lyricmember1" title="' + member_id + '"></span></a>';
		else 
			add_on += 'medal_lyricmember2" title="' + member_id + '"></span></a>'; 
		//alert(add_on);
		$(".usr_info .p_name").append(add_on);
	}
}


// van version
var loadMember_songpage1 = function(){
	var editor = $("div#lyric a");
	for (var i=0;i<editor.length;i++) {
		var href = editor.eq(i).attr('href');
		if (href.indexOf("wiki") == -1) {
			href = href.split("u/")[1];
			editor.eq(i).attr('name_card',href);
		}
	}
	
	var lyricmembers = {}; //本页缓存id

	$("[name_card]").live('mouseover', function(evt) {
		var uid = $(this).attr('name_card');
		if (lyricmembers[uid])
			member_id = lyricmembers[uid];
		else
			member_id = getid(uid);
		setTimeout(function() {
			if ($(".user_info .info"))
				$(".user_info .info p").before(member_id);
			else
				setTimeout(function() {$(".user_info .info p").before(member_id);},100);
		}, 300);

	});
}

var CurrentUrl = window.location.href;
CurrentUrl = CurrentUrl.split("?spm")[0];
var lyricmembers = {}; //本页缓存id
getid();