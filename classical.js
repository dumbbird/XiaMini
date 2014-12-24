// 古典专辑曲目列表优化
// 古典曲目标题显示优化
// 建立古典作曲家作品列表
// 版本号：1.10.4

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
	
// rearrange classical music tracklist
var clTracklistArr = function() {

	var trackTitles = $('.song_name a:first-child');
	//alert(trackTitles.length);
	// 检查是否为古典专辑
	var possibility = 0;
	for (var i=0; i<trackTitles.length; i++){
		if (trackTitles.eq(i).text().indexOf(": ") != -1)
			possibility += 1/trackTitles.length;
		//alert(trackTitles.eq(i).text());
	}
	//alert(possibility);
	if (possibility < 0.8)
		return;
		
	// 检查通过，继续进行
	var workTitles = new Array();		// 存放古典作品标题，一般会下属多个tracks
	var sectionTitles = new Array();	// 存放古典作品乐章标题，一般每一乐章一个track
	var workTrackIndex = new Array();	// 记录古典专辑中每一组作品的第一乐章的track number
	
	var trackLists = $('#track').find('.track_list');
	var buffer, index;					// 临时存放数据之用
	
	for (var k=0; k<trackLists.length; k++)	{
		// reset
		workTitles = [];
		sectionTitles = [];
		workTrackIndex = [];
		workTrackIndex.push(1);				// 从track1开始记录
		
		trackTitles = trackLists.eq(k).find('.song_name a:first-child');
		for (i=0; i<trackTitles.length; i++) {
			buffer = trackTitles.eq(i).text();
			index = buffer.indexOf(" - ");
			if (index != -1) 
				workTitles.push(buffer.substring(0,index));
			else 
				workTitles.push(buffer);
			sectionTitles.push(buffer.substring(index+3));
			if (i>0 && workTitles[i] != workTitles[i-1]) {
				workTrackIndex.push(i+1);
				//alert(workTitles[i] + ' .... ' + workTitles[i-1]);
			}
		}
		//alert(workTitles);	alert(sectionTitles);	
		//alert(workTrackIndex);
		//var tracklist_html = $('.track_list').html();
		var tracks = trackLists.eq(k).find('tr');

		var new_html = '';
		var j = 0;
		var html_a,	// 存放chkbox, trackid的html 
			html_b;	// 存放song_hot, song_hot_bar, song_act的html
		var songtitle_html, replacee;
		for (i=0; i<tracks.length; i++) {
			buffer = tracks.eq(i).html();
			
			index = buffer.indexOf('<td class="song_name">');
			html_a = buffer.substring(0, index);
			index = buffer.indexOf('<td class="song_hot">');
			html_b = buffer.substring(index);

			songtitle_html = tracks.eq(i).find('.song_name').html();
			if (songtitle_html.indexOf(' - ') != -1) {
				replacee = Re_title4(workTitles[i]+' - ');								
			}
			else {
				index = workTitles[i].indexOf(": ");
				if (index != -1) {
					replacee = Re_title4(workTitles[i].substring(0, index+2));					
				}
				// if no sectiontitles, use the worktitle as songtitle, but get rid of composer
			}
			songtitle_html = songtitle_html.replace(replacee, "");
			
			if ((i+1) == workTrackIndex[j]) {
				if (i > 0)
					new_html += '</tbody>';
				new_html += '<tbody><tr class="same_group group_first">';	
				new_html += '<td class="work_expand" style="width:20px"><a href="javascript:;" class="slide_up" title="展开并勾选该作品的所有乐章"></a></td>'
				new_html += '<td class="trackid">' + IndexToColumn(j+1) + '</td>' + '<td class="song_name" colspan="4">'
					+ '<h3 class="work_title">' + workTitles[i] + '</h3>' + '</td>';
				new_html += '</tr></tbody>';
				new_html += '<tbody class="same_song_group">';
				j++;
			}
			new_html += '<tr class="same_group" style="height:40px">';
			new_html += html_a + '<td class="song_name">' + songtitle_html + '</td>' + html_b;
			new_html += '</tr>';		
			
		}
		new_html += '</tbody>';
		//alert (new_html);
		trackLists.eq(k).html(new_html);
	}
	
	$(".track_list tr.same_group:first").show();
	$("tbody.same_song_group").find('input[type=checkbox]').attr({'disabled':false, 'checked':true});
	$(".track_list a.slide_up").toggle(
		function(){
			$(this).attr("class","slide_down");
			$(this).attr('title', "展开并勾选该作品的所有乐章");
			$(this).parents('tbody').next("tbody.same_song_group").hide().find('input[type=checkbox]').attr({'disabled':true, 'checked':false});
		},function(){
			$(this).attr("class","slide_up");
			$(this).attr('title', "折叠并解除勾选该作品的所有乐章");
			if ($('.chapter_ctrl').length > 0)
				$(this).parents('tbody').next("tbody.same_song_group").show().find('input[type=checkbox]').attr({'disabled':false, 'checked':true});
			else
				$(this).parents('tbody').next("tbody.same_song_group").show();
		});
	
	if ($('.chapter_ctrl').length > 0) {
		buffer = '<a id="expandAll" title="展开所有章节" href="javascript:void(0);">展开所有章节</a>';
		buffer += '<a id="collapseAll" title="折叠所有章节" href="javascript:void(0);">折叠所有章节</a>';
		$('.ctrl_gears_more').children('a:first').before(buffer);
		
		$("#expandAll").click(
			function(){
				buffer = $('.track_list a.slide_down');
				for (i=0; i<buffer.length; i++)
					buffer.eq(i).click();
				$(window).scrollTop($('#track').offset().top);
			}
		);
		$("#collapseAll").click(
			function(){
				buffer = $('.track_list a.slide_up');
				for (i=0; i<buffer.length; i++)
					buffer.eq(i).click();			
				$(window).scrollTop($('#track').offset().top);
			}
		);
	}	
	
	function IndexToColumn(index) {
		var ColumnBase = 26;
		var DigitMax = 7; // ceil(log26(Int32.Max))
		var Digits = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		if (index <= 0)
			throw new IndexOutOfRangeException("index must be a positive number");

		if (index <= ColumnBase)
			return Digits[index - 1].toString();

		var sb = "";
		var current = index;
		var offset = DigitMax;
		while (current > 0)
		{
			sb[--offset] += Digits[--current % ColumnBase];
			current /= ColumnBase;
		}
		return sb;
	}	
	
}

var clTitArr = function () {
	if (document.getElementById("clSubTit"))
		return;
	var index = index_m;
	var clTit = Songtitle.substring(0, index);
	var clTit_html = "";
	clTit_html += '<span id="clSubTit">' + clTit + '</span>';
	clTit_html += Songtitle.substring(index+3);
	
	title_html = $('#title h1').html();
	index = title_html.indexOf("<span>");
	if (index != -1)
		clTit_html += title_html.substring(index);
	$('#title h1').html(clTit_html);
	
	if (document.getElementById("work"))
		return;
	index = clTit.indexOf(": ");
	var composer = clTit.substring(0, index);
	var work_title = clTit.substring(index+2);
	work_title = work_title.replace(/\"/g, "&quot;");
	
	var work_html = '<tr id="work">';
		work_html += '<td class="item" valign="top">所属作品：</td>';
		work_html += '<td valign="top"><div style="white-space:nowrap; width:140px; overflow:hidden; text-overflow:ellipsis;">';
		work_html += '<a href="/search/find?artist=' + composer +'" title="' + composer + '">' + composer + '</a>: ';
		work_html += '<a href="/search/find?work=' + work_title +'" title="' + work_title + '">' + work_title + '</a>';
		work_html += '</div></td>';
		work_html += '</tr>';
	$('#albums_info tbody tr:first').before(work_html);
	return;
}

var loadWorklist = function(xurl) {
	var work_xml = xhr(chrome.extension.getURL(xurl), 'get', 0);
	var works = $('work', work_xml).filter( function() {return $(this).parent().attr("id") === id;} );
	if(works.length == 0) return;
	var nickname = $(works[0]).parent().attr("aka");
	//alert(nickname);
	
	var artistName = $('#title h1').contents().filter(function () {
		return this.nodeType == 3;
	}).text();
	
	var worklist_html = '<div id="artist_work" class="sec_Rlt mgt30">';
	worklist_html += '<h3 style="font-size: 14px;line-height: 30px;color: #F60;">' + artistName + '的作品</h3>';
	worklist_html += '<div class="common_sec"><table cellspacing="0" cellpadding="0" summary="虾米高品质音乐列表" class="track_list">';
	worklist_html += '<tbody>';
	
	var hideflag = "";
	var title;
	for (var i=0; i<works.length; i++) {
		if (i>10) 
			hideflag = ' class="hide"';
		title = $(works[i]).attr('title');
		worklist_html += '<tr'+hideflag+'><td class="trackid">' + $(works[i]).attr('op') + '</td><td class="subworkid" style="width:10px"></td>';
		worklist_html += '<td class="song_name"><a href="http://zh.xiami.wikia.com/wiki/' + title + '_(' + nickname + ')" target="_blank">' + title + '</td>';
		//worklist_html += '<td class="song_act"><div class="song_do" style="width:170px;_width:180px;">';
		//worklist_html += '<a class="song_digg" href="#" title="详细信息"<span>详细信息</span></a> </div></td>';
		worklist_html += '</tr>';
		
		var subworks = $(works[i]).find('subwork');
		for (var j=0; j<subworks.length; j++) {
			worklist_html += '<tr'+hideflag+'><td class="trackid"></td><td class="subworkid" style="width:10px">' + $(subworks[j]).attr('op') + '</td>';
			worklist_html += '<td class="song_name">' + $(subworks[j]).attr('title') + '</td>';
			//worklist_html += '<td class="song_act"><div class="song_do" style="width:170px;_width:180px;">';
			//worklist_html += '<a class="song_digg" href="#" title="详细信息"<span>详细信息</span></a> </div></td>';
			worklist_html += '</tr>';		
		}
		
	}

	worklist_html += '</tbody></table></div>';
	worklist_html += '<div class="acts"><a title="展开全部作品" href="/artist/top/id/97714" class="more">全部作品</a></div>';
	//alert(worklist_html);	
	$("#artist_trends").before(worklist_html);
}

var CurrentUrl = window.location.href;
CurrentUrl = CurrentUrl.split("?")[0].split("#")[0];

if (/com\/album/.test(CurrentUrl)) {
	clTracklistArr();		
}
if (/com\/song/.test(CurrentUrl)) {
	var Songtitle = $('#title h1').contents().filter(function () {
		return this.nodeType == 3;
	}).text();
	var index_m = Songtitle.indexOf(" - ");
	var index_n = Songtitle.indexOf(": ");
	if (index_m != -1 && index_n != -1) {
		clTitArr();
		Songtitle = Songtitle.substring(0, index_m);
		//alert(Songtitle);
	}
}
if (CurrentUrl.indexOf("xiami.com/artist/") != -1) {
	var index = CurrentUrl.lastIndexOf("/");
	var id = CurrentUrl.substring(index+1);
	var xml_url = "classical-schema.xml";
	//alert(xml_url);
	loadWorklist(xml_url);
}