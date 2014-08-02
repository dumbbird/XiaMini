/*! music-player - v0.9.10 build by Kissy-cake 
 * @Author: baoma <nongyoubao@alibaba-inc.com> 
 * Copyright (c) XIAMI 
 */!function(){var a=window,b="undefined";a.XiamiPlayer={player_runing:function(a,b){return!1},player_song_start:function(b,c){var d=a.seiya.eventListener;d&&d.fire("player","start",{currentSong:b,list:c})},player_song_end:function(){var b=a.seiya.eventListener;b&&b.fire("player","end")},player_room_lists:function(a,c){b==typeof c&&(c=0),typeof SEIYA!==b&&SEIYA.addSongs(escape("/song/playlist/id/"+a),3),typeof __PLAYER__!==b&&__PLAYER__.PlayerData.set("passtime",c)},player_room_exit:function(){typeof __PLAYER__!==b&&__PLAYER__.PlayerData.exitRoom()}},a.login_callback=function(c){if(c){typeof __SIDEBAR__!==b&&__SIDEBAR__.Collect.sync(),typeof __USER__!==b&&__USER__.sync(),typeof __OVERLAY__!==b&&__OVERLAY__.destroy();var d=a.seiya.eventListener,e=a.seiya.user;d&&e&&e.room_id?d.fire("popup","enterRoom",e.room_id):d.fire("popup","resetMainNav")}},a.taobaoLogin=function(){var b=-1!==location.href.indexOf("www.xiami.com")?"https://login.xiami.com":"",c=location.href;c=c.split("#")[0],c=encodeURIComponent(c),a.open(b+"/member/login?done="+c+"#taobao","_self")},a.openWind=function(b){var c=(a.screen.height-420)/2,d=(a.screen.width-520)/2;a.open(b,"connect_window","height=420, width=560, toolbar=no, menubar=no, scrollbars=yes, resizable=no,top="+c+",left="+d+", location=no, status=no")},a.sinaLogin=function(){a.openWind("/sina?done")},a.qqLogin=function(){a.openWind("/share/connect/type/qzone?done")},a.onbeforeunload=function(){document.getElementById("J_xiamiPlayerSwf").netclose()}}(KISSY);/*
combined files : 

utils/index/global
page/mods/shortcut
utils/swfobject/index
page/mods/player/player-swfobj
utils/scrollView/scrollViewManage
page/mods/xtpl/lrc-xtpl
page/mods/xtpl/lrcText-xtpl
page/mods/player/player-lrc
utils/base
page/mods/player/player-sale
page/mods/player/player-lister
page/mods/player/player-volume
page/mods/player/player-panel
widget/dialog/index
widget/tool/index
page/mods/player/player-control
page/mods/xtpl/trackItem-xtpl
page/mods/player/player-tracks
utils/blur/stackBlur
page/mods/player/player-blur
page/mods/player/player-anim
page/mods/player/player-data
page/mods/xtpl/itemMenu-xtpl
page/mods/xtpl/otherMenu-xtpl
page/mods/xtpl/pageItem-xtpl
page/mods/xtpl/trackMenu-xtpl
page/mods/xtpl/roamMenu-xtpl
page/mods/player/player-menu
page/mods/xtpl/roamList-xtpl
page/mods/xtpl/roamItem-xtpl
page/mods/player/player-roam
page/mods/player/player-log
utils/dd/plugin/scroll
page/mods/player/player-drag
page/mods/data/center
page/mods/xtpl/trackInfo-xtpl
utils/tip/index
page/mods/xtpl/user-xtpl
page/mods/user
utils/goldlog/index
page/mods/player
page/mods/xtpl/collectItem-xtpl
page/mods/xtpl/favTrackItem-xtpl
page/mods/sidebar/myfav
page/mods/xtpl/collectListItem-xtpl
page/mods/xtpl/collectDetail-xtpl
page/mods/sidebar/collect
page/mods/xtpl/histroyTrackItem-xtpl
page/mods/sidebar/history
page/mods/sidebar
page/mods/player/player-event
page/mods/page
page/mods/xtpl/search-xtpl
page/mods/search
page/mods/main
page/init

*/
/**
 * @fileOverview Sample Util Mod
 * @author abc-team
 */
KISSY.add('utils/index/global',['node'], function(S, require, exports, module) {
    // 在 pages, widget, common  KISSY模块
    // 可以通过 requires 'utils/sample' 引入这个脚本
    var Node = require("node");
    //var PageNotification = require("gallery/pageNotification/1.0/index");
    var $ = Node.all;

    // var PN = new PageNotification({
    // "closeButton": false,
    // "positionClass": "page-notification-top-full-width",
    // "onclick": null,
    // "showDuration": "300",
    // "hideDuration": "300",
    // "timeOut": "3000",
    // "extendedTimeOut": "500",
    // "showEasing": "swing",
    // "hideEasing": "linear",
    // "showMethod": "fadeIn",
    // "hideMethod": "fadeOut"
    // });
    // 
    var ENURI = encodeURIComponent;

    var global = {
        download : function(id, note) {
            var note = note || 0;
            var url = 'http://www.xiami.com/download/pay?id=' + ENURI(id)  + '&rec_note=' + ENURI(note);
            window.open(url);
        },
        //推广的下载单曲
        promotion_download : function (id,type,pid){
            var url = 'http://www.xiami.com/download/pay?id='+ ENURI(id) +'&ptype='+type +'&pid='+pid;
            window.open(url);
        },
        downloadsongs : function(ids, type, pid) {
            var url = 'http://www.xiami.com/download/pay';
            var id = this.getCheckboxValues(ids);
            if (id == '') {
                alert("没有资源可以下载！");
                return;
            }
            var url = url + '?id=' + ENURI(id) + '&ptype='+type +'&pid='+pid;
            window.open(url);
        },
        collect : function(id, note) {
            var note = note || 0;
            var url = '/song/collect/id/' + ENURI(id) + '?rec_note=' + ENURI(note);
            this.showDialog(url);
        },
        collects : function(name) {
            var ids = this.getCheckboxValues(name);
            if (ids == '') {
                alert("请先选择歌曲!");
                return;
            }
            var url = '/song/collects/ids/' + ENURI(ids);
            this.showDialog(url);
        },
        recommend : function(a, b, note) {
            var note = note || 0;
            var c = "/recommend/post";
            c = c + "?object_id=" + ENURI(a) + "&type=" + ENURI(b) + '&rec_note=' + ENURI(note);
            this.showDialog(c);
        },
        playcollect : function(id) {
            var self = this;
            self.addSongs(escape("/song/playlist/id/" + id + "/type/3"), 1);
        },
        sendMobile : function(id, note) {
            var note = note || 0;
            var url = "/music/send/id/" + ENURI(id)  + '?rec_note=' + ENURI(note);
            this.showDialog(url);
        },
        showDialog : function(url) {
            //var url = 'http://www.xiami.com' + url;
            window.showDialog(url);
        },
        addAndPlay : function(id, type_name, type_id) {
            var self = this;
            if (! type_name)
                type_name = 'default';
            if (! type_id)
                type_id = 0;
            self.addSongs(escape("/song/playlist/id/" + id + "/object_name/" + type_name + "/object_id/" + type_id), 1);
        },
        thenplayIds : function(name, type_name, type_id) {
            var self = this;
            var ids = this.getCheckboxValues(name);
            //console.log(ids)
            if (ids == '') {
                alert("没有歌曲可以播放!");
                return;
            };
            if (! type_name)
                type_name = 'default';
            if (! type_id)
                type_id = 0;
            self.addSongs(escape("/song/playlist/id/" + ids + "/object_name/" + type_name + "/object_id/" + type_id), 2);
        },
        thenplay : function(id, type_name, type_id) {
            var self = this;
            if (! type_name)
                type_name = 'default';
            if (! type_id)
                type_id = 0;
            self.addSongs(escape("/song/playlist/id/" + id + "/object_name/" + type_name + "/object_id/" + type_id), 2);
        },
        play : function(id, type_name, type_id) {
            var self = this;
            if (! type_name)
                type_name = 'default';
            if (! type_id)
                type_id = 0;
            self.addSongs(escape("/song/playlist/id/" + id + "/object_name/" + type_name + "/object_id/" + type_id));
        },
        addPlayalbum : function(album_id) {
            this.addSongs(escape('/song/playlist/id/' + album_id + '/type/1'), 1);
        },
        playalbum : function(album_id) {
            this.addSongs(escape('/song/playlist/id/' + album_id + '/type/1'));
        },
        addSongs : function(url, atPlay) {
            if (! atPlay) {
                atPlay = 0;
            };
            try {
                document.getElementById("J_xiamiPlayerSwf").jsAddSongs(url, atPlay);
            } catch(e) {
                throw new Error("jsAddSongs not function");
            }
        },
        addPlaySongs : function(name, type_name, type_id) {
            var self = this;
            var ids = this.getCheckboxDefaultValues(name);
            if (ids == '') {
                alert("没有歌曲可以播放!");
                return;
            }
            if (! type_name)
                type_name = 'default';
            if (! type_id)
                type_id = 0;
            self.addSongs(escape("/song/playlist/id/" + ids + "/object_name/" + type_name + "/object_id/" + type_id), 1);
        },
        playAllSongs : function(name, type_name, type_id) {
            var self = this;
            var ids = this.getCheckboxValues(name);
            if (ids == '') {
                alert("没有歌曲可以播放!");
                return;
            }
            if (! type_name)
                type_name = 'default';
            if (! type_id)
                type_id = 0;
            self.addSongs(escape("/song/playlist/id/" + ids + "/object_name/" + type_name + "/object_id/" + type_id), 1);
        },
        getCheckboxDefaultValues : function(name) {
            var sValue = [];
            var inputArr = $('input[name=' + name + ']:enabled');
            var len = inputArr.length;
            for( var i = 0; i < len; i++ ) {
                var item = inputArr[i];
                if (! item.disabled) {
                    sValue.push(item.value);
                }
            }
            return sValue.join(",");
        },
        getCheckboxValues : function(name) {
            var sValue = [];
            var inputArr = $('input[name=' + name + ']:checked');
            var len = inputArr.length;
            for( var i = 0; i < len; i++ ) {
                var item = inputArr[i];
                if (! item.disabled) {
                    sValue.push(item.value);
                }
            }
            return sValue.join(",");
        },
        syncCheck : function(elem, name) {
            var traget = $(elem);
            var flag = traget.prop("checked");
            $("input[name=" + name + "]:enabled").prop("checked", flag);
        },
        inverse : ( function() {
                var inverseObj = {};
                function a(name) {
                    if (inverseObj[name]) {
                        inverseObj[name] += 1;
                    } else {
                        inverseObj[name] = 1;
                    }
                    return inverseObj[name] % 2;
                };
                return function(name) {
                    var flag = a(name);
                    $("input[name=" + name + "]:enabled").prop("checked", ! ! flag);
                };
            }()),
        /**
         * 生成虾米播播
         * @param {Object} checkname
         */
        makeBoboWidget : function(ids, note) {
            var note = note || 0;
            window.open('http://www.xiami.com/widget/isingle?sid=' + ids + '&rec_note=' + ENURI(note) );
        },
        makeMultiWidget : function(checkname) {
            var ids = this.getCheckboxValues(checkname);
            if (ids == '') {
                alert("请先选择歌曲!");
                return;
            }
            window.open('http://www.xiami.com/widget/imulti?sid=' + ids);
        },
        playerUploadlyric : function(sid) {
            var url = 'http://www.xiami.com/wiki/addlyric/id/' + sid;
            window.open(url, "_blank");
        }
    };

    module.exports = global;
});

/*
 * @author noyobo
 * @mail nongyoubao@alibaba-inc.com
 * @description 快捷键
 */
KISSY.add('page/mods/shortcut',['event', 'base'], function(S, require, exports, module){
    var Event = require("event"),
        Base = require("base");
    
    var shortcutExtension = {
        initializer : function(){
            var self = this;
            self._opLock = null;
            Event.on(document, "keydown", function(event){
                var tagName = event.target.tagName.toLowerCase();
                //S.log([tagName, tagName != "input"]);
                if(tagName != "input" && tagName != "textarea" && tagName != "select"){
                    var code = event.which || event.keyCode ;
                    
                    switch(code){
                        case 32:
                            self.trigget("space");
                            break;
                        case 37:
                            self.trigget("left");
                            break;
                        case 38:
                            self.trigget("up");
                            break;
                        case 39:
                            self.trigget("right");
                            break;
                        case 40:
                            self.trigget("down");
                            break;
                    }
                };
            });
        },
        trigget : function(name){
            var self = this;
            var name = name;
            self._opLock && self._opLock.cancel();
            self._opLock = S.later(function(val){
                self.fire(val);
            }, 200, false, null, name);
        }
    };
    
    module.exports =  Base.extend(shortcutExtension);
});

KISSY.add('utils/swfobject/index',function(S){
    /*!    SWFObject v2.3.20130521 <http://github.com/swfobject/swfobject>
    is released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
*/
/*!    SWFObject v2.3.20130521 <http://github.com/swfobject/swfobject>
    is released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
*/

/* global ActiveXObject: false */

var swfobject = function () {

    var UNDEF = "undefined",
        OBJECT = "object",
        SHOCKWAVE_FLASH = "Shockwave Flash",
        SHOCKWAVE_FLASH_AX = "ShockwaveFlash.ShockwaveFlash",
        FLASH_MIME_TYPE = "application/x-shockwave-flash",
        EXPRESS_INSTALL_ID = "SWFObjectExprInst",
        ON_READY_STATE_CHANGE = "onreadystatechange",

        win = window,
        doc = document,
        nav = navigator,

        plugin = false,
        domLoadFnArr = [],
        regObjArr = [],
        objIdArr = [],
        listenersArr = [],
        storedFbContent,
        storedFbContentId,
        storedCallbackFn,
        storedCallbackObj,
        isDomLoaded = false,
        isExpressInstallActive = false,
        dynamicStylesheet,
        dynamicStylesheetMedia,
        autoHideShow = true,
        encodeURIEnabled = false,

    /* Centralized function for browser feature detection
        - User agent string detection is only used when no good alternative is possible
        - Is executed directly for optimal performance
    */
    ua = function () {
        var w3cdom = typeof doc.getElementById !== UNDEF && typeof doc.getElementsByTagName !== UNDEF && typeof doc.createElement !== UNDEF,
            u = nav.userAgent.toLowerCase(),
            p = nav.platform.toLowerCase(),
            windows = p ? /win/.test(p) : /win/.test(u),
            mac = p ? /mac/.test(p) : /mac/.test(u),
            webkit = /webkit/.test(u) ? parseFloat(u.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : false, // returns either the webkit version or false if not webkit
            ie = nav.appName === "Microsoft Internet Explorer",
            playerVersion = [0, 0, 0],
            d = null;
        if (typeof nav.plugins !== UNDEF && typeof nav.plugins[SHOCKWAVE_FLASH] === OBJECT) {
            d = nav.plugins[SHOCKWAVE_FLASH].description;
            // nav.mimeTypes["application/x-shockwave-flash"].enabledPlugin indicates whether plug-ins are enabled or disabled in Safari 3+
            if (d && (typeof nav.mimeTypes !== UNDEF && nav.mimeTypes[FLASH_MIME_TYPE] && nav.mimeTypes[FLASH_MIME_TYPE].enabledPlugin)) {
                plugin = true;
                ie = false; // cascaded feature detection for Internet Explorer
                d = d.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
                playerVersion[0] = toInt(d.replace(/^(.*)\..*$/, "$1"));
                playerVersion[1] = toInt(d.replace(/^.*\.(.*)\s.*$/, "$1"));
                playerVersion[2] = /[a-zA-Z]/.test(d) ? toInt(d.replace(/^.*[a-zA-Z]+(.*)$/, "$1")) : 0;
            }
        }
        else if (typeof win.ActiveXObject !== UNDEF) {
            try {
                var a = new win.ActiveXObject(SHOCKWAVE_FLASH_AX);
                if (a) { // a will return null when ActiveX is disabled
                    d = a.GetVariable("$version");
                    if (d) {
                        ie = true; // cascaded feature detection for Internet Explorer
                        d = d.split(" ")[1].split(",");
                        playerVersion = [toInt(d[0]), toInt(d[1]), toInt(d[2])];
                    }
                }
            }
            catch (e) {}
        }else{ // IE 11 ActiveXObject == undefined
        	try {
                var a = new win.ActiveXObject(SHOCKWAVE_FLASH_AX);
                if (a) { // a will return null when ActiveX is disabled
                    d = a.GetVariable("$version");
                    if (d) {
                        d = d.split(" ")[1].split(",");
                        playerVersion = [toInt(d[0]), toInt(d[1]), toInt(d[2])];
                    }
                }
            }
            catch (e) {}
        }
        return {w3: w3cdom, pv: playerVersion, wk: webkit, ie: ie, win: windows, mac: mac};
    }(),

    /* Cross-browser onDomLoad
        - Will fire an event as soon as the DOM of a web page is loaded
        - Internet Explorer workaround based on Diego Perini's solution: http://javascript.nwbox.com/IEContentLoaded/
        - Regular onload serves as fallback
    */
    onDomLoad = function () {
        if (!ua.w3) { return; }
        if ((typeof doc.readyState !== UNDEF && (doc.readyState === "complete" || doc.readyState === "interactive")) || (typeof doc.readyState === UNDEF && (doc.getElementsByTagName("body")[0] || doc.body))) { // function is fired after onload, e.g. when script is inserted dynamically
            callDomLoadFunctions();
        }
        if (!isDomLoaded) {
            if (typeof doc.addEventListener !== UNDEF) {
                doc.addEventListener("DOMContentLoaded", callDomLoadFunctions, false);
            }
            if (ua.ie) {
                doc.attachEvent(ON_READY_STATE_CHANGE, function detach() {
                    if (doc.readyState === "complete") {
                        doc.detachEvent(ON_READY_STATE_CHANGE, detach);
                        callDomLoadFunctions();
                    }
                });
                if (win == top) { // if not inside an iframe
                    (function checkDomLoadedIE() {
                        if (isDomLoaded) { return; }
                        try {
                            doc.documentElement.doScroll("left");
                        }
                        catch (e) {
                            setTimeout(checkDomLoadedIE, 0);
                            return;
                        }
                        callDomLoadFunctions();
                    }());
                }
            }
            if (ua.wk) {
                (function checkDomLoadedWK() {
                    if (isDomLoaded) { return; }
                    if (!/loaded|complete/.test(doc.readyState)) {
                        setTimeout(checkDomLoadedWK, 0);
                        return;
                    }
                    callDomLoadFunctions();
                }());
            }
        }
    }();

    function callDomLoadFunctions() {
        if (isDomLoaded || !document.getElementsByTagName("body")[0]) { return; }
        try { // test if we can really add/remove elements to/from the DOM; we don't want to fire it too early
            var t, span = createElement("span");
            span.style.display = "none"; //hide the span in case someone has styled spans via CSS
            t = doc.getElementsByTagName("body")[0].appendChild(span);
            t.parentNode.removeChild(t);
            t = null; //clear the variables
            span = null;
        }
        catch (e) { return; }
        isDomLoaded = true;
        var dl = domLoadFnArr.length;
        for (var i = 0; i < dl; i++) {
            domLoadFnArr[i]();
        }
    }

    function addDomLoadEvent(fn) {
        if (isDomLoaded) {
            fn();
        }
        else {
            domLoadFnArr[domLoadFnArr.length] = fn; // Array.push() is only available in IE5.5+
        }
    }

    /* Cross-browser onload
        - Based on James Edwards' solution: http://brothercake.com/site/resources/scripts/onload/
        - Will fire an event as soon as a web page including all of its assets are loaded
     */
    function addLoadEvent(fn) {
        if (typeof win.addEventListener !== UNDEF) {
            win.addEventListener("load", fn, false);
        }
        else if (typeof doc.addEventListener !== UNDEF) {
            doc.addEventListener("load", fn, false);
        }
        else if (typeof win.attachEvent !== UNDEF) {
            addListener(win, "onload", fn);
        }
        else if (typeof win.onload === "function") {
            var fnOld = win.onload;
            win.onload = function () {
                fnOld();
                fn();
            };
        }
        else {
            win.onload = fn;
        }
    }

    /* Detect the Flash Player version for non-Internet Explorer browsers
        - Detecting the plug-in version via the object element is more precise than using the plugins collection item's description:
          a. Both release and build numbers can be detected
          b. Avoid wrong descriptions by corrupt installers provided by Adobe
          c. Avoid wrong descriptions by multiple Flash Player entries in the plugin Array, caused by incorrect browser imports
        - Disadvantage of this method is that it depends on the availability of the DOM, while the plugins collection is immediately available
    */
    function testPlayerVersion() {
        var b = doc.getElementsByTagName("body")[0];
        var o = createElement(OBJECT);
        o.setAttribute("style", "visibility: hidden;");
        o.setAttribute("type", FLASH_MIME_TYPE);
        var t = b.appendChild(o);
        if (t) {
            var counter = 0;
            (function checkGetVariable() {
                if (typeof t.GetVariable !== UNDEF) {
                    try {
                        var d = t.GetVariable("$version");
                        if (d) {
                            d = d.split(" ")[1].split(",");
                            ua.pv = [toInt(d[0]), toInt(d[1]), toInt(d[2])];
                        }
                    } catch (e) {
                        //t.GetVariable("$version") is known to fail in Flash Player 8 on Firefox
                        //If this error is encountered, assume FP8 or lower. Time to upgrade.
                        ua.pv = [8, 0, 0];
                    }
                }
                else if (counter < 10) {
                    counter++;
                    setTimeout(checkGetVariable, 10);
                    return;
                }
                b.removeChild(o);
                t = null;
                matchVersions();
            }());
        }
        else {
            matchVersions();
        }
    }

    /* Perform Flash Player and SWF version matching; static publishing only
    */
    function matchVersions() {
        var rl = regObjArr.length;
        if (rl > 0) {
            for (var i = 0; i < rl; i++) { // for each registered object element
                var id = regObjArr[i].id;
                var cb = regObjArr[i].callbackFn;
                var cbObj = {success: false, id: id};
                if (ua.pv[0] > 0) {
                    var obj = getElementById(id);
                    if (obj) {
                        if (hasPlayerVersion(regObjArr[i].swfVersion) && !(ua.wk && ua.wk < 312)) { // Flash Player version >= published SWF version: Houston, we have a match!
                            setVisibility(id, true);
                            if (cb) {
                                cbObj.success = true;
                                cbObj.ref = getObjectById(id);
                                cbObj.id = id;
                                cb(cbObj);
                            }
                        }
                        else if (regObjArr[i].expressInstall && canExpressInstall()) { // show the Adobe Express Install dialog if set by the web page author and if supported
                            var att = {};
                            att.data = regObjArr[i].expressInstall;
                            att.width = obj.getAttribute("width") || "0";
                            att.height = obj.getAttribute("height") || "0";
                            if (obj.getAttribute("class")) { att.styleclass = obj.getAttribute("class"); }
                            if (obj.getAttribute("align")) { att.align = obj.getAttribute("align"); }
                            // parse HTML object param element's name-value pairs
                            var par = {};
                            var p = obj.getElementsByTagName("param");
                            var pl = p.length;
                            for (var j = 0; j < pl; j++) {
                                if (p[j].getAttribute("name").toLowerCase() !== "movie") {
                                    par[p[j].getAttribute("name")] = p[j].getAttribute("value");
                                }
                            }
                            showExpressInstall(att, par, id, cb);
                        }
                        else { // Flash Player and SWF version mismatch or an older Webkit engine that ignores the HTML object element's nested param elements: display fallback content instead of SWF
                            displayFbContent(obj);
                            if (cb) { cb(cbObj); }
                        }
                    }
                }
                else { // if no Flash Player is installed or the fp version cannot be detected we let the HTML object element do its job (either show a SWF or fallback content)
                    setVisibility(id, true);
                    if (cb) {
                        var o = getObjectById(id); // test whether there is an HTML object element or not
                        if (o && typeof o.SetVariable !== UNDEF) {
                            cbObj.success = true;
                            cbObj.ref = o;
                            cbObj.id = o.id;
                        }
                        cb(cbObj);
                    }
                }
            }
        }
    }

    /* Main function
        - Will preferably execute onDomLoad, otherwise onload (as a fallback)
    */
    domLoadFnArr[0] = function () {
        if (plugin) {
            testPlayerVersion();
        }
        else {
            matchVersions();
        }
    };

    function getObjectById(objectIdStr) {
        var r = null,
            o = getElementById(objectIdStr);

        if (o && o.nodeName.toUpperCase() === "OBJECT") {
            //If targeted object is valid Flash file
            if (typeof o.SetVariable !== UNDEF) {
                r = o;
            } else {
                //If SetVariable is not working on targeted object but a nested object is
                //available, assume classic nested object markup. Return nested object.

                //If SetVariable is not working on targeted object and there is no nested object,
                //return the original object anyway. This is probably new simplified markup.

                r = o.getElementsByTagName(OBJECT)[0] || o;
            }
        }

        return r;
    }

    /* Requirements for Adobe Express Install
        - only one instance can be active at a time
        - fp 6.0.65 or higher
        - Win/Mac OS only
        - no Webkit engines older than version 312
    */
    function canExpressInstall() {
        return !isExpressInstallActive && hasPlayerVersion("6.0.65") && (ua.win || ua.mac) && !(ua.wk && ua.wk < 312);
    }

    /* Show the Adobe Express Install dialog
        - Reference: http://www.adobe.com/cfusion/knowledgebase/index.cfm?id=6a253b75
    */
    function showExpressInstall(att, par, replaceElemIdStr, callbackFn) {

        var obj = getElementById(replaceElemIdStr);

        //Ensure that replaceElemIdStr is really a string and not an element
        replaceElemIdStr = getId(replaceElemIdStr);

        isExpressInstallActive = true;
        storedCallbackFn = callbackFn || null;
        storedCallbackObj = {success: false, id: replaceElemIdStr};

        if (obj) {
            if (obj.nodeName.toUpperCase() === "OBJECT") { // static publishing
                storedFbContent = abstractFbContent(obj);
                storedFbContentId = null;
            }
            else { // dynamic publishing
                storedFbContent = obj;
                storedFbContentId = replaceElemIdStr;
            }
            att.id = EXPRESS_INSTALL_ID;
            if (typeof att.width === UNDEF || (!/%$/.test(att.width) && toInt(att.width) < 310)) { att.width = "310"; }
            if (typeof att.height === UNDEF || (!/%$/.test(att.height) && toInt(att.height) < 137)) { att.height = "137"; }
            var pt = ua.ie ? "ActiveX" : "PlugIn",
                fv = "MMredirectURL=" + encodeURIComponent(win.location.toString().replace(/&/g, "%26")) + "&MMplayerType=" + pt + "&MMdoctitle=" + encodeURIComponent(doc.title.slice(0, 47) + " - Flash Player Installation");
            if (typeof par.flashvars !== UNDEF) {
                par.flashvars += "&" + fv;
            }
            else {
                par.flashvars = fv;
            }
            // IE only: when a SWF is loading (AND: not available in cache) wait for the readyState of the object element to become 4 before removing it,
            // because you cannot properly cancel a loading SWF file without breaking browser load references, also obj.onreadystatechange doesn't work
            if (ua.ie && obj.readyState != 4) {
                var newObj = createElement("div");
                replaceElemIdStr += "SWFObjectNew";
                newObj.setAttribute("id", replaceElemIdStr);
                obj.parentNode.insertBefore(newObj, obj); // insert placeholder div that will be replaced by the object element that loads expressinstall.swf
                obj.style.display = "none";
                removeSWF(obj); //removeSWF accepts elements now
            }
            createSWF(att, par, replaceElemIdStr);
        }
    }

    /* Functions to abstract and display fallback content
    */
    function displayFbContent(obj) {
        if (ua.ie && obj.readyState != 4) {
            // IE only: when a SWF is loading (AND: not available in cache) wait for the readyState of the object element to become 4 before removing it,
            // because you cannot properly cancel a loading SWF file without breaking browser load references, also obj.onreadystatechange doesn't work
            obj.style.display = "none";
            var el = createElement("div");
            obj.parentNode.insertBefore(el, obj); // insert placeholder div that will be replaced by the fallback content
            el.parentNode.replaceChild(abstractFbContent(obj), el);
            removeSWF(obj); //removeSWF accepts elements now
        }
        else {
            obj.parentNode.replaceChild(abstractFbContent(obj), obj);
        }
    }

    function abstractFbContent(obj) {
        var ac = createElement("div");
        if (ua.win && ua.ie) {
            ac.innerHTML = obj.innerHTML;
        }
        else {
            var nestedObj = obj.getElementsByTagName(OBJECT)[0];
            if (nestedObj) {
                var c = nestedObj.childNodes;
                if (c) {
                    var cl = c.length;
                    for (var i = 0; i < cl; i++) {
                        if (!(c[i].nodeType == 1 && c[i].nodeName === "PARAM") && !(c[i].nodeType == 8)) {
                            ac.appendChild(c[i].cloneNode(true));
                        }
                    }
                }
            }
        }
        return ac;
    }

    function createIeObject(url, paramStr) {
        var div = createElement("div");
        div.innerHTML = "<object classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000'><param name='movie' value='" + url + "'>" + paramStr + "</object>";
        return div.firstChild;
    }

    /* Cross-browser dynamic SWF creation
    */
    function createSWF(attObj, parObj, id) {
        var r, el = getElementById(id);
        id = getId(id); // ensure id is truly an ID and not an element

        if (ua.wk && ua.wk < 312) { return r; }

        if (el) {
            var o = (ua.ie) ? createElement("div") : createElement(OBJECT),
                attr,
                attrLower,
                param;

            if (typeof attObj.id === UNDEF) { // if no 'id' is defined for the object element, it will inherit the 'id' from the fallback content
                attObj.id = id;
            }

            //Add params
            for (param in parObj) {
                //filter out prototype additions from other potential libraries and IE specific param element
                if (parObj.hasOwnProperty(param) && param.toLowerCase() !== "movie") {
                    createObjParam(o, param, parObj[param]);
                }
            }

            //Create IE object, complete with param nodes
            if (ua.ie) { o = createIeObject(attObj.data, o.innerHTML); }

            //Add attributes to object
            for (attr in attObj) {
                if (attObj.hasOwnProperty(attr)) { // filter out prototype additions from other potential libraries
                    attrLower = attr.toLowerCase();

                    // 'class' is an ECMA4 reserved keyword
                    if (attrLower === "styleclass") {
                        o.setAttribute("class", attObj[attr]);
                    } else if (attrLower !== "classid" && attrLower !== "data") {
                        o.setAttribute(attr, attObj[attr]);
                    }
                }
            }

            if (ua.ie) {
                objIdArr[objIdArr.length] = attObj.id; // stored to fix object 'leaks' on unload (dynamic publishing only)
            } else {
                o.setAttribute("type", FLASH_MIME_TYPE);
                o.setAttribute("data", attObj.data);
            }

            el.parentNode.replaceChild(o, el);
            r = o;
        }

        return r;
    }

    function createObjParam(el, pName, pValue) {
        var p = createElement("param");
        p.setAttribute("name", pName);
        p.setAttribute("value", pValue);
        el.appendChild(p);
    }

    /* Cross-browser SWF removal
        - Especially needed to safely and completely remove a SWF in Internet Explorer
    */
    function removeSWF(id) {
        var obj = getElementById(id);
        if (obj && obj.nodeName.toUpperCase() === "OBJECT") {
            if (ua.ie) {
                obj.style.display = "none";
                (function removeSWFInIE() {
                    if (obj.readyState == 4) {
                        //This step prevents memory leaks in Internet Explorer
                        for (var i in obj) {
                            if (typeof obj[i] === "function") {
                                obj[i] = null;
                            }
                        }
                        obj.parentNode.removeChild(obj);
                    } else {
                        setTimeout(removeSWFInIE, 10);
                    }
                }());
            }
            else {
                obj.parentNode.removeChild(obj);
            }
        }
    }

    function isElement(id) {
        return (id && id.nodeType && id.nodeType === 1);
    }

    function getId(thing) {
        return (isElement(thing)) ? thing.id : thing;
    }

    /* Functions to optimize JavaScript compression
    */
    function getElementById(id) {

        //Allow users to pass an element OR an element's ID
        if (isElement(id)) { return id; }

        var el = null;
        try {
            el = doc.getElementById(id);
        }
        catch (e) {}
        return el;
    }

    function createElement(el) {
        return doc.createElement(el);
    }

    //To aid compression; replaces 14 instances of pareseInt with radix
    function toInt(str) {
        return parseInt(str, 10);
    }

    /* Updated attachEvent function for Internet Explorer
        - Stores attachEvent information in an Array, so on unload the detachEvent functions can be called to avoid memory leaks
    */
    function addListener(target, eventType, fn) {
        target.attachEvent(eventType, fn);
        listenersArr[listenersArr.length] = [target, eventType, fn];
    }

    /* Flash Player and SWF content version matching
    */
    function hasPlayerVersion(rv) {
        rv += ""; //Coerce number to string, if needed.
        var pv = ua.pv, v = rv.split(".");
        v[0] = toInt(v[0]);
        v[1] = toInt(v[1]) || 0; // supports short notation, e.g. "9" instead of "9.0.0"
        v[2] = toInt(v[2]) || 0;
        return (pv[0] > v[0] || (pv[0] == v[0] && pv[1] > v[1]) || (pv[0] == v[0] && pv[1] == v[1] && pv[2] >= v[2])) ? true : false;
    }

    /* Cross-browser dynamic CSS creation
        - Based on Bobby van der Sluis' solution: http://www.bobbyvandersluis.com/articles/dynamicCSS.php
    */
    function createCSS(sel, decl, media, newStyle) {
        var h = doc.getElementsByTagName("head")[0];
        if (!h) { return; } // to also support badly authored HTML pages that lack a head element
        var m = (typeof media === "string") ? media : "screen";
        if (newStyle) {
            dynamicStylesheet = null;
            dynamicStylesheetMedia = null;
        }
        if (!dynamicStylesheet || dynamicStylesheetMedia != m) {
            // create dynamic stylesheet + get a global reference to it
            var s = createElement("style");
            s.setAttribute("type", "text/css");
            s.setAttribute("media", m);
            dynamicStylesheet = h.appendChild(s);
            if (ua.ie && typeof doc.styleSheets !== UNDEF && doc.styleSheets.length > 0) {
                dynamicStylesheet = doc.styleSheets[doc.styleSheets.length - 1];
            }
            dynamicStylesheetMedia = m;
        }
        // add style rule
        if (dynamicStylesheet) {
            if (typeof dynamicStylesheet.addRule !== UNDEF) {
                dynamicStylesheet.addRule(sel, decl);
            } else if (typeof doc.createTextNode !== UNDEF) {
                dynamicStylesheet.appendChild(doc.createTextNode(sel + " {" + decl + "}"));
            }
        }
    }

    function setVisibility(id, isVisible) {
        if (!autoHideShow) { return; }
        var v = isVisible ? "visible" : "hidden",
            el = getElementById(id);
        if (isDomLoaded && el) {
            el.style.visibility = v;
        } else if (typeof id === "string") {
            createCSS("#" + id, "visibility:" + v);
        }
    }

    /* Filter to avoid XSS attacks
    */
    function urlEncodeIfNecessary(s) {
        var regex = /[\\\"<>\.;]/;
        var hasBadChars = regex.exec(s) !== null;
        return hasBadChars && typeof encodeURIComponent !== UNDEF ? encodeURIComponent(s) : s;
    }

    /* Release memory to avoid memory leaks caused by closures, fix hanging audio/video threads and force open sockets/NetConnections to disconnect (Internet Explorer only)
    */
    var cleanup = function () {
        if (ua.ie) {
            window.attachEvent("onunload", function () {
                // remove listeners to avoid memory leaks
                var ll = listenersArr.length;
                for (var i = 0; i < ll; i++) {
                    listenersArr[i][0].detachEvent(listenersArr[i][1], listenersArr[i][2]);
                }
                // cleanup dynamically embedded objects to fix audio/video threads and force open sockets and NetConnections to disconnect
                var il = objIdArr.length;
                for (var j = 0; j < il; j++) {
                    removeSWF(objIdArr[j]);
                }
                // cleanup library's main closures to avoid memory leaks
                for (var k in ua) {
                    ua[k] = null;
                }
                ua = null;
                for (var l in swfobject) {
                    swfobject[l] = null;
                }
                swfobject = null;
            });
        }
    }();

    return {
        /* Public API
            - Reference: http://code.google.com/p/swfobject/wiki/documentation
        */
        registerObject: function (objectIdStr, swfVersionStr, xiSwfUrlStr, callbackFn) {
            if (ua.w3 && objectIdStr && swfVersionStr) {
                var regObj = {};
                regObj.id = objectIdStr;
                regObj.swfVersion = swfVersionStr;
                regObj.expressInstall = xiSwfUrlStr;
                regObj.callbackFn = callbackFn;
                regObjArr[regObjArr.length] = regObj;
                setVisibility(objectIdStr, false);
            }
            else if (callbackFn) {
                callbackFn({success: false, id: objectIdStr});
            }
        },

        getObjectById: function (objectIdStr) {
            if (ua.w3) {
                return getObjectById(objectIdStr);
            }
        },

        embedSWF: function (swfUrlStr, replaceElemIdStr, widthStr, heightStr, swfVersionStr, xiSwfUrlStr, flashvarsObj, parObj, attObj, callbackFn) {

            var id = getId(replaceElemIdStr),
                callbackObj = {success: false, id: id};

            if (ua.w3 && !(ua.wk && ua.wk < 312) && swfUrlStr && replaceElemIdStr && widthStr && heightStr && swfVersionStr) {
                setVisibility(id, false);
                addDomLoadEvent(function () {
                    widthStr += ""; // auto-convert to string
                    heightStr += "";
                    var att = {};
                    if (attObj && typeof attObj === OBJECT) {
                        for (var i in attObj) { // copy object to avoid the use of references, because web authors often reuse attObj for multiple SWFs
                            att[i] = attObj[i];
                        }
                    }
                    att.data = swfUrlStr;
                    att.width = widthStr;
                    att.height = heightStr;
                    var par = {};
                    if (parObj && typeof parObj === OBJECT) {
                        for (var j in parObj) { // copy object to avoid the use of references, because web authors often reuse parObj for multiple SWFs
                            par[j] = parObj[j];
                        }
                    }
                    if (flashvarsObj && typeof flashvarsObj === OBJECT) {
                        for (var k in flashvarsObj) { // copy object to avoid the use of references, because web authors often reuse flashvarsObj for multiple SWFs
                            if (flashvarsObj.hasOwnProperty(k)) {

                                var key = (encodeURIEnabled) ? encodeURIComponent(k) : k,
                                    value = (encodeURIEnabled) ? encodeURIComponent(flashvarsObj[k]) : flashvarsObj[k];

                                if (typeof par.flashvars !== UNDEF) {
                                    par.flashvars += "&" + key + "=" + value;
                                }
                                else {
                                    par.flashvars = key + "=" + value;
                                }

                            }
                        }
                    }
                    if (hasPlayerVersion(swfVersionStr)) { // create SWF
                        var obj = createSWF(att, par, replaceElemIdStr);
                        if (att.id == id) {
                            setVisibility(id, true);
                        }
                        callbackObj.success = true;
                        callbackObj.ref = obj;
                        callbackObj.id = obj.id;
                    }
                    else if (xiSwfUrlStr && canExpressInstall()) { // show Adobe Express Install
                        att.data = xiSwfUrlStr;
                        showExpressInstall(att, par, replaceElemIdStr, callbackFn);
                        return;
                    }
                    else { // show fallback content
                        setVisibility(id, true);
                    }
                    if (callbackFn) { callbackFn(callbackObj); }
                });
            }
            else if (callbackFn) { callbackFn(callbackObj); }
        },

        switchOffAutoHideShow: function () {
            autoHideShow = false;
        },

        enableUriEncoding: function (bool) {
            encodeURIEnabled = (typeof bool === UNDEF) ? true : bool;
        },

        ua: ua,

        getFlashPlayerVersion: function () {
            return {major: ua.pv[0], minor: ua.pv[1], release: ua.pv[2]};
        },

        hasFlashPlayerVersion: hasPlayerVersion,

        createSWF: function (attObj, parObj, replaceElemIdStr) {
            if (ua.w3) {
                return createSWF(attObj, parObj, replaceElemIdStr);
            }
            else {
                return undefined;
            }
        },

        showExpressInstall: function (att, par, replaceElemIdStr, callbackFn) {
            if (ua.w3 && canExpressInstall()) {
                showExpressInstall(att, par, replaceElemIdStr, callbackFn);
            }
        },

        removeSWF: function (objElemIdStr) {
            if (ua.w3) {
                removeSWF(objElemIdStr);
            }
        },

        createCSS: function (selStr, declStr, mediaStr, newStyleBoolean) {
            if (ua.w3) {
                createCSS(selStr, declStr, mediaStr, newStyleBoolean);
            }
        },

        addDomLoadEvent: addDomLoadEvent,

        addLoadEvent: addLoadEvent,

        getQueryParamValue: function (param) {
            var q = doc.location.search || doc.location.hash;
            if (q) {
                if (/\?/.test(q)) { q = q.split("?")[1]; } // strip question mark
                if (!param) {
                    return urlEncodeIfNecessary(q);
                }
                var pairs = q.split("&");
                for (var i = 0; i < pairs.length; i++) {
                    if (pairs[i].substring(0, pairs[i].indexOf("=")) == param) {
                        return urlEncodeIfNecessary(pairs[i].substring((pairs[i].indexOf("=") + 1)));
                    }
                }
            }
            return "";
        },

        // For internal usage only
        expressInstallCallback: function () {
            if (isExpressInstallActive) {
                var obj = getElementById(EXPRESS_INSTALL_ID);
                if (obj && storedFbContent) {
                    obj.parentNode.replaceChild(storedFbContent, obj);
                    if (storedFbContentId) {
                        setVisibility(storedFbContentId, true);
                        if (ua.ie) { storedFbContent.style.display = "block"; }
                    }
                    if (storedCallbackFn) { storedCallbackFn(storedCallbackObj); }
                }
                isExpressInstallActive = false;
            }
        },

        version: "2.3"

    };
}();

return swfobject;
});

/**
 * @author noyodo
 * @description 播放器核心. 只接受控制
 */
KISSY.add('page/mods/player/player-swfobj',['utils/swfobject/index', 'swf'], function(S, require, exports, module) {

    var Swfobject = require("utils/swfobject/index");
    var SWF = require("swf");

    function player(config) {
        this._swf = null;

        this.option = {
            src: "swf",
            attrs: {
                width: 1,
                height: 1,
                id: "J_xiamiPlayerSwf"
            },
            params: {
                allowScriptAccess: "always",
                wmode: "opaque"
                //,flashVars
            },
            render: "#J_xiamiPlayer",
            version: "9.0"
        };

        S.mix(this.option, config, undefined, undefined, true);

        this.init();
    };

    player.prototype = {
        init: function() {
            var self = this;
            self._swf = {};
            var op = self.option;
            var attributes = {
                "id": op.attrs.id,
                "name": op.attrs.id
            };
            var flashVars = op.params.flashVars;
            delete op.params.flashVars;
            Swfobject.embedSWF(op.src, "J_xiamiPlayer", "1", "1", "9.0", "expressInstall.swf",
                flashVars, op.params, attributes, function(event) {
                    self._swf = window.__swf__ = event.ref;
                });
        },
        dns: function(dns, ip) {
            var self = this;
            if (typeof(self._swf.setIdns) === 'function') {
                self._swf.setIdns(dns, ip);
            } else {
                setTimeout(function() {
                    self.dns(dns, ip)
                }, 100)
            }
        },
        /**
         * 加载歌曲 jsonvalue
         * @param {String} value
         */
        load: function(value, pos) {
            var self = this;
            if (S.isString(value)) {
                try {
                    self._swf.jsLoad(value, pos);
                } catch (e) {
                    throw new Error("jsLoad not a function in swf:" + e);
                }
            } else {
                throw new Error("arguments are not Json String");
            }
        },
        sync: function() {
            var self = this;
            if (typeof(self._swf.jsSyncUser) === 'function') {
                self._swf.jsSyncUser();
            } else {
                setTimeout(function() {
                    self.sync();
                }, 50);
            }
        },
        play: function() {
            var self = this;
            try {
                self._swf.jsPlay();
            } catch (e) {
                throw new Error("jsPlay not a function in swf:" + e);
            }
        },
        pause: function() {
            var self = this;
            try {
                self._swf.jsPause();
            } catch (e) {
                throw new Error("jsPause not a function in swf:" + e);
            }
        },
        stop: function() {
            var self = this;
            try {
                self._swf.jsStop();
            } catch (e) {
                throw new Error("jsStop not a function in swf:" + e);
            }
        },
        status: function() {
            var self = this;
            var result = "";
            try {
                var result = self._swf.getStatus();
            } catch (e) {
                throw new Error("getStatus not a function in swf:" + e);
            }
            return result;
        },
        /**
         * 切换高品质
         * @param {Boolean} value
         */
        changeHq: function(value) {
            var self = this;
            if (S.isBoolean(value)) {
                try {
                    self._swf.jsChangeHq(value);
                } catch (e) {
                    throw new Error("jsChangeHq not a function in swf:" + e);
                }
            } else {
                throw new Error("arguments are not Boolean");
            }
        },
        /**
         * 跳跃播放 设置当前播放头, 并从这里开始播放
         * @param  {Number} value 播放头位置, 百分比位置为 0-1 的数值
         */
        position: function(value) {
            var self = this;
            if (value >= 0 && value <= 1) {
                try {
                    self._swf.setPosition(value);
                } catch (e) {
                    throw new Error("setPosition not a function in swf:" + e);
                }
            } else {
                throw new Error("arguments are not 0-1");
            }
        },
        volume: function(value) {
            var self = this;
            if (S.isNumber(value) && value >= 0 && value <= 1) {
                var v = Number(value.toFixed(2));
                try {
                    self._swf.setVolume(v);
                } catch (e) {
                    throw new Error("setVolume not a function in swf:" + e);
                }
            } else {
                throw new Error("arguments are not 0-1");
            }
        },
        mode: function(value) {
            var self = this;
            try {
                self._swf.setMode(value);
            } catch (e) {
                throw new Error("setMode not a function in swf:" + e);
            }
        },
        config: function(value) {
            var self = this;
            try {
                self._swf.setConfig(value);
            } catch (e) {
                throw new Error("setConfig not a function in swf:" + e);
            }
        }
    };

    module.exports = player;
});

KISSY.add('utils/scrollView/scrollViewManage',['node', 'event', 'scroll-view', 'scroll-view/plugin/scrollbar'], function(S, require, exports, module) {
    // @formatter:off
    var Node = require("node"),
        Event = require("event"),
        ScrollView = require("scroll-view"), 
        ScrollbarPlugin = require("scroll-view/plugin/scrollbar");
    // @formatter:on
    var $ = Node.all;

    var scrollViewManage = {
        SCROLL_QUEUE : {},
        render : function(name, config) {
            var self = this;
            if (S.UA.ie && S.UA.ie < 8) {
                $("#" + name).css("overflow-y", "auto");
                return false;
            }
            var config = config || {};
            var option = S.mix(config, {
                autoHideY : false
            }, undefined, undefined, true);

            if (self.SCROLL_QUEUE.hasOwnProperty(name)) {
                var scrollView = self.SCROLL_QUEUE[name];
                self.reset(scrollView);
                return scrollView;
            }

            self.SCROLL_QUEUE[name] = new ScrollView({
                srcNode : "#" + name,
                plugins : [new ScrollbarPlugin(option)]
            }).render();

            self._syncScrollViem(name);
            return self.SCROLL_QUEUE[name];
        },
        content : function(name, content) {
            var self = this;
            if (S.UA.ie && S.UA.ie < 8) {
                $("#" + name).html(content).css("overflow-y", "auto");
                return false;
            }
            var scrollView = self.SCROLL_QUEUE[name];
            if (scrollView) {
                scrollView.set("content", content);
                scrollView.sync();
            } else {
                scrollView = self.SCROLL_QUEUE[name] = new ScrollView({
                    srcNode : "#" + name,
                    content : content,
                    plugins : [new ScrollbarPlugin({})]
                }).render();
                self._syncScrollViem(name);
                return scrollView;
            }
        },
        forceRender : function(name, confi) {
            var self = this;
            if (S.UA.ie && S.UA.ie < 8) {
                $("#" + name).css("overflow-y", "auto");
                return false;
            }
            var config = config || {};
            var option = S.mix(config, {
                autoHideY : false
            }, undefined, undefined, true);
            if (self.SCROLL_QUEUE.hasOwnProperty(name)) {
                var scrollView = self.SCROLL_QUEUE[name];
                scrollView.destroy();
            }
            self.SCROLL_QUEUE[name] = new ScrollView({
                srcNode : $("#" + name),
                plugins : [new ScrollbarPlugin(option)]
            }).render();
            self._syncScrollViem(name);

        },
        sync : function(name) {
            var self = this;
            if (S.UA.ie && S.UA.ie < 8) {
                return false;
            }
            if (! self.SCROLL_QUEUE[name]) {
                self.render(name);
            } else {
                self.SCROLL_QUEUE[name].sync();
            }
        },
        reset : function(view) {
            var self = this;
            if (S.UA.ie && S.UA.ie < 8) {
                return false;
            }
            view.sync();
            view.scrollTo({
                "top" : 0
            });
        },
        scrollToTop : function(name) {
            var self = this;
            if (S.UA.ie && S.UA.ie < 8) {
                $("#" + name).scrollTop(0);
                return false;
            }
            var scrollView = self.SCROLL_QUEUE[name];
            scrollView.scrollTo({
                "top" : 0
            });
        },
        scrollTo : function(name, cfg, animCfg) {
            var self = this;
            var cfg = cfg || {};
            //S.log(["滚动到:",cfg.top])
            if (S.UA.ie && S.UA.ie < 8) {
                $("#" + name).scrollTop(cfg.top);
                return false;
            }
            var scrollView = self.SCROLL_QUEUE[name];
            var animCfg = animCfg || {};
            scrollView.scrollTo(cfg, animCfg);
        },
        scrollAt : function(name, cfg, animCfg, amimToggle){
            var self = this;
            var cfg = cfg || {};
            //S.log(["滚动到:",cfg.top])
            if (S.UA.ie && S.UA.ie < 8) {
                $("#" + name).scrollTop(cfg.top);
                return false;
            }
            var scrollView = self.SCROLL_QUEUE[name];
            var animCfg = animCfg || {};
            if (amimToggle) {
                scrollView.scrollToWithBounds(cfg, animCfg);
            }else{
                scrollView.scrollToWithBounds(cfg)
            };
            
        },
        stopAnimation : function(name) {
            var self = this;
            if (S.UA.ie && S.UA.ie < 8) {
                return false;
            }
            var scrollView = self.SCROLL_QUEUE[name];
            scrollView.stopAnimation();
        },
        _syncScrollViem : function(name) {
            var self = this;
            var scrollView = self.SCROLL_QUEUE[name];
            Event.on(window, "resize", S.UA.ie < 8 ? S.buffer(scrollView.sync, 30) : scrollView.sync, scrollView);
        }
    };

    module.exports = scrollViewManage;

});

/** Compiled By kissy-xtemplate */
KISSY.add('page/mods/xtpl/lrc-xtpl',function (S, require, exports, module) {
        /*jshint quotmark:false, loopfunc:true, indent:false, asi:true, unused:false, boss:true*/
        return function (scope, S, undefined) {
            var buffer = "",
                config = this.config,
                engine = this,
                moduleWrap, utils = config.utils;
            if (typeof module !== "undefined" && module.kissy) {
                moduleWrap = module;
            }
            var runBlockCommandUtil = utils.runBlockCommand,
                renderOutputUtil = utils.renderOutput,
                getPropertyUtil = utils.getProperty,
                runInlineCommandUtil = utils.runInlineCommand,
                getPropertyOrRunCommandUtil = utils.getPropertyOrRunCommand;
            buffer += '';
            var config0 = {};
            var params1 = [];
            var id2 = getPropertyUtil(engine, scope, "data", 0, 1);
            params1.push(id2);
            config0.params = params1;
            config0.fn = function (scope) {
                var buffer = "";
                buffer += '\r\n<ul>\r\n';
                var config3 = {};
                var params4 = [];
                var id5 = getPropertyUtil(engine, scope, "data", 0, 3);
                params4.push(id5);
                config3.params = params4;
                config3.fn = function (scope) {
                    var buffer = "";
                    buffer += '\r\n';
                    var config6 = {};
                    var params7 = [];
                    var id8 = getPropertyUtil(engine, scope, "xindex", 0, 4);
                    params7.push(id8 === (0));
                    config6.params = params7;
                    config6.fn = function (scope) {
                        var buffer = "";
                        buffer += '\r\n<li class="ui-lrc-line ui-lrc-current">';
                        var id9 = getPropertyOrRunCommandUtil(engine, scope, {}, "text", 0, 5);
                        buffer += renderOutputUtil(id9, false);
                        buffer += '</li>\r\n';
                        return buffer;
                    };
                    config6.inverse = function (scope) {
                        var buffer = "";
                        buffer += '\r\n<li class="ui-lrc-line">';
                        var id10 = getPropertyOrRunCommandUtil(engine, scope, {}, "text", 0, 7);
                        buffer += renderOutputUtil(id10, false);
                        buffer += '</li>\r\n';
                        return buffer;
                    };
                    buffer += runBlockCommandUtil(engine, scope, config6, "if", 4);
                    buffer += '\r\n';
                    return buffer;
                };
                buffer += runBlockCommandUtil(engine, scope, config3, "each", 3);
                buffer += '\r\n</ul>\r\n';
                return buffer;
            };
            config0.inverse = function (scope) {
                var buffer = "";
                buffer += '\r\n<div class="no-lrc" onclick="SEIYA.playerUploadlyric(\'';
                var id11 = getPropertyOrRunCommandUtil(engine, scope, {}, "id", 0, 12);
                buffer += renderOutputUtil(id11, true);
                buffer += '\')"></div>\r\n';
                return buffer;
            };
            buffer += runBlockCommandUtil(engine, scope, config0, "if", 1);
            buffer += '\r\n';
            return buffer;
        };
});
/** Compiled By kissy-xtemplate */
KISSY.add('page/mods/xtpl/lrcText-xtpl',function (S, require, exports, module) {
        /*jshint quotmark:false, loopfunc:true, indent:false, asi:true, unused:false, boss:true*/
        return function (scope, S, undefined) {
            var buffer = "",
                config = this.config,
                engine = this,
                moduleWrap, utils = config.utils;
            if (typeof module !== "undefined" && module.kissy) {
                moduleWrap = module;
            }
            var runBlockCommandUtil = utils.runBlockCommand,
                renderOutputUtil = utils.renderOutput,
                getPropertyUtil = utils.getProperty,
                runInlineCommandUtil = utils.runInlineCommand,
                getPropertyOrRunCommandUtil = utils.getPropertyOrRunCommand;
            buffer += '';
            var config0 = {};
            var params1 = [];
            var id2 = getPropertyUtil(engine, scope, "data", 0, 1);
            params1.push(id2);
            config0.params = params1;
            config0.fn = function (scope) {
                var buffer = "";
                buffer += '\r\n<ul>\r\n';
                var config3 = {};
                var params4 = [];
                var id5 = getPropertyUtil(engine, scope, "data", 0, 3);
                params4.push(id5);
                config3.params = params4;
                config3.fn = function (scope) {
                    var buffer = "";
                    buffer += '\r\n<li class="ui-lrc-line">';
                    var id6 = getPropertyOrRunCommandUtil(engine, scope, {}, "this", 0, 4);
                    buffer += renderOutputUtil(id6, false);
                    buffer += '</li>\r\n';
                    return buffer;
                };
                buffer += runBlockCommandUtil(engine, scope, config3, "each", 3);
                buffer += '\r\n</ul>\r\n';
                return buffer;
            };
            config0.inverse = function (scope) {
                var buffer = "";
                buffer += '\r\n<div class="no-lrc" onclick="SEIYA.playerUploadlyric(\'';
                var id7 = getPropertyOrRunCommandUtil(engine, scope, {}, "id", 0, 8);
                buffer += renderOutputUtil(id7, true);
                buffer += '\')"></div>\r\n';
                return buffer;
            };
            buffer += runBlockCommandUtil(engine, scope, config0, "if", 1);
            buffer += '\r\n';
            return buffer;
        };
});
KISSY.add('page/mods/player/player-lrc',['node', 'base', 'io', 'xtemplate', 'anim', 'utils/scrollView/scrollViewManage', '../xtpl/lrc-xtpl', '../xtpl/lrcText-xtpl'], function(S, require, exports, module) {
    // @formatter:off
    var Node = require("node"),
        Base = require("base"),
        IO = require("io"),
        Xtemplate = require("xtemplate"),
        Anim = require("anim"),
        ScrollViewManage = require("utils/scrollView/scrollViewManage"),
        LrcTpl = require("../xtpl/lrc-xtpl"),
        LrcTextTpl = require("../xtpl/lrcText-xtpl");
    // @formatter:on
    var $ = Node.all;
    var r = /\[(\d\:\d\d(\.\d{1,3})?)\]/gm;
    var r1 = /\[(\d\d\:\d\d)\]/gm;
    var r2 = /\[(\d\:\d\d)\]/gm;
    var reg_soundname = /\[ti:(.+?)\]/i;
    //歌曲名
    var reg_singer = /\[ar:(.+?)\]/i;
    //歌手
    var reg_CD = /\[al:(.+?)\]/i;
    //专辑
    var reg_maker = /\[(by:.+?)\]/i;
    //歌词作者
    var reg_offset = /\[offset:(.+?)\]/i;
    //偏移值
    var reg_take = /^(\[\d\d\:\d\d(\.\d{1,3})?\])+[^\[\]\n]*/gm;
    //获取歌词，去除歌曲信息
    var reg_replacetime = /(\[\d\d:\d\d\.\d{2,3}\])+/g;
    //过滤时间信息的正则
    var reg_gettimes = /(\[\d\d:\d\d\.\d{2,3}\])/g;
    //获取时间信息的正则
    var reg_readtime = /\[(\d\d):(\d\d\.\d{2,3})\]/;
    var reg_dis = /^\s*$/;
    //均衡歌词间距的正则

    var LrcExtension = {
        initializer: function() {
            var self = this;
            self.TPL_lrc = new Xtemplate(LrcTpl);
            self.TPL_lrcText = new Xtemplate(LrcTextTpl);
            self.wrap = self.get("wrap");
            self.scrollView = null;
            self._hasLyric = false;
            self._offsetNum = 0;
            self.LyricsArr = [];
            self.LyricLine = null;
            self.LyricWrap = S.UA.ie && S.UA.ie < 8 ? $("#J_lyricScrollWrap") : $("#J_lyricScrollView");
            self._addEvent();
        },
        _addEvent: function() {
            var self = this;
            self.on("afterIndexChange", function(event) {
                self.changeCurrent(event.prevVal, event.newVal);
            });
        },
        /**
         render : function(url) {
         var self = this;
         S.log(url);
         new IO({
         url : "1.lrc",
         dataType : "text",
         success : function(respones) {
         self.lyricLoadComplete(respones);
         },
         error : function() {
         S.log("lrc 404");
         }
         });
         },*/
        render: function(sid, status, text) {
            //S.log([sid ,status, text]);
            var self = this;
            self.set("songId", sid);
            self.clearLyric();
            if (status) {
                self.lyricLoadComplete(text);
            } else {
                self.noLyric();
            }
        },
        /**
         * 歌词加载完成
         * @param {String} value
         */
        lyricLoadComplete: function(value) {
            var self = this;
            if (value != "") {
                // 判断歌词内容是否为动态歌词
                if (!(/\[(\d+)\:(\d+)(\.\d+)?\]/.test(value))) {
                    self._hasLyric = false;
                    self._setTxtLyrics(value);
                } else {
                    self._hasLyric = true;
                    self.LyricsArr = self._splitLyric(value);
                    self._show(true, self.LyricsArr);
                }
            } else {
                self.reset();
            }
        },
        noLyric: function() {
            var self = this;
            var html = self.TPL_lrc.render({
                "data": null,
                "id": self.get("songId")
            });
            self.wrap.html(html);
            self.LyricLine = self.wrap.all(".ui-lrc-line");
            self.scrollView = ScrollViewManage.render("J_lyricScrollView");
        },
        changeCurrent: function(oldIndex, newIndex) {
            var self = this;
            if (oldIndex != -1) {
                self.LyricLine.item(oldIndex).removeClass("ui-lrc-current");
            }
            if (newIndex != -1) {
                var a = self.LyricLine.item(newIndex);
                a.addClass("ui-lrc-current");
                self._checkPosition(a);
            }
        },
        syncTime: function(time) {
            var self = this;
            if (!self._hasLyric)
                return false;
            var index = self._checkIndex(time);
            self.set("index", index);
        },
        _checkPosition: function(elem) {
            var self = this;
            var w = self.wrap.offset();
            var wh = self.wrap.height();
            var h = self.LyricWrap.height();
            if (wh < h) {
                // 没有滚动条 不用计算位置;
                return false;
            }
            var e = elem.offset();
            var eh = elem.height();
            //S.log([w.top, wh, h, e.top, eh].join(","));
            var step = (e.top - w.top) - (h / 2) + (eh / 2);
            var maxStep = wh - h;
            if (step < 0) {
                step = 0;
            };
            if (step > maxStep) {
                step = maxStep;
            };
            step = Math.floor(step);
            if (S.UA.ie && S.UA.ie < 8) {
                ScrollViewManage.scrollTo("J_lyricScrollWrap", {
                    "top": step
                });
            } else {
                ScrollViewManage.stopAnimation("J_lyricScrollView");
                ScrollViewManage.scrollTo("J_lyricScrollView", {
                    "top": step
                }, {
                    "duration": 0.5,
                    "easing": "easeOut"
                });
            };

        },
        _checkIndex: function(val) {
            var self = this;
            var time = (Number(val + self._offsetNum) / 1000);
            var result = 0;
            if (self.LyricsArr.length == 0)
                return result;
            for (var i = 0, max = self.LyricsArr.length; i < max; i++) {
                if (time < self.LyricsArr[i].time) {
                    result = i - 1;
                    break;
                }
                if (time > self.LyricsArr[max - 1].time) {
                    result = max - 1;
                    break;
                }
            }
            result = result == -1 ? 0 : result;
            return result;
        },
        _show: function(roll, arr) {
            var self = this;
            var html;
            //S.log([roll, arr])
            if (roll) {
                html = self.TPL_lrc.render({
                    "data": arr
                });
            } else {
                html = self.TPL_lrcText.render({
                    "data": arr
                });
            };
            self.wrap.html(html);
            self.LyricLine = self.wrap.all(".ui-lrc-line");
            self.scrollView = ScrollViewManage.render("J_lyricScrollView");
        },
        _splitLyric: function(value) {
            var self = this,
                lrcData = value;
            /**
             * 格式化时间戳
             */
            if (r.test(lrcData)) {
                lrcData = lrcData.replace(r, "[0$1]");
            }
            if (r1.test(lrcData)) {
                lrcData = lrcData.replace(r1, "[$1.00]");
            }
            if (r2.test(lrcData)) {
                lrcData = lrcData.replace(r2, "[0$1.00]");
            }
            // 获取对应内容
            // var arr_soundname = lrcData.match(reg_soundname);
            // var arr_singer = lrcData.match(reg_singer);
            // var arr_CD = lrcData.match(reg_CD);
            // var arr_maker = lrcData.match(reg_maker);
            var arr_offset = lrcData.match(reg_offset);
            // var info = " ";
            // //必须有一个空格，否则影响后面歌词拖动类的检测
            // if (arr_soundname != null) {
            // info += "歌曲:" + arr_soundname[1] + "\r";
            // };
            // if (arr_singer != null) {
            // info += "歌手:" + arr_singer[1] + "\r";
            // };
            // if (arr_CD != null) {
            // info += "专辑:" + arr_CD[1] + "\r";
            // };
            // if (arr_maker != null) {
            // info += arr_maker[1] + "\r";
            // };
            if (arr_offset != null) {
                self._offsetNum = Number(arr_offset[1]);
            }
            var arr_lyrics = lrcData.match(reg_take);
            var _arr_splitedLyrics = [];
            for (var i = 0, max = arr_lyrics.length; i < max; i++) {
                var ly = arr_lyrics[i];
                var arr_tmptime = ly.match(reg_gettimes);
                ly = ly.replace(reg_replacetime, "");
                //去除时间信息，只保留歌词以便后面形成数组
                //获取所有的时间信息
                if (arr_tmptime.length == 1) {
                    var arr_single = {};
                    arr_single["time"] = self._minuteToecond(arr_tmptime[0]);
                    if (reg_dis.test(ly)) {
                        ly = "&nbsp;";
                    };
                    arr_single["text"] = ly;
                    _arr_splitedLyrics.push(arr_single);
                    continue;
                }
                for (var k = 0, maxx = arr_tmptime.length; k < maxx; k++) {
                    var arr_single = {};
                    arr_single["time"] = self._minuteToecond(arr_tmptime[k]);
                    if (reg_dis.test(ly)) {
                        ly = "&nbsp;";
                    };
                    arr_single["text"] = ly;
                    _arr_splitedLyrics.push(arr_single);
                }
            };
            _arr_splitedLyrics.sort(function(a, b) {
                if (a.time > b.time)
                    return 1;
                if (a.time < b.time)
                    return -1;
                return 1;
            });
            return _arr_splitedLyrics;
        },
        _minuteToecond: function(value) {
            var min = value.replace(reg_readtime, "$1");
            var sec = value.replace(reg_readtime, "$2");
            var time = Number(min) * 60 + Number(sec);
            return time;
        },
        _setTxtLyrics: function(value) {
            var self = this;
            if (value == "") {
                self.noLyric();
                return false;
                // 无歌词默认返回空内容
            } else {
                var lycArray = value.split("\n");
                lycArray.unshift("文本歌词");
                self._show(false, lycArray);
            }

        },
        /**
         * 清除歌词面板
         */
        clearLyric: function() {
            var self = this;
            self._offsetNum = 0;
            self.LyricsArr = [];
            self.LyricLine = null;
            self._hasLyric = false;
        },
        reset: function() {
            var self = this;

            self.noLyric();
            self.clearLyric();
        },
        sync : function(){
            var self = this;
            if(self.scrollView){
                self.scrollView.sync();
            }
        },
        empty: function() {
            var self = this;
            ScrollViewManage.content("J_lyricScrollView", "");
        }
    };

    var LrcAttrs = {
        ATTRS: {
            index: {
                value: -1
            },
            lrcArr: {
                value: null
            },
            wrap: {
                value: null,
                setter: function(v) {
                    return $(v);
                }
            },
            songId: {
                value: 0
            }
        }
    };

    module.exports = Base.extend(LrcExtension, LrcAttrs);

});
KISSY.add('utils/base',function(S, COOKIE) {
    var SERVER_HOST = -1 === location.host.indexOf('gitlabswf') ? "" : "http://pre.xiami.com";

    var Base = {
        UPDATE_VIP: SERVER_HOST + "/vip/role",
        SEARCH_JSON: SERVER_HOST + "/search/json",
        SAVE_PLAYLIST: SERVER_HOST + "/member/edit-playlist",
        /**
         * 收藏操作
         */
        FAV_SOUND_URL: SERVER_HOST + "/song/favjson", // url:song/favjson?ids=131321&_xiamitoken=2ae1e1cb19a9a9c5666ff4953bcb415d&callback=js
        /**
         * 精选集 相关接口
         */
        COLLECT_EDIT_NAME_URL: SERVER_HOST + "/playercollect/update", //url:playercollect/update?title=gg&list_id=1
        COLLECT_DELETE_URL: SERVER_HOST + "/playercollect/delete", // /playercollect/delete?list_id=25063511&_xiamitoken=2271ec173798f12845f68117a1b43aeb
        COLLECT_GET_LIST_URL: SERVER_HOST + "/playercollect/list",
        COLLECT_DETAIL_URL: SERVER_HOST + "/playercollect/detail",
        COLLECT_CREATE_URL: SERVER_HOST + "/playercollect/create", // playercollect/create?title=tettg
        COLLECT_DELETE_SONG_URL: SERVER_HOST + "/playercollect/delsong", //sids string 单个或者多个songid,用，隔开 list_id int 专辑id
        COLLECT_ADD_URL: SERVER_HOST + '/playercollect/addsong',
        /**
         * 我收藏的单曲
         */
        MY_FAV_TRCKS_URL: SERVER_HOST + "/playersong/getgradesong",
        /**
         * 播放历史
         */
        HISTORY_TRACKS_URL: SERVER_HOST + "/play/recent-list",
        HISTOTY_DELETE_URL: SERVER_HOST + "/play/remove-track", //id/73668/gmt/1389268935/_xiamitoken/a523a4dc980b5fe75b093e60e0707c1d"
        // 漫游歌曲地址
        ROAM_SONGS_URL: SERVER_HOST + "/play/get-manyou-song",

        // 专辑促销地址
        ALBUM_PROMOTION_URL: SERVER_HOST + '/app/promotion/getitem',
        getToken: function() {
            return COOKIE.get("_xiamitoken");
        },
        getUser: function() {
            return COOKIE.get("user");
        }
    };

    return Base;
}, {
    // @formatter:off
    requires: ["cookie"]
});

/**
 * @author 宝码
 * @description  用于展示购买的接口逻辑
 * @create 2014-05-14 16:58:51
 */
KISSY.add('page/mods/player/player-sale',['io', 'utils/base'], function(S, require, exports, module) {
    var IO = require('io');
    var BaseConfig = require("utils/base");

    function sale() {
        //this.template = '<a href="{{url}}" target="_blank"><s>CD原价￥{{normal_price}}</s><span>￥<em>{{discount_price}}</em></span></a>';
        this.dataCache = {};
    };

    sale.prototype = {
        load: function(obj, successCallback, errorCallback) {
            if (parseInt(obj.albumid) <= 0) {
                return;
            };
            var self = this;
            if (self.dataCache['a' + obj.albumid]) {
                if ('function' === typeof successCallback) {
                    var html = self.formatTemplate(self.dataCache['a' + obj.albumid], obj);
                    successCallback(html);
                }
                return;
            };
            new IO({
                url: BaseConfig.ALBUM_PROMOTION_URL,
                data: {
                    'id': obj.albumid,
                    'type': 3
                },
                dataType: 'json',
                success: function(response) {
                    if (response.status && !! response.data) {
                        if ('function' === typeof successCallback) {
                            self.dataCache['a' + obj.albumid] = response.data[0];
                            var html = self.formatTemplate(response.data[0], obj);
                            successCallback(html);
                        }
                    } else {
                        if ('function' === typeof errorCallback) {
                            errorCallback()
                        }
                    }
                },
                error: function() {
                    if ('function' === typeof errorCallback) {
                        errorCallback()
                    }
                }
            });
        },
        formatTemplate: function(data, param) {
            S.log(param)
            var param = S.param(param);
            return '<a onclick="javascript:goldlog.record(\'/xiamipc.1.12\',\'\',\'' + param + '\',\'H46807196\')" href="' + data.url + '" target="_blank"><s>CD原价￥' + (data.normal_price | 0) + '</s><span>￥<em>' + (data.discount_price | 0) + '</em></span></a>';
        }
    }

    module.exports = sale;
});

/**
 * @author noyodo
 * @description 对SWF 桥接的扩展.
 */
KISSY.add('page/mods/player/player-lister',['node', 'base', 'json'], function(S, require, exports, module) {
    // @formatter:off
    'use strict';
    var Node = require("node"),
        Base = require("base"),
        Json = require("json");
    // @formatter:on
    var $ = Node.all;

    function msecToTime(time) {
        if (S.isNumber(time) && !isNaN(time)) {
            return (parseInt(time / 1000 / 60) + ':' + parseInt(time / 1000 % 60)).replace(/\b(\d)\b/g, '0$1');
        }
        return "00:00";
    }

    var PlayerListenExtension = {
        initializer: function() {
            var self = this;
            self.positionTime = self.get("positionTime");
            self.durationTime = self.get("durationTime");
            self.grogress = self.get("grogress");
            self.panel = self.get("panel");

            self.passtimeTip = null;
            self.passtime = 0;
            self.updateLock = 0;
            self.dot = self.panel.one("#J_playerDot");
            self.playing = self.grogress.one(".playing")
        },
        changePositionTime: function(val, force) {
            var self = this;
            var force = force || false;
            if (!self.get("canRender") && !force) {
                return false;
            }
            var l = self.get('duration');
            if (l > 0) {
                var t = val * l;
                var d = msecToTime(Number(t));
                self.positionTime.html(d);
            }
        },
        addSongs: function(data) {
            var self = this;
            self.fire("addSongs", {
                "data": data
            });
        },
        ready: function(json) {
            var self = this;
            self.fire("ready", {
                "data": json
            });
        },
        soundOpen: function(json) {
            var self = this;
            var j = Json.parse(json);
            self.set('duration', j.length * 1000);
            self.fire("soundOpen", {
                "data": json
            });
        },
        soundError: function(json) {
            var self = this;
            self.fire("soundError", {
                'data': json
            });
        },
        soundPlaying: function(json) {
            var self = this;
            self.fire("soundPlaying", {
                "data": json
            });
            self.updateLock = (self.updateLock + 4) % 3;
            if (self.updateLock !== 1) return false;
            var j = Json.parse(json);
            var p = msecToTime(Number(j.position));
            var d = msecToTime(Number(j.duration));
            var w = j.position / j.duration;
            self.set("position", j.position);
            if (self.get("canRender")) {
                self._showTimers(p, d);
                self._randerPlaying(w);
            }
            if (self.passtimeTip && (Math.floor(j.position / 1000) > self.passtime)) {
                self.passtimeTip.fadeOut(1.5, function() {
                    self.passtimeTip.remove();
                    self.passtimeTip = null;
                })
            }
        },
        soundComplete: function(json) {
            var self = this;
            self.set('duration', 0);
            self.fire("soundComplete", {
                "data": json
            });
        },
        soundProgress: function(json) {
            var self = this;
            var j = Json.parse(json);
            var w = j.progress / j.duration;
            w = w > 1 ? 1 : w;
            self.grogress.one(".loading").width(w * 100 + "%");
        },
        soundLoadComplete: function(json) {
            var self = this;
            var j = Json.parse(json);
            var d = msecToTime(Number(j.duration));
            self.set('duration', j.duration);
            self.durationTime.html(d);
            self.grogress.one(".loading").width("100%");
            self.fire("soundLoadComplete", {
                "data": json
            });
            S.log("soundLoadComplete");
        },
        playerRuning: function() {
            var self = this;
            self.fire("playerRuning");
        },
        lyricComplete: function(status, text) {
            var self = this;
            self.fire("lyricComplete", {
                "status": status,
                "data": text
            });
        },
        _randerPlaying: function(w) {
            var self = this;
            self.playing.width(w * 100 + "%");
            self.dot.css("left", w * 100 + "%");
        },
        _showTimers: function(p, d) {
            var self = this;
            self.positionTime.html(p);
            self.durationTime.html(d);
        }
    };
    /**
     * 播放属性
     */
    var PlayerListenAttrs = {
        ATTRS: {
            canRender: {
                value: true
            },
            grogress: {
                value: "",
                setter: function(v) {
                    return $(v);
                }
            },
            panel: {
                value: "",
                setter: function(v) {
                    return $(v);
                }
            },
            position: {
                value: 0
            },
            positionTime: {
                value: "",
                setter: function(v) {
                    return $(v);
                }
            },
            duration: {
                value: 0
            },
            durationTime: {
                value: "",
                setter: function(v) {
                    return $(v);
                }
            }
        }
    };

    module.exports = Base.extend(PlayerListenExtension, PlayerListenAttrs);
});

/**
 * @author noyodo
 * @description 音量条控制
 */
KISSY.add('page/mods/player/player-volume',['node', 'base', 'event'], function(S, require, exports, module) {
    // @formatter:off
    var Node = require("node"),
        Base = require("base"),
        Event = require("event");
    // @formatter:on
    var $ = Node.all;

    var volumeExtension = {
        initializer : function() {
            var self = this;
            self.wrap = self.get("wrap");
            self.mute = self.get("mute");
            self.cur = self.wrap.one(".volume-cur");
            self.dot = self.wrap.one(".volume-dot");
            self.control = self.wrap.one(".volume-control");

            self.tickDrag = false;
            self.mouseOffset = null;
            self.tempVol = 0;

            self.timer = null;
            //self.setVolume(self.get("volume"));
            self._addEvent();
        },
        _addEvent : function() {
            var self = this;
            self.dot.on("mousedown", function(event) {
                self._mouseDown(event);
            });
            self.control.on("click", function(event) {
                if (event.target == event.currentTarget) {
                    self._mouseClick(event);
                }
            });
            self.mute.on("click", function(event) {
                self._muteHandler(event);
            });
            Event.on(document, "mouseup", function(event) {
                self._mouseUp(event);
            });
            Event.on(document, "mousemove", function(event) {
                if (self.tickDrag) {
                    self._mouseDrag(event);
                }
            });
        },
        _mouseDown : function(event) {
            var self = this;
            self.tickDrag = true;
            self.mouseOffset = {
                "left" : event.offsetX || event.pageX - self.dot.offset().left
            };
            event.halt();
        },
        _mouseUp : function(event) {
            var self = this;
            self.tickDrag = false;
            self.mouseOffset = null;
        },
        _mouseDrag : function(event) {
            var self = this;
            if (!self.tickDrag || self.mouseOffset === null) {
                return false;
            }
            self._calcWidthFromMouseX({
                "left" : event.pageX
            });
        },
        _mouseClick : function(event) {
            var self = this;
            var currentOffset = {
                "left" : event.offsetX || event.pageX - self.control.offset().left
            };

            var w = currentOffset.left / self.control.width();
            w = Number(w.toFixed(2));
            if (w === self.get("volume")) {
                return false;
            }
            self.setVolume(w);
            event.halt();
        },
        _calcWidthFromMouseX : function(obj) {
            var self = this;
            var offset = self.wrap.offset();
            var width = self.wrap.width() - 8;
            var basew = self.mouseOffset.left;
            var l = obj.left - basew - offset.left;
            if (l < 0)
                l = 0;
            if (l > width)
                l = width;
            var w = l / width;
            w = Number(w.toFixed(2));
            if (w === self.get("volume")) {
                return false;
            };
            self.volumeUI(w);
            self.timer && self.timer.cancel();
            self.timer = S.later(function(w){
                //self.setVolume(w);
                self.set("volume", w);
            }, 200, false, null, w);
            //self.setVolume(w);
        },
        _muteHandler : function(event) {
            var self = this;
            if (self.mute.hasClass("volume-on")) {
                self.tempVol = self.get("volume");
                S.log(["tempVol" , self.tempVol]);
                self.mute.removeClass("volume-on");
                self.mute.addClass("volume-off");
                self.setVolume(0);
            } else {
                if (self.tempVol == 0) {
                    self.mute.removeClass("volume-off");
                    self.mute.addClass("volume-on");
                    self.setVolume(0.5);
                } else {
                    self.mute.removeClass("volume-off");
                    self.mute.addClass("volume-on");
                    self.setVolume(self.tempVol);
                }

            }
        },
        setVolume : function(v) {
            var self = this;
            if (v === self.get("volume")) {
                return false;
            };
            self.set("volume", v);
            self.volumeUI(v);
        },
        volumeUI : function(v) {
            var self = this;
            var width = self.wrap.width() - 8;
            self.dot.css("left", width * v + "px");
            self.cur.css("width", v * 100 + "%");
            if (v <= 0) {
                self.mute.removeClass("volume-on");
                self.mute.addClass("volume-off");
            } else {
                self.mute.removeClass("volume-off");
                self.mute.addClass("volume-on");
            }
        },
        volumeUP : function() {
            var self = this;
            var vol = self.get("volume");
            S.log(vol);
            vol = vol + 0.1;
            var vol = vol > 1 ? 1 : vol;
            self.setVolume(vol);
        },
        volumeDOWN : function() {
            var self = this;
            var vol = self.get("volume");
            S.log(vol);
            vol = vol - 0.1;
            var vol = vol < 0 ? 0 : vol;
            self.setVolume(vol);
        }
    };

    var volumeAttrs = {
        ATTRS : {
            volume : {
                value : 0,
                setter : function(v) {
                    S.log(v, "", "volume");
                    if (S.isNumber(v)) {
                        return Number(v.toFixed(2));
                    }
                },
                getter : function(v) {
                    return Number(v.toFixed(2));
                }
            },
            wrap : {
                value : "",
                setter : function(v) {
                    return $(v);
                }
            },
            mute : {
                value : "",
                setter : function(v) {
                    return $(v);
                }
            }
        }
    };

    module.exports = Base.extend(volumeExtension, volumeAttrs);

});

/**
 * @author noyodo
 * @description 对进度条控制扩展
 */
KISSY.add('page/mods/player/player-panel',['node', 'base', 'event', 'dom'], function(S, require, exports, module) {
    // @formatter:off
    var Node = require("node"),
        Base = require("base"),
        Event = require("event"),
        DOM = require("dom");
    // @formatter:on
    var $ = Node.all;

    function msecToTime(time) {
        if (S.isNumber(time) && !isNaN(time)) {
            return (parseInt(time / 1000 / 60) + ':' + parseInt(time / 1000 % 60)).replace(/\b(\d)\b/g, '0$1');
        }
        return "00:00";
    }

    var panelExtension = {
        initializer: function() {
            var self = this;

            self.positionTime = self.get("positionTime");
            self.grogress = self.get("grogress");

            self.panel = self.get("panel");

            self.dot = self.panel.one("#J_playerDot");
            self.playing = self.grogress.one('.playing');
            self.loading = self.grogress.one(".loading");
            self.mouseOffset = null;
            self.positionValue = 0;

            self._addEvent();
        },
        _addEvent: function() {
            var self = this;
            self.dot.on("mousedown", function(event) {
                self._mouseDown(event);
            });

            self.panel.on("click", function(event) {
                if (event.target == event.currentTarget) {
                    self._mouseClick(event);
                }
            });

            Event.on(document, "mouseup", function(event) {
                if (self.get("tickDrag")) {
                    self._mouseUp(event);
                }
            });
            Event.on(document, "mousemove", function(event) {
                if (self.get("tickDrag")) {
                    self._mouseDrag(event);
                }
            });
        },
        _mouseDown: function(event) {
            var self = this;
            if ("room" == self.get("status")) {
                // 播间模式无法拖动
                return false;
            };
            self.set("tickDrag", true);
            self.mouseOffset = {
                "left": event.offsetX || event.pageX - self.dot.offset().left
            };
            event.halt();
        },
        _mouseUp: function(event) {
            var self = this;
            if (self.get("tickDrag")) {
                self.set("position", self.positionValue, {
                    "force": true
                });
                self.set("tickDrag", false);
            }
            self.mouseOffset = null;
        },
        _mouseDrag: function(event) {
            var self = this;
            if (!self.get("tickDrag") || self.mouseOffset === null) {
                return false;
            }
            self._calcWidthFromMouseX({
                "left": event.pageX
            });
        },
        _mouseClick: function(event) {
            var self = this;
            if ("room" == self.get("status")) {
                // 播间模式无法拖动
                return false;
            };
            var currentOffset = {
                "left": event.offsetX || event.pageX - self.panel.offset().left
            };
            var w = currentOffset.left / self.panel.width();
            self.positionValue = w;
            self._setPosition(w);
            self.set("position", self.positionValue, {
                "force": true
            });
            event.halt();
        },
        _calcWidthFromMouseX: function(obj) {
            var self = this;
            var offset = self.panel.offset();
            var width = self.panel.width();
            var l = obj.left - offset.left;
            if (l < 0)
                l = 0;
            if (l > width)
                l = width;
            var w = l / width;
            self.set('dragposition', w);
            self.positionValue = w;
            self._setPosition(w);
        },
        _setPosition: function(v) {
            var self = this;
            self.dot.css("left", v * 100 + "%");
            self.playing.width(v * 100 + "%");
        },
        reset: function(pos) {
            var self = this;
            // self.dot.css("left", "0%");
            // self.playing.width("0%");
            self.loading.width("0%");
            var d = msecToTime(Number(pos));
            self.positionTime.html(d);
        }
    };

    var panelAttrs = {
        ATTRS: {
            tickDrag: {
                value: false,
                setter: function(v) {
                    if (S.isBoolean(v)) {
                        return v;
                    }
                }
            },
            dragposition: {
                value: 0
            },
            position: {
                value: 0
            },
            grogress: {
                value: "",
                setter: function(v) {
                    return $(v);
                }
            },
            panel: {
                value: "",
                setter: function(v) {
                    return $(v);
                }
            },
            status: {
                value: "play"
            },
            positionTime: {
                value: "",
                setter: function(v) {
                    return $(v);
                }
            }
        }
    };

    module.exports = Base.extend(panelExtension, panelAttrs);

});

/**
 * @fileOverview
 * @author
 */
KISSY.add('widget/dialog/index',['node', 'overlay', './index.css'], function(S, require, exports, module) {
    var Node = require('node');
    var O = require('overlay');

    require("./index.css");

    var Widget = {
        showDialogUrl: function(cfg, html) {
            if (!cfg.url) {
                return false;
            }
            if (S.isUndefined(html)) {
                var html = "";
            }
            var option = S.merge({
                url: "",
                title: "提示",
                width: 400,
                height: 200
            }, cfg);
            S.log(option)
            var dialog = __OVERLAY__ = new O.Dialog({
                closeAction: "destroy",
                prefixCls: "xiami-",
                headerContent: option.title,
                closable: true,
                bodyContent: html + '<iframe scrolling="no" height="' + option.height + '" width="' + option.width + '" frameborder="0" name="popupIframe" src="' + option.url + '"></iframe>',
                mask: true,
                align: {
                    points: ['cc', 'cc']
                }
            });
            dialog.show();
            return dialog;
        }
    };

    module.exports = Widget;
});

KISSY.add('widget/tool/index',['cookie', 'overlay', 'node', 'widget/dialog/index'], function(S, require, exports, module){
    var Cookie = require("cookie");
    var O = require("overlay");
    var Node = require("node");
    var Dialog = window.__DIALOG__ = require("widget/dialog/index");

    var tool = {
        changeFavicon : function(src){
            var link = document.createElement('link'),
                oldLink = Node.all('#dynamic-favicon');
                link.id = 'dynamic-favicon';
                link.rel = 'shortcut icon';
                link.href = src;
                if (oldLink) {
                    oldLink.remove();
                }
                Node.all("head").append(link);
        },
        isLogin : function(){
            var self = this;
            var user = Cookie.get("user");
            var isLogin = !!user;
            if (!isLogin) {
                self.miniLogin();
                return false;
            };
            return true;
            
        },
        showDialogLogin : function(){
            var self = this;
            //var url = "/member/poplogin?done=" + location.pathname;
            //window.showDialog( url );
            var url = "/member/login";
            if (!window.location.origin) {
              window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
            }
            window.location.href = window.location.origin + url; 
        },
        miniLogin : function(){
            var self = this;
            var html = '<style>.J_login_method{padding: 14px 10px 24px;overflow: hidden;zoom: 1;}.J_login_method a{float: left;margin-left: 24px;}</style>'
                +'<div class="J_login_method">'
                +'<a href="javascript:;" onclick="taobaoLogin();return false;"><img alt="用淘宝帐号登录"  src="http://img.xiami.net/res/img/common/thirdparty/taobao125_24.jpg" width="125" height="24" /></a>'
                +'<a href="javascript:;" onclick="sinaLogin();return false;"><img alt="用微博帐号登录" src="http://img.xiami.net/res/img/common/thirdparty/weibo125_24.jpg" width="125" height="24" /></a>'
                +'<a href="javascript:;" onclick="qqLogin();return false;"><img alt="用QQ帐号登录"  src="http://img.xiami.net/res/img/common/thirdparty/qq125_24.jpg" width="125" height="24" /></a>'
            +'</div>';
            Dialog.showDialogUrl({
                url : "/member/minilogin", 
                title : "请先登录",
                width : 490,
                height : 170
            }, html);
        }
    };
    
    module.exports = tool;
});

/**
 * @author noyobo
 * @mail nongyoubao@alibaba-inc.com
 * @description 用于对歌曲的操作. 收藏 下载 离线等
 */

KISSY.add('page/mods/player/player-control',['base', 'node', 'event', 'io', 'xtemplate', 'widget/tool/index', 'utils/base'], function(S, require, exports, module) {
    // @formatter:off
    var Base = require("base"), 
        Node = require("node"), 
        Event = require("event"), 
        IO = require("io"), 
        Xtemplate= require("xtemplate"), 
        UTool= require("widget/tool/index"), 
        BaseConfig = require("utils/base");
   // @formatter:on
    var $ = Node.all;
    var playerControlExtension = {
        initializer : function() {
            /*Event.delegate(document, 'click', '#J_trackMoreMenu', function(event) {
             event.halt();
             });*/
            Event.delegate(document, "click", "body", function(event) {
                with(  $("#J_trackMoreMenu") ) {
                    remove();
                }
            });
        },
        favForIds : function(sidArr) {
            if (! UTool.isLogin())
                return false;
            var self = this;
            new IO({
                dataType : "jsonp",
                url : BaseConfig.FAV_SOUND_URL,
                data : {
                    "ids" : sidArr.join(","),
                    "_xiamitoken" : BaseConfig.getToken()
                },
                success : function(respones) {
                    if (respones.status) {
                        var ids = respones.data.songId.split(",");
                        var e = $("#J_trackFav"), eid = e.attr("data-sid");
                        for( var i = 0, len = ids.length; i < len; i++ ) {
                            var sid = ids[i];
                            var a = $("#J_trackList" + sid).one(".fav-btn");
                            a && a.hasClass('icon-track-fav') && a.removeClass("icon-track-fav").addClass("icon-track-faved").attr("title", "取消收藏");
                            if (sid == eid) {
                                e && e.removeClass("icon-fav").addClass("icon-faved").attr("title", "取消收藏");
                            }
                        }
                    } else {

                    }
                },
                error : function() {

                }
            });
        },
        favForId : function(sid, type, note) {
            if (! UTool.isLogin())
                return false;
            var self = this;
            new IO({
                dataType : "jsonp",
                url : BaseConfig.FAV_SOUND_URL,
                data : {
                    "ids" : sid,
                    "rec_note": note,
                    "_xiamitoken" : BaseConfig.getToken()
                },
                success : function(respones) {
                    //S.log(respones);
                    if (! respones.status) {
                        return false;
                    };
                    var a = $("#J_trackList" + sid).one(".fav-btn");
                    var b = $("#J_historyList" + sid).one(".fav-btn");
                    var c = $("#J_favList" + sid).one(".fav-btn");
                    var d = $("#J_collectList" + sid).one(".fav-btn");
                    var e = $("#J_trackFav"), eid = e.attr("data-sid");
                    if (respones.data.flag) {
                        a && a.removeClass("icon-track-fav").addClass("icon-track-faved").attr("title", "取消收藏");
                        b && b.removeClass("icon-track-fav").addClass("icon-track-faved").attr("title", "取消收藏");
                        c && c.removeClass("icon-track-fav").addClass("icon-track-faved").attr("title", "取消收藏");
                        d && d.removeClass("icon-track-fav").addClass("icon-track-faved").attr("title", "取消收藏");
                        if (sid === eid) {
                            e && e.removeClass("icon-fav").addClass("icon-faved").attr("title", "取消收藏");
                        }
                    } else {
                        a && a.removeClass("icon-track-faved").addClass("icon-track-fav").attr("title", "收藏");
                        b && b.removeClass("icon-track-faved").addClass("icon-track-fav").attr("title", "收藏");
                        c && c.removeClass("icon-track-faved").addClass("icon-track-fav").attr("title", "收藏");
                        d && d.removeClass("icon-track-faved").addClass("icon-track-fav").attr("title", "收藏");
                        if (sid === eid) {
                            e && e.removeClass("icon-faved").addClass("icon-fav").attr("title", "收藏");
                        }
                    }
                    self.fire("trackFavCallback", {
                        "data" : respones.data,
                        "targetType" : type
                    });
                },
                error : function() {

                }
            });
        },
        fav : function(elem, sid) {
            if (sid == 0)
                return false;
            if (! UTool.isLogin())
                return false;
            var self = this;
            var target = $(elem), tsid = target.attr("data-sid");
            new IO({
                dataType : "jsonp",
                url : BaseConfig.FAV_SOUND_URL,
                data : {
                    "ids" : sid,
                    "_xiamitoken" : BaseConfig.getToken()
                },
                success : function(respones) {
                    S.log(respones);
                    if (respones.status) {
                        if (sid === tsid) {
                            target.attr("data-sid", respones.datasongId);
                            if (! respones.data.flag) {
                                target.attr({
                                    "class" : "icon-fav",
                                    "title" : "收藏"
                                });
                            } else {
                                target.attr({
                                    "class" : "icon-faved",
                                    "title" : "取消收藏"
                                });
                            };
                        };
                        /**
                         * 发出改变 歌曲收藏状态
                         */
                        self.fire("trackFavCallback", {
                            "data" : respones.data
                        });
                    };

                },
                error : function() {

                }
            });
        },
        share : function(elem, sid) {
            if (sid == 0)
                return false;
            var self = this;
            SEIYA.recommend(sid, 32);
        }
    };

    module.exports = Base.extend(playerControlExtension);
});

/** Compiled By kissy-xtemplate */
KISSY.add('page/mods/xtpl/trackItem-xtpl',function (S, require, exports, module) {
        /*jshint quotmark:false, loopfunc:true, indent:false, asi:true, unused:false, boss:true*/
        return function (scope, S, undefined) {
            var buffer = "",
                config = this.config,
                engine = this,
                moduleWrap, utils = config.utils;
            if (typeof module !== "undefined" && module.kissy) {
                moduleWrap = module;
            }
            var runBlockCommandUtil = utils.runBlockCommand,
                renderOutputUtil = utils.renderOutput,
                getPropertyUtil = utils.getProperty,
                runInlineCommandUtil = utils.runInlineCommand,
                getPropertyOrRunCommandUtil = utils.getPropertyOrRunCommand;
            buffer += '';
            var config9 = {};
            config9.fn = function (scope) {
                var buffer = "";
                buffer += '\r\n';
                var config0 = {};
                var params1 = [];
                var id2 = getPropertyUtil(engine, scope, "xindex", 0, 2);
                var id3 = getPropertyUtil(engine, scope, "index", 1, 2);
                params1.push(id2 === id3);
                config0.params = params1;
                config0.fn = function (scope) {
                    var buffer = "";
                    buffer += '\r\n<div class="ui-row-item ui-track-item ui-track-current" data-index="';
                    var id4 = getPropertyUtil(engine, scope, "xindex", 0, 3);
                    buffer += renderOutputUtil(id4 + (1), true);
                    buffer += '" data-sid="';
                    var id5 = getPropertyOrRunCommandUtil(engine, scope, {}, "song_id", 0, 3);
                    buffer += renderOutputUtil(id5, true);
                    buffer += '" data-note="';
                    var id6 = getPropertyOrRunCommandUtil(engine, scope, {}, "rec_note", 0, 3);
                    buffer += renderOutputUtil(id6, true);
                    buffer += '" data-type="track" id="J_trackList';
                    var id7 = getPropertyOrRunCommandUtil(engine, scope, {}, "song_id", 0, 3);
                    buffer += renderOutputUtil(id7, true);
                    buffer += '">\r\n';
                    return buffer;
                };
                config0.inverse = function (scope) {
                    var buffer = "";
                    buffer += '\r\n<div class="ui-row-item ui-track-item" data-sid="';
                    var id8 = getPropertyOrRunCommandUtil(engine, scope, {}, "song_id", 0, 5);
                    buffer += renderOutputUtil(id8, true);
                    buffer += '" data-index="';
                    var id9 = getPropertyUtil(engine, scope, "xindex", 0, 5);
                    buffer += renderOutputUtil(id9 + (1), true);
                    buffer += '" data-note="';
                    var id10 = getPropertyOrRunCommandUtil(engine, scope, {}, "rec_note", 0, 5);
                    buffer += renderOutputUtil(id10, true);
                    buffer += '" data-type="track" id="J_trackList';
                    var id11 = getPropertyOrRunCommandUtil(engine, scope, {}, "song_id", 0, 5);
                    buffer += renderOutputUtil(id11, true);
                    buffer += '">\r\n';
                    return buffer;
                };
                buffer += runBlockCommandUtil(engine, scope, config0, "if", 2);
                buffer += '\r\n<div class="ui-track-main">\r\n\t<div class="ui-track-checkbox">\r\n\t\t';
                var config12 = {};
                var params13 = [];
                var id14 = getPropertyUtil(engine, scope, "shield", 0, 9);
                params13.push(id14);
                config12.params = params13;
                config12.fn = function (scope) {
                    var buffer = "";
                    buffer += '\r\n\t\t<input type="checkbox" class="ui-track-item-id" name="track" id="J_track';
                    var id15 = getPropertyOrRunCommandUtil(engine, scope, {}, "song_id", 0, 10);
                    buffer += renderOutputUtil(id15, true);
                    buffer += '" value="';
                    var id16 = getPropertyOrRunCommandUtil(engine, scope, {}, "song_id", 0, 10);
                    buffer += renderOutputUtil(id16, true);
                    buffer += '" disabled="disabled" />\r\n\t\t';
                    return buffer;
                };
                config12.inverse = function (scope) {
                    var buffer = "";
                    buffer += '\r\n\t\t<input type="checkbox" class="ui-track-item-id" name="track" id="J_track';
                    var id17 = getPropertyOrRunCommandUtil(engine, scope, {}, "song_id", 0, 12);
                    buffer += renderOutputUtil(id17, true);
                    buffer += '" value="';
                    var id18 = getPropertyOrRunCommandUtil(engine, scope, {}, "song_id", 0, 12);
                    buffer += renderOutputUtil(id18, true);
                    buffer += '" />\r\n\t\t';
                    return buffer;
                };
                buffer += runBlockCommandUtil(engine, scope, config12, "if", 9);
                buffer += '\r\n\t</div>\r\n\t<div class="ui-track-sort"><em>';
                var id19 = getPropertyUtil(engine, scope, "xindex", 0, 15);
                buffer += renderOutputUtil(id19 + (1), true);
                buffer += '</em></div>\r\n\t<div class="ui-row-item-body">\r\n\t\t<div class="ui-row-item-column c1" data-id="';
                var id20 = getPropertyOrRunCommandUtil(engine, scope, {}, "song_id", 0, 17);
                buffer += renderOutputUtil(id20, true);
                buffer += '"><span title="';
                var id21 = getPropertyOrRunCommandUtil(engine, scope, {}, "title", 0, 17);
                buffer += renderOutputUtil(id21, false);
                buffer += '">';
                var id22 = getPropertyOrRunCommandUtil(engine, scope, {}, "title", 0, 17);
                buffer += renderOutputUtil(id22, false);
                buffer += '</span></div>\r\n\t\t<div class="ui-row-item-column c2" data-artist-id="';
                var id23 = getPropertyOrRunCommandUtil(engine, scope, {}, "artist_id", 0, 18);
                buffer += renderOutputUtil(id23, true);
                buffer += '">';
                var id24 = getPropertyOrRunCommandUtil(engine, scope, {}, "artistfun", 0, 18);
                buffer += renderOutputUtil(id24, false);
                buffer += '</div>\r\n\t\t<div class="ui-row-item-column c3" data-album-id="';
                var id25 = getPropertyOrRunCommandUtil(engine, scope, {}, "album_id", 0, 19);
                buffer += renderOutputUtil(id25, true);
                buffer += '"><a href="http://www.xiami.com/album/';
                var id26 = getPropertyOrRunCommandUtil(engine, scope, {}, "album_id", 0, 19);
                buffer += renderOutputUtil(id26, true);
                buffer += '" target="_blank" title="';
                var id27 = getPropertyOrRunCommandUtil(engine, scope, {}, "album_name", 0, 19);
                buffer += renderOutputUtil(id27, false);
                buffer += '">';
                var id28 = getPropertyOrRunCommandUtil(engine, scope, {}, "album_name", 0, 19);
                buffer += renderOutputUtil(id28, false);
                buffer += '</a></div>\r\n\t</div>\r\n\t<div class="ui-track-control">\r\n\t\t';
                var config29 = {};
                var params30 = [];
                var id31 = getPropertyUtil(engine, scope, "grade", 0, 22);
                params30.push((id31 * (1)) === (-1));
                config29.params = params30;
                config29.fn = function (scope) {
                    var buffer = "";
                    buffer += '\r\n\t\t<a class="fav-btn icon-track-fav" data-type="track" data-event="fav" title="收藏"></a>\r\n\t\t';
                    return buffer;
                };
                config29.inverse = function (scope) {
                    var buffer = "";
                    buffer += '\r\n\t\t<a class="fav-btn icon-track-faved" data-type="track" data-event="fav" title="取消收藏"></a>\r\n\t\t';
                    return buffer;
                };
                buffer += runBlockCommandUtil(engine, scope, config29, "if", 22);
                buffer += '\r\n\t\t<a class="more-btn icon-track-more" data-type="track" data-event="more" title="更多"></a>\r\n\t\t<a class="delete-btn icon-track-delete" data-type="track" data-event="delete" title="删除"></a>\r\n\t</div>\r\n</div>\r\n<div class="ui-roam-wrap" id="J_roamWrap';
                var id32 = getPropertyOrRunCommandUtil(engine, scope, {}, "song_id", 0, 31);
                buffer += renderOutputUtil(id32, true);
                buffer += '">\r\n\t';
                var config33 = {};
                var params34 = [];
                var id35 = getPropertyUtil(engine, scope, "xindex", 0, 32);
                var id36 = getPropertyUtil(engine, scope, "index", 1, 32);
                params34.push(id35 === id36);
                config33.params = params34;
                config33.fn = function (scope) {
                    var buffer = "";
                    buffer += '\r\n\t<div class="ui-roam-head"><a class="ui-roam-open" data-event="roam">漫游相似歌曲</a></div>\r\n\t';
                    return buffer;
                };
                config33.inverse = function (scope) {
                    var buffer = "";
                    buffer += '\r\n\t<div class="ui-roam-head"></div>\r\n\t';
                    return buffer;
                };
                buffer += runBlockCommandUtil(engine, scope, config33, "if", 32);
                buffer += '\r\n</div>\r\n</div>\r\n';
                return buffer;
            };
            buffer += runBlockCommandUtil(engine, scope, config9, "data", 1);
            return buffer;
        };
});
/**
 * 用于管理 歌曲列表. 增加删除
 */
KISSY.add('page/mods/player/player-tracks',['node', 'base', 'anim', 'xtemplate', '../xtpl/trackItem-xtpl', 'utils/scrollView/scrollViewManage'], function(S, require, exports, module) {
    // @formatter:off
    var Node = require("node"),
        Base = require("base"),
        Anim = require('anim'),
        Xtemplate = require("xtemplate"),
        //TrackItem = require("../tpl/trackItem-tpl"),
        TrackItem = require("../xtpl/trackItem-xtpl"),
        ScrollViewManage = require("utils/scrollView/scrollViewManage");
    // @formatter:on
    var $ = Node.all;
    var playerTracksExtension = {
        initializer: function() {
            var self = this;
            self.TPL_track = new Xtemplate(TrackItem);
            self.tracksWrap = $("#J_playTracksList");
            self._trackCount = $("#J_trackCount");
            self._scrollLock = null;
            self._viewIndex = -1;

            self.scrollView = ScrollViewManage.render("J_tracksScrollView");
        },
        append: function(arr, removes, sid) {
            var self = this;
            if (arr.length < 1) {
                return false;
            };
            S.log(arr, removes, sid);
            if (removes.length > 0) {
                //删除 被过滤元素
                for (var i = 0, max = removes.length; i < max; i++) {
                    var id = removes[i];
                    var t = Node.one("#J_trackList" + id);
                    t && t.remove();
                };
            }
            var data = {
                data: arr,
                artistfun: self._formatArtist,
                index: -1
            };
            var html = self.TPL_track.render(data);
            self.tracksWrap.append(html);
            $("#J_checkAll_track").prop('checked', false);
            self.sortTrackList();
            ScrollViewManage.sync("J_tracksScrollView");
            self._trackCount.html("(" + data.data.length + ")");
        },
        add: function(arr, removes, sid) { // 用于向列表增加内容
            var self = this;
            if (arr.length < 1) {
                return false;
            };
            S.log(arr, removes, sid);
            if (removes.length > 0) {
                //删除 被过滤元素
                for (var i = 0, max = removes.length; i < max; i++) {
                    var id = removes[i];
                    var t = Node.one("#J_trackList" + id);
                    t && t.remove();
                };
            }
            var data = {
                data: arr,
                artistfun: self._formatArtist,
                index: -1
            };
            var html = self.TPL_track.render(data);
            Node.one("#J_trackList" + sid).after(html);
            $("#J_checkAll_track").prop('checked', false);
            self.sortTrackList();
            ScrollViewManage.sync("J_tracksScrollView");
            self._trackCount.html("(" + self.tracksWrap.all(".ui-track-item").length + ")");
            //S.log(html)
        },
        addTracks: function(tracks, index) {
            var self = this;
            var data = {
                data: [],
                artistfun: self._formatArtist,
                index: index
            };
            if (S.isArray(tracks)) {
                Array.prototype.push.apply(data.data, tracks);
            } else {
                data.data.push(tracks);
            }
            var html = self.TPL_track.render(data);
            self.tracksWrap && self.tracksWrap.html(html);
            $("#J_checkAll_track").prop('checked', false);
            self._trackCount.html("(" + data.data.length + ")");
            $('body').removeClass('loading');
            ScrollViewManage.sync("J_tracksScrollView");
        },
        /**
         * 重新排序 歌曲列表序号
         */
        sortTrackList: function() {
            var self = this;
            var tracks = self.tracksWrap.all(".ui-track-item");
            var len = tracks.length;
            for (var i = 0; i < len; i++) {
                var item = $(tracks[i])
                var sort = item.one(".ui-track-sort");
                item.attr('data-index', i + 1);
                sort.html("<em>" + (i + 1) + "</em>");
            };
            self._trackCount.html("(" + self.tracksWrap.all(".ui-track-item").length + ")");
            ScrollViewManage.sync("J_tracksScrollView");
        },
        highCurrentTrack: function(sid, status) {
            var self = this;
            if (status !== "roam") {
                var target = self.tracksWrap.one("#J_trackList" + sid),
                    offset = {
                        'top': 0
                    }, index = -1;
                self.tracksWrap.all(".ui-track-current").removeClass("ui-track-current");
                self.tracksWrap.all(".ui-track-roaming").removeClass("ui-track-roaming");
                if (target && target.hasClass("ui-track-hover")) {
                    target.removeClass("ui-track-hover");
                };
                if (target) {
                    target.addClass("ui-track-current");
                    target.one(".ui-roam-head").html('<a class="ui-roam-open" data-event="roam">漫游相似歌曲</a>').show();
                    target.one(".ui-track-sort").removeClass("ui-track-sort-roam");
                    offset = target.offset();
                    index = target.attr('data-index');
                };
                
                if (S.UA.ie !== 7 || S.UA.ie !== 6) {
                    self._scrollLock && self._scrollLock.cancel();
                    self._scrollLock = S.later(function() {
                        self.syncScrollViewPosition(index);
                    }, 500, false, null, null);
                };
                self.syncScrollView();
                var roamBody = $("#J_roamBody").remove();
            } else {
                $('#J_roamMain').all('.ui-roam-item').removeClass('ui-roam-current');
                var target = self.tracksWrap.one("#J_roamItem" + sid);
                target && target.addClass("ui-roam-current");
            }
            // if(roamBody.length > 0){
            //     new Anim(roamBody,{'height':'0px'},2,"easeOutStrong",  function(){
            //         roamBody.remove();
            //         self.tracksWrap.all(".ui-track-item").removeClass("ui-track-roaming")
            //     }).run();
            // }

        },
        /**
         * 同步歌曲面板视图
         */
        syncScrollView: function() {
            var self = this;
            //不需要同步视图. 切换 display 后, 自动渲染
            ScrollViewManage.sync("J_tracksScrollView");
            self.syncScrollViewPosition(self._viewIndex);
        },
        /**
         * 自动滚动到 正在播放的歌曲位置
         * @param  {Number} index 当前歌曲索引值
         */
        syncScrollViewPosition: function(index) {
            S.log(index, '', 'syncScrollViewPosition');
            var self = this;
            var viewHeight = $("#J_tracksScrollView").height();
            var viewScrollTop = self.scrollView.get('scrollTop');
            var top = 41 * (index - 0);
            self._viewIndex = index;
            //console.log(top, viewHeight, viewScrollTop);
            if (top <= viewScrollTop || top > (viewHeight + viewScrollTop)) {
                if (index != -1) {
                    var obj = {
                        'top': 41 * (index - 2) // 节点里的index 是以 1 开头的 . 所以
                    }
                    ScrollViewManage.scrollAt('J_tracksScrollView', obj, null, false)
                }
            }
        },
        reset: function() {
            var self = this;
            self.tracksWrap.html("");
            self._trackCount.html("(0)");
            self.syncScrollView();
        },
        _formatArtist: function() {
            var artist = S.unEscapeHTML(this.artist);
            var arr = artist.split(";"),
                result = [];
            if (arr.length == 1) {
                return '<a href="' + this.artist_url + '" target="_blank" title="' + artist + '">' + artist + '</a>';
            }
            for (var i = 0, max = arr.length; i < max; i++) {
                result.push('<a href="http://www.xiami.com/search/find/artist/' + arr[i] + '" target="_blank" title="' + arr[i] + '">' + arr[i] + '</a>');
            }
            return result.join(" ; ");
        }
    };

    module.exports = Base.extend(playerTracksExtension);
});

KISSY.add('utils/blur/stackBlur',function(S, Node, Base) {
    var $ = Node.all;
    var mul_table = [512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335, 292, 512, 454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335, 312, 292, 273, 512, 482, 454, 428, 405, 383, 364, 345, 328, 312, 298, 284, 271, 259, 496, 475, 456, 437, 420, 404, 388, 374, 360, 347, 335, 323, 312, 302, 292, 282, 273, 265, 512, 497, 482, 468, 454, 441, 428, 417, 405, 394, 383, 373, 364, 354, 345, 337, 328, 320, 312, 305, 298, 291, 284, 278, 271, 265, 259, 507, 496, 485, 475, 465, 456, 446, 437, 428, 420, 412, 404, 396, 388, 381, 374, 367, 360, 354, 347, 341, 335, 329, 323, 318, 312, 307, 302, 297, 292, 287, 282, 278, 273, 269, 265, 261, 512, 505, 497, 489, 482, 475, 468, 461, 454, 447, 441, 435, 428, 422, 417, 411, 405, 399, 394, 389, 383, 378, 373, 368, 364, 359, 354, 350, 345, 341, 337, 332, 328, 324, 320, 316, 312, 309, 305, 301, 298, 294, 291, 287, 284, 281, 278, 274, 271, 268, 265, 262, 259, 257, 507, 501, 496, 491, 485, 480, 475, 470, 465, 460, 456, 451, 446, 442, 437, 433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388, 385, 381, 377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344, 341, 338, 335, 332, 329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297, 294, 292, 289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267, 265, 263, 261, 259];

    var shg_table = [9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24];
    var stackBlurExtension = {
        initializer : function() {
            var self = this;
            self.id = null;
        },
        render : function(url, canvasID, radius, blurAlphaChannel) {
            var self = this;
            self.id = canvasID;
            var canvas = document.getElementById(canvasID);
            if (! canvas || ! canvas.getContext) {
                return;
            }
            var w = $(canvas).width();
            var h = $(canvas).height();
            var canvasRatio = w / h;
            var context = canvas.getContext("2d");
            var img = new Image();
            img.onload = function() {
                canvas.width = w;
                canvas.height = h;
                var iw = img.width;
                var ih = img.height;
                var imgRatio = iw / ih;
                var catW = 0, catH = 0;
                context.clearRect(0, 0, w, h);
                if (imgRatio < canvasRatio) {
                    catH = iw / canvasRatio;
                    var top_y = (ih - catH) / 2;
                    context.drawImage(img, 0, top_y, iw, catH, 0, 0, w, h);
                }
                if (imgRatio > canvasRatio) {
                    catW = ih * canvasRatio;
                    var top_x = (iw - catW) / 2;
                    context.drawImage(img, top_x, 0, catW, ih, 0, 0, w, h);
                }

                if (isNaN(radius) || radius < 1)
                    return;
                if (blurAlphaChannel) {
                    self.stackBlurCanvasRGBA(canvasID, 0, 0, w, h, radius);
                } else {
                    self.stackBlurCanvasRGB(canvasID, 0, 0, w, h, radius);
                };
            };
            img.crossOrigin = '*';
            img.src = url;
        },
        stackBlurImage : function(imageID, canvasID, radius, blurAlphaChannel) {

            var img = document.getElementById(imageID);
            var w = img.naturalWidth;
            var h = img.naturalHeight;

            var canvas = document.getElementById(canvasID);

            canvas.style.width = w + "px";
            canvas.style.height = h + "px";
            canvas.width = w;
            canvas.height = h;

            var context = canvas.getContext("2d");
            context.clearRect(0, 0, w, h);
            context.drawImage(img, 0, 0);

            if (isNaN(radius) || radius < 1)
                return;

            if (blurAlphaChannel)
                stackBlurCanvasRGBA(canvasID, 0, 0, w, h, radius);
            else
                stackBlurCanvasRGB(canvasID, 0, 0, w, h, radius);
        },

        stackBlurCanvasRGBA : function(id, top_x, top_y, width, height, radius) {
            var self = this;
            if (isNaN(radius) || radius < 1)
                return;
            radius |= 0;

            var canvas = document.getElementById(id);
            var context = canvas.getContext("2d");
            var imageData;

            try {
                try {
                    imageData = context.getImageData(top_x, top_y, width, height);
                    S.log("getImageData success a");
                } catch(e) {
                    // NOTE: this part is supposedly only needed if you want to work with local files
                    // so it might be okay to remove the whole try/catch block and just use
                    // imageData = context.getImageData( top_x, top_y, width, height );
                    try {
                        netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");
                        imageData = context.getImageData(top_x, top_y, width, height);
                        S.log("getImageData success b");
                    } catch(e) {
                        //alert("Cannot access local image");
                        throw new Error("unable to access local image data: " + e);
                        return;
                    }
                }
            } catch(e) {
                //alert("Cannot access image");
                self.fire("notImageDate");
                throw new Error(e);
                return;
            }
            var pixels = imageData.data;

            var x, y, i, p, yp, yi, yw, r_sum, g_sum, b_sum, a_sum, r_out_sum, g_out_sum, b_out_sum, a_out_sum, r_in_sum, g_in_sum, b_in_sum, a_in_sum, pr, pg, pb, pa, rbs;

            var div = radius + radius + 1;
            var w4 = width << 2;
            var widthMinus1 = width - 1;
            var heightMinus1 = height - 1;
            var radiusPlus1 = radius + 1;
            var sumFactor = radiusPlus1 * (radiusPlus1 + 1 ) / 2;

            var stackStart = self.BlurStack();
            var stack = stackStart;
            for( i = 1; i < div; i++ ) {
                stack = stack.next = self.BlurStack();
                if (i == radiusPlus1)
                    var stackEnd = stack;
            }
            stack.next = stackStart;
            var stackIn = null;
            var stackOut = null;

            yw = yi = 0;

            var mul_sum = mul_table[radius];
            var shg_sum = shg_table[radius];

            for( y = 0; y < height; y++ ) {
                r_in_sum = g_in_sum = b_in_sum = a_in_sum = r_sum = g_sum = b_sum = a_sum = 0;

                r_out_sum = radiusPlus1 * ( pr = pixels[yi] );
                g_out_sum = radiusPlus1 * ( pg = pixels[yi + 1] );
                b_out_sum = radiusPlus1 * ( pb = pixels[yi + 2] );
                a_out_sum = radiusPlus1 * ( pa = pixels[yi + 3] );

                r_sum += sumFactor * pr;
                g_sum += sumFactor * pg;
                b_sum += sumFactor * pb;
                a_sum += sumFactor * pa;

                stack = stackStart;

                for( i = 0; i < radiusPlus1; i++ ) {
                    stack.r = pr;
                    stack.g = pg;
                    stack.b = pb;
                    stack.a = pa;
                    stack = stack.next;
                }

                for( i = 1; i < radiusPlus1; i++ ) {
                    p = yi + ((widthMinus1 < i ? widthMinus1 : i ) << 2 );
                    r_sum += (stack.r = ( pr = pixels[p])) * ( rbs = radiusPlus1 - i );
                    g_sum += (stack.g = ( pg = pixels[p + 1])) * rbs;
                    b_sum += (stack.b = ( pb = pixels[p + 2])) * rbs;
                    a_sum += (stack.a = ( pa = pixels[p + 3])) * rbs;

                    r_in_sum += pr;
                    g_in_sum += pg;
                    b_in_sum += pb;
                    a_in_sum += pa;

                    stack = stack.next;
                }

                stackIn = stackStart;
                stackOut = stackEnd;
                for( x = 0; x < width; x++ ) {
                    pixels[yi + 3] = pa = (a_sum * mul_sum) >> shg_sum;
                    if (pa != 0) {
                        pa = 255 / pa;
                        pixels[yi] = ((r_sum * mul_sum) >> shg_sum) * pa;
                        pixels[yi + 1] = ((g_sum * mul_sum) >> shg_sum) * pa;
                        pixels[yi + 2] = ((b_sum * mul_sum) >> shg_sum) * pa;
                    } else {
                        pixels[yi] = pixels[yi + 1] = pixels[yi + 2] = 0;
                    }

                    r_sum -= r_out_sum;
                    g_sum -= g_out_sum;
                    b_sum -= b_out_sum;
                    a_sum -= a_out_sum;

                    r_out_sum -= stackIn.r;
                    g_out_sum -= stackIn.g;
                    b_out_sum -= stackIn.b;
                    a_out_sum -= stackIn.a;

                    p = (yw + (( p = x + radius + 1 ) < widthMinus1 ? p : widthMinus1 ) ) << 2;

                    r_in_sum += (stackIn.r = pixels[p]);
                    g_in_sum += (stackIn.g = pixels[p + 1]);
                    b_in_sum += (stackIn.b = pixels[p + 2]);
                    a_in_sum += (stackIn.a = pixels[p + 3]);

                    r_sum += r_in_sum;
                    g_sum += g_in_sum;
                    b_sum += b_in_sum;
                    a_sum += a_in_sum;

                    stackIn = stackIn.next;

                    r_out_sum += ( pr = stackOut.r );
                    g_out_sum += ( pg = stackOut.g );
                    b_out_sum += ( pb = stackOut.b );
                    a_out_sum += ( pa = stackOut.a );

                    r_in_sum -= pr;
                    g_in_sum -= pg;
                    b_in_sum -= pb;
                    a_in_sum -= pa;

                    stackOut = stackOut.next;

                    yi += 4;
                }
                yw += width;
            }

            for( x = 0; x < width; x++ ) {
                g_in_sum = b_in_sum = a_in_sum = r_in_sum = g_sum = b_sum = a_sum = r_sum = 0;

                yi = x << 2;
                r_out_sum = radiusPlus1 * ( pr = pixels[yi]);
                g_out_sum = radiusPlus1 * ( pg = pixels[yi + 1]);
                b_out_sum = radiusPlus1 * ( pb = pixels[yi + 2]);
                a_out_sum = radiusPlus1 * ( pa = pixels[yi + 3]);

                r_sum += sumFactor * pr;
                g_sum += sumFactor * pg;
                b_sum += sumFactor * pb;
                a_sum += sumFactor * pa;

                stack = stackStart;

                for( i = 0; i < radiusPlus1; i++ ) {
                    stack.r = pr;
                    stack.g = pg;
                    stack.b = pb;
                    stack.a = pa;
                    stack = stack.next;
                }

                yp = width;

                for( i = 1; i <= radius; i++ ) {
                    yi = (yp + x ) << 2;

                    r_sum += (stack.r = ( pr = pixels[yi])) * ( rbs = radiusPlus1 - i );
                    g_sum += (stack.g = ( pg = pixels[yi + 1])) * rbs;
                    b_sum += (stack.b = ( pb = pixels[yi + 2])) * rbs;
                    a_sum += (stack.a = ( pa = pixels[yi + 3])) * rbs;

                    r_in_sum += pr;
                    g_in_sum += pg;
                    b_in_sum += pb;
                    a_in_sum += pa;

                    stack = stack.next;

                    if (i < heightMinus1) {
                        yp += width;
                    }
                }

                yi = x;
                stackIn = stackStart;
                stackOut = stackEnd;
                for( y = 0; y < height; y++ ) {
                    p = yi << 2;
                    pixels[p + 3] = pa = (a_sum * mul_sum) >> shg_sum;
                    if (pa > 0) {
                        pa = 255 / pa;
                        pixels[p] = ((r_sum * mul_sum) >> shg_sum ) * pa;
                        pixels[p + 1] = ((g_sum * mul_sum) >> shg_sum ) * pa;
                        pixels[p + 2] = ((b_sum * mul_sum) >> shg_sum ) * pa;
                    } else {
                        pixels[p] = pixels[p + 1] = pixels[p + 2] = 0;
                    }

                    r_sum -= r_out_sum;
                    g_sum -= g_out_sum;
                    b_sum -= b_out_sum;
                    a_sum -= a_out_sum;

                    r_out_sum -= stackIn.r;
                    g_out_sum -= stackIn.g;
                    b_out_sum -= stackIn.b;
                    a_out_sum -= stackIn.a;

                    p = (x + ((( p = y + radiusPlus1) < heightMinus1 ? p : heightMinus1 ) * width )) << 2;

                    r_sum += (r_in_sum += (stackIn.r = pixels[p]));
                    g_sum += (g_in_sum += (stackIn.g = pixels[p + 1]));
                    b_sum += (b_in_sum += (stackIn.b = pixels[p + 2]));
                    a_sum += (a_in_sum += (stackIn.a = pixels[p + 3]));

                    stackIn = stackIn.next;

                    r_out_sum += ( pr = stackOut.r );
                    g_out_sum += ( pg = stackOut.g );
                    b_out_sum += ( pb = stackOut.b );
                    a_out_sum += ( pa = stackOut.a );

                    r_in_sum -= pr;
                    g_in_sum -= pg;
                    b_in_sum -= pb;
                    a_in_sum -= pa;

                    stackOut = stackOut.next;

                    yi += width;
                }
            }

            context.putImageData(imageData, top_x, top_y);
            self.set("id", self.id);
        },

        stackBlurCanvasRGB : function(id, top_x, top_y, width, height, radius) {
            var self = this;
            if (isNaN(radius) || radius < 1)
                return;
            radius |= 0;

            var canvas = document.getElementById(id);
            var context = canvas.getContext("2d");
            var imageData;

            try {
                try {
                    imageData = context.getImageData(top_x, top_y, width, height);
                } catch(e) {

                    // NOTE: this part is supposedly only needed if you want to work with local files
                    // so it might be okay to remove the whole try/catch block and just use
                    // imageData = context.getImageData( top_x, top_y, width, height );
                    try {
                        netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");
                        imageData = context.getImageData(top_x, top_y, width, height);
                    } catch(e) {
                        //alert("Cannot access local image");
                        throw new Error("unable to access local image data: " + e);
                        return;
                    }
                }
            } catch(e) {
                //alert("Cannot access image");
                throw new Error("unable to access image data: " + e);
            }

            var pixels = imageData.data;

            var x, y, i, p, yp, yi, yw, r_sum, g_sum, b_sum, r_out_sum, g_out_sum, b_out_sum, r_in_sum, g_in_sum, b_in_sum, pr, pg, pb, rbs;

            var div = radius + radius + 1;
            var w4 = width << 2;
            var widthMinus1 = width - 1;
            var heightMinus1 = height - 1;
            var radiusPlus1 = radius + 1;
            var sumFactor = radiusPlus1 * (radiusPlus1 + 1 ) / 2;

            var stackStart = self.BlurStack();
            var stack = stackStart;
            for( i = 1; i < div; i++ ) {
                stack = stack.next = self.BlurStack();
                if (i == radiusPlus1)
                    var stackEnd = stack;
            }
            stack.next = stackStart;
            var stackIn = null;
            var stackOut = null;

            yw = yi = 0;

            var mul_sum = mul_table[radius];
            var shg_sum = shg_table[radius];

            for( y = 0; y < height; y++ ) {
                r_in_sum = g_in_sum = b_in_sum = r_sum = g_sum = b_sum = 0;

                r_out_sum = radiusPlus1 * ( pr = pixels[yi] );
                g_out_sum = radiusPlus1 * ( pg = pixels[yi + 1] );
                b_out_sum = radiusPlus1 * ( pb = pixels[yi + 2] );

                r_sum += sumFactor * pr;
                g_sum += sumFactor * pg;
                b_sum += sumFactor * pb;

                stack = stackStart;

                for( i = 0; i < radiusPlus1; i++ ) {
                    stack.r = pr;
                    stack.g = pg;
                    stack.b = pb;
                    stack = stack.next;
                }

                for( i = 1; i < radiusPlus1; i++ ) {
                    p = yi + ((widthMinus1 < i ? widthMinus1 : i ) << 2 );
                    r_sum += (stack.r = ( pr = pixels[p])) * ( rbs = radiusPlus1 - i );
                    g_sum += (stack.g = ( pg = pixels[p + 1])) * rbs;
                    b_sum += (stack.b = ( pb = pixels[p + 2])) * rbs;

                    r_in_sum += pr;
                    g_in_sum += pg;
                    b_in_sum += pb;

                    stack = stack.next;
                }

                stackIn = stackStart;
                stackOut = stackEnd;
                for( x = 0; x < width; x++ ) {
                    pixels[yi] = (r_sum * mul_sum) >> shg_sum;
                    pixels[yi + 1] = (g_sum * mul_sum) >> shg_sum;
                    pixels[yi + 2] = (b_sum * mul_sum) >> shg_sum;

                    r_sum -= r_out_sum;
                    g_sum -= g_out_sum;
                    b_sum -= b_out_sum;

                    r_out_sum -= stackIn.r;
                    g_out_sum -= stackIn.g;
                    b_out_sum -= stackIn.b;

                    p = (yw + (( p = x + radius + 1 ) < widthMinus1 ? p : widthMinus1 ) ) << 2;

                    r_in_sum += (stackIn.r = pixels[p]);
                    g_in_sum += (stackIn.g = pixels[p + 1]);
                    b_in_sum += (stackIn.b = pixels[p + 2]);

                    r_sum += r_in_sum;
                    g_sum += g_in_sum;
                    b_sum += b_in_sum;

                    stackIn = stackIn.next;

                    r_out_sum += ( pr = stackOut.r );
                    g_out_sum += ( pg = stackOut.g );
                    b_out_sum += ( pb = stackOut.b );

                    r_in_sum -= pr;
                    g_in_sum -= pg;
                    b_in_sum -= pb;

                    stackOut = stackOut.next;

                    yi += 4;
                }
                yw += width;
            }

            for( x = 0; x < width; x++ ) {
                g_in_sum = b_in_sum = r_in_sum = g_sum = b_sum = r_sum = 0;

                yi = x << 2;
                r_out_sum = radiusPlus1 * ( pr = pixels[yi]);
                g_out_sum = radiusPlus1 * ( pg = pixels[yi + 1]);
                b_out_sum = radiusPlus1 * ( pb = pixels[yi + 2]);

                r_sum += sumFactor * pr;
                g_sum += sumFactor * pg;
                b_sum += sumFactor * pb;

                stack = stackStart;

                for( i = 0; i < radiusPlus1; i++ ) {
                    stack.r = pr;
                    stack.g = pg;
                    stack.b = pb;
                    stack = stack.next;
                }

                yp = width;

                for( i = 1; i <= radius; i++ ) {
                    yi = (yp + x ) << 2;

                    r_sum += (stack.r = ( pr = pixels[yi])) * ( rbs = radiusPlus1 - i );
                    g_sum += (stack.g = ( pg = pixels[yi + 1])) * rbs;
                    b_sum += (stack.b = ( pb = pixels[yi + 2])) * rbs;

                    r_in_sum += pr;
                    g_in_sum += pg;
                    b_in_sum += pb;

                    stack = stack.next;

                    if (i < heightMinus1) {
                        yp += width;
                    }
                }

                yi = x;
                stackIn = stackStart;
                stackOut = stackEnd;
                for( y = 0; y < height; y++ ) {
                    p = yi << 2;
                    pixels[p] = (r_sum * mul_sum) >> shg_sum;
                    pixels[p + 1] = (g_sum * mul_sum) >> shg_sum;
                    pixels[p + 2] = (b_sum * mul_sum) >> shg_sum;

                    r_sum -= r_out_sum;
                    g_sum -= g_out_sum;
                    b_sum -= b_out_sum;

                    r_out_sum -= stackIn.r;
                    g_out_sum -= stackIn.g;
                    b_out_sum -= stackIn.b;

                    p = (x + ((( p = y + radiusPlus1) < heightMinus1 ? p : heightMinus1 ) * width )) << 2;

                    r_sum += (r_in_sum += (stackIn.r = pixels[p]));
                    g_sum += (g_in_sum += (stackIn.g = pixels[p + 1]));
                    b_sum += (b_in_sum += (stackIn.b = pixels[p + 2]));

                    stackIn = stackIn.next;

                    r_out_sum += ( pr = stackOut.r );
                    g_out_sum += ( pg = stackOut.g );
                    b_out_sum += ( pb = stackOut.b );

                    r_in_sum -= pr;
                    g_in_sum -= pg;
                    b_in_sum -= pb;

                    stackOut = stackOut.next;

                    yi += width;
                }
            }

            context.putImageData(imageData, top_x, top_y);
            self.set("id", self.id);
        },
        BlurStack : function() {
            var bs = {};
            bs.r = 0;
            bs.g = 0;
            bs.b = 0;
            bs.a = 0;
            bs.next = null;
            return bs;
        }
    };

    var stackBlurAttrs = {
        ATTRS : {
            id : {
                value : "none"
            }
        }
    };

    var stackBlur = Base.extend(stackBlurExtension, stackBlurAttrs);

    return stackBlur;

}, {
    requires : ["node", "base"]
});

/**
 * author : 宝码
 */
KISSY.add('page/mods/player/player-blur',['node', 'base', 'anim', 'utils/blur/stackBlur'], function(S, require, exports, module) {
    // @formatter:off
    var Node = require("node"),
        Base = require("base"),
        Anim = require("anim"),
        Blur = require("utils/blur/stackBlur");
    // @formatter:on
    var $ = Node.all;
    var layerIndex = 0;

    var playerBlurExtension = {
        initializer : function() {
            var self = this;
            var wrap = self.get("wrap");
            self.BlurUtil = new Blur();
            var canvasElEven = document.createElement('canvas');
            var canvasElOdd = document.createElement('canvas');
            if (canvasElEven.getContext && ! S.UA.ie) {
                self.set("support", true);

                self.canvasElEven = $(canvasElEven);
                self.canvasElOdd = $(canvasElOdd);
                var w = wrap.width();
                var h = wrap.height();

                self.canvasElEven.attr("class", "ui-canvas");
                self.canvasElOdd.attr("class", "ui-canvas");
                self.canvasElEven.attr("id", "J_Player_Canvas_Even");
                self.canvasElOdd.attr("id", "J_Player_Canvas_Odd");

                self.canvasElEven.css({
                    width : "100%",
                    height : "100%"
                }).appendTo(wrap);

                self.canvasElOdd.css({
                    width : "100%",
                    height : "100%"
                }).appendTo(wrap);

                self._addEvent();
            };
        },
        _onSetUrl : function(val) {
            S.log("Blur _onSetUrl");
            var self = this;
            var i = layerIndex += 1;
            i = i % 2;
            var id = i == 0 ? "J_Player_Canvas_Odd" : "J_Player_Canvas_Even";
            self.BlurUtil.render(val, id, 70, true);
        },
        render : function(url) {
            var self = this;
            S.log(self.get("support"), "", "Blur render");
            if (self.get("support") && ! S.UA.ie) {
                self.set('url', url);
            }
        },
        _addEvent : function() {
            var self = this;
            self.BlurUtil.on("afterIdChange", function(event) {
                if (event.newVal == "J_Player_Canvas_Odd") {
                    self.canvasElEven.removeClass("ui-canvas-current");
                    self.canvasElOdd.addClass("ui-canvas-current");
                } else {
                    self.canvasElOdd.removeClass("ui-canvas-current");
                    self.canvasElEven.addClass("ui-canvas-current");
                }
            });
            self.BlurUtil.on("notImageDate", function(event) {
                S.log("notImageDate");
                self.set("support", false);
                self.destory();
            });
        },
        destory : function() {
            var self = this;
            self.canvasElEven.remove();
            self.canvasElOdd.remove();
        }
    };

    var playerBlurAttrs = {
        ATTRS : {
            img : {
                value : ""
            },
            wrap : {
                value : "",
                setter : function(v) {
                    return $(v);
                }
            },
            canvas : {
                value : ""
            },
            support : {
                value : false
            },
            url : {
                value : ""
            }
        }
    };

    module.exports = Base.extend(playerBlurExtension, playerBlurAttrs);
}); 
/**
 * @author noyobo
 * @mail nongyoubao@alibaba-inc.com
 * @description 添加歌曲的动画
 */
KISSY.add('page/mods/player/player-anim',['node', 'anim'], function(S, require, exports, module) {

    var Node = require('node'), 
        Anim = require('anim');

    var $ = Node.all;

    var PlayerAnim = {
        show : function() {
            var self = this;

            setTimeout(function() {
                var div = $('<div class="player-add-tip" />');
                div.appendTo("body");
                var animation = new Anim(div, {
                    "top" : "66px",
                    "opacity" : "0"
                }, 0.8, "easeOutStrong", function() {
                    div.remove();
                });
                animation.run();
            }, 300);
        }
    };

    module.exports = PlayerAnim;
});

/**
 * @author noyobo
 * @email nongyoubao@alibaba-inc.com
 * @description 数据列表管理
 */

KISSY.add('page/mods/player/player-data',['base', 'json', 'io', 'utils/base', './player-anim'], function(S, require, exports, module) {
    // @formatter:off
    var Base = require("base"),
        Json = require("json"),
        IO = require("io"),
        BaseConfig = require("utils/base"),
        PlayerAnim = require('./player-anim');
    // @formatter:on
    // window.PlayerAnim  = PlayerAnim;
    Array.shuffle = function(v) {
        for (var j, x, i = v.length; i; j = parseInt(Math.random() * i), x = v[--i], v[i] = v[j], v[j] = x);
        return v;
    };
    Array.remove = function(array, from, to) {
        var rest = array.slice((to || from) + 1 || array.length);
        array.length = from < 0 ? array.length + from : from;
        return array.push.apply(array, rest);
    };
    var playerDataExtension = {
        initializer: function() {
            var self = this;
            self._firstLoad = true;
            self._initLoad = true;
            self._hasData = false;
            self._oldIndex = 0;
            self._playedSoundArr = [];
            // 随机
            self._soundIdArr = [];
            self._randomIdArr = [];
            self._soundArr = [];
            // 歌曲ID 数组
            self._tracksObj = {};
            // 歌曲对象 维护.
            // self.on("afterIndexChange", function(event) {
            //     S.log('afterIndexChange ' + event.attrName + ': ' + event.prevVal + ' --> ' +
            // event.newVal);
            //     self._setTrack(event.newVal, true);
            // });
        },
        setData: function(tracks, atPlay) { // atPlay 0 兼容旧版,  1 立即播放, 2 接着播放, 3 播间模式
            S.log(["setData", atPlay]);
            var self = this;
            if (self._soundIdArr.length > 500) {
                alert("播放列表最多只能添加500首，\n请删除部分歌曲后再添加。");
            }
            var tracks = tracks,
                tracksArr = [];
            if (atPlay != 3 && "room" == self.get("status")) {
                alert("你正在跟听中，不能贪心哦！\n请退出播间后再播放其他歌曲。");
                return false;
            }
            PlayerAnim.show();
            if (S.isUndefined(tracks)) {
                return false;
            }
            self._hasData = true;
            if (S.isArray(tracks)) {
                tracksArr = tracks;
            } else {
                tracksArr.push(tracks);
            };
            if (atPlay == 3) {
                self.enterRoom(tracksArr);
                return false;
            }
            var firstTrackObj = tracksArr[0];
            var insertType = Number(firstTrackObj.insert_type); // 1 立即播放 2 当前歌曲之后 3  列表末尾
            var tLoadArr = self._filterLoadArr(tracksArr);
            var oldSoundIdArr = S.clone(self._soundIdArr);
            // 本次加载的歌曲
            if (tLoadArr.length == 0) { // 本次加载歌曲的长度
                var isIn = S.indexOf(firstTrackObj.song_id, oldSoundIdArr);
                if (isIn > -1 && atPlay != 2) {
                    self.playForId(firstTrackObj.song_id);
                }
                return false;
            };

            //debugger;

            switch (atPlay) {
                case 0:
                    // 来自网站的数据
                    break;
                case 1:
                    self.roamStop();
                    break;
                case 2:
                    self._afterSoundArr(tracksArr);
                    return false;
                    break;
                default:
                    S.log(atPlay, "log", "atPlay");
            };
            // 正在漫游模式的时候,根据插入方式, 在对应节点加入市局. 不重新渲染模版.
            if (self.get("status") == "roam") {
                switch (insertType) {
                    case 1:
                        self.roamStop();
                        break;
                    case 2:
                        self._afterSoundArr(tracksArr);
                        return false;
                        break;
                    case 3:
                        self._endSoundArr(tracksArr);
                        return false;
                        break;
                }
            };
            self._margeSoundArr(tLoadArr, insertType, atPlay); // 合并加入的数据 根据 insertType

            self._syncSoundId();
            self._changeSoundArr(false);

            if (self._firstLoad) {
                self._initLoad = false;
                self._firstLoad = false;
                if (self.get("lastPlayToggle")) {
                    var sid = self.get("lastPlayId");
                    var index = self._getIndexForId(sid);
                    if (index > -1) {
                        self._setTrack(index, true);
                        self._firstLoad = false;
                        return false;
                    }
                }
                self._setTrack(0, true);
                self.fire("EVENT_PlayerDataInit");
            } else {
                if (atPlay == 1 || insertType == 1) {
                    S.log(["atPlay 1", firstTrackObj]);
                    self.playForId(firstTrackObj.song_id);
                    // 立即播放
                }
            };
        },
        save: function() {
            var self = this;
            self._savePlaylist();
        },
        _afterSoundArr: function(arr) {
            //debugger;
            var self = this;
            if (self._soundIdArr.length == 0) {
                return true;
            }
            if (arr.length == 0)
                return false;
            var nowsid = self.get("roamSongId") || self.get("songId");
            var mergeArr = S.clone(arr); // 添加数组克隆, 用于过滤后的剩余
            var removeID = []; //移除掉的ID.

            for (var i = 0, max = arr.length; i < max; i++) {
                var item = arr[i],
                    id = item.song_id;
                if (nowsid == id) {
                    Array.remove(mergeArr, i);
                } else {
                    if (S.indexOf(id, self._soundIdArr) > -1) {
                        self._deleteTrackForId(id);
                        removeID.push(id);
                    }
                }
            };
            if (mergeArr.length == 0)
                return false;

            var silent = false;
            // 正在漫游模式, silent = true 不改变视图
            if (self.get("status") == "roam") {
                silent = true;
                self.fire("thenComplete", {
                    "mergeArr": mergeArr,
                    "removeID": removeID,
                    "startSid": nowsid
                });
            };

            var index = self._getIndexForId(nowsid);

            var tmpArrLeft = self._soundArr.slice(0, index + 1);
            var tmpArrRight = self._soundArr.slice(index + 1);
            Array.prototype.push.apply(tmpArrLeft, mergeArr);
            Array.prototype.push.apply(tmpArrLeft, tmpArrRight);
            self._soundArr = tmpArrLeft;

            self._syncSoundId();
            self._changeSoundArr(silent);

            var newindex = self._getIndexForId(nowsid);
            self.set("index", newindex, {
                "silent": true
            });
        },
        _endSoundArr: function(arr) {
            var self = this;
            if (self._soundIdArr.length == 0) {
                return true;
            }
            if (arr.length == 0)
                return false;
            var nowsid = self.get("roamSongId") || self.get("songId");
            var mergeArr = S.clone(arr);
            // 添加数组克隆, 用于过滤后的剩余
            var removeID = [];
            //移除掉的ID.
            for (var i = 0, max = arr.length; i < max; i++) {
                var item = arr[i],
                    id = item.song_id;
                if (nowsid == id) {
                    Array.remove(mergeArr, i);
                } else {
                    if (S.indexOf(id, self._soundIdArr) > -1) {
                        self._deleteTrackForId(id);
                        removeID.push(id);
                    }
                }
            };
            if (mergeArr.length == 0)
                return false;

            var silent = false;
            if (self.get("status") == "roam") {
                silent = true;
                self.fire("endComplete", {
                    "mergeArr": mergeArr,
                    "removeID": removeID,
                    "startSid": nowsid
                });
            };

            var index = self._getIndexForId(nowsid);

            var tmpArrLeft = self._soundArr.slice(0, index + 1);
            var tmpArrRight = self._soundArr.slice(index + 1);
            Array.prototype.push.apply(tmpArrLeft, mergeArr);
            Array.prototype.push.apply(tmpArrLeft, tmpArrRight);
            self._soundArr = tmpArrLeft;

            self._syncSoundId();
            self._changeSoundArr(silent);

            var newindex = self._getIndexForId(nowsid);
            self.set("index", newindex, {
                "silent": true
            });
        },
        _onSetIndex: function(val) {
            var self = this;
            S.log(["_onSetIndex", val]);
            self._setTrack(val, true);
        },
        _filterLoadArr: function(tracksArr) {
            var self = this;
            var tLoadArr = [];
            var oldSoundIdArr = S.clone(self._soundIdArr);
            for (var i = 0, len = tracksArr.length; i < len; i++) {
                var item = tracksArr[i];
                self._tracksObj[item.song_id] = item;
                var inSoundArrIndex = S.indexOf(item.song_id, self._soundIdArr);
                if (inSoundArrIndex == -1) {
                    tLoadArr.push(item);
                }
            };
            return tLoadArr;
        },
        _changeSoundArr: function(silent) {
            var self = this;
            S.log(["_changeSoundArr", self._soundIdArr.length, self._soundArr]);
            self.set("soundArr", self._soundArr, {
                "silent": silent,
                "force": true
            });
        },
        _margeSoundArr: function(tLoadArr, insertType, atPlay) {
            var self = this;
            S.log("insertType" + ", " + atPlay + ", " + insertType);
            switch (insertType) {
                case 1:
                    //立即播放模式;
                    Array.prototype.push.apply(tLoadArr, self._soundArr);
                    self._soundArr = tLoadArr;
                    break;
                case 2:
                    //添加到当前播放歌曲之后
                    var index = self.get("index");
                    var tmpArrLeft = self._soundArr.slice(0, index + 1);
                    var tmpArrRight = self._soundArr.slice(index + 1);
                    Array.prototype.push.apply(tmpArrLeft, tLoadArr);
                    Array.prototype.push.apply(tmpArrLeft, tmpArrRight);
                    self._soundArr = tmpArrLeft;
                    break;
                case 3:
                    //添加到当前播放列表末尾
                    Array.prototype.push.apply(self._soundArr, tLoadArr);
                    break;
            };
        },
        _syncSoundId: function() {
            var self = this;
            /**
             * 同步歌曲ID
             */
            self._soundIdArr = [];
            for (var i = 0, len = self._soundArr.length; i < len; i++) {
                self._soundIdArr.push(self._soundArr[i].song_id);
            };
            /**
             * 随机ID
             */
            var ranArr = S.clone(self._soundIdArr);
            Array.shuffle(ranArr);
            self._randomIdArr = ranArr;
            self.set("soundIdArr", self._soundIdArr);
            self.set("randomIdArr", self._randomIdArr);
            S.log(["_syncSoundId", self._firstLoad]);
            self._savePlaylist();
        },
        _clearPlaylist: function() {
            var self = this;
            new IO({
                type: "get",
                url: BaseConfig.SAVE_PLAYLIST,
                data: {
                    "ids": 0,
                    "_xiamitoken": BaseConfig.getToken()
                },
                success: function(respones) {
                    S.log(respones);
                }
            });
        },
        _savePlaylist: function() {
            var self = this;
            var ids = self._soundIdArr.length > 0 ? self._soundIdArr.join(",") : "0";
            S.log(["_savePlaylist", self._firstLoad]);
            //if (!self._initLoad) {
            //在播间模式不保存歌曲列表.
            if (self.get('status') !== 'room') {
                new IO({
                    type: "get",
                    url: BaseConfig.SAVE_PLAYLIST,
                    data: {
                        "ids": ids,
                        "_xiamitoken": BaseConfig.getToken()
                    },
                    success: function(respones) {
                        S.log(respones);
                        if(window.location.href.indexOf('?')>-1){
                            window.location.hash = "loaded";
                        }
                    }
                });
            }
            //}
        },
        setMode: function(value) {
            var self = this;
            self.set("mode", value);
        },
        changeMode: function() {
            var self = this;
            var mode = self.get("mode");
            mode += 1;
            mode = mode % 3;
            self.set("mode", mode);
            return mode;
        },
        changeTrackFav: function(sid, flag, type) {
            var self = this;
            if (type == "roam") {
                var roamArr = self.get("roamArr");
                var trackVO;
                for (var i = 0, max = roamArr.length; i < max; i++) {
                    var item = roamArr[i];
                    if (sid == item.song_id) {
                        trackVO = item;
                        break;
                    }
                }
                trackVO.favFlag = !! flag;
                trackVO.grade = !flag ? -1 : 0;
            } else {
                var trackVO = self._tracksObj[sid];
                if (trackVO) {
                    trackVO.favFlag = !! flag;
                    trackVO.grade = !flag ? -1 : 0;
                }
            }

            S.log(["player-data.changeTrackFav", trackVO]);
        },
        playForId: function(sid, type) {
            var self = this;
            if (sid == self.get("songId")) {
                return false;
            }
            self.set("status", "play");
            var index = self._getIndexForId(sid);
            self.set("index", index, {
                "force": true
            });
        },
        inSound: function(sid) {
            var self = this;
            var result = S.inArray(sid, self._soundIdArr);
            if (result) {
                self.playForId(sid);
            } else {

            }
            return result;
        },
        prev: function() {
            var self = this;
            if (!self._hasData)
                return false;

            if (self.get('status') == 'roam' || self.get('status') == 'room') {
                return false;
            }
            var index = self._getPrevIndex();
            self.set("index", index, {
                "force": true
            });
        },
        next: function(Bval) {
            var self = this;
            if (!self._hasData)
                return false;
            if ('room' == self.get('status')) {
                return false;
            }
            if ('roam' == self.get('status')) {
                self.playthisRoam();
            } else {
                var index = self._getNextIndex(Bval);
                self.set("index", index, {
                    "force": true
                });
            }
        },
        /**
         * 删除单条歌曲
         * @param  {Number} sid  sound id
         */
        removeTrackForId: function(sid, note) {
            var self = this;
            // 删除歌曲. 是否是正在播放的歌曲, 并且列表大于1, 自动下一曲
            if (sid == self.get("songId") && self._soundIdArr.length > 1) {
                self.next(true);
            };
            self._deleteTrackForId(sid);
            if (self._soundIdArr.length == 0) {
                self.fire("empty");
                return false;
            };
            // 删除ID 等于 被漫游ID 退出漫游模式
            if (sid == self.get('roamSongId')) {
                self.roamExit(false);
            };
            self._savePlaylist();
        },
        /**
         * 批量删除歌曲
         * @param  {[Array]} sidArr 歌曲ID数组
         */
        removeTrackForIds: function(sidArr) {
            var self = this;
            if (sidArr.length == self._soundIdArr.length) {
                self._clearPlaylist();
            };
            var flag = false;

            if ('roam' == self.get('status')) {
                var rsid = self.get('roamSongId');
                if (S.inArray(rsid, sidArr)) {
                    flag = true;
                }
            };

            self._deleteTrackForIds(sidArr);
            self._savePlaylist();


            if (flag) {
                self.roamExit(true);
            }
            if (self._soundIdArr.length == 0) {
                self.fire("empty");
                return false;
            };
        },
        getCurrentIndex: function() {
            var self = this;
            var result;
            S.log(["getCurrentIndex:", self.get("songId"), self._soundIdArr]);
            result = S.indexOf(self.get("songId"), self._soundIdArr);
            return result;
        },
        _deleteTrackForId: function(sid) {
            var self = this;
            var index = S.indexOf(sid, self._soundIdArr);
            var rindex = S.indexOf(sid, self._randomIdArr);
            S.log([index, sid], "", "_deleteTrackForId");
            if (index !== -1) {
                Array.remove(self._soundArr, index);
                Array.remove(self._soundIdArr, index);
                Array.remove(self._randomIdArr, rindex);
                delete self._tracksObj[sid];
            };
        },
        _deleteTrackForIds: function(sidArr) {
            var self = this;
            var flag = false;
            var nowSid = self.get("songId");
            for (var i = 0, len = sidArr.length; i < len; i++) {
                var sid = sidArr[i];
                if (sid == nowSid) {
                    flag = true;
                };
                S.log([nowSid, sid, flag], "", "_deleteTrackForIds");
                self._deleteTrackForId(sid);
            };
            self._changeSoundArr(true);
            if (flag) {
                self.set("index", 0, {
                    "force": true
                });
            } else {
                var sid = self.get("songId");
                var index = self._getIndexForId(sid);
                self.set("index", index, {
                    "silent": true
                });
            }
        },
        /**
         * 获取 当前歌曲之后的 20首歌曲
         */
        getDataArrLimit: function() {
            var self = this;
            if ("roam" == self.get("status")) {
                var roamArr = self.get("roamArr");
                var rindex = self.get("roamIndex");
                var rightArr = roamArr.slice(rindex + 1);
                var leftArr = roamArr.slice(0, rindex);
                Array.prototype.push.apply(rightArr, leftArr);
                return Json.stringify(rightArr);

            };
            var index = self.get("index");
            var lastArr = self._soundArr.slice(index + 1);

            if (lastArr.length > 20) {
                lastArr = lastArr.slice(0, 20);
            } else {
                var t = 0;
                var topArr = [];
                if (self._soundArr.length > 20) {
                    t = 20 - lastArr.length;
                } else {
                    t = index + 1;
                }
                topArr = self._soundArr.slice(0, t);
                Array.prototype.push.apply(lastArr, topArr);
            }
            var a = S.clone(lastArr);
            var b = [];
            for (var i = 0, len = a.length; i < len; i++) {
                var item = self._formatToTrack(a[i]);
                delete item.url;
                delete item.lyric;
                b[i] = item;
            };
            return Json.stringify(b);
        },
        _setTrack: function(index, change) {
            var self = this;
            if (!self._soundArr.length) {
                self._hasData = false;
                self._firstLoad = true;
                return false;
            };
            var sid = self._getNextSid(index);
            var obj = self._tracksObj[sid];
            //S.log('_setTrack',index , sid, obj);
            var track = self._formatToTrack(obj);
            // 格式化为 Track_VO
            self.set("songId", track.songId);
            self.set("index", index, {
                silent: true
            });
            self.set("track", track, {
                "force": true
            });
        },
        /**
         * 获取下一曲 index 索引值
         * @param  {Boolean} value 是否强制下一曲
         * @private
         * @return {Int}       索引值
         */
        _getNextIndex: function(value) { //1 顺序播放，2 随机播放，0 循环单曲
            var self = this;
            var mode = self.get("mode");
            var index = self.get("index");
            var sid = self.get("songId");
            S.log(value + "," + mode + "," + index + "," + sid, "", "_getNextIndex");
            if (!value && mode === 0) {
                index = S.indexOf(sid, self._soundIdArr);
                return index;
            }
            if (value && mode === 0) { // 强制下一曲 用于用户点击触发.
                index = S.indexOf(sid, self._soundIdArr);
            }
            if (mode === 1) {
                index = S.indexOf(sid, self._soundIdArr);
            }
            if (mode === 2) {
                index = S.indexOf(sid, self._randomIdArr);
            }
            index += 1;
            if (index >= self._soundIdArr.length) {
                index = 0;
            }
            return index;
        },
        _getPrevIndex: function() {
            var self = this;
            var mode = self.get("mode");
            var index = self.get("index");
            var sid = self.get("songId");
            S.log(mode + "," + index + "," + sid, "", "_getPrevIndex");
            if (mode === 1 || mode === 0) {
                index = S.indexOf(sid, self._soundIdArr);
            }
            if (mode === 2) {
                index = S.indexOf(sid, self._randomIdArr);
            }
            index -= 1;
            if (index < 0) {
                index = self._soundIdArr.length - 1;
            }
            return index;
        },
        _getNextSid: function(index) {
            var self = this;
            var mode = self.get("mode");
            var sid = 0;
            S.log([mode, index]);

            if (mode === 2) {
                sid = self._randomIdArr[index];
            } else {
                S.log(self._soundIdArr);
                sid = self._soundIdArr[index];
            }
            return sid;
        },
        _getIndexForId: function(sid) {
            var self = this;
            var mode = self.get("mode");
            var index = self.get("index");
            var sid = sid.toString();
            S.log([mode, index, self._soundIdArr, sid], "", "_getIndexForId");
            if (mode == 1 || mode == 0) {
                index = S.indexOf(sid, self._soundIdArr);
            }
            if (mode == 2) {
                index = S.indexOf(sid, self._randomIdArr);
            };
            S.log(index, "", "_getIndexForId");
            return index;
        },
        checkIndex: function() {
            var self = this;
            var sid = self.get('songId');
            var index = S.indexOf(sid, self._soundIdArr);
            return index;
        },
        /**********************  漫游歌曲逻辑 ************************/
        roamStop: function() { // 停止漫游
            var self = this;
            S.log("roamStop");
            self.set("status", "play");
            self._resetRoam();
        },
        /**
         * 退出漫游模式
         * @param  {Boolean<true>} change 是否改变index,删除歌曲后index默认到下一曲不用改变 index
         */
        roamExit: function(change) {
            var self = this;
            self._resetRoam();
            self.set("status", "play"); // 回复播放状态
            if (self._soundIdArr.length == 0) {
                return self;
            };
            if(typeof(change) === 'undefined') change = true;
            var index = self.get('index');
            if (change) {
                index += 1;
            };
            if (index >= self._soundIdArr.length) {
                index = 0;
            };
            self.set("index", index, {
                "force": true
            });
        },
        /**
         * 根据歌曲ID 发起漫游请求, 返回歌曲列表
         * @param  {Number} sid 歌曲ID
         * @return {[type]}     [description]
         */
        roamTrackForId: function(sid) {
            var self = this;
            self.set("roamSongId", sid);

            var songs = [],
                status = false,
                rsid = sid;

            new IO({
                url: BaseConfig.ROAM_SONGS_URL,
                dataType: "jsonp",
                data: {
                    "song_id": sid
                },
                success: function(respones) {
                    // debugger;
                    if (respones.status) {
                        if (!respones.data || respones.data.length < 1) {
                            status = false;
                            self._roamTrackCallback(rsid, status, songs);
                            return false;
                        }
                        songs = Array.shuffle(respones.data);
                        status = true;
                        self.set("roamArr", songs);
                        self.set("status", "roam");
                        self._roamTrackCallback(rsid, status, songs);
                    } else {
                        status = false;
                        self._roamTrackCallback(rsid, status, songs);
                    }
                },
                error: function() {
                    status = false;
                    self._roamTrackCallback(rsid, status, songs);
                }
            });
        },
        /**
         * 漫游请求后的回调
         * @param  {Number} rsid   歌曲ID
         * @param  {Boolean} status 数据结果状态
         * @param  {array} songs  得到的漫游结果
         */
        _roamTrackCallback: function(rsid, status, songs){
            var self = this;
            setTimeout(function() {
                self.fire("roamCallback", {
                    "status": status,
                    "data": {
                        "songId": rsid,
                        "songs": songs
                    }
                });
            }, 2000);
        },
        playthisRoam: function() {
            var self = this;
            var index = self.get('roamIndex');
            var roamArr = self.get('roamArr');
            index += 1;
            if (index >= roamArr.length)
                index = 0;
            self.set('roamIndex', index);
            var track = roamArr[index];
            track = self._formatToTrack(track);
            self._setTrackForRoam(track);
        },
        /**
         * 播放漫游歌曲 从 歌曲ID开始播放, 点击事件也代理到这里
         * @param  {Number} sid  歌曲ID
         * @param  {String} type 播放模型
         */
        playRoamForId: function(sid, type) {
            var self = this;
            self.set('status', type);
            var roamArr = self.get('roamArr');
            var position = 0;
            for (var i = 0, len = roamArr.length; i < len; i++) {
                var item = roamArr[i];
                if (sid == item.song_id) {
                    position = i;
                    break;
                }
            };
            self.set('roamIndex', position);
            var track = self.get('roamArr')[position];
            track = self._formatToTrack(track);

            self._setTrackForRoam(track);
        },
        getRoamArrLimit: function() {
            var self = this;
            var index = self.get("roamIndex");
            var roamArr = self.get('roamArr');
            var lastArr = roamArr.slice(index);

            if (lastArr.length > 5) {
                lastArr = lastArr.slice(0, 5);
            } else {
                var t = 0;
                var topArr = [];
                if (roamArr.length > 5) {
                    t = 5 - lastArr.length;
                } else {
                    t = index + 1;
                }
                topArr = roamArr.slice(0, t);
                Array.prototype.push.apply(lastArr, topArr);
            }
            return lastArr;
        },
        _onSetRoamArr: function() {
            var self = this;
            self.set("roamIndex", -1);
        },
        _resetRoam: function() {
            var self = this;
            self.set("roamSongId", 0, {
                silent: true
            });
            self.set("roamArr", null, {
                silent: true
            });
            self.set('roamIndex', -1, {
                silent: true
            });
        },
        _setTrackForRoam: function(track) {
            var self = this;
            self.set("songId", track.songId);
            self.set("track", track, {
                "force": true
            });
        },
        _onSetStatus: function(val) {
            var self = this;
            if (val != 'roam') {
                self._resetRoam();
            }
        },
        ///******************************* 播间逻辑 **********************************//
        enterRoom: function(tracks) {
            var self = this;
            if (S.isUndefined(tracks) || !S.isArray(tracks)) {
                return false;
            }
            self.set("status", "room");
            self.set("roomArr", tracks);
            self.playthisRoom();
        },
        exitRoom: function() {
            var self = this;
            self._resetRoom();
            self.set("status", "play");
            if (self._soundIdArr.length == 0) {
                window.SEIYA && window.SEIYA.addSongs("/song/playlist-default");
                return false;
            }
            var index = self.get('index') + 1;
            if (index >= self._soundIdArr.length) {
                index = 0;
            };
            self.set("index", index, {
                "force": true
            });
        },
        playthisRoom: function() {
            var self = this;
            var index = self.get('roomIndex');
            var roomArr = self.get('roomArr');
            index += 1;
            if (index >= roomArr.length)
                index = 0;
            self.set('roomIndex', index);
            var track = roomArr[index];
            track = self._formatToTrack(track);
            self._setTrackForRoam(track);
        },
        /**
         * 交换数据位置, 用于拖拽排序
         * @param  {Config} obj 排序配置
         * @param {String} [obj.insertType=after|befort] 排序方式
         * @param {Number} obj.dragIndex 被拖拽元素所在位置
         * @param {Number} obj.dropIndex 与其交换元素所在位置
         */
        swopData: function(obj) {
            var self = this;
            var dragIndex = obj.dragIndex,
                dropIndex = obj.dropIndex,
                insertType = obj.insertType;
            var flag = dragIndex == self.get('index')
            if (insertType == 'after') {
                var tmpSound = self._soundArr[dragIndex];
                var tmpSid = self._soundIdArr[dragIndex];
                var rtmpSid = self._randomIdArr[dragIndex];
                if (dragIndex > dropIndex) {
                    for (var i = dragIndex - 1; i > dropIndex; i--) {
                        self._soundArr[i + 1] = self._soundArr[i];
                        self._soundIdArr[i + 1] = self._soundIdArr[i];
                        self._randomIdArr[i + 1] = self._randomIdArr[i];
                    };
                    self._soundArr[dropIndex + 1] = tmpSound;
                    self._soundIdArr[dropIndex + 1] = tmpSid;
                    self._randomIdArr[dropIndex + 1] = rtmpSid;
                    if (flag) {
                        self.set("index", dropIndex + 1, {
                            "silent": true
                        });
                    }
                }
                if (dragIndex < dropIndex) {
                    for (var i = dragIndex; i < dropIndex; i++) {
                        self._soundArr[i] = self._soundArr[i + 1];
                        self._soundIdArr[i] = self._soundIdArr[i + 1];
                        self._randomIdArr[i] = self._randomIdArr[i + 1];
                    };
                    self._soundArr[dropIndex] = tmpSound;
                    self._soundIdArr[dropIndex] = tmpSid;
                    self._randomIdArr[dropIndex] = rtmpSid;
                    if (flag) {
                        self.set("index", dropIndex, {
                            "silent": true
                        });
                    }
                }
            }
            if (insertType == 'before') {
                var tmpSound = self._soundArr[dragIndex];
                var tmpSid = self._soundIdArr[dragIndex];
                var rtmpSid = self._randomIdArr[dragIndex];
                if (dragIndex > dropIndex) {
                    for (var i = dragIndex; i > dropIndex; i--) {
                        self._soundArr[i] = self._soundArr[i - 1];
                        self._soundIdArr[i] = self._soundIdArr[i - 1];
                        self._randomIdArr[i] = self._randomIdArr[i - 1];
                    };
                    self._soundArr[dropIndex] = tmpSound;
                    self._soundIdArr[dropIndex] = tmpSid;
                    self._randomIdArr[dropIndex] = rtmpSid;
                    if (flag) {
                        self.set("index", dropIndex, {
                            "silent": true
                        });
                    }
                }
                if (dragIndex < dropIndex) {
                    for (var i = dragIndex + 1; i < dropIndex; i++) {
                        self._soundArr[i - 1] = self._soundArr[i];
                        self._soundIdArr[i - 1] = self._soundIdArr[i];
                        self._randomIdArr[i - 1] = self._randomIdArr[i];
                    };
                    self._soundArr[dropIndex - 1] = tmpSound;
                    self._soundIdArr[dropIndex - 1] = tmpSid;
                    self._randomIdArr[dropIndex - 1] = rtmpSid;
                    if (flag) {
                        self.set("index", dropIndex - 1, {
                            "silent": true
                        });
                    }
                };
            }
            self._savePlaylist();
        },
        _resetRoom: function() {
            var self = this;
            self.set("roomArr", [], {
                silent: true
            });
            self.set("roomSongId", 0, {
                silent: true
            });
            self.set('roomIndex', -1, {
                silent: true
            });
        },
        /********************************共用方法 ***********************/
        _formatToTrack: function(obj) {
            var self = this;
            /**
             album_id: "447940"
             album_name: "惊叹号"
             artist: "周杰伦"
             artist_id: "1260"
             grade: -1
             insert_type: "3"
             length: "268"
             location:
            "6hAFlm%5224FE1El3_D51Ee4c945lt%mei2E6F%15_4.Fk%3af5a9%2Et25..F%457829mae58e1%8958-pF.xc2254E7486puyEbe15a-E9n%fio6FE7%3%53t%84%3E414-u32iam%1%92515_%h39e565d31%l"
             lyric: "0"
             pic: "http://img.xiami.net/images/album/img60/1260/4479401380418248_1.jpg"
             rec_note: ""
             song_id: "1770584311"
             title: "Mine Mine"
             tryhq: 0
             */
            var result = {};
            result.url = obj.location;
            result.songId = +obj.song_id;
            result.song = obj.title;
            result.artist = obj.artist;
            result.artistId = +obj.artist_id;
            result.album = obj.album_name;
            result.albumId = +obj.album_id;
            result.cover = obj.pic.replace("_1.", "_2.");
            result.grade = +obj.grade;
            result.favFlag = Number(obj.grade) > -1;
            result.length = +obj.length;
            result.lyric = obj.lyric;
            result.objectId = Number(obj.object_id);
            result.objectName = obj.object_name;
            result.tryhq = Number(obj.tryhq);
            result.artistUrl = obj.artist_url;
            result.rec_note = obj.rec_note;

            return result;
        }
        /**
         * 格式化 JSON对象为 Player Track_VO;
         */
        /*
         {
         "background": "http://img.xiami.com/res/player/bimg/bg-3.jpg?20130410",
         "song_id": "1768990877",
         "album_id": "336895",
         "tryhq": "0",
         "artist": "명카드라이브",
         "insert_type": "1",
         "object_name": "guess",
         "pic": "http://img.xiami.net/images/album/img0/3368951250579431_1.jpg",
         "grade": "-1",
         "rec_note": "1.0-8^3^1",
         "object_id": "1",
         "title": "냉면",
         "lyric": "http://img.xiami.net/lyric/upload/77/1768990877_1287328936.lrc",
         "artist_id": "62460",
         "album_name": "무한도전 올림픽대로 듀엣가요제",
         "ms": "",
         "location":
         "9hFlc5%88_.ta48%39Et%eoE5996mh35e59%-t2.m%E592p_%e3E-5npFx%2%23k5af51Eu%mi2F2253%eEcc%32l35aF6FFE63y9b8583lA.m423187F%4d9E8-%fi64377_a3fcfe4%2i.%6667luD6a6195",
         "length": "218"
         }
         "songId":int(tData.song_id),
         "song":String(tData.title),
         "artist":String(tData.artist),
         "artistId":int(tData.artist_id),
         "albumId":int(tData.album_id),
         "albumName":String(tData.album_name),
         "songLocation":songLocation,
         "lyric":String(tData.lyric),
         "cover":String(tData.pic),
         "grade":int(tData.grade),
         "objectId":int(tData.object_id),
         "objectName":String(tData.object_name),
         "length":int(tData.length),
         "tryhq":int(tData.tryhq),
         "type":type,
         "typeId":typeId,
         "favFlag":favFlag,
         "rec_note":String(tData.rec_note)
         */
    };

    var playerDataAttrs = {
        ATTRS: {
            roomSongId: {
                value: 0
            },
            roomArr: {
                value: []
            },
            roomIndex: {
                value: -1
            },
            roamSongId: {
                value: 0
            },
            roamArr: {
                value: ""
            },
            roamIndex: {
                value: -1
            },
            soundIdArr: {
                value: []
            },
            randomIdArr: {
                value: []
            },
            soundArr: {
                value: ""
            },
            songId: {
                value: 0,
                setter: function(v) {
                    return String(v);
                }
            },
            track: {
                value: "",
                setter: function(v) {
                    return Json.stringify(v);
                },
                getter: function(v) {
                    return v;
                }
            },
            index: {
                value: 0
            },
            //indexHTML: null,
            status: {
                value: "play" // play 播放模式, roam 漫游模式, room 播间模式
            },
            mode: {
                value: 1 //1 顺序播放，2 随机播放，0 循环单曲
            },
            lastPlayId: {
                value: 0
            },
            lastPlayToggle: {
                value: false
            },
            passtime: { // 单位 S
                value: 0
            }
        }
    };

    module.exports = Base.extend(playerDataExtension, playerDataAttrs);

});

/** Compiled By kissy-xtemplate */
KISSY.add('page/mods/xtpl/itemMenu-xtpl',function (S, require, exports, module) {
        /*jshint quotmark:false, loopfunc:true, indent:false, asi:true, unused:false, boss:true*/
        return function (scope, S, undefined) {
            var buffer = "",
                config = this.config,
                engine = this,
                moduleWrap, utils = config.utils;
            if (typeof module !== "undefined" && module.kissy) {
                moduleWrap = module;
            }
            var runBlockCommandUtil = utils.runBlockCommand,
                renderOutputUtil = utils.renderOutput,
                getPropertyUtil = utils.getProperty,
                runInlineCommandUtil = utils.runInlineCommand,
                getPropertyOrRunCommandUtil = utils.getPropertyOrRunCommand;
            buffer += '';
            var config0 = {};
            var params1 = [];
            var id2 = getPropertyUtil(engine, scope, "up", 0, 1);
            params1.push(id2);
            config0.params = params1;
            config0.fn = function (scope) {
                var buffer = "";
                buffer += '\r\n<div id="J_itemMoreMenu" class="mouse-menu item-more-menu item-more-menu-up" style="left:';
                var id3 = getPropertyUtil(engine, scope, "left", 0, 2);
                buffer += renderOutputUtil(id3 + (30), true);
                buffer += 'px; top:';
                var id4 = getPropertyUtil(engine, scope, "top", 0, 2);
                buffer += renderOutputUtil(id4 - (16), true);
                buffer += 'px;">\r\n';
                return buffer;
            };
            config0.inverse = function (scope) {
                var buffer = "";
                buffer += '\r\n<div id="J_itemMoreMenu" class="mouse-menu item-more-menu item-more-menu-down" style="left:';
                var id5 = getPropertyUtil(engine, scope, "left", 0, 4);
                buffer += renderOutputUtil(id5 + (30), true);
                buffer += 'px; top:';
                var id6 = getPropertyUtil(engine, scope, "top", 0, 4);
                buffer += renderOutputUtil(id6 - (166), true);
                buffer += 'px;">\r\n';
                return buffer;
            };
            buffer += runBlockCommandUtil(engine, scope, config0, "if", 1);
            buffer += '\r\n\t<ul>\r\n\t\t<li><a href="javascript:void(0)" onclick="SEIYA.play(';
            var id7 = getPropertyOrRunCommandUtil(engine, scope, {}, "id", 0, 7);
            buffer += renderOutputUtil(id7, true);
            buffer += ')"><i class="icon-playnow"></i>立即播放</a></li>\r\n\t\t<li><a href="javascript:void(0)" onclick="SEIYA.download(';
            var id8 = getPropertyOrRunCommandUtil(engine, scope, {}, "id", 0, 8);
            buffer += renderOutputUtil(id8, true);
            buffer += ',\'';
            var id9 = getPropertyOrRunCommandUtil(engine, scope, {}, "note", 0, 8);
            buffer += renderOutputUtil(id9, true);
            buffer += '\')"><i class="icon-download"></i>下载</a></li>\r\n\t\t<li><a href="javascript:void(0)" onclick="SEIYA.collect(';
            var id10 = getPropertyOrRunCommandUtil(engine, scope, {}, "id", 0, 9);
            buffer += renderOutputUtil(id10, true);
            buffer += ',\'';
            var id11 = getPropertyOrRunCommandUtil(engine, scope, {}, "note", 0, 9);
            buffer += renderOutputUtil(id11, true);
            buffer += '\')"><i class="icon-collect"></i>添加到精选集</a></li>\r\n\t\t<li><a href="javascript:void(0)" onclick="SEIYA.recommend(';
            var id12 = getPropertyOrRunCommandUtil(engine, scope, {}, "id", 0, 10);
            buffer += renderOutputUtil(id12, true);
            buffer += ',32,\'';
            var id13 = getPropertyOrRunCommandUtil(engine, scope, {}, "note", 0, 10);
            buffer += renderOutputUtil(id13, true);
            buffer += '\')"><i class="icon-tshare"></i>分享</a></li>\r\n\t\t<li><a href="javascript:void(0)" onclick="SEIYA.sendMobile(';
            var id14 = getPropertyOrRunCommandUtil(engine, scope, {}, "id", 0, 11);
            buffer += renderOutputUtil(id14, true);
            buffer += ', \'';
            var id15 = getPropertyOrRunCommandUtil(engine, scope, {}, "note", 0, 11);
            buffer += renderOutputUtil(id15, true);
            buffer += '\')"><i class="icon-mobile"></i>发送到手机</a></li>\r\n\t\t<li><a href="javascript:void(0)" onclick="SEIYA.makeBoboWidget(';
            var id16 = getPropertyOrRunCommandUtil(engine, scope, {}, "id", 0, 12);
            buffer += renderOutputUtil(id16, true);
            buffer += ',\'';
            var id17 = getPropertyOrRunCommandUtil(engine, scope, {}, "note", 0, 12);
            buffer += renderOutputUtil(id17, true);
            buffer += '\')"><i class="icon-bobo"></i>生成虾米播播</a></li>\r\n\t</ul>\r\n\t<span class="arrow"></span>\r\n</div>';
            return buffer;
        };
});
/** Compiled By kissy-xtemplate */
KISSY.add('page/mods/xtpl/otherMenu-xtpl',function (S, require, exports, module) {
        /*jshint quotmark:false, loopfunc:true, indent:false, asi:true, unused:false, boss:true*/
        return function (scope, S, undefined) {
            var buffer = "",
                config = this.config,
                engine = this,
                moduleWrap, utils = config.utils;
            if (typeof module !== "undefined" && module.kissy) {
                moduleWrap = module;
            }
            var runBlockCommandUtil = utils.runBlockCommand,
                renderOutputUtil = utils.renderOutput,
                getPropertyUtil = utils.getProperty,
                runInlineCommandUtil = utils.runInlineCommand,
                getPropertyOrRunCommandUtil = utils.getPropertyOrRunCommand;
            buffer += '';
            var config0 = {};
            var params1 = [];
            var id2 = getPropertyUtil(engine, scope, "up", 0, 1);
            params1.push(id2);
            config0.params = params1;
            config0.fn = function (scope) {
                var buffer = "";
                buffer += '\r\n<div id="J_itemMoreMenu" class="mouse-menu item-more-menu item-more-menu-up" style="left:';
                var id3 = getPropertyUtil(engine, scope, "left", 0, 2);
                buffer += renderOutputUtil(id3 + (30), true);
                buffer += 'px; top:';
                var id4 = getPropertyUtil(engine, scope, "top", 0, 2);
                buffer += renderOutputUtil(id4 - (16), true);
                buffer += 'px;">\r\n';
                return buffer;
            };
            config0.inverse = function (scope) {
                var buffer = "";
                buffer += '\r\n<div id="J_itemMoreMenu" class="mouse-menu item-more-menu item-more-menu-down" style="left:';
                var id5 = getPropertyUtil(engine, scope, "left", 0, 4);
                buffer += renderOutputUtil(id5 + (30), true);
                buffer += 'px; top:';
                var id6 = getPropertyUtil(engine, scope, "top", 0, 4);
                buffer += renderOutputUtil(id6 - (166), true);
                buffer += 'px;">\r\n';
                return buffer;
            };
            buffer += runBlockCommandUtil(engine, scope, config0, "if", 1);
            buffer += '\r\n\t';
            var config7 = {};
            var params8 = [];
            var id9 = getPropertyUtil(engine, scope, "type", 0, 6);
            params8.push(id9 === ('collect'));
            config7.params = params8;
            config7.fn = function (scope) {
                var buffer = "";
                buffer += '\r\n\t<ul>\r\n\t\t<li><a href="javascript:void(0)" onclick="SEIYA.thenplay(';
                var id10 = getPropertyOrRunCommandUtil(engine, scope, {}, "id", 0, 8);
                buffer += renderOutputUtil(id10, true);
                buffer += ',\'collect\', ';
                var id11 = getPropertyOrRunCommandUtil(engine, scope, {}, "typeid", 0, 8);
                buffer += renderOutputUtil(id11, true);
                buffer += ')"><i class="icon-thenplay"></i>接着播放</a></li>\r\n\t\t<li><a href="javascript:void(0)" onclick="SEIYA.promotion_download(';
                var id12 = getPropertyOrRunCommandUtil(engine, scope, {}, "id", 0, 9);
                buffer += renderOutputUtil(id12, true);
                buffer += ', \'1\', ';
                var id13 = getPropertyOrRunCommandUtil(engine, scope, {}, "typeid", 0, 9);
                buffer += renderOutputUtil(id13, true);
                buffer += ')"><i class="icon-download"></i>下载</a></li>\r\n\t\t<li><a href="javascript:void(0)" onclick="SEIYA.collect(';
                var id14 = getPropertyOrRunCommandUtil(engine, scope, {}, "id", 0, 10);
                buffer += renderOutputUtil(id14, true);
                buffer += ')"><i class="icon-collect"></i>添加到精选集</a></li>\r\n\t\t<li><a href="javascript:void(0)" onclick="SEIYA.recommend(';
                var id15 = getPropertyOrRunCommandUtil(engine, scope, {}, "id", 0, 11);
                buffer += renderOutputUtil(id15, true);
                buffer += ', 32)"><i class="icon-tshare"></i>分享</a></li>\r\n\t\t<li><a href="javascript:void(0)" onclick="SEIYA.sendMobile(';
                var id16 = getPropertyOrRunCommandUtil(engine, scope, {}, "id", 0, 12);
                buffer += renderOutputUtil(id16, true);
                buffer += ')"><i class="icon-mobile"></i>发送到手机</a></li>\r\n\t\t<li><a href="javascript:void(0)" onclick="SEIYA.makeBoboWidget(';
                var id17 = getPropertyOrRunCommandUtil(engine, scope, {}, "id", 0, 13);
                buffer += renderOutputUtil(id17, true);
                buffer += ')"><i class="icon-bobo"></i>生成虾米播播</a></li>\r\n\t</ul>\r\n\t';
                return buffer;
            };
            config7.inverse = function (scope) {
                var buffer = "";
                buffer += '\r\n\t<ul>\r\n\t\t<li><a href="javascript:void(0)" onclick="SEIYA.thenplay(';
                var id18 = getPropertyOrRunCommandUtil(engine, scope, {}, "id", 0, 17);
                buffer += renderOutputUtil(id18, true);
                buffer += ')"><i class="icon-thenplay"></i>接着播放</a></li>\r\n\t\t<li><a href="javascript:void(0)" onclick="SEIYA.download(';
                var id19 = getPropertyOrRunCommandUtil(engine, scope, {}, "id", 0, 18);
                buffer += renderOutputUtil(id19, true);
                buffer += ')"><i class="icon-download"></i>下载</a></li>\r\n\t\t<li><a href="javascript:void(0)" onclick="SEIYA.collect(';
                var id20 = getPropertyOrRunCommandUtil(engine, scope, {}, "id", 0, 19);
                buffer += renderOutputUtil(id20, true);
                buffer += ')"><i class="icon-collect"></i>添加到精选集</a></li>\r\n\t\t<li><a href="javascript:void(0)" onclick="SEIYA.recommend(';
                var id21 = getPropertyOrRunCommandUtil(engine, scope, {}, "id", 0, 20);
                buffer += renderOutputUtil(id21, true);
                buffer += ', 32)"><i class="icon-tshare"></i>分享</a></li>\r\n\t\t<li><a href="javascript:void(0)" onclick="SEIYA.sendMobile(';
                var id22 = getPropertyOrRunCommandUtil(engine, scope, {}, "id", 0, 21);
                buffer += renderOutputUtil(id22, true);
                buffer += ')"><i class="icon-mobile"></i>发送到手机</a></li>\r\n\t\t<li><a href="javascript:void(0)" onclick="SEIYA.makeBoboWidget(';
                var id23 = getPropertyOrRunCommandUtil(engine, scope, {}, "id", 0, 22);
                buffer += renderOutputUtil(id23, true);
                buffer += ')"><i class="icon-bobo"></i>生成虾米播播</a></li>\r\n\t</ul>\r\n\t';
                return buffer;
            };
            buffer += runBlockCommandUtil(engine, scope, config7, "if", 6);
            buffer += '\r\n\t<span class="arrow"></span>\r\n</div>';
            return buffer;
        };
});
/** Compiled By kissy-xtemplate */
KISSY.add('page/mods/xtpl/pageItem-xtpl',function (S, require, exports, module) {
        /*jshint quotmark:false, loopfunc:true, indent:false, asi:true, unused:false, boss:true*/
        return function (scope, S, undefined) {
            var buffer = "",
                config = this.config,
                engine = this,
                moduleWrap, utils = config.utils;
            if (typeof module !== "undefined" && module.kissy) {
                moduleWrap = module;
            }
            var runBlockCommandUtil = utils.runBlockCommand,
                renderOutputUtil = utils.renderOutput,
                getPropertyUtil = utils.getProperty,
                runInlineCommandUtil = utils.runInlineCommand,
                getPropertyOrRunCommandUtil = utils.getPropertyOrRunCommand;
            buffer += '';
            var config0 = {};
            var params1 = [];
            var id2 = getPropertyUtil(engine, scope, "type", 0, 1);
            params1.push(id2 === ('collect'));
            config0.params = params1;
            config0.fn = function (scope) {
                var buffer = "";
                buffer += '\r\n<div id="J_pageMoreMenu" class="mouse-menu page-more-menu" style="left:';
                var id3 = getPropertyUtil(engine, scope, "left", 0, 2);
                buffer += renderOutputUtil(id3 + (86), true);
                buffer += 'px;">\r\n\t<ul>\r\n\t\t<li><a href="javascript:void(0)" onclick="SEIYA.thenplayIds(\'';
                var id4 = getPropertyOrRunCommandUtil(engine, scope, {}, "type", 0, 4);
                buffer += renderOutputUtil(id4, true);
                buffer += '\', \'';
                var id5 = getPropertyOrRunCommandUtil(engine, scope, {}, "type", 0, 4);
                buffer += renderOutputUtil(id5, true);
                buffer += '\', ';
                var id6 = getPropertyOrRunCommandUtil(engine, scope, {}, "typeid", 0, 4);
                buffer += renderOutputUtil(id6, true);
                buffer += ')"><i class="icon-thenplay"></i>接着播放</a></li>\r\n\t\t<li><a href="javascript:void(0)" onclick="SEIYA.promotion_download(\'';
                var id7 = getPropertyOrRunCommandUtil(engine, scope, {}, "type", 0, 5);
                buffer += renderOutputUtil(id7, true);
                buffer += '\', \'';
                var id8 = getPropertyOrRunCommandUtil(engine, scope, {}, "type", 0, 5);
                buffer += renderOutputUtil(id8, true);
                buffer += '\', ';
                var id9 = getPropertyOrRunCommandUtil(engine, scope, {}, "typeid", 0, 5);
                buffer += renderOutputUtil(id9, true);
                buffer += ')"><i class="icon-download"></i>下载</a></li>\r\n\t\t<li><a href="javascript:void(0)" onclick="SEIYA.makeMultiWidget(\'';
                var id10 = getPropertyOrRunCommandUtil(engine, scope, {}, "type", 0, 6);
                buffer += renderOutputUtil(id10, true);
                buffer += '\')"><i class="icon-bobo"></i>生成虾米播播</a></li>\r\n\t</ul>\r\n\t<span class="arrow"></span>\r\n</div>\r\n';
                return buffer;
            };
            config0.inverse = function (scope) {
                var buffer = "";
                buffer += '\r\n<div id="J_pageMoreMenu" class="mouse-menu page-more-menu" style="left:';
                var id11 = getPropertyUtil(engine, scope, "left", 0, 11);
                buffer += renderOutputUtil(id11 + (86), true);
                buffer += 'px;">\r\n\t<ul>\r\n\t\t';
                var config12 = {};
                var params13 = [];
                var id14 = getPropertyUtil(engine, scope, "type", 0, 13);
                params13.push(id14 === ('track'));
                config12.params = params13;
                config12.fn = function (scope) {
                    var buffer = "";
                    buffer += '<li><a href="javascript:void(0)" onclick="SEIYA.thenplayIds(\'';
                    var id15 = getPropertyOrRunCommandUtil(engine, scope, {}, "type", 0, 13);
                    buffer += renderOutputUtil(id15, true);
                    buffer += '\')"><i class="icon-thenplay"></i>接着播放</a></li>';
                    return buffer;
                };
                var inverse16 = config12.fn;
                config12.fn = config12.inverse;
                config12.inverse = inverse16;
                buffer += runBlockCommandUtil(engine, scope, config12, "if", 13);
                buffer += '\r\n\t\t<li><a href="javascript:void(0)" onclick="SEIYA.downloadsongs(\'';
                var id17 = getPropertyOrRunCommandUtil(engine, scope, {}, "type", 0, 14);
                buffer += renderOutputUtil(id17, true);
                buffer += '\')"><i class="icon-download"></i>下载</a></li>\r\n\t\t<li><a href="javascript:void(0)" onclick="SEIYA.makeMultiWidget(\'';
                var id18 = getPropertyOrRunCommandUtil(engine, scope, {}, "type", 0, 15);
                buffer += renderOutputUtil(id18, true);
                buffer += '\')"><i class="icon-bobo"></i>生成虾米播播</a></li>\r\n\t</ul>\r\n\t<span class="arrow"></span>\r\n</div>\r\n';
                return buffer;
            };
            buffer += runBlockCommandUtil(engine, scope, config0, "if", 1);
            buffer += '\r\n';
            return buffer;
        };
});
/** Compiled By kissy-xtemplate */
KISSY.add('page/mods/xtpl/trackMenu-xtpl',function (S, require, exports, module) {
        /*jshint quotmark:false, loopfunc:true, indent:false, asi:true, unused:false, boss:true*/
        return function (scope, S, undefined) {
            var buffer = "",
                config = this.config,
                engine = this,
                moduleWrap, utils = config.utils;
            if (typeof module !== "undefined" && module.kissy) {
                moduleWrap = module;
            }
            var runBlockCommandUtil = utils.runBlockCommand,
                renderOutputUtil = utils.renderOutput,
                getPropertyUtil = utils.getProperty,
                runInlineCommandUtil = utils.runInlineCommand,
                getPropertyOrRunCommandUtil = utils.getPropertyOrRunCommand;
            buffer += '<div id="J_trackMoreMenu" class="mouse-menu track-more-menu" style="left:';
            var id0 = getPropertyOrRunCommandUtil(engine, scope, {}, "left", 0, 1);
            buffer += renderOutputUtil(id0, true);
            buffer += 'px;">\r\n\t<ul>\r\n\t\t<li><a id="J_trackDown" href="javascript:void(0)" onclick="SEIYA.download(';
            var id1 = getPropertyOrRunCommandUtil(engine, scope, {}, "id", 0, 3);
            buffer += renderOutputUtil(id1, true);
            buffer += ')"><i class="icon-download"></i>下载</a></li>\r\n\t\t<li><a id="J_trackCollect" href="javascript:void(0)" onclick="SEIYA.collect(';
            var id2 = getPropertyOrRunCommandUtil(engine, scope, {}, "id", 0, 4);
            buffer += renderOutputUtil(id2, true);
            buffer += ')"><i class="icon-collect"></i>添加到精选集</a></li>\r\n\t\t<li><a id="J_trackMobile" href="javascript:void(0)" onclick="SEIYA.sendMobile(';
            var id3 = getPropertyOrRunCommandUtil(engine, scope, {}, "id", 0, 5);
            buffer += renderOutputUtil(id3, true);
            buffer += ')"><i class="icon-mobile"></i>发送到手机</a></li>\r\n\t</ul>\r\n\t<span class="arrow"></span>\r\n</div>';
            return buffer;
        };
});
/** Compiled By kissy-xtemplate */
KISSY.add('page/mods/xtpl/roamMenu-xtpl',function (S, require, exports, module) {
        /*jshint quotmark:false, loopfunc:true, indent:false, asi:true, unused:false, boss:true*/
        return function (scope, S, undefined) {
            var buffer = "",
                config = this.config,
                engine = this,
                moduleWrap, utils = config.utils;
            if (typeof module !== "undefined" && module.kissy) {
                moduleWrap = module;
            }
            var runBlockCommandUtil = utils.runBlockCommand,
                renderOutputUtil = utils.renderOutput,
                getPropertyUtil = utils.getProperty,
                runInlineCommandUtil = utils.runInlineCommand,
                getPropertyOrRunCommandUtil = utils.getPropertyOrRunCommand;
            buffer += '';
            var config0 = {};
            var params1 = [];
            var id2 = getPropertyUtil(engine, scope, "up", 0, 1);
            params1.push(id2);
            config0.params = params1;
            config0.fn = function (scope) {
                var buffer = "";
                buffer += '\r\n<div id="J_itemMoreMenu" class="mouse-menu item-more-menu item-more-menu-up" style="left:';
                var id3 = getPropertyUtil(engine, scope, "left", 0, 2);
                buffer += renderOutputUtil(id3 + (30), true);
                buffer += 'px; top:';
                var id4 = getPropertyUtil(engine, scope, "top", 0, 2);
                buffer += renderOutputUtil(id4 - (16), true);
                buffer += 'px;">\r\n';
                return buffer;
            };
            config0.inverse = function (scope) {
                var buffer = "";
                buffer += '\r\n<div id="J_itemMoreMenu" class="mouse-menu item-more-menu item-more-menu-down" style="left:';
                var id5 = getPropertyUtil(engine, scope, "left", 0, 4);
                buffer += renderOutputUtil(id5 + (30), true);
                buffer += 'px; top:';
                var id6 = getPropertyUtil(engine, scope, "top", 0, 4);
                buffer += renderOutputUtil(id6 - (136), true);
                buffer += 'px;">\r\n';
                return buffer;
            };
            buffer += runBlockCommandUtil(engine, scope, config0, "if", 1);
            buffer += '\r\n\t<ul>\r\n\t\t<li><a href="javascript:void(0)" onclick="SEIYA.download(';
            var id7 = getPropertyOrRunCommandUtil(engine, scope, {}, "id", 0, 7);
            buffer += renderOutputUtil(id7, true);
            buffer += ')"><i class="icon-download"></i>下载</a></li>\r\n\t\t<li><a href="javascript:void(0)" onclick="SEIYA.collect(';
            var id8 = getPropertyOrRunCommandUtil(engine, scope, {}, "id", 0, 8);
            buffer += renderOutputUtil(id8, true);
            buffer += ')"><i class="icon-collect"></i>添加到精选集</a></li>\r\n\t\t<li><a href="javascript:void(0)" onclick="SEIYA.recommend(';
            var id9 = getPropertyOrRunCommandUtil(engine, scope, {}, "id", 0, 9);
            buffer += renderOutputUtil(id9, true);
            buffer += ', 32)"><i class="icon-tshare"></i>分享</a></li>\r\n\t\t<li><a href="javascript:void(0)" onclick="SEIYA.sendMobile(';
            var id10 = getPropertyOrRunCommandUtil(engine, scope, {}, "id", 0, 10);
            buffer += renderOutputUtil(id10, true);
            buffer += ')"><i class="icon-mobile"></i>发送到手机</a></li>\r\n\t\t<li><a href="javascript:void(0)" onclick="SEIYA.makeBoboWidget(';
            var id11 = getPropertyOrRunCommandUtil(engine, scope, {}, "id", 0, 11);
            buffer += renderOutputUtil(id11, true);
            buffer += ')"><i class="icon-bobo"></i>生成虾米播播</a></li>\r\n\t</ul>\r\n\t<span class="arrow"></span>\r\n</div>';
            return buffer;
        };
});
/**
 * @author noyobo
 * @mail nongyoubao@alibaba-inc.com
 */
KISSY.add('page/mods/player/player-menu',['node', 'base', 'event', 'xtemplate', '../xtpl/itemMenu-xtpl', '../xtpl/otherMenu-xtpl', '../xtpl/pageItem-xtpl', '../xtpl/trackMenu-xtpl', '../xtpl/roamMenu-xtpl'], function(S, require, exports, module) {
    // @formatter:off
    var Node = require("node"), 
        Base = require("base"), 
        Event = require("event"), 
        Xtemplate = require("xtemplate"), 
        ItemMenuTpl = require("../xtpl/itemMenu-xtpl"), 
        OtherMenuTpl = require("../xtpl/otherMenu-xtpl"), 
        PageMenuTpl = require("../xtpl/pageItem-xtpl"), 
        TrackMenuTpl = require("../xtpl/trackMenu-xtpl"),
        RoamMenuTpl = require("../xtpl/roamMenu-xtpl");
    // @formatter:on
    var $ = Node.all;

    var pageMenuExtension = {
        initializer : function() {
            var self = this;
            Event.delegate(document, "click mousewheel", "body", function(event) {
                self.hideMenu();
            });
            Event.on(window, "resize", function(event) {
                self.hideMenu();
            });

            self.on("afterRowChange", function(event) {
                event.newVal && event.newVal.addClass("ui-track-select");
                event.prevVal && event.prevVal.removeClass("ui-track-select");
            });
        },
        showPanelMenu : function(target, sid) {
            if (sid == 0)
                return false;
            if (Node.one("#J_trackMoreMenu")) {
                Node.one("#J_trackMoreMenu").remove();
                return false;
            }
            var self = this;
            var menu = new Xtemplate(TrackMenuTpl);
            self.hideMenu();
            menuHtml = menu.render({
                "id" : sid,
                "left" : target.offset().left + 30
            });
            $("body").append(menuHtml);
        },
        /**
         * 显示批量操作 更多菜单
         * @param  {HtmlElement} elem 鼠标所在位置
         */
        showBatchMenu : function(elem) {
            var self = this;
            var target = elem, type = elem.attr("data-type"), typeid = elem.attr("data-typeid") || 0;
            var menu = new Xtemplate(PageMenuTpl);
            var offset = target.offset();
            var obj = {
                "left" : offset.left,
                "top" : offset.top,
                "type" : type,
                "typeid" : typeid
            };
            if (self.get("toogle")) {
                var flag = true;
            }
            self.hideMenu();
            if (flag)
                return false;
            var html = menu.render(obj);
            $("body").append(html);
            self.set("toogle", true);
        },
        showTrackMenu : function(target, sid, type, typeid, note) {
            var self = this;
            if (sid == 0)
                return false;
            var open = self.get('open'), osid = self.get('sid'), otype = self.get('type');
            if (open && sid == osid && type == otype) {
                self.hideMenu();
                return false;
            };
            self.set("open", true);
            self.set("sid", sid);
            self.set("type", type);
            var menu;
            var row = target.parent(".ui-track-item");
            if (! row.hasClass("ui-track-select")) {
                self.set("row", row);
            };
            switch(type) {
                case 'track':
                    menu = new Xtemplate(ItemMenuTpl);
                    break;
                case 'roam':
                    menu = new Xtemplate(RoamMenuTpl);
                    break;
                default:
                    menu = new Xtemplate(OtherMenuTpl);
            }
            var left = target.offset().left;
            var top = target.offset().top;
            var up = true;
            if (top > $("body").height() / 2) {
                up = false;
            };
            var data = {
                "type" : type,
                "typeid" : typeid,
                "id" : sid,
                "left" : left,
                "top" : top,
                "up" : up,
                "note" : note
            }
            menuHtml = menu.render(data);
            self._hideOtherMenu();
            $("body").append(menuHtml);
        },
        hideMenu : function() {
            var self = this;
            self.set("toogle", false);
            var m = $(".mouse-menu");
            m && m.remove();
            self.get("row") && self.get("row").removeClass("ui-track-select");
            self.set("open", false);
        },
        _hideOtherMenu : function() {
            var self = this;
            self.set("toogle", false);
            var m = $(".mouse-menu");
            m && m.remove();
        }
    };

    var pageMenuAttrs = {
        ATTRS : {
            sid : {
                value : 0
            },
            type : {
                value : ""
            },
            open : {
                value : false
            },
            row : {
                value : ""
            },
            toogle : {
                value : false
            }
        }
    };

    module.exports = Base.extend(pageMenuExtension, pageMenuAttrs);
});

/** Compiled By kissy-xtemplate */
KISSY.add('page/mods/xtpl/roamList-xtpl',function (S, require, exports, module) {
        /*jshint quotmark:false, loopfunc:true, indent:false, asi:true, unused:false, boss:true*/
        return function (scope, S, undefined) {
            var buffer = "",
                config = this.config,
                engine = this,
                moduleWrap, utils = config.utils;
            if (typeof module !== "undefined" && module.kissy) {
                moduleWrap = module;
            }
            var runBlockCommandUtil = utils.runBlockCommand,
                renderOutputUtil = utils.renderOutput,
                getPropertyUtil = utils.getProperty,
                runInlineCommandUtil = utils.runInlineCommand,
                getPropertyOrRunCommandUtil = utils.getPropertyOrRunCommand;
            buffer += '<div class="ui-roam-body" id="J_roamBody" style="height:0;">\r\n\t<div class="ui-roam-title">\r\n\t\t<span>正在漫游...</span>\r\n\t\t<div class="ui-roam-close"><a data-event="close">关闭漫游</a></div>\r\n\t</div>\r\n\t<div class="ui-roam-main" id="J_roamMain">\r\n\t\t';
            var config4 = {};
            config4.fn = function (scope) {
                var buffer = "";
                buffer += '\r\n\t\t<div class="ui-roam-item" ondblclick="SEIYAEVENT.roamDblclick(this, ';
                var id0 = getPropertyOrRunCommandUtil(engine, scope, {}, "song_id", 0, 8);
                buffer += renderOutputUtil(id0, true);
                buffer += ')" id="J_roamItem';
                var id1 = getPropertyOrRunCommandUtil(engine, scope, {}, "song_id", 0, 8);
                buffer += renderOutputUtil(id1, true);
                buffer += '">\r\n\t\t\t<div class="ui-roam-sort"><em data-type="roam" data-sid="';
                var id2 = getPropertyOrRunCommandUtil(engine, scope, {}, "song_id", 0, 9);
                buffer += renderOutputUtil(id2, true);
                buffer += '"></em></div>\r\n\t\t\t<div class="ui-roam-item-column c1">';
                var id3 = getPropertyOrRunCommandUtil(engine, scope, {}, "title", 0, 10);
                buffer += renderOutputUtil(id3, false);
                buffer += '</div>\r\n\t\t\t<div class="ui-roam-item-column c2">';
                var id4 = getPropertyOrRunCommandUtil(engine, scope, {}, "artistfun", 0, 11);
                buffer += renderOutputUtil(id4, false);
                buffer += '</div>\r\n\t\t\t<div class="ui-roam-item-column c3"><a href="http://www.xiami.com/album/';
                var id5 = getPropertyOrRunCommandUtil(engine, scope, {}, "album_id", 0, 12);
                buffer += renderOutputUtil(id5, true);
                buffer += '" target="_blank" title="';
                var id6 = getPropertyOrRunCommandUtil(engine, scope, {}, "album_name", 0, 12);
                buffer += renderOutputUtil(id6, false);
                buffer += '">';
                var id7 = getPropertyOrRunCommandUtil(engine, scope, {}, "album_name", 0, 12);
                buffer += renderOutputUtil(id7, false);
                buffer += '</a></div>\r\n\t\t\t<div class="ui-roam-control">\r\n\t\t\t\t';
                var config8 = {};
                var params9 = [];
                var id10 = getPropertyUtil(engine, scope, "grade", 0, 14);
                params9.push((id10 * (1)) === (-1));
                config8.params = params9;
                config8.fn = function (scope) {
                    var buffer = "";
                    buffer += '\r\n\t\t\t\t<a class="fav-btn icon-roam-fav" data-type="roam" data-sid="';
                    var id11 = getPropertyOrRunCommandUtil(engine, scope, {}, "song_id", 0, 15);
                    buffer += renderOutputUtil(id11, true);
                    buffer += '" data-event="fav" title="收藏"></a>\r\n\t\t\t\t';
                    return buffer;
                };
                config8.inverse = function (scope) {
                    var buffer = "";
                    buffer += '\r\n\t\t\t\t<a class="fav-btn icon-roam-faved" data-type="roam" data-sid="';
                    var id12 = getPropertyOrRunCommandUtil(engine, scope, {}, "song_id", 0, 17);
                    buffer += renderOutputUtil(id12, true);
                    buffer += '" data-event="fav" title="取消收藏"></a>\r\n\t\t\t\t';
                    return buffer;
                };
                buffer += runBlockCommandUtil(engine, scope, config8, "if", 14);
                buffer += '\r\n\t\t\t\t<a class="more-btn icon-roam-more" data-type="roam" data-sid="';
                var id13 = getPropertyOrRunCommandUtil(engine, scope, {}, "song_id", 0, 19);
                buffer += renderOutputUtil(id13, true);
                buffer += '" data-event="more" title="更多"></a>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t';
                return buffer;
            };
            buffer += runBlockCommandUtil(engine, scope, config4, "songs", 7);
            buffer += '\r\n\t</div>\r\n</div>';
            return buffer;
        };
});
/** Compiled By kissy-xtemplate */
KISSY.add('page/mods/xtpl/roamItem-xtpl',function (S, require, exports, module) {
        /*jshint quotmark:false, loopfunc:true, indent:false, asi:true, unused:false, boss:true*/
        return function (scope, S, undefined) {
            var buffer = "",
                config = this.config,
                engine = this,
                moduleWrap, utils = config.utils;
            if (typeof module !== "undefined" && module.kissy) {
                moduleWrap = module;
            }
            var runBlockCommandUtil = utils.runBlockCommand,
                renderOutputUtil = utils.renderOutput,
                getPropertyUtil = utils.getProperty,
                runInlineCommandUtil = utils.runInlineCommand,
                getPropertyOrRunCommandUtil = utils.getPropertyOrRunCommand;
            buffer += '';
            var config3 = {};
            config3.fn = function (scope) {
                var buffer = "";
                buffer += '\r\n<div class="ui-roam-item" ondblclick="SEIYAEVENT.roamDblclick(this, ';
                var id0 = getPropertyOrRunCommandUtil(engine, scope, {}, "song_id", 0, 2);
                buffer += renderOutputUtil(id0, true);
                buffer += ')" id="J_roamItem';
                var id1 = getPropertyOrRunCommandUtil(engine, scope, {}, "song_id", 0, 2);
                buffer += renderOutputUtil(id1, true);
                buffer += '">\r\n\t<div class="ui-roam-sort"><em data-type="roam" data-sid="';
                var id2 = getPropertyOrRunCommandUtil(engine, scope, {}, "song_id", 0, 3);
                buffer += renderOutputUtil(id2, true);
                buffer += '"></em></div>\r\n\t<div class="ui-roam-item-column c1">';
                var id3 = getPropertyOrRunCommandUtil(engine, scope, {}, "title", 0, 4);
                buffer += renderOutputUtil(id3, false);
                buffer += '</div>\r\n\t<div class="ui-roam-item-column c2"><a href="http://www.xiami.com/artist/';
                var id4 = getPropertyOrRunCommandUtil(engine, scope, {}, "artist_id", 0, 5);
                buffer += renderOutputUtil(id4, true);
                buffer += '" target="_blank" title="';
                var id5 = getPropertyOrRunCommandUtil(engine, scope, {}, "artist", 0, 5);
                buffer += renderOutputUtil(id5, false);
                buffer += '">';
                var id6 = getPropertyOrRunCommandUtil(engine, scope, {}, "artist", 0, 5);
                buffer += renderOutputUtil(id6, false);
                buffer += '</a></div>\r\n\t<div class="ui-roam-item-column c3"><a href="http://www.xiami.com/album/';
                var id7 = getPropertyOrRunCommandUtil(engine, scope, {}, "album_id", 0, 6);
                buffer += renderOutputUtil(id7, true);
                buffer += '" target="_blank" title="';
                var id8 = getPropertyOrRunCommandUtil(engine, scope, {}, "album_name", 0, 6);
                buffer += renderOutputUtil(id8, false);
                buffer += '">';
                var id9 = getPropertyOrRunCommandUtil(engine, scope, {}, "album_name", 0, 6);
                buffer += renderOutputUtil(id9, false);
                buffer += '</a></div>\r\n\t<div class="ui-roam-control">\r\n\t\t';
                var config10 = {};
                var params11 = [];
                var id12 = getPropertyUtil(engine, scope, "grade", 0, 8);
                params11.push((id12 * (1)) === (-1));
                config10.params = params11;
                config10.fn = function (scope) {
                    var buffer = "";
                    buffer += '\r\n\t\t<a class="fav-btn icon-roam-fav" data-type="roam" data-sid="';
                    var id13 = getPropertyOrRunCommandUtil(engine, scope, {}, "song_id", 0, 9);
                    buffer += renderOutputUtil(id13, true);
                    buffer += '" data-event="fav" title="收藏"></a>\r\n\t\t';
                    return buffer;
                };
                config10.inverse = function (scope) {
                    var buffer = "";
                    buffer += '\r\n\t\t<a class="fav-btn icon-roam-faved" data-type="roam" data-sid="';
                    var id14 = getPropertyOrRunCommandUtil(engine, scope, {}, "song_id", 0, 11);
                    buffer += renderOutputUtil(id14, true);
                    buffer += '" data-event="fav" title="取消收藏"></a>\r\n\t\t';
                    return buffer;
                };
                buffer += runBlockCommandUtil(engine, scope, config10, "if", 8);
                buffer += '\r\n\t\t<a class="more-btn icon-roam-more" data-type="roam" data-sid="';
                var id15 = getPropertyOrRunCommandUtil(engine, scope, {}, "song_id", 0, 13);
                buffer += renderOutputUtil(id15, true);
                buffer += '" data-event="more" title="更多"></a>\r\n\t</div>\r\n</div>\r\n';
                return buffer;
            };
            buffer += runBlockCommandUtil(engine, scope, config3, "songs", 1);
            return buffer;
        };
});
KISSY.add('page/mods/player/player-roam',['node', 'base', 'anim', 'xtemplate', 'event', '../xtpl/roamList-xtpl', '../xtpl/roamItem-xtpl'], function(S, require, exports, module) {

    var $ = require("node").all;
    var Base = require("base");
    var Anim = require("anim");
    var Xtemplate = require("xtemplate");
    var Event = require("event");
    var TplRoamList = require("../xtpl/roamList-xtpl");
    var TplRoamItem = require('../xtpl/roamItem-xtpl');

    var roamExtension = {
        initializer: function() {
            var self = this;
            self.TPL_roamList = new Xtemplate(TplRoamList);
            self.TPL_roamItem = new Xtemplate(TplRoamItem);
            self.countStep = 0;
            self.animObj = null;
        },

        render: function(tosid, songs) {
            //J_roamWrap2084014
            var self = this;
            if (songs.length == 0 || songs.length < 10)
                return false;
            self.set("songId", tosid);
            self.set("songs", songs);
            var wrap = $("#J_roamWrap" + tosid);
            var data = {
                sid: tosid,
                songs: songs.slice(0, 5),
                artistfun: function() {
                    var artist = S.unEscapeHTML(this.artist);
                    var arr = artist.split(";"),
                        result = [];
                    if (arr.length == 1) {
                        return '<a href="' + this.artist_url + '" target="_blank" title="' + artist + '">' + artist + '</a>';
                    }
                    for (var i = 0, max = arr.length; i < max; i++) {
                        result.push('<a href="http://www.xiami.com/search/find/artist/' + arr[i] + '" target="_blank" title="' + arr[i] + '">' + arr[i] + '</a>');
                    }
                    return result.join(" ; ");
                }
            };
            var html = self.TPL_roamList.render(data);
            wrap.one(".ui-roam-head").hide();
            $("#J_roamWrap" + tosid).append(html);
            new Anim(wrap.one(".ui-roam-body"), {
                'height': '245px'
            }, 0.5, "linear", function() {
                //$("#J_trackList" + tosid).removeClass('ui-track-current').addClass('ui-track-roaming');
                $("#J_trackList" + tosid).one(".ui-track-sort").removeClass(".ui-track-sort-roam");
                self.fire('renderComplete');
            }).run();
        },
        add: function(arr, count) {
            var self = this;
            var html = self.TPL_roamItem.render({
                "songs": arr
            });
            $("#J_roamMain").append(html);
            self.countStep += count;
            self.remove();
        },
        change: function(arr) {
            var self = this;
            var html = self.TPL_roamItem.render({
                "songs": arr
            });
            $("#J_roamMain").html(html);
        },
        remove: function() {
            var self = this;
            var item = $("#J_roamMain").first('.ui-roam-item');
            if (!item)
                return false;
            if (self.animObj && self.animObj.isRunning())
                return false;
            item.css("margin-top", "0px");
            self.animObj = new Anim(item, {
                "margin-top": "-41px"
            }, {
                'easing': "linear ",
                'duration': 1.5,
                'queue': true,
                'useTransition': true,
                'complete': function() {
                    self.countStep -= 1;
                    item.remove();
                    if (self.countStep > 0) {
                        self.remove();
                    }
                }
            });
            self.animObj && self.animObj.run();
        },
        /**
         * 漫游触发前的文案提示
         * @param  {Number} sid    歌曲ID
         */
        before: function(sid) {
            var self = this;
            $("#J_trackList" + sid).one(".ui-roam-head").html("<p>正在寻找相似歌曲...</p>");
            $("#J_trackList" + sid).one(".ui-track-sort").addClass(".ui-track-sort-roam");
        },
        /**
         * 漫游结束后的文案提示
         * @param  {Number} sid 歌曲ID
         */
        after: function(sid) {
            var self = this;
            $("#J_trackList" + sid).one(".ui-roam-head").html("<p>啊哦，没有找到相似歌曲。</p>");
            $("#J_trackList" + sid).one(".ui-track-sort").removeClass(".ui-track-sort-roam");
        },
        showRoamIcon: function() {
            var self = this;
            var sid = self.get('songId');
            var target = $("#J_trackList" + sid);
            if (target.hasClass('ui-track-current')) {
                target.removeClass('ui-track-current').addClass('ui-track-roaming');
            };
        }
    };

    var roamAttrs = {
        ATTRS: {
            songId: {
                value: 0
            },
            songs: {
                value: null
            }
        }
    };

    module.exports = Base.extend(roamExtension, roamAttrs);
});

/**
 * @author:宝码
 * @email : nongyoubao@alibaba-inc.com
 */
KISSY.add('page/mods/player/player-log',['io'], function(S, require) {

    var IO = require("io");

    var url = 'http://www.xiami.com/recommend/log';

    var log = {
        send : function(note, op, len, name, id, uid, terminal) {
            if (S.isUndefined(note))
                return;
            var terminal = terminal || "web";
            new IO({
                "type" : "get",
                "url" : url,
                "data" : {
                    "rec_note" : note,
                    "op" : op,
                    "terminal" : terminal,
                    "playlen" : len,
                    "object_name" : name,
                    "objectid" : id,
                    "userid" : uid
                }
            })
        }
    };

    return log;

});

/**
 * @ignore
 * auto scroll for drag object's container
 * @author yiminghe@gmail.com
 */
KISSY.add('utils/dd/plugin/scroll',['node', 'dd', 'base'], function(S, require) {
    var Node = require('node'),
        DD = require('dd'),
        Base = require('base');
    var DDM = DD.DDM,
        win = S.Env.host,
        SCROLL_EVENT = '.-ks-dd-scroll' + S.now(),
        RATE = [10, 10],
        ADJUST_DELAY = 100,
        DIFF = [20, 20],
        isWin = S.isWindow;

    /**
     * @class KISSY.DD.Plugin.Scroll
     * @extends KISSY.Base
     * Scroll plugin to make parent node scroll while dragging.
     */
    return Base.extend({

        pluginId: 'dd/plugin/scroll',

        /**
         * Get container node region.
         * @private
         */
        getRegion: function(node) {
            if (isWin(node[0])) {
                return {
                    width: node.width(),
                    height: node.height()
                };
            } else {
                return {
                    width: node.outerWidth(),
                    height: node.outerHeight()
                };
            }
        },

        /**
         * Get container node offset.
         * @private
         */
        getOffset: function(node) {
            if (isWin(node[0])) {
                return {
                    left: node.scrollLeft(),
                    top: node.scrollTop()
                };
            } else {
                return node.offset();
            }
        },

        /**
         * Get container node scroll.
         * @private
         */
        getScroll: function(node) {
            return {
                left: node.scrollLeft(),
                top: node.scrollTop()
            };
        },

        /**
         * scroll container node.
         * @private
         */
        /**
         * 仅实用与 scrollView 的组件方法
         * @param {[type]} node [description]
         * @param {[type]} r    [description]
         */
        setScroll: function(node, r) {
            var self = this;
            if(!self.scrollView){
                node.scrollLeft(r.left);
                node.scrollTop(r.top);
            }else{
                var so ={
                    left : self.scrollView.get('scrollLeft'),
                    top : st = self.scrollView.get('scrollTop')
                }
                so.left += r.left;
                so.top += r.top;
                self.scrollView.scrollToWithBounds(so)
            }
            
            
        },

        /**
         * make node not to scroll while this drag object is dragging
         * @param {KISSY.DD.Draggable} drag
         * @private
         */
        pluginDestructor: function(drag) {
            drag.detach(SCROLL_EVENT);
        },

        /**
         * make node to scroll while this drag object is dragging
         * @param {KISSY.DD.Draggable} drag
         * @private
         */
        pluginInitializer: function(drag) {
            var self = this,
                node = self.get('node');
            self.scrollView = self.get('scrollView');

            var rate = self.get('rate'),
                diff = self.get('diff'),
                event,
                // 目前相对 container 的偏移，container 为 window 时，相对于 viewport
                dxy,
                timer = null;

            // fix https://github.com/kissyteam/kissy/issues/115
            // dragDelegate 时 可能一个 dragDelegate对应多个 scroll
            // check container

            function checkContainer() {
                if (isWin(node[0])) {
                    return 0;
                }
                // 判断 proxyNode，不对 dragNode 做大的改变
                var mousePos = drag.mousePos,
                    r = DDM.region(node);

                if (!DDM.inRegion(r, mousePos)) {
                    clearTimeout(timer);
                    timer = 0;
                    return 1;
                }
                return 0;
            }

            function dragging(ev) {
                // 给调用者的事件，框架不需要处理
                // fake 也表示该事件不是因为 mouseover 产生的
                if (ev.fake) {
                    return;
                }

                if (checkContainer()) {
                    return;
                }

                // 更新当前鼠标相对于拖节点的相对位置
                event = ev;
                dxy = S.clone(drag.mousePos);
                var offset = self.getOffset(node);
                dxy.left -= offset.left;
                dxy.top -= offset.top;
                if (!timer) {
                    checkAndScroll();
                }
            }

            function dragEnd() {
                clearTimeout(timer);
                timer = null;
            }

            drag.on('drag' + SCROLL_EVENT, dragging);

            drag.on('dragstart' + SCROLL_EVENT, function() {
                DDM.cacheWH(node);
            });

            drag.on('dragend' + SCROLL_EVENT, dragEnd);

            function checkAndScroll() {
                if (checkContainer()) {
                    return;
                }

                var r = self.getRegion(node),
                    nw = r.width,
                    nh = r.height,
                    scroll = self.getScroll(node),
                    origin = S.clone(scroll),
                    diffY = dxy.top - nh,
                    adjust = false;
                if (diffY >= -diff[1]) {
                    scroll.top += rate[1];
                    adjust = true;
                }

                var diffY2 = dxy.top;

                if (diffY2 <= diff[1]) {
                    scroll.top -= rate[1];
                    adjust = true;
                }

                var diffX = dxy.left - nw;

                if (diffX >= -diff[0]) {
                    scroll.left += rate[0];
                    adjust = true;
                }

                var diffX2 = dxy.left;

                if (diffX2 <= diff[0]) {
                    scroll.left -= rate[0];
                    adjust = true;
                }
                if (adjust) {
                    self.setScroll(node, scroll);
                    timer = setTimeout(checkAndScroll, ADJUST_DELAY);
                    // 不希望更新相对值，特别对于相对 window 时，相对值如果不真正拖放触发的 drag，是不变的，
                    // 不会因为程序 scroll 而改变相对值

                    // 调整事件，不需要 scroll 监控，达到预期结果：元素随容器的持续不断滚动而自动调整位置.
                    event.fake = true;
                    if (isWin(node[0])) {
                        // 当使 window 自动滚动时，也要使得拖放物体相对文档位置随 scroll 改变
                        // 而相对 node 容器时，只需 node 容器滚动，拖动物体相对文档位置不需要改变
                        scroll = self.getScroll(node);
                        event.left += scroll.left - origin.left;
                        event.top += scroll.top - origin.top;
                    }
                    // 容器滚动了，元素也要重新设置 left,top
                    if (drag.get('move')) {
                        drag.get('node').offset(event);
                    }
                    drag.fire('drag', event);
                } else {
                    timer = null;
                }
            }
        }
    }, {
        ATTRS: {
            /**
             * node to be scrolled while dragging
             * @cfg {Window|String|HTMLElement} node
             */
            /**
             * @ignore
             */
            scrollView: {
                value: null
            },
            node: {
                // value:window：不行，默认值一定是简单对象
                valueFn: function() {
                    return Node.one(win);
                },
                setter: function(v) {
                    return Node.one(v);
                }
            },
            /**
             * adjust velocity, larger faster
             * default [10,10]
             * @cfg {Number[]} rate
             */
            /**
             * @ignore
             */
            rate: {
                value: RATE
            },
            /**
             * the margin to make node scroll, easier to scroll for node if larger.
             * default  [20,20]
             * @cfg {number[]} diff
             */
            /**
             * @ignore
             */
            diff: {
                value: DIFF
            }
        }
    });
});

/**
 * @author noyobo
 * @mail nongyoubao@alibaba-inc.com
 * @description 歌曲拖拽 2014-04-08 15:58:26
 */
KISSY.add('page/mods/player/player-drag',['node', 'event', 'dd', 'dd/plugin/proxy', 'utils/dd/plugin/scroll', 'dd/plugin/constrain', 'io', 'utils/base', 'base'], function(S, require, exports, module) {

    var Node = require('node'),
        Event = require('event'),
        DD = require('dd'),
        Proxy = require('dd/plugin/proxy'),
        Scroll = require('utils/dd/plugin/scroll'),
        Constrain = require('dd/plugin/constrain'),
        IO = require('io'),
        BaseConfig = require('utils/base'),
        Base = require('base');

    var $ = Node.all;

    var DDM = DD.DDM,
        DraggableDelegate = DD.DraggableDelegate,
        DroppableDelegate = DD.DroppableDelegate,
        Draggable = DD.Draggable,
        Droppable = DD.Droppable;

    module.exports = Base.extend({
        initializer: function() {
            var self = this;
            /*
            元素列表拖拽定义,用于碰撞检测
             */
            self.dragLine = $('<div id="J_dragLine" class="seiya-drag-line"></div>');
            self.drapNode = null;
            self.dropNode = null;
            self.insertType = 'after';

            self.dragIndex = 0;
            self.dropIndex = 0;

            self.dropCollect = null;

            self.scrollView = self.get('scrollView');

            // 排序拖拽检测
            self.dropDelegate = new DroppableDelegate({
                container: '#J_pagePlayList',
                selector: self.get('selector')
            });
            self.dropDelegate.on('dropenter', function(event) {
                //S.log('dropenter 进入元素')
                self.dragLine.show();
            });
            self.dropDelegate.on('dropexit', function(event) {
                //S.log('dropexit 退出元素')
                self.dragLine.hide();
            });
            self.dropDelegate.on('dropover', function(event) {
                var drag = event.drag,
                    drapNode = drag.get('dragNode');
                var drop = event.drop,
                    dropNode = drop.get('node');
                var middleDropY = (dropNode.offset().top * 2 + dropNode.height()) / 2;
                self.drapNode = drapNode;
                self.dropNode = dropNode;
                if (event.pageY > middleDropY) {
                    self.insertType = 'after';
                    self.dragLine.insertAfter(dropNode);
                } else {
                    self.insertType = 'before';
                    self.dragLine.insertBefore(dropNode);
                }
            });
            self.dropDelegate.on('drophit', function(event) {
                self.dragLine.remove();
                if (self.insertType == 'after') {
                    self.drapNode.insertAfter(self.dropNode);
                } else {
                    self.drapNode.insertBefore(self.dropNode);
                }
                self.dragIndex = Number(self.drapNode.attr('data-index')) - 1;
                self.dropIndex = Number(self.dropNode.attr('data-index')) - 1;
                self.drapNode = null;
                self.dropNode = null;
                self._sortList();
                if (self.insertType == 'after' && (self.dragIndex !== (+self.dropIndex + 1))) {
                    self.fire('sort', {
                        'data': {
                            'insertType': self.insertType,
                            'dragIndex': self.dragIndex,
                            'dropIndex': self.dropIndex
                        }
                    });
                }
                if (self.insertType == 'before' && ((self.dragIndex + 1) !== self.dropIndex)) {
                    self.fire('sort', {
                        'data': {
                            'insertType': self.insertType,
                            'dragIndex': self.dragIndex,
                            'dropIndex': self.dropIndex
                        }
                    });
                };
            });
            /**
             * 拖拽元素定义
             * @type {DraggableDelegate}
             */
            self.dragDelegate = new DraggableDelegate({
                container: self.get('container'),
                handlers: self.get('handlers'),
                selector: self.get('selector'),
                move: self.get('move'),
                plugins: [
                    new Scroll({
                        node: "#J_tracksScrollView",
                        scrollView: self.scrollView,
                        diff: [40, 40]
                    })
                ]
            });

            self.dragDelegate.on('dragstart', function(event) {
                self.set('flag', true);
                // 开始拖拽 显示 鼠标跟随
                var x = event.pageX || event.left;
                var y = event.pageY || event.top;
                self._showMouseDragIcon(x, y);
                var dragNode = event.drag.get('dragNode');
                var dragObj = {
                    'sid': dragNode.attr('data-sid'),
                    'index': dragNode.attr('data-index') || -1,
                    'type': dragNode.attr('data-type')
                }
                self.set('dragObj', dragObj, {
                    'slient': true
                })
                // S.log(dragObj)
            })
            self.dragDelegate.on('dragend', function(event) {
                self.set('flag', false);
                // 结束拖拽, 删除 鼠标跟随
                self._removeMouseDragIcon();
                self.dragLine.remove();
                self._dragEnterHandler();
                self.reset('dragObj', {
                    'slient': true
                });
                self.dropCollect = null;
            })
            self.dragDelegate.on('drag', function(event) {
                var x = event.pageX || event.left;
                var y = event.pageY || event.top;
                self._moveMouseDragIcon(x, y);
            })

            // 拖拽进入精选集
            // 拖拽列表
            self.collectDrapDelegate = new DroppableDelegate({
                container: '#J_collectList',
                selector: '.collect-item'
            })
            self.collectDrapDelegate.on('dropenter', function(event) {
                self.dropCollect = event.drop.get('node');
                self._dragEnterAdd();
            });
            self.collectDrapDelegate.on('dropover', function(event) {
                // S.log('dropover collect ');
            })
            self.collectDrapDelegate.on('dropexit', function(event) {
                self.dropCollect = null;
                self._dragExitAdd();
            });
        },
        /**
         * 拖拽结束是否有进入过可添加元素  Collect. 添加到精选集
         * @private
         */
        _dragEnterHandler: function() {
            var self = this;
            var dragObj = self.get('dragObj');
            if (self.dropCollect !== null) {
                var collectId = self.dropCollect.attr('data-id');
                self.http.addToCollect(dragObj.sid, collectId);
            }
        },
        _sortList: function() {
            var self = this;
            var listArr = $(self.get('container')).all(self.get('selector'));
            S.each(listArr, function(item, index) {
                $(item).attr('data-index', index + 1);
                var sort = $(item).one(".ui-track-sort");
                $(sort).html("<em>" + (index + 1) + "</em>");
            })
        },
        _showMouseDragIcon: function(x, y) {
            var self = this;
            self.icon = $('<div/>');
            self.icon.attr({
                'id': 'seiya-drag-icon',
                'class': 'drag-mouse-icon'
            });
            self.icon.css({
                'z-index': '9999',
                'position': 'absolute',
                'width': '25px',
                'height': '23px',
                'left': x + 12,
                'top': y + 12
            });
            self.icon.appendTo('body');
        },
        _moveMouseDragIcon: function(x, y) {
            var self = this;
            if (x > document.body.clientWidth - 37) {
                x = document.body.clientWidth - 37;
            }
            if (y > document.body.clientHeight - 35) {
                y = document.body.clientHeight - 35
            }
            if (self.icon) {
                self.icon.css({
                    'left': x + 12,
                    'top': y + 12
                })
            }
        },
        _removeMouseDragIcon: function() {
            var self = this;
            if (self.icon) {
                self.icon.remove();
                self.icon = null;
            } else {
                try {
                    $('#seiya-drag-icon').remove();
                } catch (e) {}
            }
        },
        /**
         * 显示拖动添加 Icon
         * @private
         */
        _dragEnterAdd: function() {
            var self = this;
            self.icon.addClass('drag-mouse-add');
        },
        _dragExitAdd: function() {
            var self = this;
            self.icon.removeClass('drag-mouse-add');
        },
        http: {
            addToCollect: function(sid, cid) {
                new IO({
                    url: BaseConfig.COLLECT_ADD_URL,
                    dataType: 'jsonp',
                    data: {
                        song_id: sid,
                        list_id: cid,
                        _xiamitoken: BaseConfig.getToken()
                    },
                    success:function(res){
                        if(!res.status){
                            alert(res.message)
                        }
                    }
                })
            }
        }
    }, {
        ATTRS: {
            scrollView: null,
            flag: {
                value: false
            },
            container: {
                value: '#J_tab'
            },
            handlers: {
                value: ['.ui-track-main']
            },
            selector: {
                value: '.ui-track-item'
            },
            move: {
                value: false
            },
            dragObj: {
                value: null
            }
        }
    });
});

/**
 * @fileOverview 数据请求管理中心
 * @author noyobo<nongyoubao@alibaba-inc.com>
 */
KISSY.add('page/mods/data/center',['io', 'base'], function(S, require) {
    var IO = require('io'),
        Base = require('base');

    return Base.extend({
        initializer: function() {
            var self = this;
            self.host = self.get('host');
        },
        load: function(url, atPlay) {
            var self = this;
            if (!url || url == '') return false;
            if (!atPlay) {
                atPlay = 0;
            }
            self.set('atPlay', atPlay);
            var status;
            new IO({
                url: self.host + url + '/cat/json',
                dataType: 'jsonp',
                success: function(responres) {
                    if (responres.status) {
                        self.set('lastSongId', responres.data.lastSongId);
                        self.set('lastSongToggle', responres.data.lastSongId!==0);
                        self.set('clearlist', responres.data.clearlist);
                        self.set('hqset', responres.data.hqset);
                        self.set('type', responres.data.type);
                        self.set('typeId', responres.data.type_id);
                        self.set('uid', responres.data.uid);
                        self.set('vip', responres.data.vip);
                        self.set('vipRole', responres.data.vip_role);
                        self.set('trackList', responres.data.trackList);
                        status = true;
                    }
                },
                error: function() {
                	status = false;
                },
                complete: function() {
                    self.fire('complete', {
                    	'status' : status
                    });
                }
            })
        }
    }, {
        ATTRS: {
            host: {
                value: 'http://www.xiami.com'
            },
            clearlist: null,
            hqset: null,
            type: null,
            typeId: null,
            uid: null,
            vip: null,
            vipRole: null,
            trackList: null,
            lastSongToggle: {
                value: false
            },
            lastSongId: {
                value: 0
            },
            atPlay: {
                value: 0
            }
        }
    })
})

/** Compiled By kissy-xtemplate */
KISSY.add('page/mods/xtpl/trackInfo-xtpl',function (S, require, exports, module) {
        /*jshint quotmark:false, loopfunc:true, indent:false, asi:true, unused:false, boss:true*/
        return function (scope, S, undefined) {
            var buffer = "",
                config = this.config,
                engine = this,
                moduleWrap, utils = config.utils;
            if (typeof module !== "undefined" && module.kissy) {
                moduleWrap = module;
            }
            var runBlockCommandUtil = utils.runBlockCommand,
                renderOutputUtil = utils.renderOutput,
                getPropertyUtil = utils.getProperty,
                runInlineCommandUtil = utils.runInlineCommand,
                getPropertyOrRunCommandUtil = utils.getPropertyOrRunCommand;
            buffer += '';
            var config8 = {};
            config8.fn = function (scope) {
                var buffer = "";
                buffer += '\r\n<a id="J_trackName" href="http://www.xiami.com/song/';
                var id0 = getPropertyOrRunCommandUtil(engine, scope, {}, "songId", 0, 2);
                buffer += renderOutputUtil(id0, true);
                buffer += '" title="';
                var id1 = getPropertyOrRunCommandUtil(engine, scope, {}, "song", 0, 2);
                buffer += renderOutputUtil(id1, false);
                buffer += '" target="_blank">';
                var id2 = getPropertyOrRunCommandUtil(engine, scope, {}, "song", 0, 2);
                buffer += renderOutputUtil(id2, false);
                buffer += '</a> - ';
                var id3 = getPropertyOrRunCommandUtil(engine, scope, {}, "artistfun", 0, 2);
                buffer += renderOutputUtil(id3, false);
                buffer += '\r\n';
                return buffer;
            };
            buffer += runBlockCommandUtil(engine, scope, config8, "data", 1);
            return buffer;
        };
});
KISSY.add('utils/tip/index',['node', 'base', 'event', 'xtemplate'], function(S, require, exports, module) {
    // @formatter:off
    var Node = require("node");
    var Base = require("base");
    var Event = require("event");
    var Xtemplate = require("xtemplate");
    // @formatter:on
    var $ = Node.all;

    var tpl = '<div class="{{theme}}" id="{{id}}"><div class="tip-inner tip-bg-image">{{{content}}}</div><div class="tip-arrow tip-arrow-bottom" style="visibility: inherit;"></div></div>';

    // require("./tip-twitter/tip-twitter.css");
    function Tip(comConfig){
        var self = this;
        self.init(comConfig);
    }

    Tip.prototype = {
        init : function(cfg){
            var self = this;
            self.timer = null;
            var option = self.option = S.merge({},{
                content: "hello world",
                target : "",
                className : "tip-twitter",
                alignX : "center",
                alignY : "center",
                offsetX : 5,
                offsetY : 5,
                maxWidth : "auto",
                duration : 5000
            },cfg);

            if(option.target == ""){
                return false;
            }

            var X = new Xtemplate(tpl);
            var html = X.render({
                theme : option.className,
                content : option.content,
                id : option.target.substr(1) + "-tip"
            });
            self.target = $(option.target);
            self.tipDiv = $(html);
        },
        show : function(){
            var self = this;

            var option = self.option;

            $(option.target + "-tip").remove();

            var cssObj = self.target.offset();
            var ww = self.target.width();

            self.tipDiv.css({
                position : "absolute",
                left: -999,
                top : -999
            }).appendTo("body");

            var w = self.tipDiv.outerWidth();
            var h = self.tipDiv.outerHeight();

            self.tipDiv.css({
                "left" : cssObj.left - w/2 + ww/2,
                "top" : cssObj.top - h - 10,
                "max-width" : option.maxWidth
            });

            self.timer = setTimeout(function(){
                self.destroy();
            }, option.duration);
            self._addEvent();

        },
        destroy : function(){
            var self = this;
            self.timer && clearTimeout(self.timer);
            self.tipDiv.fadeOut();
        },
        _addEvent : function(){
            var self = this;
            Event.on(self.tipDiv, "mouseenter", function(){
                self.timer && clearTimeout(self.timer);
            });
            Event.on(self.tipDiv, "mouseleave", function(){
                self.timer = setTimeout(function(){
                    self.destroy();
                }, self.option.duration);
            });
            Event.on(window, "resize" , function(event){
                var cssObj = self.target.offset();
                var ww = self.target.width();
                var w = self.tipDiv.outerWidth();
                var h = self.tipDiv.outerHeight();
                self.tipDiv.css({
                    "left" : cssObj.left - w/2 + ww/2,
                    "top" : cssObj.top - h - 10
                });
            });
        }
    };

    module.exports = Tip;
});
/** Compiled By kissy-xtemplate */
KISSY.add('page/mods/xtpl/user-xtpl',function (S, require, exports, module) {
        /*jshint quotmark:false, loopfunc:true, indent:false, asi:true, unused:false, boss:true*/
        return function (scope, S, undefined) {
            var buffer = "",
                config = this.config,
                engine = this,
                moduleWrap, utils = config.utils;
            if (typeof module !== "undefined" && module.kissy) {
                moduleWrap = module;
            }
            var runBlockCommandUtil = utils.runBlockCommand,
                renderOutputUtil = utils.renderOutput,
                getPropertyUtil = utils.getProperty,
                runInlineCommandUtil = utils.runInlineCommand,
                getPropertyOrRunCommandUtil = utils.getPropertyOrRunCommand;
            buffer += '';
            var config0 = {};
            var params1 = [];
            var id2 = getPropertyUtil(engine, scope, "uid", 0, 1);
            params1.push(id2 === (0));
            config0.params = params1;
            config0.fn = function (scope) {
                var buffer = "";
                buffer += '\r\n<div class="user unlogin">\r\n\t<div class="avatar">\r\n\t\t<img src="http://gtms01.alicdn.com/tps/i1/T1UJFKFtlfXXamt9jd-34-34.png" width="30" height="30" />\r\n\t</div>\r\n</div>\r\n<div class="mod-login" id="J_login">\r\n\t<div class="login-content">马上 <a href="#login" id="J_miniLogin">登录</a></div>\r\n</div>\r\n';
                return buffer;
            };
            config0.inverse = function (scope) {
                var buffer = "";
                buffer += '\r\n<div class="user">\r\n<div class="avatar">\r\n\t<a href="http://www.xiami.com/u/';
                var id3 = getPropertyOrRunCommandUtil(engine, scope, {}, "uid", 0, 13);
                buffer += renderOutputUtil(id3, true);
                buffer += '" target="_blank" title="';
                var id4 = getPropertyOrRunCommandUtil(engine, scope, {}, "name", 0, 13);
                buffer += renderOutputUtil(id4, false);
                buffer += '">\r\n\t\t';
                var config5 = {};
                var params6 = [];
                var id7 = getPropertyUtil(engine, scope, "avatar", 0, 14);
                params6.push(id7);
                config5.params = params6;
                config5.fn = function (scope) {
                    var buffer = "";
                    buffer += '\r\n\t\t<img src="http://img.xiami.net/';
                    var id8 = getPropertyOrRunCommandUtil(engine, scope, {}, "avatar", 0, 15);
                    buffer += renderOutputUtil(id8, true);
                    buffer += '" width="30" height="30" alt="';
                    var id9 = getPropertyOrRunCommandUtil(engine, scope, {}, "name", 0, 15);
                    buffer += renderOutputUtil(id9, false);
                    buffer += '" />\r\n\t\t';
                    return buffer;
                };
                config5.inverse = function (scope) {
                    var buffer = "";
                    buffer += '\r\n\t\t<img src="http://img.xiami.net//res/img/default/usr50.gif" width="30" height="30" alt="';
                    var id10 = getPropertyOrRunCommandUtil(engine, scope, {}, "name", 0, 17);
                    buffer += renderOutputUtil(id10, false);
                    buffer += '">\r\n\t\t';
                    return buffer;
                };
                buffer += runBlockCommandUtil(engine, scope, config5, "if", 14);
                buffer += '\r\n\t</a>\r\n</div>\r\n<em clas="msg" id="J_userMsg" style="display: none">0</em>\r\n</div>\r\n<div class="friend" id="J_friend"></div>\r\n';
                return buffer;
            };
            buffer += runBlockCommandUtil(engine, scope, config0, "if", 1);
            return buffer;
        };
});
KISSY.add('page/mods/user',['node', 'cookie', 'base', 'xtemplate', 'widget/tool/index', 'io', 'utils/base', './xtpl/user-xtpl'], function(S, require, exports, module) {
    // @formatter:off
    var Node = require("node"),
        Cookie = require("cookie"),
        Base = require("base"),
        Xtemplate = require("xtemplate"),
        UTool = require("widget/tool/index"),
        IO = require("io"),
        BaseConfig = require("utils/base"),
        TplUser = require("./xtpl/user-xtpl");
    // @formatter:on
    var $ = Node.all;
    var userExtention = {
        initializer : function() {
            var self = this;
            var userInfo = Cookie.get("user");
            if (S.isUndefined(userInfo)) {
                $("#J_miniLogin").on("click", function() {
                    UTool.miniLogin();
                });
                return;
            };
            self.sync();
        },
        render : function() {
            var self = this;
            var obj = self.getAttrVals();
            var TPL_USER = new Xtemplate(TplUser);
            var html = TPL_USER.render(obj);
            if (self.get("wrap")) {
                self.get("wrap").html(html);
            };
        },
        sync : function() {
            var self = this;
            var userInfo = Cookie.get("user");
            if (S.isUndefined(userInfo)) {
                return;
            };
            userInfo = userInfo.split('"');
            if (S.isArray(userInfo)) {
                self.set("uid", userInfo[0]);
                self.set("name", userInfo[1]);
                self.set("avatar", userInfo[2]);
                self.set("identity", userInfo[3]);
                self.set("credits", userInfo[4]);
                self.set("level", userInfo[5]);
                self.set("follow", userInfo[6]);
                self.set("fans", userInfo[7]);
                self.set("listened", userInfo[8]);
                self.render();
                new IO({
                    type : "get",
                    url : BaseConfig.UPDATE_VIP,
                    data : {
                        "user_id" : self.get("uid")
                    },
                    dataType : "jsonp",
                    success : function(respones) {
                        self.fire("sync", {
                            data : respones
                        });
                    }
                });
            };
            S.log(self.getAttrVals());
        }
    };

    var userAttrs = {
        ATTRS : {
            wrap : {
                value : "",
                setter : function(v) {
                    return $(v);
                }
            },
            uid : {
                value : 0
            },
            name : {
                value : ""
            },
            avatar : {
                value : ""
            },
            identity : {
                //身份
                value : 0
            },
            credits : {
                // 积分
                value : 0
            },
            level : {
                // 等级
                value : 0
            },
            follow : {
                value : 0
            },
            fans : {
                value : 0
            },
            listened : {
                value : 0
            }
        }
    };

    module.exports = Base.extend(userExtention, userAttrs);
});

KISSY.add('utils/goldlog/index',function(S) {
    var Glodlog = {
        record: function(a, b, c, d) {
            if(window.goldlog){
                window.goldlog.record(a, b, c, d);
            }
        }
    };

    return Glodlog;
});

/**
 * @author noyobo
 * @mail nongyoubao@alibaba-inc.com
 */
KISSY.add('page/mods/player',['node', 'base', 'json', 'event', 'io', 'xtemplate', './player/player-swfobj', './player/player-lrc', './player/player-sale', './player/player-lister', './player/player-volume', './player/player-panel', './player/player-control', './player/player-tracks', './player/player-blur', './player/player-data', './player/player-menu', './player/player-roam', './player/player-log', './player/player-drag', './data/center', './xtpl/trackInfo-xtpl', 'widget/tool/index', 'utils/tip/index', './user', 'utils/goldlog/index'], function(S, require, exports, module) {
    // @formatter:off
    var Node = require("node"),
        Base = require("base"),
        Json = require("json"),
        Event = require('event'),
        IO = require('io'),
        Xtemplate = require("xtemplate"),
        //PlayerSwf = require("./player/player-swf"),
        PlayerSwf = require("./player/player-swfobj"),
        PlayerLrc = require("./player/player-lrc"),
        PlayerSale = require('./player/player-sale'),
        PlayerLister = require("./player/player-lister"),
        PlayerVolume = require("./player/player-volume"),
        PlayerPanel = require("./player/player-panel"),
        PlayerControl = require("./player/player-control"),
        PlayerTracks = require("./player/player-tracks"),
        PlayerBlur = require("./player/player-blur"),
        PlayerData = require("./player/player-data"),
        PlayerMenu = require("./player/player-menu"),
        PlayerRoam = require("./player/player-roam"),
        PlayerLog = require('./player/player-log'),
        PlayerDrag = require('./player/player-drag'),
        DataCenter = require('./data/center'),
        Tpl_trackInfo = require("./xtpl/trackInfo-xtpl"),
        UTool = require("widget/tool/index"),
        Tip = require("utils/tip/index"),
        User = require("./user"),
        Goldlog = require('utils/goldlog/index');
    // @formatter:on
    var $ = Node.all;

    var CoverTpl = '{{#if cover}}<a href="{{^if albumId===0}}http://www.xiami.com/album/{{albumId}}{{else}}http://www.xiami.com/artist/{{artistId}}{{/if}}" target="_blank" title="{{album}}-{{artist}}"><img src="{{cover}}?v=sya" alt="{{album}}-{{artist}}"></a>{{else}}<img src="http://gtms01.alicdn.com/tps/i1/T1THUfFc8jXXaC1Jrl-250-250.png" width="250" height="250" />{{/if}}';
    var Tpl_cover = new Xtemplate(CoverTpl);

    function player() {
        // @formatter:off
        Audio: null;
        XIAMIPLAYER: null;
        dataUrl: null;
        // @formatter:on
    };
    player.prototype = {
        init: function(url, config) {
            var self = this;
            self.config = config;
            self.dataUrl = url;

            self.tpl_trackInfo = new Xtemplate(Tpl_trackInfo);
            self.Play_btn = $("#J_playBtn");
            self.Prev_btn = $("#J_prevBtn");
            self.Next_btn = $("#J_nextBtn");
            self.High_btn = $("#J_playerHQ");
            self.Mode_btn = $("#J_playerMode");

            self.Fav_btn = $("#J_trackFav");
            self.More_btn = $("#J_trackMore");
            self.Share_btn = $("#J_trackShare");

            self.Track_info = $("#J_trackInfo");
            self.Cover = $("#J_playerCover");
            self.Sale = $('#J_albumSale');
            self.LrcWrap = $('#J_lyricScrollWrap');

            self.PlayerWrap = $("#J_playerWrap");

            self.BODY = $("#middle");

            self.High_Timer = null;
            self.High_Runing = false;
            self.isVIP = false;
            self.autoplay = true;
            self.__FLASHREADY__ = false;

            self._opLock = null;

            self.Audio = new PlayerSwf(self.config);

            new IO({
                url: 'http://42.120.74.204.3580.dns-detect.alicdn.com/api/cdnDetect',
                data: {
                    'method': 'commitDetect',
                    'detectId': 3580
                },
                dataType: 'jsonp',
                jsonp: 'cb',
                success: function(res) {
                    if (res.retCode === 0 && res.description === 'Ok') {
                        self.syncDns(res.content.ldns, res.content.localIp);
                    }
                }
            })
            self.PlayerSale = new PlayerSale();
            self.USER = new User();
            self._playerListen();
            self._playerMenu();
            self._playerRoam();
            self._playerBlur();
            self._playerTracks();
            self._playerVolume();
            self._playerControl();
            self._playerPanel();
            self._playerData();
            self._playerLrc();
            self._playerDrag();
            self._dataCenter();
            self._addEvent();

            if (self.USER.get('identity')<2) {
                var tip = new Tip({
                    target: '#J_playerHQ',
                    content: '<p class="tip_60d"><a href="http://www.xiami.com/apps/mobile?vip" target="_blank"><strong>即刻享受高品质</strong><em>安装虾米音乐APP 免费领2个月VIP</em>对耳朵好一点 更纯粹 更细节</a></p>',
                    maxWidth: '300px',
                    duration: 10000
                });
                tip.show();
            }
  
        },
        syncDns: function(dns, ip) {
            var self = this;
            self.Audio.dns(dns, ip);
        },
        sync: function(data) {
            var self = this;
            if (data.status) {
                self.isVIP = data.data.vip == 1;
                self.Audio.sync();
            }
        },
        setMusicInfo: function(json, passtime) {
            var self = this;
            var track = Json.parse(json);
            var title = document.title,
                msg = "";
            if (title.indexOf("】") > -1) {
                msg = title.split("】")[0] + "】";
            };
            document.title = msg + "正在播放:" + S.unEscapeHTML(track.song + "-" + track.artist);
            //UTool.changeFavicon("http://res.xiami.net/play.ico");
            self.BODY.addClass("playing");
            var data = {
                data: [track],
                artistfun: function() {
                    var artist = S.unEscapeHTML(this.artist);
                    var arr = artist.split(";"),
                        result = [];
                    if (arr.length == 1) {
                        return '<a href="' + this.artistUrl + '" target="_blank" title="' + artist + '">' + artist + '</a>';
                    }
                    for (var i = 0, max = arr.length; i < max; i++) {
                        result.push('<a href="http://www.xiami.com/search/find/artist/' + arr[i] + '" target="_blank" title="' + arr[i] + '">' + arr[i] + '</a>');
                    }
                    return result.join(" ; ");
                }
            };
            var html = self.tpl_trackInfo.render(data);
            self.Track_info.html(html);
            if (passtime > 0) {
                self.XIAMIPLAYER.passtime = passtime;
                self.XIAMIPLAYER.passtimeTip = $('<span id="J_passtimeTip" style="color:#aaa; font-size:12px;">(同步进度中,若长时间无声音请刷新)</span>')
                self.XIAMIPLAYER.passtimeTip.appendTo(self.Track_info);
            } else {
                self.XIAMIPLAYER.passtime = 0;
                self.XIAMIPLAYER.passtimeTip = null;
            };
            if (track.cover.indexOf("demo100.png") > -1) {
                track.cover = "http://img.xiami.net/res/img/default/demo185.png";
            }
            self.Cover.html(Tpl_cover.render(track));
            // 获取专辑 促销详情
            self.PlayerSale.load({
                'albumid': track.albumId,
                'itemsid': track.songId,
                'userid': self.USER.get('uid')
            }, function(html) {
                self.Sale.html(html);
                self.Sale.show();
                Goldlog.record('/xiamipc.1.13', '', 'cache=_' + S.now() + '&albumid=' + track.albumId + '&itemsid=' + track.songId + '&userid=' + self.USER.get('uid'), 'H46807197')
                self.LrcWrap.css('top', '257px');
                self.PlayerLrc.sync();
            }, function() {
                self.Sale.html('');
                self.Sale.hide();
                self.LrcWrap.css('top', '215px');
                self.PlayerLrc.sync();
            });

            self.PlayerPanel.reset(passtime);
            self.PlayerBlur.render(track.cover + "?v=sya");
            self.Fav_btn.attr("data-sid", track.songId);
            self.More_btn.attr("data-sid", track.songId);
            self.Share_btn.attr("data-sid", track.songId);
            if (track.grade > -1) {
                self.Fav_btn.attr("class", "icon-faved");
                self.Fav_btn.attr("title", "取消收藏");
            } else {
                self.Fav_btn.attr("class", "icon-fav");
                self.Fav_btn.attr("title", "收藏");
            }
            var status = self.PlayerData.get('status');
            if ("room" != self.PlayerData.get("status")) {
                //var index = self.PlayerData.checkIndex();
                self.PlayerTracks.highCurrentTrack(track.songId, status);
            }
            try {
                $("#J_trackMoreMenu").remove();
                // 移除菜单
            } catch (e) {
                throw new Error("#J_trackMoreMenu Not in the Body");
            }
        },
        setModeView: function(value) {
            var self = this;
            switch (value) {
                case 1:
                    self.Mode_btn.attr("class", "mode-order");
                    self.Mode_btn.attr("title", "顺序播放");
                    break;
                case 2:
                    self.Mode_btn.attr("class", "mode-random");
                    self.Mode_btn.attr("title", "随机播放");
                    break;
                case 0:
                    self.Mode_btn.attr("class", "mode-only");
                    self.Mode_btn.attr("title", "单曲循环");
                    break;
                default:
                    self.Mode_btn.attr("class", "mode-order");
                    self.Mode_btn.attr("title", "顺序播放");
            };
        },
        changeTrackFlag: function(sid, flag, type) {
            var self = this;
            var f;
            S.log(["changeTrackFlag", sid, flag, type]);

            switch (type) {
                case "roam":
                    {
                        f = $("#J_roamItem" + sid).one(".fav-btn");
                        break;
                    }
                case "myfav":
                    {
                        f = $("#J_favList" + sid).one(".fav-btn");
                        break;
                    }
                case "history":
                    {
                        f = $("#J_historyList" + sid).one(".fav-btn");
                        break;
                    }
                case "collect":
                    {
                        f = $("#J_collectList" + sid).one(".fav-btn");
                        break;
                    }
                default:
                    {
                        f = $("#J_trackList" + sid).one(".fav-btn");
                    }
            }
            if (type == "roam") {
                if (!flag) {
                    f && f.removeClass("icon-roam-faved").addClass("icon-roam-fav");
                    f && f.attr("title", "收藏");
                } else {
                    f && f.removeClass("icon-roam-fav").addClass("icon-roam-faved");
                    f && f.attr("title", "取消收藏");
                };
            } else {
                if (!flag) {
                    f && f.removeClass("icon-track-faved").addClass("icon-track-fav");
                    f && f.attr("title", "收藏");
                } else {
                    f && f.removeClass("icon-track-fav").addClass("icon-track-faved");
                    f && f.attr("title", "取消收藏");
                }
            }
        },
        playOrPause: function() {
            var self = this;
            var track = self.PlayerData.get("track");
            if (track === "")
                return false;
            if ("room" == self.PlayerData.get("status")) {
                return false;
            }
            var status = self.Audio.status();
            S.log(["playOrPause: ", status]);
            if (status == "stop") {
                self.Audio.load(track);
                self.setMusicInfo(track);
                self.Play_btn.removeClass("play-btn").addClass("pause-btn");
                self.BODY.removeClass("playing");
                //UTool.changeFavicon("http://res.xiami.net/pause.ico");
                //document.title = document.title.substr(1);
            }
            if (status == "play") {
                self.pause();
                //UTool.changeFavicon("http://res.xiami.net/pause.ico");
                //document.title = document.title.substr(1);
            }
            if (status == "pause") {
                self.play();
                //UTool.changeFavicon("http://res.xiami.net/play.ico");
                //document.title = "▶" + document.title;
            }
        },
        next: function() {
            var self = this;
            if (self.autoplay) {
                self.autoplay && self.PlayerData.next(true);
            }
        },
        prev: function() {
            var self = this;
            self.PlayerData.prev();
        },
        play: function() {
            var self = this;
            self.Audio.play();
            self.Play_btn.removeClass("play-btn").addClass("pause-btn");
            self.BODY.addClass("playing");
        },
        pause: function() {
            var self = this;
            self.Audio.pause();
            self.Play_btn.removeClass("pause-btn").addClass("play-btn");
            self.BODY.removeClass("playing");
        },
        replay: function() {
            var self = this;
            self.Audio.position(0);
            self.play();
        },
        stop: function() {
            var self = this;
            self.BODY.removeClass("playing");
            self.Play_btn.removeClass("pause-btn");
            self.Play_btn.addClass("play-btn");
            //self.PlayerLrc.reset();
            self.Audio.stop();
        },
        _addEvent: function() {
            var self = this;
            // 播放
            self.Play_btn.on("click", function() {
                self.playOrPause();
            });
            // 切换高低品质
            self.High_btn.on("click", function() {
                S.log(self.isVIP, "", "is vip");
                if (!self.isVIP) {
                    var tip = new Tip({
                        target: '#J_playerHQ',
                        //content: '享受高品质音乐，立即<a href="http://www.xiami.com/vip/update" target="_blank">开通VIP</a>',
                        //maxWidth: '200px'
                        content: '<p class="tip_60d"><a href="http://www.xiami.com/vip/update" target="_blank"><em>享受高品质音乐 立即开通VIP</em><strong>开通VIP</strong>安装虾米音乐APP 免费领2个月VIP</a></p>',
                        maxWidth: '300px'
                    });
                    tip.show();
                    return false;
                }
                if (self.High_Runing)
                    return false;
                if (self.High_btn.attr("data-hq") == "off") {
                    self.Audio.changeHq(true);
                    self.High_Runing = true;
                    self.High_btn.attr("class", "mode-hq-on1");
                    var i = 1;
                    self.High_Timer = setInterval(function() {
                        i++;
                        if (i > 25) {
                            clearInterval(self.High_Timer);
                            self.High_btn.attr("data-hq", "on");
                            self.High_Runing = false;
                        };
                        self.High_btn.attr("class", "mode-hq-on" + i);
                    }, 5);
                } else {
                    self.Audio.changeHq(false);
                    self.High_Runing = true;
                    self.High_btn.attr("class", "mode-hq-off1");
                    var i = 1;
                    self.High_Timer = setInterval(function() {
                        i++;
                        if (i > 25) {
                            clearInterval(self.High_Timer);
                            self.High_btn.attr("data-hq", "off");
                            self.High_Runing = false;
                        };
                        self.High_btn.attr("class", "mode-hq-off" + i);
                    }, 5);
                };
            });
            self.Prev_btn.on("click", function() {
                self._opLock && self._opLock.cancel();
                self._opLock = S.later(function() {
                    self.prev();
                }, 200, false, null, null);
            });
            self.Next_btn.on("click", function() {
                self._opLock && self._opLock.cancel();
                self._opLock = S.later(function() {
                    self.next();
                }, 200, false, null, null);
            });
            self.Mode_btn.on("click", function() {
                if ("room" == self.PlayerData.get("status")) {
                    // room 模式下禁止操作
                    return false;
                }
                self._opLock && self._opLock.cancel();
                self._opLock = S.later(function() {
                    var mode = self.PlayerData.changeMode();
                    self.setModeView(mode);
                    setTimeout(function() {
                        self.Audio.mode(mode);
                    }, 0);
                }, 200, false, null, null);
            });
            self.Fav_btn.on("click", function() {
                var that = $(this);
                var sid = that.attr("data-sid");
                self.PlayerControl.fav(this, sid);
            });
            self.More_btn.on("click", function(event) {
                event.halt();
                var that = $(this);
                var sid = that.attr("data-sid");
                self.PlayerMenu.showPanelMenu(that, sid);
            });
            self.Share_btn.on("click", function(event) {
                event.halt();
                var that = $(this);
                var sid = that.attr("data-sid");
                self.PlayerControl.share(this, sid);
                var track = self.PlayerData.get("track"),
                    trackVo = Json.parse(track);
                if (trackVo.rec_note != '') {
                    var uid = __USER__ && __USER__.get('uid') || 0;
                    var len = self.XIAMIPLAYER.get('position');
                    PlayerLog.send(trackVo.rec_note, 107, Math.floor(len), trackVo.objectName, trackVo.objectId, uid);
                }
            });
            /*********************** click 埋单 ****************************/
            Event.delegate(document, "click", "body", function(event) {
                var targetId = event.target.id;
                var op = 0;
                switch (targetId) {
                    case 'J_trackFav': // 收藏
                        op = 102;
                        break;
                    case 'J_trackName': // 详情
                        op = 104;
                        break;
                    case 'J_nextBtn': // 切歌
                        op = 105;
                        break;
                    case 'J_prevBtn': // 切歌
                        op = 105;
                        break;
                    case 'J_trackDown': // 下载
                        op = 106;
                        break;
                    case 'J_trackCollect': // 精选集
                        op = 109;
                        break;
                    case 'J_trackMobile': // 发送
                        op = 111;
                        break;
                }
                if (op !== 0) {
                    var track = self.PlayerData.get("track"),
                        trackVo = Json.parse(track);
                    if (trackVo.rec_note != '') {
                        var uid = __USER__ && __USER__.get('uid') || 0;
                        var len = self.XIAMIPLAYER.get('position');
                        PlayerLog.send(trackVo.rec_note, op, Math.floor(len), trackVo.objectName, trackVo.objectId, uid);
                    }
                }
            });
        },
        _playerRoam: function() {
            var self = this;
            self.PlayerRoam = new PlayerRoam();
            //  渲染漫游列表完成, 开始播放漫游歌曲
            self.PlayerRoam.on("renderComplete", function(event) {
                self.PlayerTracks.syncScrollView();
                // self.PlayerData.playthisRoam();
                // 开始播放 漫游歌曲
            });
        },
        _playerMenu: function() {
            var self = this;
            self.PlayerMenu = new PlayerMenu();
        },
        _playerBlur: function() {
            var self = this;
            self.PlayerBlur = new PlayerBlur({
                wrap: "#J_blurBackground"
            });
        },
        _playerVolume: function() {
            var self = this;
            self.PlayerVolume = new PlayerVolume({
                //volume : 0,
                wrap: "#J_volumeRange",
                mute: "#J_volumeSpeaker"
            });
            self.PlayerVolume.on("afterVolumeChange", function(event) {
                self.Audio.volume(event.newVal);
            });
        },
        _playerLrc: function() {
            var self = this;
            self.PlayerLrc = new PlayerLrc({
                wrap: "#J_playerLrc"
            });
        },
        _playerControl: function() {
            var self = this;
            self.PlayerControl = new PlayerControl();
            self.PlayerControl.on("trackFavCallback", function(event) {
                self.PlayerData.changeTrackFav(event.data.songId, event.data.flag, event.targetType);
                self.changeTrackFlag(event.data.songId, event.data.flag, event.targetType);
                // 更改列表
            });
        },
        _playerListen: function() {
            var self = this;
            self.XIAMIPLAYER = window.__XIAMIPLAYER__ = new PlayerLister({
                grogress: "#J_playerProgress",
                panel: "#J_playerPanel",
                positionTime: "#J_positionTime",
                durationTime: "#J_durationTime"
            });
            self.XIAMIPLAYER.on("ready", function(event) {
                var j = Json.parse(event.data);
                // if(!j.conect && !window.__TEST__){
                //     alert("你已经打开虾米音乐播放器啦！不能贪心哦！")
                //     //window.close();
                //     window.location.href = "http://www.xiami.com";
                //     return false;
                // }
                self.PlayerVolume.set("volume", j.volume, {
                    "silent": true
                });
                self.PlayerVolume.volumeUI(j.volume);
                self.PlayerData.setMode(j.mode);
                self.setModeView(j.mode);
                self.__FLASHREADY__ = window.__FLASHREADY__ = true;
                setTimeout(function() {
                    $("#J_loading").fadeOut(0.3, function() {
                        $("#J_loading").remove();
                    });
                }, 100);
            });
            self.XIAMIPLAYER.on("addSongs", function(event) {
                self.DataCenter.load(event.data.url, event.data.atPlay);
            });
            self.XIAMIPLAYER.on("soundComplete", function(event) {
                S.log("soundComplete");
                self.PlayerData.next(false);
                window.XiamiPlayer.player_song_end && window.XiamiPlayer.player_song_end();
            });
            self.XIAMIPLAYER.on("soundOpen", function(event) {
                var a = self.PlayerData.get("track");
                var b = self.PlayerData.getDataArrLimit();
                window.XiamiPlayer.player_song_start && window.XiamiPlayer.player_song_start(a, b);
            });
            self.XIAMIPLAYER.on("playerRuning", function(event) {
                S.log("playerRuning");
                var a = self.PlayerData.get("track");
                var b = self.PlayerData.getDataArrLimit();
                window.XiamiPlayer.player_runing && window.XiamiPlayer.player_runing(a, b);
            });
            self.XIAMIPLAYER.on("soundPlaying", function(event) {
                var obj = Json.parse(event.data);
                self.PlayerLrc.syncTime(obj.position);
            });
            self.XIAMIPLAYER.on("lyricComplete", function(event) {
                var a = self.PlayerData.get("track");
                var track = Json.parse(a);
                self.PlayerLrc.render(track.songId, event.status, event.data);
            });
            self.XIAMIPLAYER.on("soundError", function(event) {
                S.log(["sounderror", event.data]);
                if (event.data > 10) {
                    self.stop();
                    alert("请检查网络连接是否正常.");
                    return false;
                }
                self.next();
            });
        },
        _playerPanel: function() {
            var self = this;
            self.PlayerPanel = new PlayerPanel({
                grogress: "#J_playerProgress",
                positionTime: "#J_positionTime",
                panel: "#J_playerPanel"
            });
            self.PlayerPanel.on("afterTickDragChange", function(event) {
                S.log('change ' + event.attrName + ': ' + event.prevVal + ' --> ' + event.newVal);
                self.XIAMIPLAYER.set("canRender", !event.newVal);
            });
            self.PlayerPanel.on("afterPositionChange", function(event) {
                S.log('change ' + event.attrName + ': ' + event.prevVal + ' --> ' + event.newVal);
                if (event.newVal >= 1) {
                    self.next();
                    return false;
                };
                self.XIAMIPLAYER.changePositionTime(event.newVal);
                self.Audio.position(event.newVal);
            });
            self.PlayerPanel.on('afterDragpositionChange', function(event) {
                S.log('change ' + event.attrName + ': ' + event.prevVal + ' --> ' + event.newVal);
                self.XIAMIPLAYER.changePositionTime(event.newVal, true);
            })
        },
        _playerData: function() {
            var self = this;
            self.PlayerData = new PlayerData();
            self.PlayerData.on("afterSoundArrChange", function(event) {
                S.log(event.newVal.length, "", "afterSoundArrChange");
                var data = event.newVal;
                if (data.length == 0) {
                    self.PlayerTracks.reset();
                    self.stop();
                    return false;
                };
                var index = self.PlayerData.getCurrentIndex();
                // 避免前面所在歌曲被删除, 需重新定位
                var roamSongId = self.PlayerData.get("roamSongId");
                S.log(['渲染歌曲列表', data, index])
                self.PlayerTracks.addTracks(data, index);
                // 渲染歌曲列表
            });
            // 漫游切歌
            self.PlayerData.on("afterRoamIndexChange", function(event) {
                S.log(["afterRoamIndexChange", event.prevVal, event.newVal]);
                self.PlayerRoam.showRoamIcon();
                var arr = self.PlayerData.getRoamArrLimit();
                if (event.prevVal == -1 && event.newVal == 0) {
                    return false;
                };
                var step = event.prevVal == -1 ? event.newVal : event.newVal - event.prevVal;
                if (step < 0) {
                    step = step + 20;
                };
                arr = arr.slice(5 - step);
                self.PlayerRoam.add(arr, step);
            });
            // self.PlayerData.on("EVENT_PlayerDataInit", function(event) {
            //     S.log("EVENT_PlayerDataInit");
            //     //self.setMusicInfo(event.data);
            //     $("#J_loading").fadeOut(0.3, function(){
            //         $("#J_loading").remove();
            //     });
            // });
            self.PlayerData.on("afterTrackChange", function(event) {
                S.log("afterTrackChange");
                var track = Json.parse(event.newVal);
                var passtime = self.PlayerData.get('passtime');
                if (passtime > track.length) passtime = 0;
                self.Audio.load(event.newVal, passtime);
                self.setMusicInfo(event.newVal, passtime);
                self.PlayerData.set('passtime', 0);
                if (self.Play_btn.hasClass("play-btn")) {
                    self.Play_btn.removeClass("play-btn");
                    self.Play_btn.addClass("pause-btn");
                }
            });
            self.PlayerData.on("afterStatusChange", function(event) {
                self.PlayerWrap[0].className = "player-" + event.newVal;
                self.PlayerPanel.set("status", event.newVal);
            });
            // 触发歌曲漫游
            self.PlayerData.on("roamCallback", function(event) {
                var sid = event.data.songId;
                if (sid != self.PlayerData.get("songId"))
                    return false;
                if (event.status && event.data.songs.length > 0) {
                    self.PlayerRoam.render(event.data.songId, event.data.songs);
                } else {
                    self.PlayerRoam.after(event.data.songId, event.data.songs);
                }
            });
            self.PlayerData.on("thenComplete", function(event) {
                //S.log( event.mergeArr, event.removeID, event.startSid);
                self.PlayerTracks.add(event.mergeArr, event.removeID, event.startSid);
            });
            self.PlayerData.on("endComplete", function(event) {
                //S.log( event.mergeArr, event.removeID, event.startSid);
                self.PlayerTracks.append(event.mergeArr, event.removeID, event.startSid);
            });
            self.PlayerData.on("empty", function(event) {
                self.pause();
                //self.PlayerLrc.empty();
            });
        },
        _playerTracks: function() {
            var self = this;
            self.PlayerTracks = new PlayerTracks();
        },
        _playerDrag: function() {
            var self = this;
            self.PlayerDrag = new PlayerDrag({
                'scrollView': self.PlayerTracks.scrollView
            });
            self.PlayerDrag.on('sort', function(event) {
                self.PlayerData.swopData(event.data);
            })
        },
        _dataCenter: function() {
            var self = this;
            self.DataCenter = new DataCenter({
                'host': self.config.params.flashVars.host
            });
            self.DataCenter.load(self.dataUrl);
            self.DataCenter.on('complete', function(event) {
                if (event.status) {
                    var DATA = event.target.getAttrVals();
                    self._dataCenterCompleteHandler(DATA);
                }
            })
        },
        _dataCenterCompleteHandler: function(DATA) {
            var self = this;
            if (!self.__FLASHREADY__) {
                return setTimeout(function() {
                    self._dataCenterCompleteHandler(DATA);
                }, 100);
            }
            if (S.isUndefined(DATA.trackList) || S.isNull(DATA.trackList)) return false;
            self.Audio.config({
                'uid': DATA.uid,
                'isVIP': DATA.vip == 1 ? true : false,
                'vipRole': DATA.vipRole,
                'modeHQ': DATA.hqset == 1 ? true : false
            })
            self.PlayerData.set("lastPlayId", DATA.lastSongId);
            self.PlayerData.set("lastPlayToggle", DATA.lastSongToggle);
            self.PlayerData.setData(DATA.trackList, DATA.atPlay);
            //设置歌曲对象
            self.isVIP = DATA.vip == 1;
            if (self.isVIP && DATA.hqset == 1 && self.High_btn.attr("data-hq") == "off") {
                self.High_Runing = true;
                self.High_btn.attr("class", "mode-hq-on1");
                var i = 1;
                self.High_Timer = setInterval(function() {
                    i++;
                    if (i > 25) {
                        clearInterval(self.High_Timer);
                        self.High_btn.attr("data-hq", "on");
                        self.High_Runing = false;
                    };
                    self.High_btn.attr("class", "mode-hq-on" + i);
                }, 5);
            }
            if (self.isVIP && DATA.hqset == 0 && self.High_btn.attr("data-hq") == "on") {
                self.High_Runing = true;
                self.High_btn.attr("class", "mode-hq-off1");
                var i = 1;
                self.High_Timer = setInterval(function() {
                    i++;
                    if (i > 25) {
                        clearInterval(self.High_Timer);
                        self.High_btn.attr("data-hq", "off");
                        self.High_Runing = false;
                    };
                    self.High_btn.attr("class", "mode-hq-off" + i);
                }, 5);
            }
        }
    };

    module.exports = player;
});
// 2013-12-30 12:52:28

/** Compiled By kissy-xtemplate */
KISSY.add('page/mods/xtpl/collectItem-xtpl',function (S, require, exports, module) {
        /*jshint quotmark:false, loopfunc:true, indent:false, asi:true, unused:false, boss:true*/
        return function (scope, S, undefined) {
            var buffer = "",
                config = this.config,
                engine = this,
                moduleWrap, utils = config.utils;
            if (typeof module !== "undefined" && module.kissy) {
                moduleWrap = module;
            }
            var runBlockCommandUtil = utils.runBlockCommand,
                renderOutputUtil = utils.renderOutput,
                getPropertyUtil = utils.getProperty,
                runInlineCommandUtil = utils.runInlineCommand,
                getPropertyOrRunCommandUtil = utils.getPropertyOrRunCommand;
            buffer += '<div class="collect-item collect-item-edit" data-id="0">\r\n\t<div class="collect-item-con">\r\n\t\t<img src="http://gtms01.alicdn.com/tps/i1/T1c7F7FqXeXXcCXlfb-25-25.png" width="25" height="25">\r\n\t\t<input type="hidden" class="item-old" value="">\r\n\t\t<span class="item-name"></span>\r\n\t\t<input type="text" value="" class="item-input" maxlength="400" title="回车确认" placeholder="回车确认" />\r\n\t\t<a class="edit icon-editCollect"></a>\r\n\t\t<a class="delete icon-deleteCollect"></a>\r\n\t</div>\r\n</div>';
            return buffer;
        };
});
/** Compiled By kissy-xtemplate */
KISSY.add('page/mods/xtpl/favTrackItem-xtpl',function (S, require, exports, module) {
        /*jshint quotmark:false, loopfunc:true, indent:false, asi:true, unused:false, boss:true*/
        return function (scope, S, undefined) {
            var buffer = "",
                config = this.config,
                engine = this,
                moduleWrap, utils = config.utils;
            if (typeof module !== "undefined" && module.kissy) {
                moduleWrap = module;
            }
            var runBlockCommandUtil = utils.runBlockCommand,
                renderOutputUtil = utils.renderOutput,
                getPropertyUtil = utils.getProperty,
                runInlineCommandUtil = utils.runInlineCommand,
                getPropertyOrRunCommandUtil = utils.getPropertyOrRunCommand;
            buffer += '';
            var config0 = {};
            var params1 = [];
            var id2 = getPropertyUtil(engine, scope, "data", 0, 1);
            params1.push(id2);
            config0.params = params1;
            config0.fn = function (scope) {
                var buffer = "";
                buffer += '\r\n';
                var config1 = {};
                config1.fn = function (scope) {
                    var buffer = "";
                    buffer += '\r\n';
                    var config3 = {};
                    var params4 = [];
                    var id5 = getPropertyUtil(engine, scope, "shield", 0, 3);
                    params4.push(id5);
                    config3.params = params4;
                    config3.fn = function (scope) {
                        var buffer = "";
                        buffer += '\r\n<div class="ui-row-item ui-track-item ui-track-disabled" data-sid="';
                        var id6 = getPropertyOrRunCommandUtil(engine, scope, {}, "song_id", 0, 4);
                        buffer += renderOutputUtil(id6, true);
                        buffer += '" data-type="fav" id="J_favList';
                        var id7 = getPropertyOrRunCommandUtil(engine, scope, {}, "song_id", 0, 4);
                        buffer += renderOutputUtil(id7, true);
                        buffer += '">\r\n<div class="ui-track-main">\r\n\t<div class="ui-track-checkbox">\r\n\t\t<input type="checkbox" disabled="disabled" class="ui-track-item-id" name="fav" id="J_track';
                        var id8 = getPropertyOrRunCommandUtil(engine, scope, {}, "song_id", 0, 7);
                        buffer += renderOutputUtil(id8, true);
                        buffer += '" value="';
                        var id9 = getPropertyOrRunCommandUtil(engine, scope, {}, "song_id", 0, 7);
                        buffer += renderOutputUtil(id9, true);
                        buffer += '" disabled="disabled" />\r\n\t</div>\r\n\t<div class="ui-track-sort"><i>';
                        var id10 = getPropertyUtil(engine, scope, "xindex", 0, 9);
                        buffer += renderOutputUtil(id10 + (1), true);
                        buffer += '</i></div>\r\n\t<div class="ui-row-item-body">\r\n\t\t<div class="ui-row-item-column c1" data-id="';
                        var id11 = getPropertyOrRunCommandUtil(engine, scope, {}, "song_id", 0, 11);
                        buffer += renderOutputUtil(id11, true);
                        buffer += '">';
                        var id12 = getPropertyOrRunCommandUtil(engine, scope, {}, "song_name", 0, 11);
                        buffer += renderOutputUtil(id12, false);
                        buffer += '&nbsp;&nbsp;<img src="http://gtms03.alicdn.com/tps/i3/T1iS08FvdcXXblKhDf-39-18.png" width="39" height="18" /></div>\r\n\t\t<div class="ui-row-item-column c2" data-artist-id="';
                        var id13 = getPropertyOrRunCommandUtil(engine, scope, {}, "artist_id", 0, 12);
                        buffer += renderOutputUtil(id13, true);
                        buffer += '">\r\n\t\t';
                        var config14 = {};
                        var params15 = [];
                        var id16 = getPropertyUtil(engine, scope, "singers", 0, 13);
                        params15.push(id16);
                        config14.params = params15;
                        config14.fn = function (scope) {
                            var buffer = "";
                            buffer += '\r\n\t\t';
                            var config17 = {};
                            var params18 = [];
                            var id19 = getPropertyUtil(engine, scope, "xindex", 0, 14);
                            params18.push(id19 !== (0));
                            config17.params = params18;
                            config17.fn = function (scope) {
                                var buffer = "";
                                buffer += ' ; ';
                                return buffer;
                            };
                            buffer += runBlockCommandUtil(engine, scope, config17, "if", 14);
                            buffer += '<a href="http://www.xiami.com';
                            var id20 = getPropertyOrRunCommandUtil(engine, scope, {}, "href", 0, 14);
                            buffer += renderOutputUtil(id20, true);
                            buffer += '" target="_blank" title="';
                            var id21 = getPropertyOrRunCommandUtil(engine, scope, {}, "name", 0, 14);
                            buffer += renderOutputUtil(id21, false);
                            buffer += '">';
                            var id22 = getPropertyOrRunCommandUtil(engine, scope, {}, "name", 0, 14);
                            buffer += renderOutputUtil(id22, false);
                            buffer += '</a>\r\n\t\t';
                            return buffer;
                        };
                        buffer += runBlockCommandUtil(engine, scope, config14, "each", 13);
                        buffer += '\r\n\t\t</div>\r\n\t\t<div class="ui-row-item-column c3" data-album-id="';
                        var id23 = getPropertyOrRunCommandUtil(engine, scope, {}, "album_id", 0, 17);
                        buffer += renderOutputUtil(id23, true);
                        buffer += '"><a href="http://www.xiami.com/album/';
                        var id24 = getPropertyOrRunCommandUtil(engine, scope, {}, "album_id", 0, 17);
                        buffer += renderOutputUtil(id24, true);
                        buffer += '" target="_blank" title="';
                        var id25 = getPropertyOrRunCommandUtil(engine, scope, {}, "album_name", 0, 17);
                        buffer += renderOutputUtil(id25, false);
                        buffer += '">';
                        var id26 = getPropertyOrRunCommandUtil(engine, scope, {}, "album_name", 0, 17);
                        buffer += renderOutputUtil(id26, false);
                        buffer += '</a></div>\r\n\t</div>\r\n\t<div class="ui-track-control">\r\n\t\t';
                        var config27 = {};
                        var params28 = [];
                        var id29 = getPropertyUtil(engine, scope, "grade", 0, 20);
                        params28.push(id29 === (-1));
                        config27.params = params28;
                        config27.fn = function (scope) {
                            var buffer = "";
                            buffer += '\r\n\t\t<a class="fav-btn icon-track-fav" data-type="myfav" data-event="fav" title="收藏"></a>\r\n\t\t';
                            return buffer;
                        };
                        config27.inverse = function (scope) {
                            var buffer = "";
                            buffer += '\r\n\t\t<a class="fav-btn icon-track-faved" data-type="myfav" data-event="fav" title="取消收藏"></a>\r\n\t\t';
                            return buffer;
                        };
                        buffer += runBlockCommandUtil(engine, scope, config27, "if", 20);
                        buffer += '\r\n\t</div>\r\n</div>\r\n</div>\r\n';
                        return buffer;
                    };
                    config3.inverse = function (scope) {
                        var buffer = "";
                        buffer += '\r\n<div class="ui-row-item ui-track-item" data-sid="';
                        var id30 = getPropertyOrRunCommandUtil(engine, scope, {}, "song_id", 0, 29);
                        buffer += renderOutputUtil(id30, true);
                        buffer += '" data-type="fav" id="J_favList';
                        var id31 = getPropertyOrRunCommandUtil(engine, scope, {}, "song_id", 0, 29);
                        buffer += renderOutputUtil(id31, true);
                        buffer += '">\r\n<div class="ui-track-main">\r\n\t<div class="ui-track-checkbox">\r\n\t\t<input type="checkbox" class="ui-track-item-id" name="fav" id="J_track';
                        var id32 = getPropertyOrRunCommandUtil(engine, scope, {}, "song_id", 0, 32);
                        buffer += renderOutputUtil(id32, true);
                        buffer += '" value="';
                        var id33 = getPropertyOrRunCommandUtil(engine, scope, {}, "song_id", 0, 32);
                        buffer += renderOutputUtil(id33, true);
                        buffer += '" />\r\n\t</div>\r\n\t<div class="ui-track-sort"><em>';
                        var id34 = getPropertyUtil(engine, scope, "xindex", 0, 34);
                        buffer += renderOutputUtil(id34 + (1), true);
                        buffer += '</em></div>\r\n\t<div class="ui-row-item-body">\r\n\t\t<div class="ui-row-item-column c1" data-id="';
                        var id35 = getPropertyOrRunCommandUtil(engine, scope, {}, "song_id", 0, 36);
                        buffer += renderOutputUtil(id35, true);
                        buffer += '">';
                        var id36 = getPropertyOrRunCommandUtil(engine, scope, {}, "song_name", 0, 36);
                        buffer += renderOutputUtil(id36, false);
                        buffer += '</div>\r\n\t\t<div class="ui-row-item-column c2" data-artist-id="';
                        var id37 = getPropertyOrRunCommandUtil(engine, scope, {}, "artist_id", 0, 37);
                        buffer += renderOutputUtil(id37, true);
                        buffer += '">\r\n\t\t';
                        var config38 = {};
                        var params39 = [];
                        var id40 = getPropertyUtil(engine, scope, "singers", 0, 38);
                        params39.push(id40);
                        config38.params = params39;
                        config38.fn = function (scope) {
                            var buffer = "";
                            buffer += '\r\n\t\t';
                            var config41 = {};
                            var params42 = [];
                            var id43 = getPropertyUtil(engine, scope, "xindex", 0, 39);
                            params42.push(id43 !== (0));
                            config41.params = params42;
                            config41.fn = function (scope) {
                                var buffer = "";
                                buffer += ' ; ';
                                return buffer;
                            };
                            buffer += runBlockCommandUtil(engine, scope, config41, "if", 39);
                            buffer += '<a href="http://www.xiami.com';
                            var id44 = getPropertyOrRunCommandUtil(engine, scope, {}, "href", 0, 39);
                            buffer += renderOutputUtil(id44, true);
                            buffer += '" target="_blank" title="';
                            var id45 = getPropertyOrRunCommandUtil(engine, scope, {}, "name", 0, 39);
                            buffer += renderOutputUtil(id45, false);
                            buffer += '">';
                            var id46 = getPropertyOrRunCommandUtil(engine, scope, {}, "name", 0, 39);
                            buffer += renderOutputUtil(id46, false);
                            buffer += '</a>\r\n\t\t';
                            return buffer;
                        };
                        buffer += runBlockCommandUtil(engine, scope, config38, "each", 38);
                        buffer += '\r\n\t\t</div>\r\n\t\t<div class="ui-row-item-column c3" data-album-id="';
                        var id47 = getPropertyOrRunCommandUtil(engine, scope, {}, "album_id", 0, 42);
                        buffer += renderOutputUtil(id47, true);
                        buffer += '"><a href="http://www.xiami.com/album/';
                        var id48 = getPropertyOrRunCommandUtil(engine, scope, {}, "album_id", 0, 42);
                        buffer += renderOutputUtil(id48, true);
                        buffer += '" target="_blank" title="';
                        var id49 = getPropertyOrRunCommandUtil(engine, scope, {}, "album_name", 0, 42);
                        buffer += renderOutputUtil(id49, false);
                        buffer += '">';
                        var id50 = getPropertyOrRunCommandUtil(engine, scope, {}, "album_name", 0, 42);
                        buffer += renderOutputUtil(id50, false);
                        buffer += '</a></div>\r\n\t</div>\r\n\t<div class="ui-track-control">\r\n\t\t';
                        var config51 = {};
                        var params52 = [];
                        var id53 = getPropertyUtil(engine, scope, "grade", 0, 45);
                        params52.push(id53 === (-1));
                        config51.params = params52;
                        config51.fn = function (scope) {
                            var buffer = "";
                            buffer += '\r\n\t\t<a class="fav-btn icon-track-fav" data-type="myfav" data-event="fav" title="收藏"></a>\r\n\t\t';
                            return buffer;
                        };
                        config51.inverse = function (scope) {
                            var buffer = "";
                            buffer += '\r\n\t\t<a class="fav-btn icon-track-faved" data-type="myfav" data-event="fav" title="取消收藏"></a>\r\n\t\t';
                            return buffer;
                        };
                        buffer += runBlockCommandUtil(engine, scope, config51, "if", 45);
                        buffer += '\r\n\t\t<a class="more-btn icon-track-more" data-type="myfav" data-event="more" title="更多"></a>\r\n\t</div>\r\n</div>\r\n</div>\r\n';
                        return buffer;
                    };
                    buffer += runBlockCommandUtil(engine, scope, config3, "if", 3);
                    buffer += '\r\n';
                    return buffer;
                };
                buffer += runBlockCommandUtil(engine, scope, config1, "data", 2);
                buffer += '\r\n';
                return buffer;
            };
            config0.inverse = function (scope) {
                var buffer = "";
                buffer += '\r\n<div class="fav-detail-none"></div>\r\n';
                return buffer;
            };
            buffer += runBlockCommandUtil(engine, scope, config0, "if", 1);
            buffer += '\r\n';
            return buffer;
        };
});
KISSY.add('page/mods/sidebar/myfav',['node', 'io', 'xtemplate', 'utils/base', 'utils/scrollView/scrollViewManage', '../xtpl/favTrackItem-xtpl'], function(S, require, exports, module) {
    // @formatter:off
    var Node = require("node"),
        IO = require("io"),
        Xtemplate = require("xtemplate"),
        BaseConfig = require("utils/base"),
        ScrollViewManage = require("utils/scrollView/scrollViewManage"),
        TPL_favTrackItem = require("../xtpl/favTrackItem-xtpl");
    // @formatter:on
    var $ = Node.all;

    function myfav() {
        this.init();
    };

    var pt = myfav.prototype;
    pt.init = function() {
        var self = this;
        //self.pageContent = $("#J_myFavTracksList");
        self.favCount = $("#J_favCount");
    };
    pt.renderData = function() {
        var self = this;
        self.favCount.html('<span>loading</span>');
        ScrollViewManage.content("J_myfavScrollView", "");
        var HTML_favTrackItem = new Xtemplate(TPL_favTrackItem);

        var max = S.UA.ie && S.UA.ie < 9 ? 100 : 200;

        new IO({
            url : BaseConfig.MY_FAV_TRCKS_URL,
            dataType : "jsonp",
            success : function(respones) {
                if (respones.status) {
                    var data = {
                        data : respones.data.songs
                    };
                    var count = respones.data.count, length;
                    if (data.data && data.data.length > 0) {
                        length = data.data.length;
                    } else {
                        length = 0;
                    }

                    if (length > max) {
                        data.data.length = max;
                    }

                    if (count > max) {
                        self.favCount.html('<span>总收藏歌曲:' + count + '首 (显示' + data.data.length + '首)</span>  <a href="http://www.xiami.com/space/lib-song" target="_blank">查看全部</a>');
                    } else {
                        self.favCount.html('<span>共收藏' + length + '首</span>');
                    };
                    if (length > 0) {
                        $(".ui-myfav-body").removeClass("ui-myfav-empty");
                    } else {
                        $(".ui-myfav-body").addClass("ui-myfav-empty");
                    }
                    var html = HTML_favTrackItem.render(data);

                    $("#J_checkAll_fav").prop('checked', false);
                    //self.pageContent.html(html);
                    //ScrollViewManage.render("J_myfavScrollView");
                    self.scrollView = ScrollViewManage.content("J_myfavScrollView", html);
                } else {

                }
            },
            error : function() {

            }
        });
    };
    pt.sortTrackList = function() {
        var self = this;
        var tracks = self.pageContent.all(".ui-track-item");
        var len = tracks.length;
        for( var i = 0; i < len; i++ ) {
            var sort = $(tracks[i]).one(".ui-track-sort");
            sort.html("<em>" + (i + 1) + "</em>");
        };
        ScrollViewManage.sync("J_myfavScrollView");
    };

    module.exports = myfav;
});

/** Compiled By kissy-xtemplate */
KISSY.add('page/mods/xtpl/collectListItem-xtpl',function (S, require, exports, module) {
        /*jshint quotmark:false, loopfunc:true, indent:false, asi:true, unused:false, boss:true*/
        return function (scope, S, undefined) {
            var buffer = "",
                config = this.config,
                engine = this,
                moduleWrap, utils = config.utils;
            if (typeof module !== "undefined" && module.kissy) {
                moduleWrap = module;
            }
            var runBlockCommandUtil = utils.runBlockCommand,
                renderOutputUtil = utils.renderOutput,
                getPropertyUtil = utils.getProperty,
                runInlineCommandUtil = utils.runInlineCommand,
                getPropertyOrRunCommandUtil = utils.getPropertyOrRunCommand;
            buffer += '';
            var config0 = {};
            var params1 = [];
            var id2 = getPropertyUtil(engine, scope, "data", 0, 1);
            params1.push(id2);
            config0.params = params1;
            config0.fn = function (scope) {
                var buffer = "";
                buffer += '\r\n';
                var config3 = {};
                var params4 = [];
                var id5 = getPropertyUtil(engine, scope, "data", 0, 2);
                params4.push(id5);
                config3.params = params4;
                config3.fn = function (scope) {
                    var buffer = "";
                    buffer += '\r\n<div class="collect-item"  data-id="';
                    var id6 = getPropertyOrRunCommandUtil(engine, scope, {}, "list_id", 0, 3);
                    buffer += renderOutputUtil(id6, true);
                    buffer += '">\r\n\t<div class="collect-item-con">\r\n\t\t';
                    var config7 = {};
                    var params8 = [];
                    var id9 = getPropertyUtil(engine, scope, "logo", 0, 5);
                    params8.push(id9);
                    config7.params = params8;
                    config7.fn = function (scope) {
                        var buffer = "";
                        buffer += '\r\n\t\t<img src="http://img.xiami.net/';
                        var id10 = getPropertyOrRunCommandUtil(engine, scope, {}, "logo", 0, 6);
                        buffer += renderOutputUtil(id10, true);
                        buffer += '" width="25" height="25" alt="">\r\n\t\t';
                        return buffer;
                    };
                    config7.inverse = function (scope) {
                        var buffer = "";
                        buffer += '\r\n\t\t<img src="http://gtms01.alicdn.com/tps/i1/T1c7F7FqXeXXcCXlfb-25-25.png" width="25" height="25" alt="">\r\n\t\t';
                        return buffer;
                    };
                    buffer += runBlockCommandUtil(engine, scope, config7, "if", 5);
                    buffer += '\r\n\t\t<input type="hidden" class="item-old" value="';
                    var id11 = getPropertyOrRunCommandUtil(engine, scope, {}, "name", 0, 10);
                    buffer += renderOutputUtil(id11, false);
                    buffer += '">\r\n\t\t<span class="item-name">';
                    var id12 = getPropertyOrRunCommandUtil(engine, scope, {}, "name", 0, 11);
                    buffer += renderOutputUtil(id12, false);
                    buffer += '</span>\r\n\t\t<input type="text" value="';
                    var id13 = getPropertyOrRunCommandUtil(engine, scope, {}, "name", 0, 12);
                    buffer += renderOutputUtil(id13, false);
                    buffer += '" class="item-input" maxlength="400">\r\n\t\t<a class="edit icon-editCollect"></a>\r\n\t\t<a class="delete icon-deleteCollect"></a>\r\n\t</div>\r\n</div>\r\n';
                    return buffer;
                };
                buffer += runBlockCommandUtil(engine, scope, config3, "each", 2);
                buffer += '\r\n';
                return buffer;
            };
            config0.inverse = function (scope) {
                var buffer = "";
                buffer += '\r\n<div class="collect-none"></div>\r\n';
                return buffer;
            };
            buffer += runBlockCommandUtil(engine, scope, config0, "if", 1);
            buffer += '\r\n';
            return buffer;
        };
});
/** Compiled By kissy-xtemplate */
KISSY.add('page/mods/xtpl/collectDetail-xtpl',function (S, require, exports, module) {
        /*jshint quotmark:false, loopfunc:true, indent:false, asi:true, unused:false, boss:true*/
        return function (scope, S, undefined) {
            var buffer = "",
                config = this.config,
                engine = this,
                moduleWrap, utils = config.utils;
            if (typeof module !== "undefined" && module.kissy) {
                moduleWrap = module;
            }
            var runBlockCommandUtil = utils.runBlockCommand,
                renderOutputUtil = utils.renderOutput,
                getPropertyUtil = utils.getProperty,
                runInlineCommandUtil = utils.runInlineCommand,
                getPropertyOrRunCommandUtil = utils.getPropertyOrRunCommand;
            buffer += '<div class="ui-collect-title">\r\n\t<div class="ui-collect-title-con">\r\n\t\t<a class="icon-playAllBtn"  title="播放全部" onclick="SEIYA.playcollect(\'';
            var id0 = getPropertyOrRunCommandUtil(engine, scope, {}, "list_id", 0, 3);
            buffer += renderOutputUtil(id0, true);
            buffer += '\')"></a>\r\n\t\t<h2>';
            var id1 = getPropertyOrRunCommandUtil(engine, scope, {}, "name", 0, 4);
            buffer += renderOutputUtil(id1, false);
            buffer += '</h2>\r\n\t\t<p><span>歌曲数:';
            var id2 = getPropertyOrRunCommandUtil(engine, scope, {}, "songs_count", 0, 5);
            buffer += renderOutputUtil(id2, true);
            buffer += '首</span><span>更新时间:';
            var id3 = getPropertyOrRunCommandUtil(engine, scope, {}, "gmt_modify", 0, 5);
            buffer += renderOutputUtil(id3, true);
            buffer += '</span><a href="http://www.xiami.com/song/showcollect/id/';
            var id4 = getPropertyOrRunCommandUtil(engine, scope, {}, "list_id", 0, 5);
            buffer += renderOutputUtil(id4, true);
            buffer += '" target="_blank">查看详情</a></p>\r\n\t</div>\r\n</div>\r\n<div class="ui-collect-header ui-row-item">\r\n\t<div class="ui-row-item-body">\r\n\t\t<div class="ui-row-item-column c1">\r\n\t\t\t歌曲\r\n\t\t</div>\r\n\t\t<div class="ui-row-item-column c2">\r\n\t\t\t演唱者\r\n\t\t</div>\r\n\t\t<div class="ui-row-item-column c3">\r\n\t\t\t专辑\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n';
            var config5 = {};
            var params6 = [];
            var id7 = getPropertyUtil(engine, scope, "song", 0, 21);
            params6.push(id7);
            config5.params = params6;
            config5.fn = function (scope) {
                var buffer = "";
                buffer += '\r\n<div class="ui-collect-body">\r\n\t<div id="J_pageCollectScrollView" class="ks-scroll-view">\r\n\t\t<!-- 歌曲列表 -->\r\n\t\t<div class="ks-scroll-view-content">\r\n\t\t\t<!-- 列表 begin -->\r\n\t\t\t<div class="ui-tracks-wrap" id="J_collectTracksList">\r\n\t\t\t';
                var config0 = {};
                config0.fn = function (scope) {
                    var buffer = "";
                    buffer += '\r\n\t\t\t\t<div class="ui-row-item ui-track-item';
                    var config8 = {};
                    var params9 = [];
                    var id10 = getPropertyUtil(engine, scope, "shield", 0, 29);
                    params9.push(id10);
                    config8.params = params9;
                    config8.fn = function (scope) {
                        var buffer = "";
                        buffer += ' ui-track-disabled';
                        return buffer;
                    };
                    buffer += runBlockCommandUtil(engine, scope, config8, "if", 29);
                    buffer += '" data-sid="';
                    var id11 = getPropertyOrRunCommandUtil(engine, scope, {}, "song_id", 0, 29);
                    buffer += renderOutputUtil(id11, true);
                    buffer += '" data-id="';
                    var id12 = getPropertyOrRunCommandUtil(engine, scope, {}, "list_id", 0, 29);
                    buffer += renderOutputUtil(id12, true);
                    buffer += '" data-type="collect" id="J_collectList';
                    var id13 = getPropertyOrRunCommandUtil(engine, scope, {}, "song_id", 0, 29);
                    buffer += renderOutputUtil(id13, true);
                    buffer += '">\r\n\t\t\t\t<div class="ui-track-main">\r\n\t\t\t\t\t<div class="ui-track-checkbox">\r\n\t\t\t\t\t\t<input type="checkbox" class="ui-track-item-id" name="collect" id="J_collectTrack';
                    var id14 = getPropertyOrRunCommandUtil(engine, scope, {}, "song_id", 0, 32);
                    buffer += renderOutputUtil(id14, true);
                    buffer += '" value="';
                    var id15 = getPropertyOrRunCommandUtil(engine, scope, {}, "song_id", 0, 32);
                    buffer += renderOutputUtil(id15, true);
                    buffer += '" ';
                    var config16 = {};
                    var params17 = [];
                    var id18 = getPropertyUtil(engine, scope, "shield", 0, 32);
                    params17.push(id18);
                    config16.params = params17;
                    config16.fn = function (scope) {
                        var buffer = "";
                        buffer += 'disabled="disabled"';
                        return buffer;
                    };
                    buffer += runBlockCommandUtil(engine, scope, config16, "if", 32);
                    buffer += ' />\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class="ui-track-sort">';
                    var config19 = {};
                    var params20 = [];
                    var id21 = getPropertyUtil(engine, scope, "shield", 0, 34);
                    params20.push(id21);
                    config19.params = params20;
                    config19.fn = function (scope) {
                        var buffer = "";
                        buffer += '<i>';
                        var id22 = getPropertyUtil(engine, scope, "xindex", 0, 34);
                        buffer += renderOutputUtil(id22 + (1), true);
                        buffer += '</i>';
                        return buffer;
                    };
                    config19.inverse = function (scope) {
                        var buffer = "";
                        buffer += '<em>';
                        var id23 = getPropertyUtil(engine, scope, "xindex", 0, 34);
                        buffer += renderOutputUtil(id23 + (1), true);
                        buffer += '</em>';
                        return buffer;
                    };
                    buffer += runBlockCommandUtil(engine, scope, config19, "if", 34);
                    buffer += '</div>\r\n\t\t\t\t\t<div class="ui-row-item-body">\r\n\t\t\t\t\t\t<div class="ui-row-item-column c1" data-id="';
                    var id24 = getPropertyOrRunCommandUtil(engine, scope, {}, "song_id", 0, 36);
                    buffer += renderOutputUtil(id24, true);
                    buffer += '">';
                    var id25 = getPropertyOrRunCommandUtil(engine, scope, {}, "song_name", 0, 36);
                    buffer += renderOutputUtil(id25, false);
                    buffer += '';
                    var config26 = {};
                    var params27 = [];
                    var id28 = getPropertyUtil(engine, scope, "shield", 0, 36);
                    params27.push(id28);
                    config26.params = params27;
                    config26.fn = function (scope) {
                        var buffer = "";
                        buffer += '&nbsp;&nbsp;<img src="http://gtms03.alicdn.com/tps/i3/T1iS08FvdcXXblKhDf-39-18.png" width="39" height="18" />';
                        return buffer;
                    };
                    buffer += runBlockCommandUtil(engine, scope, config26, "if", 36);
                    buffer += '</div>\r\n\t\t\t\t\t\t<div class="ui-row-item-column c2" data-artist-id="';
                    var id29 = getPropertyOrRunCommandUtil(engine, scope, {}, "artist_id", 0, 37);
                    buffer += renderOutputUtil(id29, true);
                    buffer += '">\r\n\t\t\t\t\t\t';
                    var config30 = {};
                    var params31 = [];
                    var id32 = getPropertyUtil(engine, scope, "singers", 0, 38);
                    params31.push(id32);
                    config30.params = params31;
                    config30.fn = function (scope) {
                        var buffer = "";
                        buffer += '\r\n\t\t\t\t\t\t';
                        var config33 = {};
                        var params34 = [];
                        var id35 = getPropertyUtil(engine, scope, "xindex", 0, 39);
                        params34.push(id35 !== (0));
                        config33.params = params34;
                        config33.fn = function (scope) {
                            var buffer = "";
                            buffer += ' ; ';
                            return buffer;
                        };
                        buffer += runBlockCommandUtil(engine, scope, config33, "if", 39);
                        buffer += '<a href="http://www.xiami.com';
                        var id36 = getPropertyOrRunCommandUtil(engine, scope, {}, "href", 0, 39);
                        buffer += renderOutputUtil(id36, true);
                        buffer += '" target="_blank" title="';
                        var id37 = getPropertyOrRunCommandUtil(engine, scope, {}, "name", 0, 39);
                        buffer += renderOutputUtil(id37, false);
                        buffer += '">';
                        var id38 = getPropertyOrRunCommandUtil(engine, scope, {}, "name", 0, 39);
                        buffer += renderOutputUtil(id38, false);
                        buffer += '</a>\r\n\t\t\t\t\t\t';
                        return buffer;
                    };
                    buffer += runBlockCommandUtil(engine, scope, config30, "each", 38);
                    buffer += '\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class="ui-row-item-column c3" data-album-id="';
                    var id39 = getPropertyOrRunCommandUtil(engine, scope, {}, "album_id", 0, 42);
                    buffer += renderOutputUtil(id39, true);
                    buffer += '"><a href="http://www.xiami.com/album/';
                    var id40 = getPropertyOrRunCommandUtil(engine, scope, {}, "album_id", 0, 42);
                    buffer += renderOutputUtil(id40, true);
                    buffer += '" target="_blank" title="';
                    var id41 = getPropertyOrRunCommandUtil(engine, scope, {}, "album_name", 0, 42);
                    buffer += renderOutputUtil(id41, false);
                    buffer += '">';
                    var id42 = getPropertyOrRunCommandUtil(engine, scope, {}, "album_name", 0, 42);
                    buffer += renderOutputUtil(id42, false);
                    buffer += '</a></div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class="ui-track-control">\r\n\t\t\t\t\t\t';
                    var config43 = {};
                    var params44 = [];
                    var id45 = getPropertyUtil(engine, scope, "grade", 0, 45);
                    params44.push(id45 === (-1));
                    config43.params = params44;
                    config43.fn = function (scope) {
                        var buffer = "";
                        buffer += '\r\n\t\t\t\t\t\t<a class="fav-btn icon-track-fav" data-type="collect" data-event="fav" title="收藏"></a>\r\n\t\t\t\t\t\t';
                        return buffer;
                    };
                    config43.inverse = function (scope) {
                        var buffer = "";
                        buffer += '\r\n\t\t\t\t\t\t<a class="fav-btn icon-track-faved" data-type="collect" data-event="fav" title="取消收藏"></a>\r\n\t\t\t\t\t\t';
                        return buffer;
                    };
                    buffer += runBlockCommandUtil(engine, scope, config43, "if", 45);
                    buffer += '\r\n\t\t\t\t\t\t';
                    var config46 = {};
                    var params47 = [];
                    var id48 = getPropertyUtil(engine, scope, "shield", 0, 50);
                    params47.push(id48);
                    config46.params = params47;
                    config46.fn = function (scope) {
                        var buffer = "";
                        buffer += '<a class="more-btn icon-track-more" data-type="collect" data-typeid="';
                        var id49 = getPropertyOrRunCommandUtil(engine, scope, {}, "list_id", 0, 50);
                        buffer += renderOutputUtil(id49, true);
                        buffer += '" data-event="more" title="更多"></a>';
                        return buffer;
                    };
                    var inverse50 = config46.fn;
                    config46.fn = config46.inverse;
                    config46.inverse = inverse50;
                    buffer += runBlockCommandUtil(engine, scope, config46, "if", 50);
                    buffer += '\r\n\t\t\t\t\t\t<a class="delete-btn icon-track-delete" data-type="collect" data-event="delete" title="删除"></a>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t';
                    return buffer;
                };
                buffer += runBlockCommandUtil(engine, scope, config0, "song", 28);
                buffer += '\r\n\t\t\t</div>\r\n\t\t\t<!-- 列表 end -->\r\n\t\t</div>\r\n\t\t<!-- 歌曲列表 end -->\r\n\t</div>\r\n</div>\r\n';
                return buffer;
            };
            config5.inverse = function (scope) {
                var buffer = "";
                buffer += '\r\n<div class="ui-collect-body" style="background: none">\r\n\t<div id="J_pageCollectScrollView" class="ks-scroll-view">\r\n\t\t<!-- 歌曲列表 -->\r\n\t\t<div class="ks-scroll-view-content">\r\n\t\t\t<!-- 列表 begin -->\r\n\t\t\t<div class="ui-tracks-wrap" id="J_collectTracksList">\r\n\t\t\t<div class="collect-detail-none"></div>\r\n\t\t\t</div>\r\n\t\t\t<!-- 列表 end -->\r\n\t\t</div>\r\n\t\t<!-- 歌曲列表 end -->\r\n\t</div>\r\n</div>\r\n';
                return buffer;
            };
            buffer += runBlockCommandUtil(engine, scope, config5, "if", 21);
            buffer += '\r\n\r\n<div class="ui-collect-footer">\r\n\t<div class="ui-track-all">\r\n\t\t<div class="ui-all-checkbox">\r\n\t\t\t<input id="J_checkAll_collect" type="checkbox" onclick="SEIYA.syncCheck(this,\'collect\')" />\r\n\t\t</div>\r\n\t\t<div class="ui-all-item">\r\n\t\t\t<a class="icon-tracks-play" onclick="SEIYA.playAllSongs(\'collect\', \'collect\', ';
            var id51 = getPropertyOrRunCommandUtil(engine, scope, {}, "list_id", 0, 84);
            buffer += renderOutputUtil(id51, true);
            buffer += ')">播放</a>\r\n\t\t</div>\r\n\t\t<div class="ui-all-item">\r\n\t\t\t<a class="icon-tracks-add" onclick="SEIYA.collects(\'collect\')">添加到精选集</a>\r\n\t\t</div>\r\n\t\t<div class="ui-all-item">\r\n\t\t\t<a class="icon-tracks-more" data-type="collect" data-typeid="';
            var id52 = getPropertyOrRunCommandUtil(engine, scope, {}, "list_id", 0, 90);
            buffer += renderOutputUtil(id52, true);
            buffer += '" data-event="more">更多</a>\r\n\t\t</div>\r\n\t</div>\r\n</div>';
            return buffer;
        };
});
KISSY.add('page/mods/sidebar/collect',['node', 'base', 'event', 'io', 'xtemplate', 'utils/base', 'widget/tool/index', 'utils/scrollView/scrollViewManage', '../xtpl/collectItem-xtpl', '../xtpl/collectListItem-xtpl', '../xtpl/collectDetail-xtpl'], function(S, require, exports, module) {
    // @formatter:off
    var Node = require("node"), 
        Base = require("base"),
        Event = require("event"),
        IO = require("io"), 
        Xtemplate = require("xtemplate"), 
        BaseConfig = require("utils/base"), 
        UTool = require("widget/tool/index"), 
        ScrollViewManage = require("utils/scrollView/scrollViewManage"), 
        tpl_collectItem = require("../xtpl/collectItem-xtpl"), 
        tpl_collectListItem = require("../xtpl/collectListItem-xtpl"), 
        tpl_collectDetail = require("../xtpl/collectDetail-xtpl");
    // @formatter:on
    var $ = Node.all;

    var collect = Base.extend({
        initializer : function() {
            var self = this;
            self.collectList = $("#J_collectList");
            self.createCollect = $("#J_createCollect");
            self.createCollect.attr("title", "新建精选集");
            self.pageCollect = $("#J_pageCollect");
            self.TAB = $("#J_tab");

            self.tpl_collectItem = new Xtemplate(tpl_collectItem);
            self.tpl_collectListItem = new Xtemplate(tpl_collectListItem);
            self.tpl_collectDetail = new Xtemplate(tpl_collectDetail);
            self.scrollView = null;

            self._addEvent();
            self._addMouseEvent();
        },
        sync : function() {
            var self = this;
            self.renderCollectList();
        },
        _addEvent : function() {
            var self = this;
            var menu = $("#J_sidebarMenu").all("li");

            self.renderCollectList();

            self.collectList.delegate("click", ".collect-item", function(e) {
                if (!UTool.isLogin())
                    return false;
                var that = $(e.currentTarget);
                var id = that.attr("data-id");
                if (that.hasClass("collect-item-edit")) {
                    return false;
                };
                var target = $(e.target);
                /**
                 * 编辑精选集
                 */
                if (target.hasClass("edit")) {
                    that.removeClass("collect-item-hover");
                    that.addClass("collect-item-edit");
                    that.one(".item-input")[0].focus();
                    return false;
                }
                /**
                 * 删除精选集
                 */
                if (target.hasClass("delete")) {
                    if (!   confirm("删除精选集后数据无法恢复，是否删除?")) {
                        return false;
                    }
                    new IO({
                        dataType : "jsonp",
                        url : BaseConfig.COLLECT_DELETE_URL,
                        data : {
                            "list_id" : id,
                            "_xiamitoken" : BaseConfig.getToken()
                        },
                        success : function(respones) {
                            if (respones.status) {
                                self._cancelCreate( that );
                                if (id == self.get("id")) {
                                    self.fire("deleteCurrent")
                                }
                            } else {
                                alert(respones.message);
                            }
                            S.log(respones);
                        },
                        error : function(respones) {
                            S.log(respones)
                        }
                    });
                    return false;
                };
                /**
                 * 选中当前切换
                 */
                self.TAB.all(".main-page").hide();

                menu.removeClass("current");
                self.collectList.all(".collect-item").removeClass("collect-item-current");
                that.addClass("collect-item-current");
                self.renderCollectDetail(id);
            });
            self.collectList.delegate("mouseover", ".collect-item", function(e) {
                var that = $(e.currentTarget);
                if (that.hasClass("collect-item-edit")) {
                    return false;
                }
                that.addClass("collect-item-hover");
            });
            self.collectList.delegate("mouseout", ".collect-item", function(e) {
                var that = $(e.currentTarget);
                if (that.hasClass("collect-item-edit")) {
                    return false;
                }
                that.removeClass("collect-item-hover");
            });
            /**
             * 创建精选集
             */
            self.createCollect.on("click", function(e) {
                if (!UTool.isLogin())
                    return false;
                var f = self.collectList.first(".collect-item");
                if(f.attr("data-id")==0){
                    f.one(".item-input")[0].focus();
                    return false;
                }
                var item = self.tpl_collectItem.render();
                $(".collect-none") && $(".collect-none").remove();
                self.collectList.prepend(item);
                ScrollViewManage.sync("J_collectScrollView");
                ScrollViewManage.scrollToTop("J_collectScrollView");
                self.collectList.first(".collect-item").one(".item-input")[0].focus();
            });
            /**
             * 鼠标滑离 提交创建
             */
            // self.collectList.delegate("focusout", ".collect-item .item-input", function(e) {
            //     var target = $(e.currentTarget);
            //     var that = target.parent(".collect-item");
            //     var id = that.attr("data-id"), val = target.val(), val = S.trim(val);
            //     var oldtitle = that.one(".item-old").val();
            //     if(val == ""){
            //         if(oldtitle == ""){
            //             self._cancelCreate( that );
            //         }else{
            //             that.removeClass("collect-item-edit");
            //             that.one(".item-name").html(oldtitle);
            //             that.one(".item-input").val(oldtitle);
            //         }
            //         return false;
            //     };
            //     if(val == oldtitle){
            //         that.removeClass("collect-item-edit");
            //         return false;
            //     };
            //     if(id == 0){
            //         self._createCollect(that, id, val);
            //     } else {
            //         self._editCollect(that, id, val);
            //     };
            // });
            /**
             * 回车 确认
             */
            self.collectList.delegate("keydown", ".collect-item", function(e) {
                if (e.keyCode == 13 || e.which == 13) {
                    var that = $(e.currentTarget);
                    var target = $(e.target);
                    var oldtitle = that.one(".item-old").val(), id = that.attr("data-id"), val = S.trim(target.val());
                    if(val == ""){
                        if(oldtitle == ""){
                            self._cancelCreate( that );
                        }else{
                            that.removeClass("collect-item-edit");
                            that.one(".item-name").html(oldtitle);
                            that.one(".item-input").val(oldtitle);
                        }
                        return false;
                    };
                    if(val == oldtitle){
                        that.removeClass("collect-item-edit");
                        return false;
                    };
                    if(id == 0){
                        self._createCollect(that, id, val);
                    } else {
                        self._editCollect(that, id, val);
                    };
                }
            });
        },
        _editCollect : function(elem, id, title){
            S.log(["_editCollect", elem, id, title]);
            if (!UTool.isLogin())
                return false;
            var self = this, that = elem, title = title;
            if (title == "") {
                title = that.one(".item-old").val();
                that.one(".item-name").html(title);
                return false;
            };
            that.removeClass("collect-item-edit");
            that.one(".item-name").html(title);
            new IO({
                dataType : "jsonp",
                url : BaseConfig.COLLECT_EDIT_NAME_URL,
                data : {
                    "list_id" : id,
                    "title" : title,
                    "_xiamitoken" : BaseConfig.getToken()
                },
                success : function(respones) {
                    if (respones.status) {
                        that.one(".item-old").val(title);
                        that.one(".item-name").html(title)
                        that.one("input").val(title);
                    } else {
                        title = that.one(".item-old").val();
                        that.one(".item-name").html(title);
                        alert(respones.message);
                    }
                },
                error : function() {
                    title = that.one(".item-old").val();
                    that.one(".item-name").html(title);
                }
            });
        },
        _createCollect : function(elem, id, title){
            S.log(["_createCollect", elem, title]);
            if (!UTool.isLogin())
                return false;
            var self = this, that = elem, title = title;
            if (title == "") {
                self._cancelCreate( that );
                return false;
            }
            that.removeClass("collect-item-edit");
            that.one(".item-old").val("");
            that.one(".item-name").html(title);
            new IO({
                dataType : "jsonp",
                url : BaseConfig.COLLECT_CREATE_URL,
                data : {
                    "title" : title,
                    "_xiamitoken" : BaseConfig.getToken()
                },
                success : function(respones) {
                    //S.log(respones);
                    if (respones.status) {
                        that.attr("data-id", respones.data);
                        that.one(".item-old").val(title);
                        that.one(".item-name").html(title);
                        that.one("input").val(title);
                    } else {
                        self._cancelCreate( that );
                        alert(respones.message);
                    }
                },
                error : function() {
                    that.remove();
                    ScrollViewManage.sync("J_collectScrollView");
                    ScrollViewManage.scrollToTop("J_collectScrollView");
                }
            });
        },
        _cancelCreate : function( elem ){
            var self = this;
            //debugger;
            elem.remove();
            ScrollViewManage.sync("J_collectScrollView");
            ScrollViewManage.scrollToTop("J_collectScrollView");
            self._showCollectTip();
        },
        /**
         * 精选集详情展示
         */
        renderCollectDetail : function(id) {
            var self = this;
            self.set("id", id);
            new IO({
                url : BaseConfig.COLLECT_DETAIL_URL,
                dataType : "jsonp",
                data : {
                    "list_id" : id
                },
                success : function(respones) {
                    if (respones.status) {
                        var html = self.tpl_collectDetail.render(respones.data);
                        self.pageCollect.show();
                        self.pageCollect.html(html);
                        ScrollViewManage.forceRender("J_pageCollectScrollView");
                    } else {

                    }
                },
                error : function() {

                }
            });
        },
        _addMouseEvent : function() {
            var self = this;
            var tracksList = $("#J_collectTracksList");
            tracksList.delegate("mouseover", ".ui-track-item", function(event) {
                var that = $(event.currentTarget);
                that.addClass("ui-track-hover");
            });
            tracksList.delegate("mouseout", ".ui-track-item", function(event) {
                var that = $(event.currentTarget);
                that.removeClass("ui-track-hover");
            });
        },
        /**
         * 删除精选集歌曲
         */
        deleteCollectIds : function(collectId, sid) {
            var self = this;
            var item = $("#J_collectList" + sid);
            new IO({
                url : BaseConfig.COLLECT_DELETE_SONG_URL,
                dataType : "jsonp",
                data : {
                    "list_id" : collectId,
                    "sids" : sid,
                    "_xiamitoken" : BaseConfig.getToken()
                },
                success : function(respones) {
                    if (respones.status) {
                        S.log(respones)
                    } else {
                        alert(respones.message)
                    }
                },
                error : function(respones) {
                    alert(respones.message)
                }
            });
        },

        sortTrackList : function() {
            var self = this;
            var tracks = $("#J_collectTracksList").all(".ui-track-item");
            var len = tracks.length;
            for( var i = 0; i < len; i++ ) {
                var sort = $(tracks[i]).one(".ui-track-sort");
                sort.html("<em>" + (i + 1) + "</em>");
            };
            ScrollViewManage.sync("J_pageCollectScrollView");
        },
        /**
         * 渲染精选集列表
         */
        renderCollectList : function() {
            var self = this;
            new IO({
                url : BaseConfig.COLLECT_GET_LIST_URL,
                dataType : "jsonp",
                success : function(respones) {
                    if (respones.status) {
                        var data = {
                            data : respones.data
                        };
                        var html = self.tpl_collectListItem.render(data);
                        self.collectList.html(html);
                        self.scrollView = ScrollViewManage.render("J_collectScrollView");
                    } else {
                        var html = '<div class="collect-none"></div>';
                        self.collectList.html(html);
                    }
                },
                error : function() {
                    var html = '<div class="collect-none"></div>';
                    self.collectList.html(html);
                }
            });
        },
        _showCollectTip : function() {
            var self = this;
            if (self.collectList.all(".collect-item").length == 0) {
                var html = '<div class="collect-none"></div>';
                self.collectList.html(html);
            }
        }
    }, {
        ATTRS : {
            id : {
                value : 0
            }
        }
    });

    module.exports = collect;
});

/** Compiled By kissy-xtemplate */
KISSY.add('page/mods/xtpl/histroyTrackItem-xtpl',function (S, require, exports, module) {
        /*jshint quotmark:false, loopfunc:true, indent:false, asi:true, unused:false, boss:true*/
        return function (scope, S, undefined) {
            var buffer = "",
                config = this.config,
                engine = this,
                moduleWrap, utils = config.utils;
            if (typeof module !== "undefined" && module.kissy) {
                moduleWrap = module;
            }
            var runBlockCommandUtil = utils.runBlockCommand,
                renderOutputUtil = utils.renderOutput,
                getPropertyUtil = utils.getProperty,
                runInlineCommandUtil = utils.runInlineCommand,
                getPropertyOrRunCommandUtil = utils.getPropertyOrRunCommand;
            buffer += '';
            var config0 = {};
            var params1 = [];
            var id2 = getPropertyUtil(engine, scope, "data", 0, 1);
            params1.push(id2);
            config0.params = params1;
            config0.fn = function (scope) {
                var buffer = "";
                buffer += '\r\n';
                var config2 = {};
                config2.fn = function (scope) {
                    var buffer = "";
                    buffer += '\r\n';
                    var config3 = {};
                    var params4 = [];
                    var id5 = getPropertyUtil(engine, scope, "shield", 0, 3);
                    params4.push(id5);
                    config3.params = params4;
                    config3.fn = function (scope) {
                        var buffer = "";
                        buffer += '\r\n<div class="ui-row-item ui-track-item ui-track-disabled" data-sid="';
                        var id6 = getPropertyOrRunCommandUtil(engine, scope, {}, "song_id", 0, 4);
                        buffer += renderOutputUtil(id6, true);
                        buffer += '" data-gmt="';
                        var id7 = getPropertyOrRunCommandUtil(engine, scope, {}, "gmt_play", 0, 4);
                        buffer += renderOutputUtil(id7, true);
                        buffer += '" data-type="history" id="J_historyList';
                        var id8 = getPropertyOrRunCommandUtil(engine, scope, {}, "song_id", 0, 4);
                        buffer += renderOutputUtil(id8, true);
                        buffer += '">\r\n<div class="ui-track-main">\r\n\t<div class="ui-track-checkbox">\r\n\t\t<input type="checkbox" class="ui-track-item-id" name="history" id="J_track';
                        var id9 = getPropertyOrRunCommandUtil(engine, scope, {}, "song_id", 0, 7);
                        buffer += renderOutputUtil(id9, true);
                        buffer += '" value="';
                        var id10 = getPropertyOrRunCommandUtil(engine, scope, {}, "song_id", 0, 7);
                        buffer += renderOutputUtil(id10, true);
                        buffer += '" disabled="disabled" />\r\n\t</div>\r\n\t<div class="ui-track-sort"><i>';
                        var id11 = getPropertyUtil(engine, scope, "xindex", 0, 9);
                        buffer += renderOutputUtil(id11 + (1), true);
                        buffer += '</i></div>\r\n\t<div class="ui-row-item-body">\r\n\t\t<div class="ui-row-item-column c1" data-id="';
                        var id12 = getPropertyOrRunCommandUtil(engine, scope, {}, "song_id", 0, 11);
                        buffer += renderOutputUtil(id12, true);
                        buffer += '">';
                        var id13 = getPropertyOrRunCommandUtil(engine, scope, {}, "song_name", 0, 11);
                        buffer += renderOutputUtil(id13, false);
                        buffer += '&nbsp;&nbsp;<img src="http://gtms03.alicdn.com/tps/i3/T1iS08FvdcXXblKhDf-39-18.png" width="39" height="18" /></div>\r\n\t\t<div class="ui-row-item-column c2" data-artist-id="';
                        var id14 = getPropertyOrRunCommandUtil(engine, scope, {}, "artist_id", 0, 12);
                        buffer += renderOutputUtil(id14, true);
                        buffer += '">\r\n\t\t';
                        var config15 = {};
                        var params16 = [];
                        var id17 = getPropertyUtil(engine, scope, "singers", 0, 13);
                        params16.push(id17);
                        config15.params = params16;
                        config15.fn = function (scope) {
                            var buffer = "";
                            buffer += '\r\n\t\t';
                            var config18 = {};
                            var params19 = [];
                            var id20 = getPropertyUtil(engine, scope, "xindex", 0, 14);
                            params19.push(id20 !== (0));
                            config18.params = params19;
                            config18.fn = function (scope) {
                                var buffer = "";
                                buffer += ' ; ';
                                return buffer;
                            };
                            buffer += runBlockCommandUtil(engine, scope, config18, "if", 14);
                            buffer += '<a href="http://www.xiami.com';
                            var id21 = getPropertyOrRunCommandUtil(engine, scope, {}, "href", 0, 14);
                            buffer += renderOutputUtil(id21, true);
                            buffer += '" target="_blank" title="';
                            var id22 = getPropertyOrRunCommandUtil(engine, scope, {}, "name", 0, 14);
                            buffer += renderOutputUtil(id22, false);
                            buffer += '">';
                            var id23 = getPropertyOrRunCommandUtil(engine, scope, {}, "name", 0, 14);
                            buffer += renderOutputUtil(id23, false);
                            buffer += '</a>\r\n\t\t';
                            return buffer;
                        };
                        buffer += runBlockCommandUtil(engine, scope, config15, "each", 13);
                        buffer += '\r\n\t\t</div>\r\n\t\t<div class="ui-row-item-column c3"><span class="time">';
                        var id24 = getPropertyOrRunCommandUtil(engine, scope, {}, "gmt_play", 0, 17);
                        buffer += renderOutputUtil(id24, true);
                        buffer += '</span></div>\r\n\t</div>\r\n\t<div class="ui-track-control">\r\n\t\t';
                        var config25 = {};
                        var params26 = [];
                        var id27 = getPropertyUtil(engine, scope, "grade", 0, 20);
                        params26.push(id27 === (-1));
                        config25.params = params26;
                        config25.fn = function (scope) {
                            var buffer = "";
                            buffer += '\r\n\t\t<a class="fav-btn icon-track-fav" data-type="history" data-event="fav" title="收藏"></a>\r\n\t\t';
                            return buffer;
                        };
                        config25.inverse = function (scope) {
                            var buffer = "";
                            buffer += '\r\n\t\t<a class="fav-btn icon-track-faved" data-type="history" data-event="fav" title="取消收藏"></a>\r\n\t\t';
                            return buffer;
                        };
                        buffer += runBlockCommandUtil(engine, scope, config25, "if", 20);
                        buffer += '\r\n\t\t<a class="delete-btn icon-track-delete" data-type="history" data-event="delete" title="删除"></a>\r\n\t</div>\r\n</div>\r\n</div>\r\n';
                        return buffer;
                    };
                    config3.inverse = function (scope) {
                        var buffer = "";
                        buffer += '\r\n<div class="ui-row-item ui-track-item" data-sid="';
                        var id28 = getPropertyOrRunCommandUtil(engine, scope, {}, "song_id", 0, 30);
                        buffer += renderOutputUtil(id28, true);
                        buffer += '" data-gmt="';
                        var id29 = getPropertyOrRunCommandUtil(engine, scope, {}, "gmt_play", 0, 30);
                        buffer += renderOutputUtil(id29, true);
                        buffer += '" data-type="history" id="J_historyList';
                        var id30 = getPropertyOrRunCommandUtil(engine, scope, {}, "song_id", 0, 30);
                        buffer += renderOutputUtil(id30, true);
                        buffer += '">\r\n<div class="ui-track-main">\r\n\t<div class="ui-track-checkbox">\r\n\t\t<input type="checkbox" class="ui-track-item-id" name="history" id="J_track';
                        var id31 = getPropertyOrRunCommandUtil(engine, scope, {}, "song_id", 0, 33);
                        buffer += renderOutputUtil(id31, true);
                        buffer += '" value="';
                        var id32 = getPropertyOrRunCommandUtil(engine, scope, {}, "song_id", 0, 33);
                        buffer += renderOutputUtil(id32, true);
                        buffer += '" />\r\n\t</div>\r\n\t<div class="ui-track-sort"><em>';
                        var id33 = getPropertyUtil(engine, scope, "xindex", 0, 35);
                        buffer += renderOutputUtil(id33 + (1), true);
                        buffer += '</em></div>\r\n\t<div class="ui-row-item-body">\r\n\t\t<div class="ui-row-item-column c1" data-id="';
                        var id34 = getPropertyOrRunCommandUtil(engine, scope, {}, "song_id", 0, 37);
                        buffer += renderOutputUtil(id34, true);
                        buffer += '">';
                        var id35 = getPropertyOrRunCommandUtil(engine, scope, {}, "song_name", 0, 37);
                        buffer += renderOutputUtil(id35, false);
                        buffer += '</div>\r\n\t\t<div class="ui-row-item-column c2" data-artist-id="';
                        var id36 = getPropertyOrRunCommandUtil(engine, scope, {}, "artist_id", 0, 38);
                        buffer += renderOutputUtil(id36, true);
                        buffer += '">\r\n\t\t';
                        var config37 = {};
                        var params38 = [];
                        var id39 = getPropertyUtil(engine, scope, "singers", 0, 39);
                        params38.push(id39);
                        config37.params = params38;
                        config37.fn = function (scope) {
                            var buffer = "";
                            buffer += '\r\n\t\t';
                            var config40 = {};
                            var params41 = [];
                            var id42 = getPropertyUtil(engine, scope, "xindex", 0, 40);
                            params41.push(id42 !== (0));
                            config40.params = params41;
                            config40.fn = function (scope) {
                                var buffer = "";
                                buffer += ' ; ';
                                return buffer;
                            };
                            buffer += runBlockCommandUtil(engine, scope, config40, "if", 40);
                            buffer += '<a href="http://www.xiami.com';
                            var id43 = getPropertyOrRunCommandUtil(engine, scope, {}, "href", 0, 40);
                            buffer += renderOutputUtil(id43, true);
                            buffer += '" target="_blank" title="';
                            var id44 = getPropertyOrRunCommandUtil(engine, scope, {}, "name", 0, 40);
                            buffer += renderOutputUtil(id44, false);
                            buffer += '">';
                            var id45 = getPropertyOrRunCommandUtil(engine, scope, {}, "name", 0, 40);
                            buffer += renderOutputUtil(id45, false);
                            buffer += '</a>\r\n\t\t';
                            return buffer;
                        };
                        buffer += runBlockCommandUtil(engine, scope, config37, "each", 39);
                        buffer += '\r\n\t\t</div>\r\n\t\t<div class="ui-row-item-column c3"><span class="time">';
                        var id46 = getPropertyOrRunCommandUtil(engine, scope, {}, "gmt_play", 0, 43);
                        buffer += renderOutputUtil(id46, true);
                        buffer += '</span></div>\r\n\t</div>\r\n\t<div class="ui-track-control">\r\n\t\t';
                        var config47 = {};
                        var params48 = [];
                        var id49 = getPropertyUtil(engine, scope, "grade", 0, 46);
                        params48.push(id49 === (-1));
                        config47.params = params48;
                        config47.fn = function (scope) {
                            var buffer = "";
                            buffer += '\r\n\t\t<a class="fav-btn icon-track-fav" data-type="history" data-event="fav" title="收藏"></a>\r\n\t\t';
                            return buffer;
                        };
                        config47.inverse = function (scope) {
                            var buffer = "";
                            buffer += '\r\n\t\t<a class="fav-btn icon-track-faved" data-type="history" data-event="fav" title="取消收藏"></a>\r\n\t\t';
                            return buffer;
                        };
                        buffer += runBlockCommandUtil(engine, scope, config47, "if", 46);
                        buffer += '\r\n\t\t<a class="more-btn icon-track-more" data-type="history" data-event="more" title="更多"></a>\r\n\t\t<a class="delete-btn icon-track-delete" data-type="history" data-event="delete" title="删除"></a>\r\n\t</div>\r\n</div>\r\n</div>\r\n';
                        return buffer;
                    };
                    buffer += runBlockCommandUtil(engine, scope, config3, "if", 3);
                    buffer += '\r\n';
                    return buffer;
                };
                buffer += runBlockCommandUtil(engine, scope, config2, "data", 2);
                buffer += '\r\n';
                return buffer;
            };
            config0.inverse = function (scope) {
                var buffer = "";
                buffer += '\r\n<div class="history-detail-none"></div>\r\n';
                return buffer;
            };
            buffer += runBlockCommandUtil(engine, scope, config0, "if", 1);
            buffer += '\r\n';
            return buffer;
        };
});
KISSY.add('page/mods/sidebar/history',['node', 'io', 'xtemplate', 'utils/base', 'utils/scrollView/scrollViewManage', '../xtpl/histroyTrackItem-xtpl'], function(S, require, exports, module) {
    // @formatter:off
    var Node = require("node"),
        IO = require("io"),
        Xtemplate = require("xtemplate"),
        BaseConfig = require("utils/base"),
        ScrollViewManage = require("utils/scrollView/scrollViewManage"),
        TPL_histroyTrackItem = require("../xtpl/histroyTrackItem-xtpl");
    // @formatter:on
    var $ = Node.all;

    function history() {
        this.init();
    };

    var pt = history.prototype;

    pt.init = function() {
        var self = this;
        self.HTML_histroyTrackItem = new Xtemplate(TPL_histroyTrackItem);
        self.pageContent = $("#J_historyTracksList");
        self.historyCount = $("#J_historyCount");
    };
    pt.renderData = function() {
        var self = this;
        var max = S.UA.ie && S.UA.ie < 9 ? 100 : 200;
        new IO({
            url : BaseConfig.HISTORY_TRACKS_URL,
            dataType : "jsonp",
            success : function(respones) {
                if (respones.status) {
                    var data = {
                        data : respones.data
                    };
                    var length;
                    if(data.data && data.data.length > 0){
                        length = data.data.length;
                    }else{
                        length = 0;
                    }
                    if (length >= 200) {
                        data.data.length = max;
                        self.historyCount.html('<span>显示最近' + max + '条记录</span><a href="http://www.xiami.com/space/charts-recent" target="_blank">查看完整记录</a>');
                    } else {
                        self.historyCount.html('<span>显示最近' + length + '条记录</span>');
                    }
                    if(length > 0){
                        $(".ui-history-body").removeClass("ui-history-empty");
                    }else{
                        $(".ui-history-body").addClass("ui-history-empty");
                    }
                    var html = self.HTML_histroyTrackItem.render(data);
                    self.pageContent.html(html);
                    $("#J_checkAll_history").prop('checked', false);
                    self.scrollView = ScrollViewManage.render("J_historyScrollView");
                } else {

                }
            },
            error : function() {

            }
        });
    };
    pt.deleteTrackForId = function(sid, gmt) {
        var self = this;
        new IO({
            url : BaseConfig.HISTOTY_DELETE_URL,
            dataType : "jsonp",
            data : {
                "id" : sid,
                "gmt" : gmt,
                "_xiamitoken" : BaseConfig.getToken()
            },
            success : function(respones) {
                S.log(respones);
            },
            error : function() {

            }
        });
    };
    pt.sortTrackList = function() {
        var self = this;
        var tracks = $("#J_historyTracksList").all(".ui-track-item");
        var len = tracks.length;
        for( var i = 0; i < len; i++ ) {
            var sort = $(tracks[i]).one(".ui-track-sort");
            sort.html("<em>" + (i + 1) + "</em>");
        };
        ScrollViewManage.sync("J_historyScrollView");
    };

    module.exports = history;
}); 
KISSY.add('page/mods/sidebar',['node', 'io', 'xtemplate', 'widget/tool/index', './xtpl/collectItem-xtpl', './sidebar/myfav', './sidebar/collect', './sidebar/history'], function(S, require, exports, module) {
    // @formatter:off
    var Node = require("node"),
        IO = require("io"),
        Xtemplate = require("xtemplate"),
        UTool = require("widget/tool/index"),
        CollectItem = require("./xtpl/collectItem-xtpl"),
        Myfav = require("./sidebar/myfav"),
        Collect = require("./sidebar/collect"),
        MyHistory = require("./sidebar/history");
    // @formatter:on
    var $ = Node.all;

    var GLOBAL = null;

    function sidebar() {

    };

    sidebar.prototype = {
        init : function(global) {
            var self = this;
            GLOBAL = global;
            self.collectItem = new Xtemplate(CollectItem);
            self.Myfav = new Myfav();
            self.Collect = new Collect();
            self.MyHistory = new MyHistory();

            self.TAB = $("#J_tab");

            self._addEvent();
        },
        _addEvent : function() {
            var self = this;

            self.Collect.on("deleteCurrent", function(event) {
                self._highPlaying();
            });
            var menu = $("#J_sidebarMenu").all("li");

            menu.on("click", function(event) {
                var that = $(this);
                if (that.hasClass("current")) {
                    return false;
                };
                var page = that.attr("data-page");
                S.log(page);
                if (page === "J_pageMyfav" || page === "J_pageHistory") {
                    if (!  UTool.isLogin()) {
                        return false;
                    }
                }
                menu.removeClass("current");
                self.Collect.collectList.all(".collect-item").removeClass("collect-item-current");
                that.addClass("current");
                self.TAB && self.TAB.all(".main-page").hide();
                $("#" + page).show();
                switch(page) {
                    case "J_pageMyfav":
                        self.Myfav.renderData();
                        break;
                    case "J_pageHistory":
                        self.MyHistory.renderData();
                        break;
                    case "J_pagePlayList":
                        // 切换视图要更新列表,否则滚动条丢失
                        GLOBAL.PLAYER.PlayerTracks.syncScrollView();
                        break;
                    default:
                        S.log(page);
                }
            });
        },
        _highPlaying : function() {
            var self = this;
            self.TAB && self.TAB.all(".main-page").hide();
            $("#J_menuPlaying").addClass("current");
            $("#J_pagePlayList").show();
            GLOBAL.PLAYER.PlayerTracks.syncScrollView();
        }
    };

    module.exports = sidebar;

});

/**
 * @author noyobo
 * @mail nongyoubao@alibaba-inc.com
 * @desc 鼠标事件
 */
KISSY.add('page/mods/player/player-event',['base'], function(S, require, exports, module) {
    var Base = require("base");

    module.exports = Base.extend({
        roamDblclick : function(elem, sid) {
            var self = this;
            self.fire("roamDblclick", {
                "sid" : sid
            });
        }
    }, {

    });
}); 
/**
 * @author noyobo
 * @mail nongyoubao@alibaba-inc.com
 */
KISSY.add('page/mods/page',['node', 'event', './player/player-event'], function(S, require, exports, module) {
    // @formatter:off
    var Node = require("node"),
        Event = require("event"),
        playerEvent = require("./player/player-event");
    // @formatter:on
    var $ = Node.all;
    var GLOBAL = null;

    function page() {

    };

    page.prototype = {
        init: function(global) {
            var self = this;
            GLOBAL = global;
            self._addEvent();
            self._initEvent();
        },
        _initEvent: function() {
            var SEIYAEVENT = window.SEIYAEVENT = new playerEvent();
            SEIYAEVENT.on("roamDblclick", function(event) {
                GLOBAL.PLAYER.PlayerData.playRoamForId(event.sid, "roam");
            });
        },
        _addEvent: function() {
            var self = this;
            // click event handler
            Event.delegate(document, "click", ".ui-track-item", function(event) {
                var that = $(event.currentTarget);
                var target = $(event.target);
                var tagName = event.target.tagName.toLowerCase();
                var type = target.attr("data-type") || that.attr("data-type"),
                    typeid = target.attr("data-id") || that.attr("data-id") || 0,
                    eventType = target.attr("data-event"),
                    sid = target.attr("data-sid") || that.attr("data-sid"),
                    note = that.attr("data-note") || 0;
                S.log([type, eventType, sid, tagName]);
                if (tagName == "em") {
                    if (sid && type) {
                        self._dblclickRoute(sid, type, typeid);
                    }
                }
                if (tagName == "div") {
                    var input = that.one("input");
                    Event.fire(input, 'click');
                }
                if (eventType && type && sid) {
                    event.halt();
                    self._clickRoute(target, sid, type, typeid, eventType, note);
                }
            });
            Event.delegate(document, "dblclick", ".ui-track-control", function(event) {
                event.halt();
            });
            // 双击 track row
            Event.delegate(document, "dblclick", ".ui-track-main", function(event) {
                if (event.target.tagName.toLowerCase() == "input")
                    return false;
                var that = $(event.currentTarget).parent('.ui-track-item'),
                    sid = that.attr("data-sid"),
                    type = that.attr("data-type");
                if (sid && type) {
                    self._dblclickRoute(sid, type);
                }
            });
            // 批量删除 正在播放歌曲
            Event.delegate(document, "click", "#J_trackListDelete", function(event) {
                // debugger;
                var ids = self.getCheckboxArray("track");
                if (ids.length === 0) {
                    alert("请选择歌曲!");
                    return false;
                };
                for (var i = 0; i < ids.length; i++) {
                    $('#J_trackList' + ids[i]).remove();
                }
                GLOBAL.PLAYER.PlayerData.removeTrackForIds(ids);
                GLOBAL.PLAYER.PlayerTracks.sortTrackList();
            });
            // 列表更多操作
            Event.delegate(document, "click", ".icon-tracks-more", function(event) {
                event.halt();
                var that = $(event.currentTarget);
                GLOBAL.PLAYER.PlayerMenu.showBatchMenu(that);
            });
            // 批量收藏
            Event.delegate(document, "click", "#J_trackListFav", function(event) {
                var ids = self.getCheckboxArray("track");
                if (ids.length === 0) {
                    alert("请选择歌曲!");
                    return false;
                };
                GLOBAL.PLAYER.PlayerControl.favForIds(ids);
            });
            // 多选 操作
            Event.delegate(document, "change", "input[type=checkbox]", function(event) {
                var that = $(event.target);
                var name = that.attr("name"),
                    check = that.prop("checked");
                if (name && !check) {
                    $("#J_checkAll_" + name).prop("checked", check);
                };
                if (name && check) {
                    var checkboxs = $("input[name=" + name + "]");
                    var flag = true;
                    for (var i = 0, max = checkboxs.length; i < max; i++) {
                        var input = checkboxs[i];
                        if (!input.checked) {
                            flag = false;
                            break;
                        }
                    };
                    flag && $("#J_checkAll_" + name).prop("checked", true);
                }
            });
        },
        /**
         * 双击歌曲面板路由
         * @param  {Number} sid    歌曲ID
         * @param  {String} type   双击对象的类型 track history fav collect
         * @param  {Number} typeid 双击对象对应的类型 ID
         */
        _dblclickRoute: function(sid, type, typeid) {
            var self = this;
            S.log([sid, type], "", "_dblclickRoute");
            if ("room" == GLOBAL.PLAYER.PlayerData.get("status")) {
                alert("你正在跟听中，不能贪心哦！\n请退出播间后再播放其他歌曲。");
                return false;
            }
            var nowSongId = GLOBAL && GLOBAL.PLAYER.PlayerData.get("songId");
            var nowStatus = GLOBAL && GLOBAL.PLAYER.PlayerData.get("status");
            if (sid == nowSongId) {
                if (type === 'roam') {
                    return false;
                }
            };
            if (sid == nowSongId && 'play' == nowStatus) {
                GLOBAL.PLAYER.replay();
                return false;
            }
            switch (type) {
                case 'track':
                    {
                        GLOBAL.PLAYER.PlayerData.playForId(sid, type);
                        break;
                    }
                case 'roam':
                    {
                        GLOBAL.PLAYER.PlayerData.playRoamForId(sid, type);
                        break;
                    }
                case 'collect':
                    {
                        SEIYA.addAndPlay(sid, type, typeid);
                        break;
                    }
                default:
                    SEIYA.addAndPlay(sid);
            }
        },
        _clickRoute: function(target, sid, type, typeid, eventType, note) {
            var self = this;
            if (eventType != 'more') {
                GLOBAL.PLAYER.PlayerMenu.hideMenu();
            }
            switch (eventType) {
                case "fav":
                    self._favTrack(sid, type, eventType, note);
                    break;
                case "more":
                    self._moreTrack(target, sid, type, typeid, eventType, note);
                    break;
                case "delete":
                    self._deleteTrack(sid, type, eventType);
                    break;
                case "roam":
                    self._roamTrack(sid, target);
                    break;
                case "close":
                    self._roamExit(sid);
                    break;
                default:
                    S.log("没有相应操作");
            }
        },
        _favTrack: function(sid, type, eventType, note) {
            S.log(sid + ", " + type + ", " + eventType);
            //if (type == "myfav") {
            //取消收藏即移除当前元素
            //var item = $("#J_favList" + sid);
            //item.remove();
            //GLOBAL.SIDEBAR.Myfav.sortTrackList();
            //};
            GLOBAL.PLAYER.PlayerControl.favForId(sid, type, note);
        },
        _moreTrack: function(target, sid, type, typeid, eventType, note) {
            var self = this;
            GLOBAL.PLAYER.PlayerMenu.showTrackMenu(target, sid, type, typeid, note);
        },
        _deleteTrack: function(sid, type, eventType) {
            S.log(sid + ", " + type + ", " + eventType);
            if (type == "track") {
                var item = $("#J_trackList" + sid);
                item.remove();
                GLOBAL.PLAYER.PlayerTracks.sortTrackList();
                GLOBAL.PLAYER.PlayerData.removeTrackForId(sid);
            };
            if (type == "collect") {
                if (!confirm("确定要从精选集里删除这首歌吗?")) {
                    return false;
                }
                var item = $("#J_collectList" + sid),
                    id = item.attr("data-id");
                item.remove();
                GLOBAL.SIDEBAR.Collect.sortTrackList();
                GLOBAL.SIDEBAR.Collect.deleteCollectIds(id, sid);
            }
            if (type == "history") {
                var item = $("#J_historyList" + sid),
                    id = item.attr("data-id"),
                    gmt = item.attr("data-gmt");
                item.remove();
                GLOBAL.SIDEBAR.MyHistory.sortTrackList();
                GLOBAL.SIDEBAR.MyHistory.deleteTrackForId(sid, gmt);
            }
        },
        _roamTrack: function(sid, target) {
            var self = this;
            GLOBAL.PLAYER.PlayerRoam.before(sid);
            GLOBAL.PLAYER.PlayerData.roamTrackForId(sid);
        },
        _roamExit: function(sid) {
            var self = this;
            GLOBAL.PLAYER.PlayerData.roamExit();
        },
        getCheckboxArray: function(name) {
            var sValue = [];
            var inputArr = $('input[name=' + name + ']:checked');
            var len = inputArr.length;
            for (var i = 0; i < len; i++) {
                var item = inputArr[i];
                if (!item.disabled) {
                    sValue.push(item.value);
                }
            }
            return sValue;
        }
    };
    return page;
});

/** Compiled By kissy-xtemplate */
KISSY.add('page/mods/xtpl/search-xtpl',function (S, require, exports, module) {
        /*jshint quotmark:false, loopfunc:true, indent:false, asi:true, unused:false, boss:true*/
        return function (scope, S, undefined) {
            var buffer = "",
                config = this.config,
                engine = this,
                moduleWrap, utils = config.utils;
            if (typeof module !== "undefined" && module.kissy) {
                moduleWrap = module;
            }
            var runBlockCommandUtil = utils.runBlockCommand,
                renderOutputUtil = utils.renderOutput,
                getPropertyUtil = utils.getProperty,
                runInlineCommandUtil = utils.runInlineCommand,
                getPropertyOrRunCommandUtil = utils.getPropertyOrRunCommand;
            buffer += '<dl>\r\n\t';
            var config0 = {};
            var params1 = [];
            var id2 = getPropertyUtil(engine, scope, "songs", 0, 2);
            params1.push(id2);
            config0.params = params1;
            config0.fn = function (scope) {
                var buffer = "";
                buffer += '\r\n\t<dt>歌曲</dt>\r\n\t<dd class="song-list">\r\n\t\t<ul>\r\n\t\t\t';
                var config5 = {};
                config5.fn = function (scope) {
                    var buffer = "";
                    buffer += '\r\n\t\t\t<li><a href="http://www.xiami.com/song/';
                    var id3 = getPropertyOrRunCommandUtil(engine, scope, {}, "song_id", 0, 7);
                    buffer += renderOutputUtil(id3, true);
                    buffer += '" target="_blank" title="';
                    var id4 = getPropertyOrRunCommandUtil(engine, scope, {}, "song_name", 0, 7);
                    buffer += renderOutputUtil(id4, false);
                    buffer += '-';
                    var id5 = getPropertyOrRunCommandUtil(engine, scope, {}, "artist_name", 0, 7);
                    buffer += renderOutputUtil(id5, false);
                    buffer += '">';
                    var config7 = {};
                    var params8 = [];
                    var id9 = getPropertyUtil(engine, scope, "song_name", 0, 7);
                    params8.push(id9);
                    var id10 = getPropertyUtil(engine, scope, "root.key", 0, 7);
                    params8.push(id10);
                    config7.params = params8;
                    var id6 = runInlineCommandUtil(engine, scope, config7, "higtKey", 7);
                    buffer += renderOutputUtil(id6, false);
                    buffer += '-';
                    var config12 = {};
                    var params13 = [];
                    var id14 = getPropertyUtil(engine, scope, "artist_name", 0, 7);
                    params13.push(id14);
                    var id15 = getPropertyUtil(engine, scope, "root.key", 0, 7);
                    params13.push(id15);
                    config12.params = params13;
                    var id11 = runInlineCommandUtil(engine, scope, config12, "higtKey", 7);
                    buffer += renderOutputUtil(id11, false);
                    buffer += '</a> <a onclick="SEIYA.addAndPlay(';
                    var id16 = getPropertyOrRunCommandUtil(engine, scope, {}, "song_id", 0, 7);
                    buffer += renderOutputUtil(id16, true);
                    buffer += ')" class="play-btn"></a></li>\r\n\t\t\t';
                    return buffer;
                };
                buffer += runBlockCommandUtil(engine, scope, config5, "songs", 6);
                buffer += '\r\n\t\t</ul>\r\n\t</dd>\r\n\t';
                return buffer;
            };
            buffer += runBlockCommandUtil(engine, scope, config0, "if", 2);
            buffer += '\r\n\t';
            var config17 = {};
            var params18 = [];
            var id19 = getPropertyUtil(engine, scope, "albums", 0, 12);
            params18.push(id19);
            config17.params = params18;
            config17.fn = function (scope) {
                var buffer = "";
                buffer += '\r\n\t<dt>专辑</dt>\r\n\t<dd class="album-list">\r\n\t\t<ul>\r\n\t\t\t';
                var config6 = {};
                config6.fn = function (scope) {
                    var buffer = "";
                    buffer += '\r\n\t\t\t<li>\r\n\t\t\t\t<div class="album">\r\n\t\t\t\t\t<div class="img">\r\n\t\t\t\t\t\t<a href="http://www.xiami.com/album/';
                    var id20 = getPropertyOrRunCommandUtil(engine, scope, {}, "album_id", 0, 20);
                    buffer += renderOutputUtil(id20, true);
                    buffer += '" target="_blank" title="';
                    var id21 = getPropertyOrRunCommandUtil(engine, scope, {}, "title", 0, 20);
                    buffer += renderOutputUtil(id21, false);
                    buffer += '"><img src="http://img.xiami.net/';
                    var id22 = getPropertyOrRunCommandUtil(engine, scope, {}, "album_logo", 0, 20);
                    buffer += renderOutputUtil(id22, false);
                    buffer += '" width="30" height="30" alt="';
                    var id23 = getPropertyOrRunCommandUtil(engine, scope, {}, "title", 0, 20);
                    buffer += renderOutputUtil(id23, false);
                    buffer += '"  /></a>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class="name">\r\n\t\t\t\t\t\t<p><a href="http://www.xiami.com/album/';
                    var id24 = getPropertyOrRunCommandUtil(engine, scope, {}, "album_id", 0, 23);
                    buffer += renderOutputUtil(id24, true);
                    buffer += '" target="_blank" title="';
                    var id25 = getPropertyOrRunCommandUtil(engine, scope, {}, "title", 0, 23);
                    buffer += renderOutputUtil(id25, false);
                    buffer += '">';
                    var config27 = {};
                    var params28 = [];
                    var id29 = getPropertyUtil(engine, scope, "title", 0, 23);
                    params28.push(id29);
                    var id30 = getPropertyUtil(engine, scope, "root.key", 0, 23);
                    params28.push(id30);
                    config27.params = params28;
                    var id26 = runInlineCommandUtil(engine, scope, config27, "higtKey", 23);
                    buffer += renderOutputUtil(id26, false);
                    buffer += '</a></p>\r\n\t\t\t\t\t\t<p><a href="http://www.xiami.com/album/';
                    var id31 = getPropertyOrRunCommandUtil(engine, scope, {}, "album_id", 0, 24);
                    buffer += renderOutputUtil(id31, true);
                    buffer += '" target="_blank" title="';
                    var id32 = getPropertyOrRunCommandUtil(engine, scope, {}, "title", 0, 24);
                    buffer += renderOutputUtil(id32, false);
                    buffer += '">';
                    var config34 = {};
                    var params35 = [];
                    var id36 = getPropertyUtil(engine, scope, "artist_name", 0, 24);
                    params35.push(id36);
                    var id37 = getPropertyUtil(engine, scope, "root.key", 0, 24);
                    params35.push(id37);
                    config34.params = params35;
                    var id33 = runInlineCommandUtil(engine, scope, config34, "higtKey", 24);
                    buffer += renderOutputUtil(id33, false);
                    buffer += '</a></p>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t\t<a onclick="SEIYA.addPlayalbum(';
                    var id38 = getPropertyOrRunCommandUtil(engine, scope, {}, "album_id", 0, 27);
                    buffer += renderOutputUtil(id38, true);
                    buffer += ')" class="play-btn"></a>\r\n\t\t\t</li>\r\n\t\t\t';
                    return buffer;
                };
                buffer += runBlockCommandUtil(engine, scope, config6, "albums", 16);
                buffer += '\r\n\t\t</ul>\r\n\t</dd>\r\n\t';
                return buffer;
            };
            buffer += runBlockCommandUtil(engine, scope, config17, "if", 12);
            buffer += '\r\n\t';
            var config39 = {};
            var params40 = [];
            var id41 = getPropertyUtil(engine, scope, "artists", 0, 33);
            params40.push(id41);
            config39.params = params40;
            config39.fn = function (scope) {
                var buffer = "";
                buffer += '\r\n\t<dt>艺人</dt>\r\n\t<dd class="artist-list">\r\n\t\t<ul>\r\n\t\t\t';
                var config7 = {};
                config7.fn = function (scope) {
                    var buffer = "";
                    buffer += '\r\n\t\t\t<li>\r\n\t\t\t\t<div class="artist">\r\n\t\t\t\t\t<div class="img">\r\n\t\t\t\t\t\t<a href="http://www.xiami.com/artist/';
                    var id42 = getPropertyOrRunCommandUtil(engine, scope, {}, "artist_id", 0, 41);
                    buffer += renderOutputUtil(id42, true);
                    buffer += '" target="_blank" title="';
                    var id43 = getPropertyOrRunCommandUtil(engine, scope, {}, "name", 0, 41);
                    buffer += renderOutputUtil(id43, false);
                    buffer += '">\r\n\t\t\t\t\t\t<img src="http://img.xiami.net/';
                    var id44 = getPropertyOrRunCommandUtil(engine, scope, {}, "logo", 0, 42);
                    buffer += renderOutputUtil(id44, false);
                    buffer += '" width="30" height="30" alt="';
                    var id45 = getPropertyOrRunCommandUtil(engine, scope, {}, "name", 0, 42);
                    buffer += renderOutputUtil(id45, false);
                    buffer += '" /></a>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class="name">\r\n\t\t\t\t\t\t<a href="http://www.xiami.com/artist/';
                    var id46 = getPropertyOrRunCommandUtil(engine, scope, {}, "artist_id", 0, 45);
                    buffer += renderOutputUtil(id46, true);
                    buffer += '" target="_blank" title="';
                    var id47 = getPropertyOrRunCommandUtil(engine, scope, {}, "name", 0, 45);
                    buffer += renderOutputUtil(id47, false);
                    buffer += '">';
                    var config49 = {};
                    var params50 = [];
                    var id51 = getPropertyUtil(engine, scope, "name", 0, 45);
                    params50.push(id51);
                    var id52 = getPropertyUtil(engine, scope, "root.key", 0, 45);
                    params50.push(id52);
                    config49.params = params50;
                    var id48 = runInlineCommandUtil(engine, scope, config49, "higtKey", 45);
                    buffer += renderOutputUtil(id48, false);
                    buffer += '</a>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</li>\r\n\t\t\t';
                    return buffer;
                };
                buffer += runBlockCommandUtil(engine, scope, config7, "artists", 37);
                buffer += '\r\n\t\t</ul>\r\n\t</dd>\r\n\t';
                return buffer;
            };
            buffer += runBlockCommandUtil(engine, scope, config39, "if", 33);
            buffer += '\r\n</dl>\r\n<div class="result-more">\r\n\t<a href="http://www.xiami.com/search?key=';
            var id53 = getPropertyOrRunCommandUtil(engine, scope, {}, "key", 0, 55);
            buffer += renderOutputUtil(id53, true);
            buffer += '" target="_blank">更多结果</a>\r\n</div>';
            return buffer;
        };
});
KISSY.add('page/mods/search',['node', 'base', 'event', 'io', 'xtemplate', './xtpl/search-xtpl', 'utils/base'], function(S, require, exports, module) {
    // @formatter:off
    var Node = require("node"),
        Base = require("base"),
        Event = require("event"),
        IO = require("io"),
        Xtemplate = require("xtemplate"),
        SearchTpl = require("./xtpl/search-xtpl"),
        BaseConfig = require("utils/base");
    // @formatter:on
    var $ = Node.all;

    var TPL_search_result = new Xtemplate(SearchTpl, {
        commands: {
            'higtKey': function(scopes, option) {
                if (option.params[1] != '') {
                    var reg = new RegExp('(' + option.params[1] + ')', 'i');
                    return String(option.params[0]).replace(reg, '<b>$1</b>');
                }
                return option.params[0];
            }
        }
    });
    var noResult = '<dl><dt>暂无结果</dt><dd><div class="search-none"><a href="http://www.xiami.com/search?key={{key}}" target="_blank">搜索"{{key}}"</a></div></dd></dl>';
    var TPL_search_none = new Xtemplate(noResult);
    var searchExtension = {
        initializer: function() {
            var self = this;
            self.timer = null;

            $('<div class="search-result" id="J_searchResult" style="display:none"></div>').appendTo("body");

            self.set("wrap", "#J_searchResult");
            self.set("icon", "#J_searchStatus");

            self.result = {};

            Event.on(self.get("input"), "valuechange", function(event) {
                self._showResult(event.newVal);
            });
            Event.on(self.get("input"), "focusin", function(event) {
                event.halt();
                self._showCompletion();
            });
            // 关闭面板
            Event.delegate(document, "click", "#J_searchResult", function(event) {
                if (event.target.tagName.toLowerCase() !== "a" && event.target.tagName.toLowerCase() !== "b" && event.target.tagName.toLowerCase() !== "img") {
                    event.halt();
                }
            });
            Event.on(document, "click", function(event) {
                if (event.target.id == "J_searchInput" && event.target.tagName.toLowerCase() == "input") {
                    return false;
                }
                self._hideCompletion();
            });
        },
        _showResult: function(key) {
            var self = this;
            self.timer && clearTimeout(self.timer);
            var key = S.trim(key);
            S.log(["_showResult:", key]);
            if (key == "") {
                self._hideCompletion();
                return false;
            };
            self.set("key", key);
        },
        _onSetKey: function(val) {
            var self = this;
            if (!val)
                return false;
            self._sendSearch(val);
        },
        _sendSearch: function(key) {
            var self = this;
            //self.get("icon").addClass("loading");
            if (!S.isUndefined(self.result[key])) {
                return self._showSuggest(key, self.result[key]);
            }
            self.IO = new IO({
                url: BaseConfig.SEARCH_JSON,
                dataType: 'jsonp',
                data: {
                    't': 4,
                    'k': encodeURIComponent(key),
                    'n': 3
                },
                success: function(respones) {
                    var data = {
                        "songs": respones.songs.length > 0 ? respones.songs : null,
                        "albums": respones.albums.length > 0 ? respones.albums : null,
                        "artists": respones.artists.length > 0 ? respones.artists : null,
                        "key": key
                    };
                    self.result[key] = data;
                    self._showSuggest(key, data);
                },
                error: function() {
                    var data = {
                        "key": key
                    };
                    var html = TPL_search_none.render(data);
                    self.get("wrap").html(html).show();
                }
            });
        },
        _showSuggest: function(key, data) {
            var self = this;
            var html;
            if (!data.songs && !data.albums && !data.artists) {
                html = TPL_search_none.render(data);
            } else {
                html = TPL_search_result.render(data);
            };
            self.get("wrap").html(html).show();
            //self.get("icon").removeClass("loading");
        },
        _showCompletion: function() {
            var self = this;
            var value = S.trim(self.get("input").val());
            if (!value)
                return false;
            //self.get("wrap").show();
            self._sendSearch(value);
        },
        _hideCompletion: function() {
            var self = this;
            self.set("key", "", {
                silent: true
            });
            self.get("wrap").hide();
        }
    };

    var serachAttrs = {
        ATTRS: {
            input: {
                value: "",
                setter: function(v) {
                    return $(v);
                }
            },
            wrap: {
                value: "",
                setter: function(v) {
                    return $(v);
                }
            },
            icon: {
                value: "",
                setter: function(v) {
                    return $(v);
                }
            },
            key: {
                value: ""
            }
        }
    };

    module.exports = Base.extend(searchExtension, serachAttrs);
});

/**
 * @module Main
 * @author noyobo
 * @mail nongyoubao@alibaba-inc.com
 */
KISSY.add('page/mods/main',['node', 'io', 'event', 'xtemplate', 'utils/index/global', './shortcut', './player', './sidebar', './page', './user', './search'], function(S, require, exports, module) {
    // @formatter:off
    var Node = require("node"),
        IO = require("io"),
        Event = require("event"),
        Xtemplate = require("xtemplate"),
        Global = require("utils/index/global"),
        Shortcut = require("./shortcut"),
        Player = require("./player"),
        Sidebar = require("./sidebar"),
        Page = require("./page"),
        User = require("./user"),
        //SWF = require('swf'),
        Search = require("./search");
    // @formatter:on
    var $ = Node.all;

    if (S.UA.ie < 7 || S.UA.opera < 16) {
        alert("虾小米提醒您：浏览器版本过低，请先升级浏览器后再访问哦。");
        window.location.href = "http://www.xiami.com/event/play2014";
        return false;
    };
    // 是否刷新
    (function() {
        if (window.name != '') {
            new IO({
                type: 'get',
                url: 'http://www.xiami.com/statclick',
                data: {
                    'form': 'seiya',
                    'type': 'reload',
                    '_': S.now()
                }
            });
        }else{
            window.name = 'xiamiMusicPlayer';
        }
    })();
    var flashVersion = (function() {
        var nav = navigator,
            version = 0,
            flash;
        if (nav.plugins && nav.mimeTypes.length) {
            flash = navigator.plugins["Shockwave Flash"];
            if (flash) {
                version = flash.description.replace(/.*\s(\d+\.\d+).*/, "$1");
            }
        } else {
            try {
                flash = new window.ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                if (flash) {
                    version = flash.GetVariable("$version")
                }
            } catch (e) {}
        }
        if (version !== 0) {
            var fv = version.match(/\d+/g);
            if (fv.length > 0) {
                var v = fv.join('.')
                return v;
            }
        }
        return version;
    }());
    var needFlashVersion = 9;

    window.SEIYA = Global;

    var params = (function() {
        var prmstr = window.location.search.substr(1);
        if (prmstr != null && prmstr != "") {
            var params = {};
            var prmarr = prmstr.split("&");
            for (var i = 0; i < prmarr.length; i++) {
                var tmparr = prmarr[i].split("=");
                params[tmparr[0]] = tmparr[1];
            }
            return params;
        }
        return {};
    })();

    window.__TEST__ = params.test || 0;

    function main() {
        // @formatter:off
        PLAYER: null;
        SIDEBAR: null;
        PAGE: null;
        // @formatter:on
    };
    var pt = main.prototype;

    pt.init = function() {
        var self = this;
        new IO({
            type: 'get',
            url: 'http://www.xiami.com/statclick',
            data: {
                'form': 'seiya',
                'type': 'player',
                'fv': flashVersion,
                'bm_an': navigator.appName,
                '_': S.now()
            }
        });
        if (flashVersion == 0 || parseInt(flashVersion.split[0], 10) < needFlashVersion) {
            (function() {
                var html;
                if (!S.UA.chrome) {
                    html = '<div>检测到您系统Flash插件版本过低,为了更好的使用虾米音乐,请升级您的Flash插件, <a href="http://get.adobe.com/cn/flashplayer/" target="_blank" style="color:#36c">马上升级</a></div>';
                } else {
                    html = '<div>检测到您已停用Adobe Flash Player,为了更好的使用虾米音乐,请启用您的Adobe Flash Player插件, 浏览器地址输入<span style="color:#36c">chrome://plugins/</span>启用后刷新</div>';
                };
                html = $(html);
                html.css({
                    backgroundColor: '#FFF9D7',
                    borderBottom: '1px solid #E3C823',
                    lineHeight: '30px',
                    textAlign: 'center',
                    color: '#f60',
                    position: 'absolute',
                    zIndex: '9999',
                    width: '100%',
                    top: '0',
                    left: '0'
                });
                html.prependTo($('body'));
            }())
            return false;
        };

        self.SEARCH = new Search({
            input: "#J_searchInput"
        });

        self.USER = window.__USER__ = new User({
            wrap: "#J_userInfo"
        });
        self.USER.on("sync", function(event) {
            var data = event.data;
            self.PLAYER && self.PLAYER.sync(data);
        });

        var dataUrl = (window.location.href.indexOf('#loaded') > -1) ? '/song/playlist-default' : (params.ids||'/song/playlist-default');
        //var dataUrl = params.ids || "/song/playlist-default";

        var roomUid = params.uid || 0;
        if (roomUid == self.USER.get("uid")) {
            roomUid = 0;
        }
        dataUrl = roomUid == 0 ? dataUrl : "";

        S.log(roomUid, "", "roomUid");

        var swfurl = location.href.indexOf("gitlabswf") !== -1 ? "http://gitlabswf.xiami.com/music/xiamiplayer/1.4/player.swf" : "http://img.xiami.com/static/swf/seiya/1.4/player.swf";

        self.PLAYER = window.__PLAYER__ = new Player();

        self.PLAYER.init(
            dataUrl, {
                src: swfurl + "?v=" + S.now(),
                params: {
                    flashVars: {
                        //flashVersion: flashVersion, 用 swf 自身判断
                        srNum: 20, // 试听统计数
                        interval: 120, // 心跳时间
                        // dataUrl : roomUid == 0 ? dataUrl : "",
                        host: location.href.indexOf("gitlabswf") !== -1 ? "http://pre.xiami.com" : window.location.origin
                        // 请求的根目录
                    }
                }
            }
        );


        self.SIDEBAR = window.__SIDEBAR__ = new Sidebar();
        self.SIDEBAR.init(this);

        self.PAGE = new Page();
        self.PAGE.init(this);

        self.Shortcut = new Shortcut();
        /**
         * 快捷键
         */
        self.Shortcut.on("space", function() {
            self.PLAYER.playOrPause();
        });
        self.Shortcut.on("right", function() {
            self.PLAYER.next();
        });
        self.Shortcut.on("left", function() {
            self.PLAYER.prev();
        });
        self.Shortcut.on("up", function() {
            self.PLAYER.PlayerVolume.volumeUP();
        });
        self.Shortcut.on("down", function() {
            self.PLAYER.PlayerVolume.volumeDOWN();
        });

        self._addEvent();
    };

    pt._addEvent = function() {
        var self = this;

        // Event.on(window, "beforeunload", function() {
        // return "将要关闭虾米音乐!";
        // });
    };

    module.exports = main;
});
// 2013-12-30 12:52:28

/**
 * @fileOverview
 * @author
 */
if (! window.location.origin) {
    window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
}
KISSY.add('page/init',function(S) {
    /**
     * 下面的方式将自动执行所有require过来的模块的init方法
     *      1、异步执行，各模块不会互相影响
     *      2、各模块都暴露init方法，模块的增删只需要修改requires就可以了
     * 这是一种模块的执行方式，您完全可以删掉这段代码，根据自己的习惯编写.
     */
    var args = S.makeArray(arguments);
    S.ready(function() {
        for( var i = 1; i < args.length; i++ ) {
            var module = args[i] || {};
            new module().init && setTimeout((function(m) {
                return function() {
                    new m().init();
                };
            })(module), 0);
        };
    });

}, {
    requires : ["./mods/main"]
});


KISSY.use("page/init");
