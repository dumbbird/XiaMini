// ==UserScript==
// @name        XiaMi Paging
// @author      Ai
// @namespace   http://www.xiami.com/u/8154435?spm=0.0.0.0.j2pUVV
// @description This is a simple paging for XiaMi.com（单纯的跳页功能）
// @include     http://www.xiami.com/*
// @version     1.0.6
// @grant       none
// ==/UserScript==

/* 
本脚本由虾米用户@哀个人制作，仅供娱乐，不可用于商业用途。
目前只支持音乐库的"收藏的歌曲"和"收藏的专辑"；小组讨论区和话题（不支持小组主页）；艺人专辑；新碟上架。
如有意见或建议的请通过"使用说明"里的方式反馈或提出。
*/


// 引入虾米自身的JQUERY，避免冲突


// 判断当前网页是否需要本功能
var str = window.location.href;
var strRE = new RegExp("/space/lib-song|/space/lib-album|.com/group|/artist/album|/music/newalbum|/album/list|/album/\\d+");
var truststr = strRE.exec(str);
var pagenumber;
var spantext = $(".all_page span").text();
var number = (spantext)?spantext.match(/\d+/g)[1]:0; // 获取网页内所有条目数
var num;
var page;
switch (true) { // 设置不同页面不同的总页数
case truststr == "/space/lib-song": { // 音乐库的"收藏的歌曲"
		num = 25;
		page = number / num;
		pagenumber = Math.ceil(page);
		break;
	}
case truststr == "/space/lib-album": { // 音乐库的"收藏的专辑"
		num = 15;
		page = number / num;
		pagenumber = Math.ceil(page);
		break;
	}
case truststr == ".com/group": { // 小组讨论区和话题（不支持小组主页）
		num = 20;
		page = number / num;
		if (!/\/group\/thread-detail\//.exec(str)) {
			pagenumber = Math.ceil(page);
		} else {
			var pageparseInt = parseInt(page);
			if (page > pageparseInt + 0.05) {
				var pagenumber = pageparseInt + 1;
			} else {
				var pagenumber = pageparseInt;
			}
		}
		break;
	}
case truststr == "/artist/album": { // 艺人专辑
		num = 9;
		page = number / num;
		pagenumber = Math.ceil(page);
		break;
	}
case truststr == "/music/newalbum": // 新碟上架
case truststr == "/album/list": {
		num = 14;
		page = number / num;
		pagenumber = Math.ceil(page);
		break;
	}
}
if (/\/album\/\d+/.exec(truststr)) {
	num = 10;
	page = number / num;
	pagenumber = Math.ceil(page);
}

// 判断当前网页是否需要本功能
if (truststr) {

	function addpxcss(css) { // 调用函数把CSS样式添加到<head>段的 <style>元素中
		var head,
		style;
		head = document.getElementsByTagName('head')[0];
		if (!head) {
			return;
		}
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	}
	// 定义跳页功能的CSS样式
	addpxcss('.all_page label{' +
		'  cursor:text;' +
		'}' +
		'.all_page label{' +
		'  padding:0px 8px;display:block;border:1px solid #ccc; float:left;margin-right:10px;font-size:12px; display:inline;' +
		'}' +
		'.all_page label .px{' +
		'  padding:0;width:25px;height:16px;line-height:16px;' +
		'}' +
		'.all_page label .px{' +
		'  border:1px solid;border-color:#848484 #E0E0E0 #E0E0E0 #848484;color:;' +
		'}');

	// 将跳页功能插入到分页行中
	var gopagelabel = '<label><input type="text" id="custompage" class="px" size="" title="输入页码，按回车快速跳转" value=""><span title="共  页"> /  页</span></label>'
		$(".p_redirect_l").before(gopagelabel);
	var textnumber = $(".p_curpage").text();
	if (pagenumber == textnumber && $(".p_redirect").length == 1) {
		$(".p_curpage").after(gopagelabel);
	}
	$("#custompage +span").css("line-height", "20px");
	$("#custompage").attr({
		size : textnumber,
		value : textnumber
	});
	$("#custompage +span").attr("title", "共 " + pagenumber + " 页");
	$("#custompage +span").text(" / " + pagenumber + " 页");
	$("#custompage").keyup(function () { // 限制文本框内容
		$(this).val($(this).val().replace(/\D|^0/g, ''));
		if ($("#custompage").val() > pagenumber) {
		/*
			$("#custompage").val($(this).val().replace(/(\d+)\d/g, '$1'));
			if ($("#custompage").val() > pagenumber) {
				$("#custompage").val($(this).val().replace(/\d/g, ''));
			}*/
		}
	}).bind("paste", function () { // CTR+V事件处理
		$(this).val($(this).val().replace(/\D|^0/g, ''));
	}).css("ime-mode", "disabled"); // CSS设置输入法不可用

	$("#custompage").keydown(function (event) { // 设置响应函数和跳页函数
		if (event.which == 13) {
			var valuenumber = $("#custompage").attr("value");
			var gopage;
			if (!/\/page\//.exec(str)) {
				if (/space\/lib-song$|space\/lib-album$/.exec(str)) {
					gopage = str.replace(/$/, "/page/" + valuenumber)
				} else if (/space\/lib-song\/u$|space\/lib-album\/u$/.exec(str)) {
					uid = $(".buddy.personal_iconX.personalDropDown").attr("href").match(/\d+/);
					gopage = str.replace(/$/, "/" + uid + "/page/" + valuenumber)
				} else if (/\/music\/newalbum$/.exec(str)) {
					gopage = str.replace(/$/, "/type/all/page/" + valuenumber);
				} else if (/\/album\/list/.exec(str)) {
					str = str.replace(/\?/g, "/");
					str = str.replace(/=/g, "/");
					str = str.replace(/\&/g, "/");
					gopage = str + "/page/" + valuenumber;
				} else if (!/\?spm/.exec(str)) {
					gopage = str.replace(/(\d+$)/, "$1/page/" + valuenumber)
				} else {
					gopage = str.replace(/\?spm/, "/page/" + valuenumber + "?spm")
				}
			} else {
				gopage = str.replace(/\/page\/\d+/, "/page/" + valuenumber)
			}
			window.location = gopage;
			doane(event);
		}
	})
	if (/\/music\/newalbum|\/album\/list/.exec(str)) { // 根据页面不同设置跳页功能不同位置
		$("#custompage").parent().css({
			"float" : "none",
			"padding" : "3px 8px"
		})
	}
}