// ==UserScript==
// @name        XiaMi OpenPlay Extensions
// @namespace   http://www.xiami.com/u/8154435?spm=0.0.0.0.j2pUVV
// @description This is a beautiful open Extensions for XiaMi.com
// @include     http://www.xiami.com/play?ids=/song/playlist/id*
// @include     http://www.xiami.com/play
// @include     http://www.xiami.com/play?uid=*
// @include     http://www.xiami.com/play?spm=*
// @require     http://code.jquery.com/jquery-2.1.1.js
// @version     1
// @grant       none
// ==/UserScript==


//调用函数把CSS样式添加到<head>段的 <style>元素中

function addGlobalStyle(css) {
    var head,
    style;
    head = document.getElementsByTagName('head') [0];
    if (!head) {
        return ;
    }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}


//定义CSS样式

addGlobalStyle('.player-info .track-info .track-controls #J_winopenPlay {' +
//给弹窗图标设置CSS
'  top: 0px; right: -33px; position: absolute; cursor: pointer;' +
'}' +
'.icon-winopenPlay {' +
'  background-image: url("http://bbsdata.gztwkadokawa.com/album/201405/28/225839pgklmuagcg25gcrr.png"); background-repeat: no-repeat;' +
'}' +
'.icon-winopenPlay {' +
'  background-position: 0px -277px; width: 18px; height: 18px;' +
'}' +
'.icon-winopenPlay:hover {' +
'  background-position: -28px -277px;' +
'}' +
'.track-play-menu {' +
//设置DIV+CSS
'  padding: 10px; border-radius: 4px; left: 300px; width: 140px; height: 60px; bottom: 26px; position: fixed; z-index: 1999; background-color: rgb(51, 51, 51);' +
'}' +
'.track-play-menu ul li {' +
'  height: 30px; line-height: 30px;' +
'}' +
'.track-play-menu ul li a {' +
'  border-radius: 4px; color: rgb(170, 170, 170); line-height: 30px; padding-left: 38px; text-decoration: none; display: block; position: relative;' +
'}' +
'.track-play-menu ul li a:hover {' +
'  background-color: rgb(68, 68, 68);' +
'}' +
'.track-play-menu ul li i {' +
'  left: 8px; top: 6px; width: 18px; height: 18px; position: absolute;' +
'}' +
'.track-play-menu .arrow {' +
'  left: -9px; width: 9px; height: 18px; bottom: 16px; position: absolute; background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAASCAYAAACJgPRIAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACLSURBVChThc4BDoIwDAVQONK6HUhRuQ4xRrksqP+PDsjWwU+arO3L0uYkrfd+0LeZVkSeQD/ti6yghgheCVioADnike8csHQff/hYgJXAaC1TNWeARdTj8c0X+4oHAT7QVGFEDOAdAxMqWYLBDVVAXW8JIXRYzIeIyaGOyzjnrrhzOkRMgtrWIyKXPykjhfjqVAPDAAAAAElFTkSuQmCC");' +
'}' +
'.ks-ie7 .track-play-menu .arrow {' +
'  background-image: url("http://gtms03.alicdn.com/tps/i3/T1ZNuzFrtaXXbeUgbb-9-18.png");' +
'}' +
'.icon-OldPlay {' +
//给旧版播放器弹窗图标设置CSS
'  background-image: url("http://bbsdata.gztwkadokawa.com/album/201405/28/225839pgklmuagcg25gcrr.png"); background-repeat: no-repeat;' +
'}' +
'.icon-OldPlay {' +
'  background-position: 0px -527px;' +
'}' +
'.icon-NewPlay {' +
//给新版播放器弹窗图标设置CSS
'  background-image: url("http://bbsdata.gztwkadokawa.com/album/201405/28/225839pgklmuagcg25gcrr.png"); background-repeat: no-repeat;' +
'}' +
'.icon-NewPlay {' +
'  background-position: 0px -545px;' +
'}' +
'.icon-ListeningPlay {' +
//给直播间弹窗图标设置CSS
'  background-image: url("http://bbsdata.gztwkadokawa.com/album/201405/28/225839pgklmuagcg25gcrr.png"); background-repeat: no-repeat;' +
'}' +
'.icon-ListeningPlay {' +
'  background-position: 0px -581px;' +
'}');


//将按钮元素添加到"更多"后面

$('#J_trackMore') .after('<a id=J_winopenPlay class=icon-winopenPlay title=弹窗></a>');


//隐藏和显示div

$('.icon-winopenPlay') .click(function (e) {
    $('.track-play-menu') .toggle();
});
$('*') .click(function (event) {
    if (event.target.className != 'icon-winopenPlay') {
        $('.track-play-menu') .hide();
    }
});


//设置div属性及内容

var str = window.location.href;
var listening = /^http:\/\/www\.xiami\.com\/play\?uid=\d+$/.exec(str);
var golistening = /^http:\/\/www\.xiami\.com\/play\?spm=[0.]+\w+&uid=\d+$/.exec(str);
if (str == listening || str == golistening) {
    var divplay = document.createElement('div');
    divplay.id = 'J_trackPlayMenu';
    divplay.className = 'track-play-menu';
    divplay.style.height = '30px';
    divplay.style.display = 'none';
    divplay.innerHTML = '<ul><li><a id=J_ListeningPlay onclick=ListeningPlay(); href=javascript:void(0)>' +
    '<i class=icon-ListeningPlay></i>' +
    '直播间弹窗播放' +
    '</a></li>' +
    '</ul>' +
    '<span class="arrow"></span>' +
    '</div>';
    document.body.insertBefore(divplay, document.body.firstChild);
} else {
    var divplay = document.createElement('div');
    divplay.id = 'J_trackPlayMenu';
    divplay.className = 'track-play-menu';
    divplay.style.height = '60px';
    divplay.style.display = 'none';
    divplay.innerHTML = '<ul><li><a id=J_OldPlay onclick=OldPlay(); href=javascript:void(0)>' +
    '<i class=icon-OldPlay></i>' +
    '旧版弹窗播放' +
    '</a></li><li>' +
    '<a id=J_NewPlay onclick=NewPlay(); href=javascript:void(0)>' +
    '<i class=icon-NewPlay></i>' +
    '新版弹窗播放' +
    '</a></li>' +
    '</ul>' +
    '<span class="arrow"></span>' +
    '</div>';
    document.body.insertBefore(divplay, document.body.firstChild);
};


//设置div的left参数

function divleft() {
    var woPlayright = document.getElementById('J_winopenPlay') .getBoundingClientRect() .right;
    var J_trackPlayMenuleft = woPlayright + 12 + 'px';
    document.getElementById('J_trackPlayMenu') .style.left = J_trackPlayMenuleft;
}
$('#more_icon') .click(divleft());
$(window) .resize(divleft);


//设置弹窗函数

$(document) .ready(function () {
    $('#J_ListeningPlay') .click(function () {
        ListeningPlay = window.open(str, '', 'scrollbars=0,toolbar=0,status=0,location=0,resizable=1,menubar=0');
        ListeningPlay.moveTo(0, 0);
        ListeningPlay.resizeTo(screen.width, screen.height);
        ListeningPlay.location.reload();
        window.open('', '_self', '');
        window.close();
    });
});
$(document) .ready(function () {
    $('#J_OldPlay') .click(function () {
        var palyurl = /\/play\?ids=\/song.*/.exec(str);
        var songurl = 'http://www.xiami.com/song' + palyurl;
        window.open(songurl, '', 'scrollbars=0,toolbar=0,status=0,location=0,resizable=0,menubar=0,width=754,height=557');
        window.open('', '_self', '');
        window.close();
    });
});
$(document) .ready(function () {
    $('#J_NewPlay') .click(function () {
        window.open(str, '', 'scrollbars=0,toolbar=0,status=0,location=0,resizable=1,menubar=0,width=930,height=500');
        window.open('', '_self', '');
        window.close();
    });
});


//防止直播间联动后，出现卡死现象

if (str != listening || str != golistening)
window.onbeforeunload = function () {
    window.location.reload();
}
// 2014.6.10 精选集下拉菜单

// $(".collect-title h3").attr({
	// id : "J_collect-title",
	// style : "cursor:pointer"
// });
// $("#J_collectScrollView").attr("style", "display: none;");
// $("#J_albumCover").attr("style", "display: block;");
// $('#J_collect-title').click(function () {
	// $('#J_collectScrollView').toggle();
	// $('#J_albumCover').toggle();
// });
// $('#J_createCollect').click(function () {
	// var J_collectScrollViewstyle = $('#J_collectScrollView').attr("style");
		// if (J_collectScrollViewstyle == "display: none;") {
				// $('#J_collectScrollView').toggle();
				// $('#J_albumCover').toggle();
		// }
// });

