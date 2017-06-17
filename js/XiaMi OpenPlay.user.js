// ==UserScript==
// @name        XiaMi OpenPlay
// @author      Ai
// @namespace   http://www.xiami.com/u/8154435?spm=0.0.0.0.j2pUVV
// @description This is a beautiful openplay for XiaMi.com
// @include     http://www.xiami.com/play?ids=/song/playlist/id*
// @include     http://www.xiami.com/play
// @include     http://www.xiami.com/play?uid=*
// @include     http://www.xiami.com/play?spm=*
// @version     1.0.0
// @grant       none
// ==/UserScript==

/* 
本脚本由虾米用户@哀个人制作，仅供娱乐，不可用于商业用途。
如有意见或建议的请通过"使用说明"里的方式反馈或提出。
*/

// 调用函数把CSS样式添加到<head>段的 <style>元素中
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


// 设置div属性及内容
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
    '<a id=J_NewPlay href=javascript:void(0)>' +
    '<i class=icon-NewPlay></i>' +
    '取消' +
    '</a></li>' +
    '</ul>' +
    '<span class="arrow"></span>' +
    '</div>';
    document.body.insertBefore(divplay, document.body.firstChild);
};


// 设置div的left参数
function divleft() {
    var woPlayright = document.getElementById('J_trackMore') .getBoundingClientRect() .right;
    var J_trackPlayMenuleft = woPlayright + 12 + 'px';
    document.getElementById('J_trackPlayMenu') .style.left = J_trackPlayMenuleft;
}
$('#more_icon') .click(divleft());
$(window) .resize(divleft);


// 设置弹窗函数
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
		$('.track-play-menu') .hide();
        // window.open(str, '', 'scrollbars=0,toolbar=0,status=0,location=0,resizable=1,menubar=0,width=930,height=500');
        // window.open('', '_self', '');
        // window.close();
    });
});


// 防止直播间联动后，出现卡死现象
if (str != listening || str != golistening)
window.onbeforeunload = function () {
    window.location.reload();
}

