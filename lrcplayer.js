/*! music-player - v0.8.3 build time 2014-03-13 17:48:43 
 * @Author: baoma 
<nongyoubao@alibaba-inc.com> 
 * Copyright (c) XIAMI 
 */
!function(){
	var a=window;
	a.XiamiPlayer=
	{
		player_runing:function(a,b){return!1},
		player_song_start:function(b,c){
			var d=a.seiya.eventListener;
			d&&d.fire("player","start",{currentSong:b,list:c})
		},
		player_song_end:function(){
			var b=a.seiya.eventListener;
			b&&b.fire("player","end")
		},
		player_room_lists:function(a){
			SEIYA&&SEIYA.addSongs(escape("/song/playlist/id/"+a),3)
		},
		player_room_exit:function(){
			__PLAYER__&&__PLAYER__.PlayerData.exitRoom()}
	},
	
	a.login_callback=function(b){
		if(b){
			__SIDEBAR__&&__SIDEBAR__.Collect.sync(),
			__USER__&&__USER__.sync(),
			__OVERLAY__&&__OVERLAY__.destroy();
			var c=a.seiya.eventListener,d=a.seiya.user;
			c&&d&&d.room_id?c.fire("popup","enterRoom",d.room_id):c.fire("popup","resetMainNav")
		}
	},
	
	a.taobaoLogin=function(){
		var b="https://login.xiami.com";
		a.open(b+"/member/login?taobao=1","_self")
	},
	a.openWind=function(b){
		var c=(a.screen.height-420)/2,d=(a.screen.width-520)/2;
		a.open(b,"connect_window","height=420, width=560, toolbar=no, menubar=no, scrollbars=yes, resizable=no,top="+c+",left="+d+", location=no, status=no")
	},
	a.sinaLogin=function(){a.openWind("/sina?done")},
	a.qqLogin=function(){a.openWind("/share/connect/type/qzone?done")}
}(KISSY);
	
/*! music-player - v0.8.3 build time 2014-03-13 17:48:34 
 * @Author: baoma 
<nongyoubao@alibaba-inc.com> 
 * Copyright (c) XIAMI 
 */
KISSY.add("utils/index/global",["node"],function(a,b,c,d){
	var e=b("node"), f=e.all, 
	g=
	{
		download:function(a,b){
			var b=b||0,
			c="http://www.xiami.com/download/pay?id="+encodeURIComponent(a)+"&rec_note="+encodeURIComponent(b);
			window.open(c)
		},
	
		downloadsongs:function(a){
			var b="http://www.xiami.com/download/pay",
			c=this.getCheckboxValues(a);
			if(""==c)return void alert("\u6ca1\u6709\u8d44\u6e90\u53ef\u4ee5\u4e0b\u8f7d\uff01");
			var b=b+"?id="+encodeURIComponent(c);
			window.open(b)
		},
		
		collect:function(a,b){
			var b=b||0,
			c="/song/collect/id/"+encodeURIComponent(a)+"?rec_note="+encodeURIComponent(b);
			this.showDialog(c)
		},
		
		collects:function(a){
			var b=this.getCheckboxValues(a);
			if(""==b)return void alert("\u8bf7\u5148\u9009\u62e9\u6b4c\u66f2!");

			var c="/song/collects/ids/"+encodeURIComponent(b);
			this.showDialog(c)
		},
		
		recommend:function(a,b,c){
			var c=c||0,d="/recommend/post";
			d=d+"?object_id="+encodeURIComponent(a)+"&type="+encodeURIComponent(b)+"&rec_note="+encodeURIComponent(c),this.showDialog(d)
		},
		
		playcollect:function(a){
			var b=this;
			b.addSongs(escape("/song/playlist/id/"+a+"/type/3"),1)
		},
		
		sendMobile:function(a,b){
			var b=b||0,c="/music/send/id/"+encodeURIComponent(a)+"?rec_note="+encodeURIComponent(b);
			this.showDialog(c)
		},
		
		showDialog:function(a){	window.showDialog(a) },
		
		addAndPlay:function(a,b,c){
			var d=this;
			b||(b="default"),c||(c=0),d.addSongs(escape("/song/playlist/id/"+a+"/object_name/"+b+"/object_id/"+c),1)
		},
		
		thenplayIds:function(a,b,c){
			var d=this,e=this.getCheckboxValues(a);
			return""==e?void alert("\u6ca1\u6709\u6b4c\u66f2\u53ef\u4ee5\u64ad\u653e!"):(b||(b="default"),c||(c=0),void d.addSongs(escape("/song/playlist/id/"+e+"/object_name/"+b+"/object_id/"+c),2))
		},
			
		thenplay:function(a,b,c){
			var d=this;
			b||(b="default"),c||(c=0),
			d.addSongs(escape("/song/playlist/id/"+a+"/object_name/"+b+"/object_id/"+c),2)
		},
		play:function(a,b,c){
			var d=this;
			b||(b="default"),c||(c=0),d.addSongs(escape("/song/playlist/id/"+a+"/object_name/"+b+"/object_id/"+c))
		},
		addPlayalbum:function(a){
			this.addSongs(escape("/song/playlist/id/"+a+"/type/1"),1)
		},
		playalbum:function(a){
			this.addSongs(escape("/song/playlist/id/"+a+"/type/1"))
		},
		addSongs:function(a,b){
			b||(b=0);
			try{document.getElementById("J_xiamiPlayerSwf").jsAddSongs(a,b)}
				catch(c){throw new Error("jsAddSongs not function")}
		},
		addPlaySongs:function(a,b,c){
					var d=this,e=this.getCheckboxDefaultValues(a);
					return""==e?void alert("\u6ca1\u6709\u6b4c\u66f2\u53ef\u4ee5\u64ad\u653e!"):(b||(b="default"),c||(c=0),void d.addSongs(escape("/song/playlist/id/"+e+"/object_name/"+b+"/object_id/"+c),1))
		},
		playAllSongs:function(a,b,c){
			var d=this,e=this.getCheckboxValues(a);
			return""==e?void alert("\u6ca1\u6709\u6b4c\u66f2\u53ef\u4ee5\u64ad\u653e!"):(b||(b="default"),c||(c=0),void d.addSongs(escape("/song/playlist/id/"+e+"/object_name/"+b+"/object_id/"+c),1))
		},
		getCheckboxDefaultValues:function(a){
			for(var b=[],c=f("input[name="+a+"]:enabled"),d=c.length,e=0;d>e;e++){
				var g=c[e];
				g.disabled||b.push(g.value)
			}
			return b.join(",")
		},
		getCheckboxValues:function(a){
			for(var b=[],c=f("input[name="+a+"]:checked"),d=c.length,e=0;d>e;e++){
				var g=c[e];
				g.disabled||b.push(g.value)}
			return b.join(",")
		},
		syncCheck:function(a,b){
			var c=f(a),d=c.prop("checked");
			f("input[name="+b+"]:enabled").prop("checked",d)
		},
				
		inverse:function(){
			function a(a){	return b[a]?b[a]+=1:b[a]=1,b[a]%2	}
			var b={};
			return function(b){
				var c=a(b);
				f("input[name="+b+"]:enabled").prop("checked",!!c)
			}
		}(),
		makeBoboWidget:function(a,b){
			var b=b||0;
			window.open("http://www.xiami.com/widget/isingle?sid="+a+"&rec_note="+encodeURIComponent(b))
		},

		makeMultiWidget:function(a){
			var b=this.getCheckboxValues(a);
			return""==b?void alert("\u8bf7\u5148\u9009\u62e9\u6b4c\u66f2!"):void window.open("http://www.xiami.com/widget/imulti?sid="+b)
		},
		playerUploadlyric:function(a){
			var b="http://www.xiami.com/wiki/addlyric/id/"+a;
			window.open(b,"_blank")
		}
		};
	
	d.exports=g
	}
),
	
KISSY.add("page/mods/shortcut",["event","base"],function(a,b,c,d){
	var e=b("event"),f=b("base"),
	g=
	{
		initializer:function(){
			var a=this;
			a._opLock=null,e.on(document,"keydown",function(b){var c=b.target.tagName.toLowerCase();
			if("input"!=c&&"textarea"!=c&&"select"!=c){var d=b.which||b.keyCode;
			switch(d){case 32:a.trigget("space");
			break;
			case 37:a.trigget("left");
			break;
			case 38:a.trigget("up");
			break;
			case 39:a.trigget("right");
			break;
			case 40:a.trigget("down")}}})
		},
		trigget:function(b){
			var c=this,b=b;
			c._opLock&&c._opLock.cancel(),
			c._opLock=a.later(function(a){
				c.fire(a)
			},
			200,!1,null,b)
		}
	};
	
	d.exports=f.extend(g)
	}
),

KISSY.add("page/mods/player/player-swf",["swf"],function(a,b,c,d){
	function e(b){
		this._swf=null,this.option={src:"http://res.xiami.net/static/swf/seiya/player.swf",
		attrs:{	width:1,height:1,id:"J_xiamiPlayerSwf"	},
		params:{allowScriptAccess:"always"},
		render:"#J_xiamiPlayer"
		},
		a.mix(this.option,b,void 0,void 0,!0),this.init()
	}
	
	var f=b("swf");
	e.prototype={
		init:function(){
			var a=this;
			a._swf=window.__swf__=new f(a.option)
		},
		
		load:function(b){
			var c=this;
			if(!a.isString(b))throw new Error("arguments are not Json String");
			c._swf.callSWF("jsLoad",[b])},
		
		sync:function(){
			var a=this;
			a._swf.callSWF("jsSyncUser")},
		play:function(){var a=this;
			a._swf.callSWF("jsPlay")},
		pause:function(){var a=this;
			a._swf.callSWF("jsPause")},
		stop:function(){var a=this;
			a._swf.callSWF("jsStop")
			},
		status:function(){var a=this;
			return a._swf.callSWF("getStatus")
			},
		changeHq:function(b){var c=this;
			if(!a.isBoolean(b))throw new Error("arguments are not Boolean");
			c._swf.callSWF("jsChangeHq",[b])
			},
		position:function(a){var b=this;
			if(!(a>=0&&1>=a))throw new Error("arguments are not 0-1");
			b._swf.callSWF("setPosition",[a])
			},
		volume:function(b){
			var c=this;
			if(!(a.isNumber(b)&&b>=0&&1>=b))throw new Error("arguments are not 0-1");
			var d=Number(b.toFixed(2));
			c._swf.callSWF("setVolume",[d])
			},
		mode:function(a){var b=this;
			b._swf.callSWF("setMode",[a])}
	},
	d.exports=e
	}
),

KISSY.add("utils/scrollView/scrollViewManage",["node","event","scroll-view","scroll-view/plugin/scrollbar"],function(a,b,c,d){var e=b("node"),f=b("event"),g=b("scroll-view"),h=b("scroll-view/plugin/scrollbar"),i=e.all,j={SCROLL_QUEUE:{},render:function(b,c){var d=this;
if(a.UA.ie&&a.UA.ie
<8)return i("#"+b).css("overflow-y","auto"),!1;
var c=c||{},e=a.mix(c,{autoHideY:!1},void 0,void 0,!0);
if(d.SCROLL_QUEUE.hasOwnProperty(b)){var f=d.SCROLL_QUEUE[b];
return d.reset(f),f}d.SCROLL_QUEUE[b]=new g({srcNode:"#"+b,plugins:[new h(e)]}).render(),d._syncScrollViem(b)},content:function(b,c){var d=this;
if(a.UA.ie&&a.UA.ie
<8)return i("#"+b).html(c).css("overflow-y","auto"),!1;
var e=d.SCROLL_QUEUE[b];
e?(e.set("content",c),e.sync()):(d.SCROLL_QUEUE[b]=new g({srcNode:"#"+b,content:c,plugins:[new h({})]}).render(),d._syncScrollViem(b))},forceRender:function(b){var c=this;
if(a.UA.ie&&a.UA.ie
<8)return i("#"+b).css("overflow-y","auto"),!1;
var d=d||{},e=a.mix(d,{autoHideY:!1},void 0,void 0,!0);
if(c.SCROLL_QUEUE.hasOwnProperty(b)){var f=c.SCROLL_QUEUE[b];
f.destroy()}c.SCROLL_QUEUE[b]=new g({srcNode:i("#"+b),plugins:[new h(e)]}).render(),c._syncScrollViem(b)},sync:function(b){var c=this;
return a.UA.ie&&a.UA.ie
<8?!1:void(c.SCROLL_QUEUE[b]?c.SCROLL_QUEUE[b].sync():c.render(b))},reset:function(b){return a.UA.ie&&a.UA.ie
<8?!1:(b.sync(),void b.scrollTo({top:0}))},scrollToTop:function(b){var c=this;
if(a.UA.ie&&a.UA.ie
<8)return i("#"+b).scrollTop(0),!1;
var d=c.SCROLL_QUEUE[b];
d.scrollTo({top:0})},scrollTo:function(b,c,d){var e=this,c=c||{};
if(a.UA.ie&&a.UA.ie
<8)return i("#"+b).scrollTop(c.top),!1;
var f=e.SCROLL_QUEUE[b],d=d||{};
f.scrollTo(c,d)},scrollAt:function(b,c,d){var e=this,c=c||{};
if(a.UA.ie&&a.UA.ie
<8)return i("#"+b).scrollTop(c.top),!1;
var f=e.SCROLL_QUEUE[b],d=d||{};
f.scrollToWithBounds(c,d)},stopAnimation:function(b){var c=this;
if(a.UA.ie&&a.UA.ie
<8)return!1;
var d=c.SCROLL_QUEUE[b];
d.stopAnimation()},_syncScrollViem:function(b){var c=this,d=c.SCROLL_QUEUE[b];
f.on(window,"resize",a.UA.ie
<8?a.buffer(d.sync,30):d.sync,d)}};
d.exports=j}
),

KISSY.add("page/mods/xtpl/lrc-xtpl",function(a,b,c,d){
		return function(a){
			var b,c="",e=this.config,f=this,g=e.utils;
			"undefined"!=typeof d&&d.kissy&&(b=d);
			var h=g.runBlockCommand,i=g.renderOutput,j=g.getProperty,
				k=(g.runInlineCommand,g.getPropertyOrRunCommand);
			c+="";
			var l={}, m=[],n=j(f,a,"data",0,1);
			return 	m.push(n),
					l.params=m,
					l.fn=function(a){
						var b="";
						b+="\r\n<ul>\r\n";
						var c={},d=[],e=j(f,a,"data",0,3);
						return d.push(e),c.params=d,c.fn=function(a){
							var b="";
							b+="\r\n";
							var c={},d=[],e=j(f,a,"xindex",0,4);
							return d.push(0===e),c.params=d,c.fn=function(a){
								var b="";
								b+='\r\n<li class="ui-lrc-line ui-lrc-current">';
								var c=k(f,a,{},"text",0,5);
								return b+=i(c,!1),b+="</li>\r\n"
							},
							c.inverse=function(a){
								var b="";
								b+='\r\n<li class="ui-lrc-line">';
								var c=k(f,a,{},"text",0,7);
								return b+=i(c,!1),b+="</li>\r\n"
							},
							b+=h(f,a,c,"if",4),b+="\r\n"
						},
						
						b+=h(f,a,c,"each",3),b+="\r\n</ul>\r\n"
					},
					l.inverse=function(a){
						var b="";
						b+='\r\n<div class="no-lrc" onclick="SEIYA.playerUploadlyric(\'';
						var c=k(f,a,{},"id",0,12);
						return b+=i(c,!0),b+="')\"></div>\r\n"
					},
					c+=h(f,a,l,"if",1),
					c+="\r\n"
		}
	}
),


KISSY.add("page/mods/xtpl/lrcText-xtpl",function(a,b,c,d){
	return function(a){
		var b,c="",e=this.config,f=this,g=e.utils;
		"undefined"!=typeof d&&d.kissy&&(b=d);
		var h=g.runBlockCommand,
			i=g.renderOutput,
			j=g.getProperty,
			k=(g.runInlineCommand,g.getPropertyOrRunCommand);
		c+="";
		var l={},m=[],n=j(f,a,"data",0,1);
		return 
			m.push(n),
			l.params=m,
			l.fn=function(a){
				var b="";
				b+="\r\n<ul>\r\n";
				var c={},d=[],e=j(f,a,"data",0,3);
				return 
					d.push(e),
					c.params=d,
					c.fn=function(a){
						var b="";
						b+='\r\n<li class="ui-lrc-line">';
						var c=k(f,a,{},"this",0,4);
						return 
							b+=i(c,!1),
							b+="</li>\r\n"
					},
					b+=h(f,a,c,"each",3),
					b+="\r\n</ul>\r\n"
			},
			
			l.inverse=function(a){
				var b="";
				b+='\r\n<div class="no-lrc" onclick="SEIYA.playerUploadlyric(\'';
				var c=k(f,a,{},"id",0,8);
				return b+=i(c,!0),b+="')\"></div>\r\n"
			},
			
			c+=h(f,a,l,"if",1),
			c+="\r\n"
		}
	}
),

KISSY.add("page/mods/player/player-lrc",["node","base","io","xtemplate","anim","utils/scrollView/scrollViewManage","../xtpl/lrc-xtpl","../xtpl/lrcText-xtpl"],
	function(a,b,c,d){
		var e=b("node"),f=b("base"),g=(b("io"),b("xtemplate")),h=(b("anim"),
			b("utils/scrollView/scrollViewManage")),
			i=b("../xtpl/lrc-xtpl"),j=b("../xtpl/lrcText-xtpl"),k=e.all,
			l=/\[(\d\:\d\d(\.\d{1,3})?)\]/gm,
			m=/\[(\d\d\:\d\d)\]/gm,
			n=/\[(\d\:\d\d)\]/gm,
			o=/\[offset:(.+?)\]/i,
			p=/(\[\d\d:\d\d(\.\d{1,3})?\])+[^\[\]]+/g,
			q=/(\[\d\d:\d\d\.\d{2,3}\])+/g,
			r=/(\[\d\d:\d\d\.\d{2,3}\])/g,
			s=/\[(\d\d):(\d\d\.\d{2,3})\]/,
			t=/^\s*$/,
			u={
				initializer:function(){
					var b=this;
					b.TPL_lrc=new g(i),
					b.TPL_lrcText=new g(j),
					b.wrap=b.get("wrap"),
					b._hasLyric=!1,
					b._offsetNum=500,
					b.LyricsArr=[],
					b.LyricLine=null,
					b.LyricWrap=k(a.UA.ie&&a.UA.ie<8?"#J_lyricScrollWrap":"#J_lyricScrollView"),
					b._addEvent()
				},
				
				_addEvent:function(){
					var a=this;
					a.on("afterIndexChange",function(b){a.changeCurrent(b.prevVal,b.newVal)})
				},
				
				render:function(a,b,c)	{
					var d=this;
					d.set("songId",a),d.clearLyric(),b?d.lyricLoadComplete(c):d.noLyric()
				},
				
				lyricLoadComplete:function(a)	{
					var b=this;
					""!=a?/\[(\d+)\:(\d+)(\.\d+)?\]/.test(a)?
						(b._hasLyric=!0,b.LyricsArr=b._splitLyric(a),b._show(!0,b.LyricsArr))
						:
						(b._hasLyric=!1,b._setTxtLyrics(a)):b.reset()
				},
				
				noLyric:function(){
					var a=this,
						b=a.TPL_lrc.render({data:null,id:a.get("songId")});
						a.wrap.html(b),
						a.LyricLine=a.wrap.all(".ui-lrc-line"),
						h.render("J_lyricScrollView")
					},
				
				changeCurrent:function(a,b){
					var c=this;
					if(-1!=a&&c.LyricLine.item(a).removeClass("ui-lrc-current"),-1!=b)	{
						var d=c.LyricLine.item(b);
						d.addClass("ui-lrc-current"),
						c._checkPosition(d)
					}
				},
				syncTime:function(a){
					var b=this;
					if(!b._hasLyric)
					return!1;
					var c=b._checkIndex(a);
					b.set("index",c)
				},
				
				_checkPosition:function(b) {
					var c=this,d=c.wrap.offset(),e=c.wrap.height(),f=c.LyricWrap.height();
					if(f>e)	return!1;
					var g=b.offset(),
						i=b.height(),
						j=g.top-d.top-f/2+i/2,k=e-f;0>j&&(j=0),
						j>k&&(j=k),
						j=Math.floor(j),
						a.UA.ie&&a.UA.ie<8?
							h.scrollTo("J_lyricScrollWrap",{top:j})
							:
							(h.stopAnimation("J_lyricScrollView"),
							h.scrollTo("J_lyricScrollView",{top:j},{duration:1.0,easing:"easeOutStrong"})
							)
				},
				
				_checkIndex:function(a){
					var b=this,c=Number(a+b._offsetNum)/1e3,d=0;
					if(0==b.LyricsArr.length)	return d;
				
					for(var e=0,f=b.LyricsArr.length;f>e;e++) {
						if(c<b.LyricsArr[e].time){
							d=e-1;
							break
						}
						
						if(c>b.LyricsArr[f-1].time){
							d=f-1;break}
							
					}
					return d=-1==d?0:d
				},
				
				_show:function(a,b){
					var c,d=this;
					c=a?d.TPL_lrc.render({data:b}):d.TPL_lrcText.render({data:b}),
					d.wrap.html(c),d.LyricLine=d.wrap.all(".ui-lrc-line"),
					h.render("J_lyricScrollView")
				},
				
				_splitLyric:function(a){
					var b=this,c=a;
					l.test(c)&&(c=c.replace(l,"[0$1]")),
					m.test(c)&&(c=c.replace(m,"[$1.00]")),
					n.test(c)&&(c=c.replace(n,"[0$1.00]"));
					var d=c.match(o);
					null!=d&&(b._offsetNum=Number(d[1]));
					for(var e=c.match(p),f=[],g=0,h=e.length;h>g;g++){
						var i=e[g],j=i.match(r);
						i=i.replace(q,"");
						for(var k=0,u=j.length;u>k;k++){
							var v={},
								w=j[k],
								x=w.replace(s,"$1"),
								y=w.replace(s,"$2"),
								z=60*Number(x)+Number(y);
							v.time=z,t.test(i)&&(i+="&nbsp;"),v.text=i,f.push(v)}
					}
					
					return f.sort(function(a,b){
							return a.time>b.time?1:a.time<b.time?-1:0}),f
				},
				
				_setTxtLyrics:function(a){
					var b=this;
					if(""==a)return b.noLyric(),!1;
					var c=a.split("\n");
					c.unshift("\u6587\u672c\u6b4c\u8bcd"),b._show(!1,c)
				},
				
				clearLyric:function(){
					var a=this;
					a._offsetNum=0,a.LyricsArr=[],a.LyricLine=null,a._hasLyric=!1
				},
				
				reset:function(){
					var a=this;
					a.noLyric(),a.clearLyric()
				},
				
				empty:function(){
					h.content("J_lyricScrollView","")
				}
			},
			
			v=	{ATTRS:
					{	index:{value:-1},
						lrcArr:{value:null},
						wrap:{
							value:null,
							setter:function(a){return k(a)}
						},
						songId:{value:0}}
				};
		d.exports=f.extend(u,v)
}),

/////////////////////////////////////////////////////////////

KISSY.add("page/mods/player/player-lister",["node","base","json"],function(a,b,c,d)
{"use strict";
function e(b){return a.isNumber(b)?(parseInt(b/1e3/60)+":"+parseInt(b/1e3%60)).replace(/\b(\d)\b/g,"0$1"):"00:00"}var f=b("node"),g=b("base"),h=b("json"),i=f.all,

j={initializer:function(){var a=this;
a.positionTime=a.get("positionTime"),a.durationTime=a.get("durationTime"),a.grogress=a.get("grogress"),a.panel=a.get("panel"),a.updateLock=0,a.dot=a.panel.one(".player-dot")},changePositionTime:function(a,b){var c=this,b=b||!1;
if(!c.get("canRender")&&!b)return!1;
var d=c.get("duration");
if(d>0){var f=a*d,g=e(Number(f));
c.positionTime.html(g)}},addSongs:function(a){var b=this;
b.fire("addSongs",{data:a})},ready:function(a){var b=this;
b.fire("ready",{data:a})},soundOpen:function(a){var b=this,c=h.parse(a);
b.set("duration",1e3*c.length),b.fire("soundOpen",{data:a})},soundError:function(a){var b=this;
b.fire("soundError",{data:a})},soundPlaying:function(a){var b=this;
if(b.fire("soundPlaying",{data:a}),b.updateLock=(b.updateLock+4)%3,1!==b.updateLock)return!1;
var c=h.parse(a),d=e(Number(c.position)),f=e(Number(c.duration)),g=c.position/c.duration;
b.set("position",c.position),b.get("canRender")&&(b._showTimers(d,f),b._randerPlaying(g))},soundComplete:function(a){var b=this;
b.set("duration",0),b.fire("soundComplete",{data:a})},soundProgress:function(a){var b=this,c=h.parse(a),d=c.progress/c.duration;
d=d>1?1:d,b.grogress.one(".loading").width(100*d+"%")},soundLoadComplete:function(b){var c=this,d=h.parse(b),f=e(Number(d.duration));
c.set("duration",d.duration),c.durationTime.html(f),c.grogress.one(".loading").width("100%"),c.fire("soundLoadComplete",{data:b}),a.log("soundLoadComplete")},playerRuning:function(){var a=this;
a.fire("playerRuning")},lyricComplete:function(a,b){var c=this;
c.fire("lyricComplete",{status:a,data:b})},_randerPlaying:function(a){var b=this;
b.grogress.one(".playing").width(100*a+"%"),b.dot.css("left",100*a+"%")},_showTimers:function(a,b){var c=this;
c.positionTime.html(a),c.durationTime.html(b)}},k={ATTRS:{canRender:{value:!0},grogress:{value:"",setter:function(a){return i(a)}},panel:{value:"",setter:function(a){return i(a)}},position:{value:0},positionTime:{value:"",setter:function(a){return i(a)}},duration:{value:0},durationTime:{value:"",setter:function(a){return i(a)}}}};
d.exports=g.extend(j,k)}),

KISSY.add("page/mods/player/player-volume",["node","base","event"],function(a,b,c,d){var e=b("node"),f=b("base"),g=b("event"),h=e.all,i={initializer:function(){var a=this;
a.wrap=a.get("wrap"),a.mute=a.get("mute"),a.cur=a.wrap.one(".volume-cur"),a.dot=a.wrap.one(".volume-dot"),a.control=a.wrap.one(".volume-control"),a.tickDrag=!1,a.mouseOffset=null,a.tempVol=0,a.timer=null,a._addEvent()},_addEvent:function(){var a=this;
a.dot.on("mousedown",function(b){a._mouseDown(b)}),a.control.on("click",function(b){b.target==b.currentTarget&&a._mouseClick(b)}),a.mute.on("click",function(b){a._muteHandler(b)}),g.on(document,"mouseup",function(b){a._mouseUp(b)}),g.on(document,"mousemove",function(b){a.tickDrag&&a._mouseDrag(b)})},_mouseDown:function(a){var b=this;
b.tickDrag=!0,b.mouseOffset={left:a.offsetX||a.pageX-b.dot.offset().left},a.halt()},_mouseUp:function(){var a=this;
a.tickDrag=!1,a.mouseOffset=null},_mouseDrag:function(a){var b=this;
return b.tickDrag&&null!==b.mouseOffset?void b._calcWidthFromMouseX({left:a.pageX}):!1},_mouseClick:function(a){var b=this,c={left:a.offsetX||a.pageX-b.control.offset().left},d=c.left/b.control.width();
return d=Number(d.toFixed(2)),d===b.get("volume")?!1:(b.setVolume(d),void a.halt())},_calcWidthFromMouseX:function(b){var c=this,d=c.wrap.offset(),e=c.wrap.width()-8,f=c.mouseOffset.left,g=b.left-f-d.left;
0>g&&(g=0),g>e&&(g=e);
var h=g/e;
return h=Number(h.toFixed(2)),h===c.get("volume")?!1:(c.volumeUI(h),c.timer&&c.timer.cancel(),void(c.timer=a.later(function(a){c.set("volume",a)},200,!1,null,h)))},_muteHandler:function(){var b=this;
b.mute.hasClass("volume-on")?(b.tempVol=b.get("volume"),a.log(["tempVol",b.tempVol]),b.mute.removeClass("volume-on"),b.mute.addClass("volume-off"),b.setVolume(0)):0==b.tempVol?(b.mute.removeClass("volume-off"),b.mute.addClass("volume-on"),b.setVolume(.5)):(b.mute.removeClass("volume-off"),b.mute.addClass("volume-on"),b.setVolume(b.tempVol))},setVolume:function(a){var b=this;
return a===b.get("volume")?!1:(b.set("volume",a),void b.volumeUI(a))},volumeUI:function(a){var b=this,c=b.wrap.width()-8;
b.dot.css("left",c*a+"px"),b.cur.css("width",100*a+"%"),0>=a?(b.mute.removeClass("volume-on"),b.mute.addClass("volume-off")):(b.mute.removeClass("volume-off"),b.mute.addClass("volume-on"))},volumeUP:function(){var b=this,c=b.get("volume");
a.log(c),c+=.1;
var c=c>1?1:c;
b.setVolume(c)},volumeDOWN:function(){var b=this,c=b.get("volume");
a.log(c),c-=.1;
var c=0>c?0:c;
b.setVolume(c)}},j={ATTRS:{volume:{value:0,setter:function(b){return a.log(b,"","volume"),a.isNumber(b)?Number(b.toFixed(2)):void 0},getter:function(a){return Number(a.toFixed(2))}},wrap:{value:"",setter:function(a){return h(a)}},mute:{value:"",setter:function(a){return h(a)}}}};
d.exports=f.extend(i,j)}),

KISSY.add("page/mods/player/player-panel",["node","base","event","dom"],function(a,b,c,d){var e=b("node"),f=b("base"),g=b("event"),h=(b("dom"),e.all),i={initializer:function(){var a=this;
a.panel=a.get("panel"),a.grogress=a.get("grogress"),a.dot=a.panel.one("#J_playerDot"),a.playing=a.grogress.one(".playing"),a.mouseOffset=null,a.positionValue=0,a._addEvent()},_addEvent:function(){var a=this;
a.dot.on("mousedown",function(b){a._mouseDown(b)}),a.panel.on("mouseup",function(b){b.target==b.currentTarget&&a._mouseClick(b)}),g.on(document,"mouseup",function(b){a._mouseUp(b)}),g.on(document,"mousemove",function(b){a.get("tickDrag")&&a._mouseDrag(b)})},_mouseDown:function(a){var b=this;
return"room"==b.get("status")?!1:(b.set("tickDrag",!0),b.mouseOffset={left:a.offsetX||a.pageX-b.dot.offset().left},void a.halt())},_mouseUp:function(){var a=this;
a.get("tickDrag")&&(a.set("position",a.positionValue,{force:!0}),a.set("tickDrag",!1)),a.mouseOffset=null},_mouseDrag:function(a){var b=this;
return b.get("tickDrag")&&null!==b.mouseOffset?void b._calcWidthFromMouseX({left:a.pageX}):!1},_mouseClick:function(a){var b=this;
if("room"==b.get("status"))return!1;
var c={left:a.offsetX||a.pageX-b.panel.offset().left},d=c.left/b.panel.width();
b.positionValue=d,b._setPosition(d),b.set("position",b.positionValue,{force:!0}),a.halt()},_calcWidthFromMouseX:function(a){var b=this,c=b.panel.offset(),d=b.panel.width(),e=a.left-c.left;
0>e&&(e=0),e>d&&(e=d);
var f=e/d;
b.set("dragposition",f),b.positionValue=f,b._setPosition(f)},_setPosition:function(a){var b=this;
b.dot.css("left",100*a+"%"),b.playing.width(100*a+"%")}},j={ATTRS:{tickDrag:{value:!1,setter:function(b){return a.isBoolean(b)?b:void 0}},dragposition:{value:0},position:{value:0},grogress:{value:"",setter:function(a){return h(a)}},panel:{value:"",setter:function(a){return h(a)}},status:{value:"play"}}};
d.exports=f.extend(i,j)}),

KISSY.add("widget/dialog/index",["node","overlay","./index.css"],function(a,b,c,d){var e=(b("node"),b("overlay"));
b("./index.css");
var f={showDialogUrl:function(b,c){if(!b.url)return!1;
if(a.isUndefined(c))var c="";
var d=a.merge({url:"",title:"\u63d0\u793a",width:400,height:200},b);
a.log(d);
var f=__OVERLAY__=new e.Dialog({closeAction:"destroy",prefixCls:"xiami-",headerContent:d.title,closable:!0,bodyContent:c+'
<iframe scrolling="no" height="'+d.height+'" width="'+d.width+'" frameborder="0" name="popupIframe" src="'+d.url+'">
</iframe>',mask:!0,align:{points:["cc","cc"]}});
return f.show(),f}};
d.exports=f}),

KISSY.add("widget/tool/index",["cookie","overlay","node","widget/dialog/index"],function(a,b,c,d){var e=b("cookie"),f=(b("overlay"),b("node")),g=window.__DIALOG__=b("widget/dialog/index"),h={changeFavicon:function(a){var b=document.createElement("link"),c=f.all("#dynamic-favicon");
b.id="dynamic-favicon",b.rel="shortcut icon",b.href=a,c&&c.remove(),f.all("head").append(b)},isLogin:function(){var a=this,b=e.get("user"),c=!!b;
return c?!0:(a.miniLogin(),!1)},showDialogLogin:function(){var a="/member/login";
window.location.origin||(window.location.origin=window.location.protocol+"//"+window.location.hostname+(window.location.port?":"+window.location.port:"")),window.location.href=window.location.origin+a},miniLogin:function(){var a='
<style>.J_login_method{padding: 14px 10px 24px;
overflow: hidden;
zoom: 1;
}.J_login_method a{float: left;
margin-left: 24px;
}
</style>
<div class="J_login_method">
<a href="javascript:;
" onclick="taobaoLogin();
return false;
">
<img alt="\u7528\u6dd8\u5b9d\u5e10\u53f7\u767b\u5f55"  src="http://img.xiami.net/res/img/common/thirdparty/taobao125_24.jpg" width="125" height="24" />
</a>
<a href="javascript:;
" onclick="sinaLogin();
return false;
">
<img alt="\u7528\u5fae\u535a\u5e10\u53f7\u767b\u5f55" src="http://img.xiami.net/res/img/common/thirdparty/weibo125_24.jpg" width="125" height="24" />
</a>
<a href="javascript:;
" onclick="qqLogin();
return false;
">
<img alt="\u7528QQ\u5e10\u53f7\u767b\u5f55"  src="http://img.xiami.net/res/img/common/thirdparty/qq125_24.jpg" width="125" height="24" />
</a>
</div>';
g.showDialogUrl({url:"/member/minilogin",title:"\u8bf7\u5148\u767b\u5f55",width:490,height:170},a)}};
d.exports=h}),

KISSY.add("utils/base",function(a,b){var c=-1===location.host.indexOf("gitlabswf")?"":"http://pre.xiami.com",d={UPDATE_VIP:c+"/vip/role",SEARCH_JSON:c+"/search/json",SAVE_PLAYLIST:c+"/member/edit-playlist",FAV_SOUND_URL:c+"/song/favjson",COLLECT_EDIT_NAME_URL:c+"/playercollect/update",COLLECT_DELETE_URL:c+"/playercollect/delete",COLLECT_GET_LIST_URL:c+"/playercollect/list",COLLECT_DETAIL_URL:c+"/playercollect/detail",COLLECT_CREATE_URL:c+"/playercollect/create",COLLECT_DELETE_SONG_URL:c+"/playercollect/delsong",MY_FAV_TRCKS_URL:c+"/playersong/getgradesong",HISTORY_TRACKS_URL:c+"/play/recent-list",HISTOTY_DELETE_URL:c+"/play/remove-track",ROAM_SONGS_URL:c+"/play/get-manyou-song",getToken:function(){return b.get("_xiamitoken")},getUser:function(){return b.get("user")}};
return d},{requires:["cookie"]}),

KISSY.add("page/mods/player/player-control",["base","node","event","io","xtemplate","widget/tool/index","utils/base"],function(S,require,exports,module){var Base=require("base"),Node=require("node"),Event=require("event"),IO=require("io"),UTool=(require("xtemplate"),require("widget/tool/index")),BaseConfig=require("utils/base"),$=Node.all,playerControlExtension={initializer:function(){Event.delegate(document,"click","body",function(event){with($("#J_trackMoreMenu"))remove()})},favForIds:function(a){if(!UTool.isLogin())return!1;
new IO({dataType:"jsonp",url:BaseConfig.FAV_SOUND_URL,data:{ids:a.join(","),_xiamitoken:BaseConfig.getToken()},success:function(a){if(a.status)for(var b=a.data.songId.split(","),c=$("#J_trackFav"),d=c.attr("data-sid"),e=0,f=b.length;
f>e;
e++){var g=b[e],h=$("#J_trackList"+g).one(".fav-btn");
h&&h.hasClass("icon-track-fav")&&h.removeClass("icon-track-fav").addClass("icon-track-faved").attr("title","\u53d6\u6d88\u6536\u85cf"),g==d&&c&&c.removeClass("icon-fav").addClass("icon-faved").attr("title","\u53d6\u6d88\u6536\u85cf")}},error:function(){}})},favForId:function(a,b,c){if(!UTool.isLogin())return!1;
var d=this;
new IO({dataType:"jsonp",url:BaseConfig.FAV_SOUND_URL,data:{ids:a,rec_note:c,_xiamitoken:BaseConfig.getToken()},success:function(c){if(!c.status)return!1;
var e=$("#J_trackList"+a).one(".fav-btn"),f=$("#J_historyList"+a).one(".fav-btn"),g=$("#J_favList"+a).one(".fav-btn"),h=$("#J_collectList"+a).one(".fav-btn"),i=$("#J_trackFav"),j=i.attr("data-sid");
c.data.flag?(e&&e.removeClass("icon-track-fav").addClass("icon-track-faved").attr("title","\u53d6\u6d88\u6536\u85cf"),f&&f.removeClass("icon-track-fav").addClass("icon-track-faved").attr("title","\u53d6\u6d88\u6536\u85cf"),g&&g.removeClass("icon-track-fav").addClass("icon-track-faved").attr("title","\u53d6\u6d88\u6536\u85cf"),h&&h.removeClass("icon-track-fav").addClass("icon-track-faved").attr("title","\u53d6\u6d88\u6536\u85cf"),a===j&&i&&i.removeClass("icon-fav").addClass("icon-faved").attr("title","\u53d6\u6d88\u6536\u85cf")):(e&&e.removeClass("icon-track-faved").addClass("icon-track-fav").attr("title","\u6536\u85cf"),f&&f.removeClass("icon-track-faved").addClass("icon-track-fav").attr("title","\u6536\u85cf"),g&&g.removeClass("icon-track-faved").addClass("icon-track-fav").attr("title","\u6536\u85cf"),h&&h.removeClass("icon-track-faved").addClass("icon-track-fav").attr("title","\u6536\u85cf"),a===j&&i&&i.removeClass("icon-faved").addClass("icon-fav").attr("title","\u6536\u85cf")),d.fire("trackFavCallback",{data:c.data,targetType:b})},error:function(){}})},fav:function(a,b){if(0==b)return!1;
if(!UTool.isLogin())return!1;
var c=this,d=$(a),e=d.attr("data-sid");
new IO({dataType:"jsonp",url:BaseConfig.FAV_SOUND_URL,data:{ids:b,_xiamitoken:BaseConfig.getToken()},success:function(a){S.log(a),a.status&&(b===e&&(d.attr("data-sid",a.datasongId),d.attr(a.data.flag?{"class":"icon-faved",title:"\u53d6\u6d88\u6536\u85cf"}:{"class":"icon-fav",title:"\u6536\u85cf"})),c.fire("trackFavCallback",{data:a.data}))},error:function(){}})},share:function(a,b){if(0==b)return!1;
SEIYA.recommend(b,32)}};
module.exports=Base.extend(playerControlExtension)}),


KISSY.add("page/mods/xtpl/trackItem-xtpl",function(a,b,c,d){return function(a){var b,c="",e=this.config,f=this,g=e.utils;
"undefined"!=typeof d&&d.kissy&&(b=d);
var h=g.runBlockCommand,i=g.renderOutput,j=g.getProperty,k=(g.runInlineCommand,g.getPropertyOrRunCommand);
c+="";
var l={};
return l.fn=function(a){var b="";
b+="\r\n";
var c={},d=[],e=j(f,a,"xindex",0,2),g=j(f,a,"index",1,2);
d.push(e===g),c.params=d,c.fn=function(a){var b="";
b+='\r\n
<div class="ui-row-item ui-track-item ui-track-current"  data-sid="';
var c=k(f,a,{},"song_id",0,3);
b+=i(c,!0),b+='" data-note="';
var d=k(f,a,{},"rec_note",0,3);
b+=i(d,!0),b+='" data-type="track" id="J_trackList';
var e=k(f,a,{},"song_id",0,3);
return b+=i(e,!0),b+='">\r\n'},c.inverse=function(a){var b="";
b+='\r\n
<div class="ui-row-item ui-track-item" data-sid="';
var c=k(f,a,{},"song_id",0,5);
b+=i(c,!0),b+='" data-note="';
var d=k(f,a,{},"rec_note",0,5);
b+=i(d,!0),b+='" data-type="track" id="J_trackList';
var e=k(f,a,{},"song_id",0,5);
return b+=i(e,!0),b+='">\r\n'},b+=h(f,a,c,"if",2),b+='\r\n
<div class="ui-track-main">\r\n	
<div class="ui-track-checkbox">\r\n		';
var l={},m=[],n=j(f,a,"shield",0,9);
m.push(n),l.params=m,l.fn=function(a){var b="";
b+='\r\n		
<input type="checkbox" class="ui-track-item-id" name="track" id="J_track';
var c=k(f,a,{},"song_id",0,10);
b+=i(c,!0),b+='" value="';
var d=k(f,a,{},"song_id",0,10);
return b+=i(d,!0),b+='" disabled="disabled" />\r\n		'},l.inverse=function(a){var b="";
b+='\r\n		
<input type="checkbox" class="ui-track-item-id" name="track" id="J_track';
var c=k(f,a,{},"song_id",0,12);
b+=i(c,!0),b+='" value="';
var d=k(f,a,{},"song_id",0,12);
return b+=i(d,!0),b+='" />\r\n		'},b+=h(f,a,l,"if",9),b+='\r\n	
</div>\r\n	
<div class="ui-track-sort">
<em>';
var o=j(f,a,"xindex",0,15);
b+=i(o+1,!0),b+='
</em>
</div>\r\n	
<div class="ui-row-item-body">\r\n		
<div class="ui-row-item-column c1" data-id="';
var p=k(f,a,{},"song_id",0,17);
b+=i(p,!0),b+='">';
var q=k(f,a,{},"title",0,17);
b+=i(q,!1),b+='
</div>\r\n		
<div class="ui-row-item-column c2" data-artist-id="';
var r=k(f,a,{},"artist_id",0,18);
b+=i(r,!0),b+='">';
var s=k(f,a,{},"artistfun",0,18);
b+=i(s,!1),b+='
</div>\r\n		
<div class="ui-row-item-column c3" data-album-id="';
var t=k(f,a,{},"album_id",0,19);
b+=i(t,!0),b+='">
<a href="http://www.xiami.com/album/';
var u=k(f,a,{},"album_id",0,19);
b+=i(u,!0),b+='" target="_blank" title="';
var v=k(f,a,{},"album_name",0,19);
b+=i(v,!1),b+='">';
var w=k(f,a,{},"album_name",0,19);
b+=i(w,!1),b+='
</a>
</div>\r\n	
</div>\r\n	
<div class="ui-track-control">\r\n		';
var x={},y=[],z=j(f,a,"grade",0,22);
y.push(1*z===-1),x.params=y,x.fn=function(){var a="";
return a+='\r\n		
<a class="fav-btn icon-track-fav" data-type="track" data-event="fav" title="\u6536\u85cf">
</a>\r\n		'},x.inverse=function(){var a="";
return a+='\r\n		
<a class="fav-btn icon-track-faved" data-type="track" data-event="fav" title="\u53d6\u6d88\u6536\u85cf">
</a>\r\n		'},b+=h(f,a,x,"if",22),b+='\r\n		
<a class="more-btn icon-track-more" data-type="track" data-event="more" title="\u66f4\u591a">
</a>\r\n		
<a class="delete-btn icon-track-delete" data-type="track" data-event="delete" title="\u5220\u9664">
</a>\r\n	
</div>\r\n
</div>\r\n
<div class="ui-roam-wrap" id="J_roamWrap';
var A=k(f,a,{},"song_id",0,31);
return b+=i(A,!0),b+='">\r\n		
<div class="ui-roam-head">
</div>\r\n	</div>\r\n</div>\r\n'},c+=h(f,a,l,"data",1)}}),

KISSY.add("page/mods/player/player-tracks",["node","base","anim","xtemplate","../xtpl/trackItem-xtpl","utils/scrollView/scrollViewManage"],function(a,b,c,d){var e=b("node"),f=b("base"),g=(b("anim"),b("xtemplate")),h=b("../xtpl/trackItem-xtpl"),i=b("utils/scrollView/scrollViewManage"),j=e.all,k={initializer:function(){var a=this;
a.TPL_track=new g(h),a.tracksWrap=j("#J_playTracksList"),a._trackCount=j("#J_trackCount"),a._scrollLock=null,i.render("J_tracksScrollView")},append:function(b,c,d){var f=this;
if(b.length
<1)return!1;
if(a.log(b,c,d),c.length>0)for(var g=0,h=c.length;
h>g;
g++){var k=c[g],l=e.one("#J_trackList"+k);
l&&l.remove()}var m={data:b,artistfun:f._formatArtist,index:-1},n=f.TPL_track.render(m);
f.tracksWrap.append(n),j("#J_checkAll_track").prop("checked",!1),f.sortTrackList(),i.sync("J_tracksScrollView"),f._trackCount.html("("+m.data.length+")")},add:function(b,c,d){var f=this;
if(b.length
<1)return!1;
if(a.log(b,c,d),c.length>0)for(var g=0,h=c.length;
h>g;
g++){var k=c[g],l=e.one("#J_trackList"+k);
l&&l.remove()}var m={data:b,artistfun:f._formatArtist,index:-1},n=f.TPL_track.render(m);
e.one("#J_trackList"+d).after(n),j("#J_checkAll_track").prop("checked",!1),f.sortTrackList(),i.sync("J_tracksScrollView"),f._trackCount.html("("+f.tracksWrap.all(".ui-track-item").length+")")},addTracks:function(b,c){var d=this,e={data:[],artistfun:d._formatArtist,index:c};
a.isArray(b)?Array.prototype.push.apply(e.data,b):e.data.push(b);
var f=d.TPL_track.render(e);
d.tracksWrap&&d.tracksWrap.html(f),j("#J_checkAll_track").prop("checked",!1),d._trackCount.html("("+e.data.length+")"),j("body").removeClass("loading"),i.sync("J_tracksScrollView")},sortTrackList:function(){for(var a=this,b=a.tracksWrap.all(".ui-track-item"),c=b.length,d=0;
c>d;
d++){var e=j(b[d]).one(".ui-track-sort");
e.html("
<em>"+(d+1)+"
</em>")}a._trackCount.html("("+a.tracksWrap.all(".ui-track-item").length+")"),i.sync("J_tracksScrollView")},highCurrentTrack:function(a,b){var c=this;
if("roam"!==b){var d=c.tracksWrap.one("#J_trackList"+a),e={top:0};
c.tracksWrap.all(".ui-track-current").removeClass("ui-track-current"),c.tracksWrap.all(".ui-track-roaming").removeClass("ui-track-roaming"),d&&d.hasClass("ui-track-hover")&&d.removeClass("ui-track-hover"),d&&(d.addClass("ui-track-current"),d.one(".ui-roam-head").html('
<a class="ui-roam-open" data-event="roam">\u6f2b\u6e38\u76f8\u4f3c\u6b4c\u66f2
</a>').show(),d.one(".ui-track-sort").removeClass("ui-track-sort-roam"),e=d.offset()),c.syncScrollView();

{j("#J_roamBody").remove()}}else{j("#J_roamMain").all(".ui-roam-item").removeClass("ui-roam-current");
var d=c.tracksWrap.one("#J_roamItem"+a);
d&&d.addClass("ui-roam-current")}},syncScrollView:function(){i.sync("J_tracksScrollView")},syncScrollViewPosition:function(a){var b={top:41*a};
i.scrollAt("J_tracksScrollView",b)},reset:function(){var a=this;
a.tracksWrap.html(""),a._trackCount.html("(0)"),a.syncScrollView()},_formatArtist:function(){var b=a.unEscapeHTML(this.artist),c=b.split(";
"),d=[];
if(1==c.length)return'
<a href="http://www.xiami.com/artist/'+this.artist_id+'" target="_blank" title="'+b+'">'+b+"
</a>";
for(var e=0,f=c.length;
f>e;
e++)d.push('
<a href="http://www.xiami.com/search/find/artist/'+c[e]+'" target="_blank" title="'+c[e]+'">'+c[e]+"
</a>");
return d.join(" ;
 ")}};
d.exports=f.extend(k)}),


KISSY.add("utils/blur/stackBlur",function(a,b,c){var d=b.all,e=[512,512,456,512,328,456,335,512,405,328,271,456,388,335,292,512,454,405,364,328,298,271,496,456,420,388,360,335,312,292,273,512,482,454,428,405,383,364,345,328,312,298,284,271,259,496,475,456,437,420,404,388,374,360,347,335,323,312,302,292,282,273,265,512,497,482,468,454,441,428,417,405,394,383,373,364,354,345,337,328,320,312,305,298,291,284,278,271,265,259,507,496,485,475,465,456,446,437,428,420,412,404,396,388,381,374,367,360,354,347,341,335,329,323,318,312,307,302,297,292,287,282,278,273,269,265,261,512,505,497,489,482,475,468,461,454,447,441,435,428,422,417,411,405,399,394,389,383,378,373,368,364,359,354,350,345,341,337,332,328,324,320,316,312,309,305,301,298,294,291,287,284,281,278,274,271,268,265,262,259,257,507,501,496,491,485,480,475,470,465,460,456,451,446,442,437,433,428,424,420,416,412,408,404,400,396,392,388,385,381,377,374,370,367,363,360,357,354,350,347,344,341,338,335,332,329,326,323,320,318,315,312,310,307,304,302,299,297,294,292,289,287,285,282,280,278,275,273,271,269,267,265,263,261,259],f=[9,11,12,13,13,14,14,15,15,15,15,16,16,16,16,17,17,17,17,17,17,17,18,18,18,18,18,18,18,18,18,19,19,19,19,19,19,19,19,19,19,19,19,19,19,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24],g={initializer:function(){var a=this;
a.id=null},render:function(a,b,c,e){var f=this;
f.id=b;
var g=document.getElementById(b);
if(g&&g.getContext){var h=d(g).width(),i=d(g).height(),j=h/i,k=g.getContext("2d"),l=new Image;
l.onload=function(){g.width=h,g.height=i;
var a=l.width,d=l.height,m=a/d,n=0,o=0;
if(k.clearRect(0,0,h,i),j>m){o=a/j;
var p=(d-o)/2;
k.drawImage(l,0,p,a,o,0,0,h,i)}if(m>j){n=d*j;
var q=(a-n)/2;
k.drawImage(l,q,0,n,d,0,0,h,i)}isNaN(c)||1>c||(e?f.stackBlurCanvasRGBA(b,0,0,h,i,c):f.stackBlurCanvasRGB(b,0,0,h,i,c))},l.crossOrigin="*",l.src=a}},stackBlurImage:function(a,b,c,d){var e=document.getElementById(a),f=e.naturalWidth,g=e.naturalHeight,h=document.getElementById(b);
h.style.width=f+"px",h.style.height=g+"px",h.width=f,h.height=g;
var i=h.getContext("2d");
i.clearRect(0,0,f,g),i.drawImage(e,0,0),isNaN(c)||1>c||(d?stackBlurCanvasRGBA(b,0,0,f,g,c):stackBlurCanvasRGB(b,0,0,f,g,c))},stackBlurCanvasRGBA:function(b,c,d,g,h,i){var j=this;
if(!(isNaN(i)||1>i)){i|=0;
var k,l=document.getElementById(b),m=l.getContext("2d");
try{try{k=m.getImageData(c,d,g,h),a.log("getImageData success a")}catch(n){try{netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead"),k=m.getImageData(c,d,g,h),a.log("getImageData success b")}catch(n){throw new Error("unable to access local image data: "+n)}}}catch(n){throw j.fire("notImageDate"),new Error(n)}var o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M=k.data,N=i+i+1,O=g-1,P=h-1,Q=i+1,R=Q*(Q+1)/2,S=j.BlurStack(),T=S;
for(q=1;
N>q;
q++)if(T=T.next=j.BlurStack(),q==Q)var U=T;
T.next=S;
var V=null,W=null;
u=t=0;
var X=e[i],Y=f[i];
for(p=0;
h>p;
p++){for(D=E=F=G=v=w=x=y=0,z=Q*(H=M[t]),A=Q*(I=M[t+1]),B=Q*(J=M[t+2]),C=Q*(K=M[t+3]),v+=R*H,w+=R*I,x+=R*J,y+=R*K,T=S,q=0;
Q>q;
q++)T.r=H,T.g=I,T.b=J,T.a=K,T=T.next;
for(q=1;
Q>q;
q++)r=t+((q>O?O:q)
<
<2),v+=(T.r=H=M[r])*(L=Q-q),w+=(T.g=I=M[r+1])*L,x+=(T.b=J=M[r+2])*L,y+=(T.a=K=M[r+3])*L,D+=H,E+=I,F+=J,G+=K,T=T.next;
for(V=S,W=U,o=0;
g>o;
o++)M[t+3]=K=y*X>>Y,0!=K?(K=255/K,M[t]=(v*X>>Y)*K,M[t+1]=(w*X>>Y)*K,M[t+2]=(x*X>>Y)*K):M[t]=M[t+1]=M[t+2]=0,v-=z,w-=A,x-=B,y-=C,z-=V.r,A-=V.g,B-=V.b,C-=V.a,r=u+((r=o+i+1)
<O?r:O)
<
<2,D+=V.r=M[r],E+=V.g=M[r+1],F+=V.b=M[r+2],G+=V.a=M[r+3],v+=D,w+=E,x+=F,y+=G,V=V.next,z+=H=W.r,A+=I=W.g,B+=J=W.b,C+=K=W.a,D-=H,E-=I,F-=J,G-=K,W=W.next,t+=4;
u+=g}for(o=0;
g>o;
o++){for(E=F=G=D=w=x=y=v=0,t=o
<
<2,z=Q*(H=M[t]),A=Q*(I=M[t+1]),B=Q*(J=M[t+2]),C=Q*(K=M[t+3]),v+=R*H,w+=R*I,x+=R*J,y+=R*K,T=S,q=0;
Q>q;
q++)T.r=H,T.g=I,T.b=J,T.a=K,T=T.next;
for(s=g,q=1;
i>=q;
q++)t=s+o
<
<2,v+=(T.r=H=M[t])*(L=Q-q),w+=(T.g=I=M[t+1])*L,x+=(T.b=J=M[t+2])*L,y+=(T.a=K=M[t+3])*L,D+=H,E+=I,F+=J,G+=K,T=T.next,P>q&&(s+=g);
for(t=o,V=S,W=U,p=0;
h>p;
p++)r=t
<
<2,M[r+3]=K=y*X>>Y,K>0?(K=255/K,M[r]=(v*X>>Y)*K,M[r+1]=(w*X>>Y)*K,M[r+2]=(x*X>>Y)*K):M[r]=M[r+1]=M[r+2]=0,v-=z,w-=A,x-=B,y-=C,z-=V.r,A-=V.g,B-=V.b,C-=V.a,r=o+((r=p+Q)
<P?r:P)*g
<
<2,v+=D+=V.r=M[r],w+=E+=V.g=M[r+1],x+=F+=V.b=M[r+2],y+=G+=V.a=M[r+3],V=V.next,z+=H=W.r,A+=I=W.g,B+=J=W.b,C+=K=W.a,D-=H,E-=I,F-=J,G-=K,W=W.next,t+=g}m.putImageData(k,c,d),j.set("id",j.id)}},stackBlurCanvasRGB:function(a,b,c,d,g,h){var i=this;
if(!(isNaN(h)||1>h)){h|=0;
var j,k=document.getElementById(a),l=k.getContext("2d");
try{try{j=l.getImageData(b,c,d,g)}catch(m){try{netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead"),j=l.getImageData(b,c,d,g)}catch(m){throw new Error("unable to access local image data: "+m)}}}catch(m){throw new Error("unable to access image data: "+m)}var n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H=j.data,I=h+h+1,J=d-1,K=g-1,L=h+1,M=L*(L+1)/2,N=i.BlurStack(),O=N;
for(p=1;
I>p;
p++)if(O=O.next=i.BlurStack(),p==L)var P=O;
O.next=N;
var Q=null,R=null;
t=s=0;
var S=e[h],T=f[h];
for(o=0;
g>o;
o++){for(A=B=C=u=v=w=0,x=L*(D=H[s]),y=L*(E=H[s+1]),z=L*(F=H[s+2]),u+=M*D,v+=M*E,w+=M*F,O=N,p=0;
L>p;
p++)O.r=D,O.g=E,O.b=F,O=O.next;
for(p=1;
L>p;
p++)q=s+((p>J?J:p)
<
<2),u+=(O.r=D=H[q])*(G=L-p),v+=(O.g=E=H[q+1])*G,w+=(O.b=F=H[q+2])*G,A+=D,B+=E,C+=F,O=O.next;
for(Q=N,R=P,n=0;
d>n;
n++)H[s]=u*S>>T,H[s+1]=v*S>>T,H[s+2]=w*S>>T,u-=x,v-=y,w-=z,x-=Q.r,y-=Q.g,z-=Q.b,q=t+((q=n+h+1)
<J?q:J)
<
<2,A+=Q.r=H[q],B+=Q.g=H[q+1],C+=Q.b=H[q+2],u+=A,v+=B,w+=C,Q=Q.next,x+=D=R.r,y+=E=R.g,z+=F=R.b,A-=D,B-=E,C-=F,R=R.next,s+=4;
t+=d}for(n=0;
d>n;
n++){for(B=C=A=v=w=u=0,s=n
<
<2,x=L*(D=H[s]),y=L*(E=H[s+1]),z=L*(F=H[s+2]),u+=M*D,v+=M*E,w+=M*F,O=N,p=0;
L>p;
p++)O.r=D,O.g=E,O.b=F,O=O.next;
for(r=d,p=1;
h>=p;
p++)s=r+n
<
<2,u+=(O.r=D=H[s])*(G=L-p),v+=(O.g=E=H[s+1])*G,w+=(O.b=F=H[s+2])*G,A+=D,B+=E,C+=F,O=O.next,K>p&&(r+=d);
for(s=n,Q=N,R=P,o=0;
g>o;
o++)q=s
<
<2,H[q]=u*S>>T,H[q+1]=v*S>>T,H[q+2]=w*S>>T,u-=x,v-=y,w-=z,x-=Q.r,y-=Q.g,z-=Q.b,q=n+((q=o+L)
<K?q:K)*d
<
<2,u+=A+=Q.r=H[q],v+=B+=Q.g=H[q+1],w+=C+=Q.b=H[q+2],Q=Q.next,x+=D=R.r,y+=E=R.g,z+=F=R.b,A-=D,B-=E,C-=F,R=R.next,s+=d}l.putImageData(j,b,c),i.set("id",i.id)}},BlurStack:function(){var a={};
return a.r=0,a.g=0,a.b=0,a.a=0,a.next=null,a}},h={ATTRS:{id:{value:"none"}}},i=c.extend(g,h);
return i},{requires:["node","base"]}),


KISSY.add("page/mods/player/player-blur",["node","base","anim","utils/blur/stackBlur"],function(a,b,c,d){var e=b("node"),f=b("base"),g=(b("anim"),b("utils/blur/stackBlur")),h=e.all,i=0,j={initializer:function(){var b=this,c=b.get("wrap");
b.BlurUtil=new g;
var d=document.createElement("canvas"),e=document.createElement("canvas");
if(d.getContext&&!a.UA.ie){b.set("support",!0),b.canvasElEven=h(d),b.canvasElOdd=h(e);
{c.width(),c.height()}b.canvasElEven.attr("class","ui-canvas"),b.canvasElOdd.attr("class","ui-canvas"),b.canvasElEven.attr("id","J_Player_Canvas_Even"),b.canvasElOdd.attr("id","J_Player_Canvas_Odd"),b.canvasElEven.css({width:"100%",height:"100%"}).appendTo(c),b.canvasElOdd.css({width:"100%",height:"100%"}).appendTo(c),b._addEvent()}},_onSetUrl:function(b){a.log("Blur _onSetUrl");
var c=this,d=i+=1;
d%=2;
var e=0==d?"J_Player_Canvas_Odd":"J_Player_Canvas_Even";
c.BlurUtil.render(b,e,70,!0)},render:function(b){var c=this;
a.log(c.get("support"),"","Blur render"),c.get("support")&&!a.UA.ie&&c.set("url",b)},_addEvent:function(){var b=this;
b.BlurUtil.on("afterIdChange",function(a){"J_Player_Canvas_Odd"==a.newVal?(b.canvasElEven.removeClass("ui-canvas-current"),b.canvasElOdd.addClass("ui-canvas-current")):(b.canvasElOdd.removeClass("ui-canvas-current"),b.canvasElEven.addClass("ui-canvas-current"))}),b.BlurUtil.on("notImageDate",function(){a.log("notImageDate"),b.set("support",!1),b.destory()})},destory:function(){var a=this;
a.canvasElEven.remove(),a.canvasElOdd.remove()}},k={ATTRS:{img:{value:""},wrap:{value:"",setter:function(a){return h(a)}},canvas:{value:""},support:{value:!1},url:{value:""}}};
d.exports=f.extend(j,k)}),

KISSY.add("page/mods/player/player-anim",["node","anim"],function(a,b,c,d){var e=b("node"),f=b("anim"),g=e.all,h={show:function(){setTimeout(function(){var a=g('
<div class="player-add-tip" />');
a.appendTo("body");
var b=new f(a,{top:"66px",opacity:"0"},.8,"easeOutStrong",function(){a.remove()});
b.run()},300)}};
d.exports=h}),

KISSY.add("page/mods/player/player-data",["base","json","io","utils/base","./player-anim"],function(a,b,c,d){var e=b("base"),f=b("json"),g=b("io"),h=b("utils/base"),i=b("./player-anim");
Array.shuffle=function(a){for(var b,c,d=a.length;
d;
b=parseInt(Math.random()*d),c=a[--d],a[d]=a[b],a[b]=c);
return a},Array.remove=function(a,b,c){var d=a.slice((c||b)+1||a.length);
return a.length=0>b?a.length+b:b,a.push.apply(a,d)};
var j={initializer:function(){var a=this;
a._firstLoad=!0,a._initLoad=!0,a._hasData=!1,a._oldIndex=0,a._playedSoundArr=[],a._soundIdArr=[],a._randomIdArr=[],a._soundArr=[],a._tracksObj={}},setData:function(b,c){a.log(["setData",c]);
var d=this;
d._soundIdArr.length>500&&alert("\u64ad\u653e\u5217\u8868\u6700\u591a\u53ea\u80fd\u6dfb\u52a0500\u9996\uff0c\n\u8bf7\u5220\u9664\u90e8\u5206\u6b4c\u66f2\u540e\u518d\u6dfb\u52a0\u3002");
var b=b,e=[];
if(3!=c&&"room"==d.get("status"))return alert("\u4f60\u6b63\u5728\u8ddf\u542c\u4e2d\uff0c\u4e0d\u80fd\u8d2a\u5fc3\u54e6\uff01\n\u8bf7\u9000\u51fa\u64ad\u95f4\u540e\u518d\u64ad\u653e\u5176\u4ed6\u6b4c\u66f2\u3002"),!1;
if(i.show(),a.isUndefined(b))return!1;
if(d._hasData=!0,a.isArray(b)?e=b:e.push(b),3==c)return d.enterRoom(e),!1;
var f=e[0],g=Number(f.insert_type),h=d._filterLoadArr(e),j=a.clone(d._soundIdArr);
if(0==h.length){var k=a.indexOf(f.song_id,j);
return k>-1&&2!=c&&d.playForId(f.song_id),!1}switch(c){case 0:break;
case 1:d.roamStop();
break;
case 2:return d._afterSoundArr(e),!1;
default:a.log(c,"log","atPlay")}if("roam"==d.get("status"))switch(g){case 1:d.roamStop();
break;
case 2:return d._afterSoundArr(e),!1;
case 3:return d._endSoundArr(e),!1}if(d._margeSoundArr(h,g,c),d._syncSoundId(),d._changeSoundArr(!1),d._firstLoad){if(d._initLoad=!1,d._firstLoad=!1,d.get("lastPlayToggle")){var l=d.get("lastPlayId"),m=d._getIndexForId(l);
if(m>-1)return d._setTrack(m,!0),d._firstLoad=!1,!1}d._setTrack(0,!0),d.fire("EVENT_PlayerDataInit")}else(1==c||1==g)&&(a.log(["atPlay 1",f]),d.playForId(f.song_id))},_afterSoundArr:function(b){var c=this;
if(0==c._soundIdArr.length)return!0;
if(0==b.length)return!1;
for(var d=c.get("roamSongId")||c.get("songId"),e=a.clone(b),f=[],g=0,h=b.length;
h>g;
g++){var i=b[g],j=i.song_id;
d==j?Array.remove(e,g):a.indexOf(j,c._soundIdArr)>-1&&(c._deleteTrackForId(j),f.push(j))}if(0==e.length)return!1;
var k=!1;
"roam"==c.get("status")&&(k=!0,c.fire("thenComplete",{mergeArr:e,removeID:f,startSid:d}));
var l=c._getIndexForId(d),m=c._soundArr.slice(0,l+1),n=c._soundArr.slice(l+1);
Array.prototype.push.apply(m,e),Array.prototype.push.apply(m,n),c._soundArr=m,c._syncSoundId(),c._changeSoundArr(k);
var o=c._getIndexForId(d);
c.set("index",o,{silent:!0})},_endSoundArr:function(b){var c=this;
if(0==c._soundIdArr.length)return!0;
if(0==b.length)return!1;
for(var d=c.get("roamSongId")||c.get("songId"),e=a.clone(b),f=[],g=0,h=b.length;
h>g;
g++){var i=b[g],j=i.song_id;
d==j?Array.remove(e,g):a.indexOf(j,c._soundIdArr)>-1&&(c._deleteTrackForId(j),f.push(j))}if(0==e.length)return!1;
var k=!1;
"roam"==c.get("status")&&(k=!0,c.fire("endComplete",{mergeArr:e,removeID:f,startSid:d}));
var l=c._getIndexForId(d),m=c._soundArr.slice(0,l+1),n=c._soundArr.slice(l+1);
Array.prototype.push.apply(m,e),Array.prototype.push.apply(m,n),c._soundArr=m,c._syncSoundId(),c._changeSoundArr(k);
var o=c._getIndexForId(d);
c.set("index",o,{silent:!0})},_onSetIndex:function(b){var c=this;
a.log(["_onSetIndex",b]),c._setTrack(b,!0)},_filterLoadArr:function(b){for(var c=this,d=[],e=(a.clone(c._soundIdArr),0),f=b.length;
f>e;
e++){var g=b[e];
c._tracksObj[g.song_id]=g;
var h=a.indexOf(g.song_id,c._soundIdArr);
-1==h&&d.push(g)}return d},_changeSoundArr:function(b){var c=this;
a.log(["_changeSoundArr",c._soundIdArr.length,c._soundArr.length]),c.set("soundArr",c._soundArr,{silent:b,force:!0})},_margeSoundArr:function(b,c,d){var e=this;
switch(a.log("insertType, "+d+", "+c),c){case 1:Array.prototype.push.apply(b,e._soundArr),e._soundArr=b;
break;
case 2:var f=e.get("index"),g=e._soundArr.slice(0,f+1),h=e._soundArr.slice(f+1);
Array.prototype.push.apply(g,b),Array.prototype.push.apply(g,h),e._soundArr=g;
break;
case 3:Array.prototype.push.apply(e._soundArr,b)}},_syncSoundId:function(){var b=this;
b._soundIdArr=[];
for(var c=0,d=b._soundArr.length;
d>c;
c++)b._soundIdArr.push(b._soundArr[c].song_id);
var e=a.clone(b._soundIdArr);
Array.shuffle(e),b._randomIdArr=e,b.set("soundIdArr",b._soundIdArr),b.set("randomIdArr",b._randomIdArr),a.log(["_syncSoundId",b._firstLoad]),b._savePlaylist()},_clearPlaylist:function(){new g({type:"get",url:h.SAVE_PLAYLIST,data:{ids:0,_xiamitoken:h.getToken()},success:function(b){a.log(b)}})},_savePlaylist:function(){var b=this,c=b._soundIdArr.length>0?b._soundIdArr.join(","):"0";
a.log(["_savePlaylist",b._firstLoad]),b._initLoad||new g({type:"get",url:h.SAVE_PLAYLIST,data:{ids:c,_xiamitoken:h.getToken()},success:function(b){a.log(b)}})},setMode:function(a){var b=this;
b.set("mode",a)},changeMode:function(){var a=this,b=a.get("mode");
return b+=1,b%=3,a.set("mode",b),b},changeTrackFav:function(b,c,d){var e=this;
if("roam"==d){for(var f,g=e.get("roamArr"),h=0,i=g.length;
i>h;
h++){var j=g[h];
if(b==j.song_id){f=j;
break}}f.favFlag=!!c,f.grade=c?0:-1}else{var f=e._tracksObj[b];
f&&(f.favFlag=!!c,f.grade=c?0:-1)}a.log(["player-data.changeTrackFav",f])},playForId:function(a){var b=this;
if(a==b.get("songId"))return!1;
b.set("status","play");
var c=b._getIndexForId(a);
b.set("index",c,{force:!0})},inSound:function(b){var c=this,d=a.inArray(b,c._soundIdArr);
return d&&c.playForId(b),d},prev:function(){var a=this;
if(!a._hasData)return!1;
if("roam"==a.get("status")||"room"==a.get("status"))return!1;
var b=a._getPrevIndex();
a.set("index",b,{force:!0})},next:function(a){var b=this;
if(!b._hasData)return!1;
if("room"==b.get("status"))return!1;
if("roam"==b.get("status"))b.playthisRoam();
else{var c=b._getNextIndex(a);
b.set("index",c,{force:!0})}},removeTrackForId:function(a,b){var c=this;
return 0==c._soundIdArr.length?!1:(a==c.get("songId")&&c.next(!0),a==c.get("roamSongId")&&c.roamExit(),c._deleteTrackForId(a,b),void c._savePlaylist())},removeTrackForIds:function(a){var b=this;
return a.length==b._soundIdArr.length&&b._clearPlaylist(),b._deleteTrackForIds(a),b._savePlaylist(),0==b._soundIdArr.length?!1:void 0},getCurrentIndex:function(){var b,c=this;
return a.log(["getCurrentIndex:",c.get("songId"),c._soundIdArr]),b=a.indexOf(c.get("songId"),c._soundIdArr)},_deleteTrackForId:function(b){var c=this,d=a.indexOf(b,c._soundIdArr),e=a.indexOf(b,c._randomIdArr);
a.log([d,b],"","_deleteTrackForId"),-1!==d&&(Array.remove(c._soundArr,d),Array.remove(c._soundIdArr,d),Array.remove(c._randomIdArr,e),delete c._tracksObj[b])},_deleteTrackForIds:function(b){for(var c=this,d=!1,e=c.get("songId"),f=0,g=b.length;
g>f;
f++){var h=b[f];
h==e&&(d=!0),a.log([e,h,d],"","_deleteTrackForIds"),c._deleteTrackForId(h)}if(c._changeSoundArr(!1),d)c.set("index",0,{force:!0});
else{var h=c.get("songId"),i=c._getIndexForId(h);
c.set("index",i,{silent:!0})}},getDataArrLimit:function(){var b=this;
if("roam"==b.get("status")){var c=b.get("roamArr"),d=b.get("roamIndex"),e=c.slice(d+1),g=c.slice(0,d);
return Array.prototype.push.apply(e,g),f.stringify(e)}var h=b.get("index"),i=b._soundArr.slice(h+1);
if(i.length>20)i=i.slice(0,20);
else{var j=0,k=[];
j=b._soundArr.length>20?20-i.length:h+1,k=b._soundArr.slice(0,j),Array.prototype.push.apply(i,k)}for(var l=a.clone(i),m=[],n=0,o=l.length;
o>n;
n++){var p=b._formatToTrack(l[n]);
delete p.url,delete p.lyric,m[n]=p}return f.stringify(m)},_setTrack:function(a){var b=this;
if(!b._soundArr.length)return b._hasData=!1,b._firstLoad=!0,!1;
var c=b._getNextSid(a),d=b._tracksObj[c],e=b._formatToTrack(d);
b.set("songId",e.songId),b.set("index",a,{silent:!0}),b.set("track",e,{force:!0})},_getNextIndex:function(b){var c=this,d=c.get("mode"),e=c.get("index"),f=c.get("songId");
return a.log(b+","+d+","+e+","+f,"","_getNextIndex"),b||0!==d?(b&&0===d&&(e=a.indexOf(f,c._soundIdArr)),1===d&&(e=a.indexOf(f,c._soundIdArr)),2===d&&(e=a.indexOf(f,c._randomIdArr)),e+=1,e>=c._soundIdArr.length&&(e=0),e):e=a.indexOf(f,c._soundIdArr)},_getPrevIndex:function(){var b=this,c=b.get("mode"),d=b.get("index"),e=b.get("songId");
return a.log(c+","+d+","+e,"","_getPrevIndex"),(1===c||0===c)&&(d=a.indexOf(e,b._soundIdArr)),2===c&&(d=a.indexOf(e,b._randomIdArr)),d-=1,0>d&&(d=b._soundIdArr.length-1),d},_getNextSid:function(b){var c=this,d=c.get("mode"),e=0;
return a.log([d,b]),2===d?e=c._randomIdArr[b]:(a.log(c._soundIdArr),e=c._soundIdArr[b]),e},_getIndexForId:function(b){var c=this,d=c.get("mode"),e=c.get("index"),b=b.toString();
return a.log([d,e,c._soundIdArr,b],"","_getIndexForId"),(1==d||0==d)&&(e=a.indexOf(b,c._soundIdArr)),2==d&&(e=a.indexOf(b,c._randomIdArr)),a.log(e,"","_getIndexForId"),e},checkIndex:function(){var b=this,c=b.get("songId"),d=a.indexOf(c,b._soundIdArr);
return d},roamStop:function(){var b=this;
a.log("roamStop"),b.set("status","play"),b._resetRoam()},roamExit:function(){var a=this;
a._resetRoam();
var b=a.get("index")+1;
b>=a._soundIdArr.length&&(b=0),a.set("status","play"),a.set("index",b,{force:!0})},roamTrackForId:function(a){var b=this;
b.set("roamSongId",a);
var c=[],d=!1,e=a;
new g({url:h.ROAM_SONGS_URL,dataType:"jsonp",data:{song_id:a},success:function(a){if(a.status){if(!a.data||a.data.length
<1)return!1;
c=Array.shuffle(a.data),d=!0,b.set("roamArr",c),b.set("status","roam")}else d=!1},error:function(){d=!1}}),setTimeout(function(){b.fire("roamCallback",{status:d,data:{songId:e,songs:c}})},2e3)},playthisRoam:function(){var a=this,b=a.get("roamIndex"),c=a.get("roamArr");
b+=1,b>=c.length&&(b=0),a.set("roamIndex",b);
var d=c[b];
d=a._formatToTrack(d),a._setTrackForRoam(d)},playRoamForId:function(a,b){var c=this;
c.set("status",b);
for(var d=c.get("roamArr"),e=0,f=0,g=d.length;
g>f;
f++){var h=d[f];
if(a==h.song_id){e=f;
break}}c.set("roamIndex",e);
var i=c.get("roamArr")[e];
i=c._formatToTrack(i),c._setTrackForRoam(i)},getRoamArrLimit:function(){var a=this,b=a.get("roamIndex"),c=a.get("roamArr"),d=c.slice(b);
if(d.length>5)d=d.slice(0,5);
else{var e=0,f=[];
e=c.length>5?5-d.length:b+1,f=c.slice(0,e),Array.prototype.push.apply(d,f)}return d},_onSetRoamArr:function(){var a=this;
a.set("roamIndex",-1)},_resetRoam:function(){var a=this;
a.set("roamSongId",0,{silent:!0}),a.set("roamArr",null,{silent:!0}),a.set("roamIndex",-1,{silent:!0})},_setTrackForRoam:function(a){var b=this;
b.set("songId",a.songId),b.set("track",a,{force:!0})},_onSetStatus:function(a){var b=this;
"roam"!=a&&b._resetRoam()},enterRoom:function(b){var c=this;
return a.isUndefined(b)||!a.isArray(b)?!1:(c.set("status","room"),c.set("roomArr",b),void c.playthisRoom())},exitRoom:function(){var a=this;
if(a._resetRoom(),a.set("status","play"),0==a._soundIdArr.length)return window.SEIYA&&window.SEIYA.addSongs("/song/playlist-default?f=seiya"),!1;
var b=a.get("index")+1;
b>=a._soundIdArr.length&&(b=0),a.set("index",b,{force:!0})},playthisRoom:function(){var a=this,b=a.get("roomIndex"),c=a.get("roomArr");
b+=1,b>=c.length&&(b=0),a.set("roomIndex",b);
var d=c[b];
d=a._formatToTrack(d),a._setTrackForRoam(d)},_resetRoom:function(){var a=this;
a.set("roomArr",[],{silent:!0}),a.set("roomSongId",0,{silent:!0}),a.set("roomIndex",-1,{silent:!0})},_formatToTrack:function(a){var b={};
return b.url=a.location,b.songId=+a.song_id,b.song=a.title,b.artist=a.artist,b.artistId=+a.artist_id,b.album=a.album_name,b.albumId=+a.album_id,b.cover=a.pic.replace("_1.","_2."),b.grade=+a.grade,b.favFlag=Number(a.grade)>-1,b.length=+a.length,b.lyric=a.lyric,b.objectId=Number(a.object_id),b.objectName=a.object_name,b.tryhq=Number(a.tryhq),b.rec_note=a.rec_note,b}},k={ATTRS:{roomSongId:{value:0},roomArr:{value:[]},roomIndex:{value:-1},roamSongId:{value:0},roamArr:{value:""},roamIndex:{value:-1},soundIdArr:{value:[]},randomIdArr:{value:[]},soundArr:{value:""},songId:{value:0,setter:function(a){return String(a)}},track:{value:"",setter:function(a){return f.stringify(a)},getter:function(a){return a}},index:{value:0},status:{value:"play"},mode:{value:1},lastPlayId:{value:0},lastPlayToggle:{value:!1}}};
d.exports=e.extend(j,k)}),

KISSY.add("page/mods/xtpl/itemMenu-xtpl",function(a,b,c,d){return function(a){var b,c="",e=this.config,f=this,g=e.utils;
"undefined"!=typeof d&&d.kissy&&(b=d);
var h=g.runBlockCommand,i=g.renderOutput,j=g.getProperty,k=(g.runInlineCommand,g.getPropertyOrRunCommand);
c+="";
var l={},m=[],n=j(f,a,"up",0,1);
m.push(n),l.params=m,l.fn=function(a){var b="";
b+='\r\n
<div id="J_itemMoreMenu" class="mouse-menu item-more-menu item-more-menu-up" style="left:';
var c=j(f,a,"left",0,2);
b+=i(c+30,!0),b+="px;
 top:";
var d=j(f,a,"top",0,2);
return b+=i(d-16,!0),b+='px;
">\r\n'},l.inverse=function(a){var b="";
b+='\r\n
<div id="J_itemMoreMenu" class="mouse-menu item-more-menu item-more-menu-down" style="left:';
var c=j(f,a,"left",0,4);
b+=i(c+30,!0),b+="px;
 top:";
var d=j(f,a,"top",0,4);
return b+=i(d-166,!0),b+='px;
">\r\n'},c+=h(f,a,l,"if",1),c+='\r\n	
<ul>\r\n		
<li>
<a href="javascript:void(0)" onclick="SEIYA.play(';
var o=k(f,a,{},"id",0,7);
c+=i(o,!0),c+=')">
<i class="icon-playnow">
</i>\u7acb\u5373\u64ad\u653e
</a>
</li>\r\n		
<li>
<a href="javascript:void(0)" onclick="SEIYA.download(';
var p=k(f,a,{},"id",0,8);
c+=i(p,!0),c+=",'";
var q=k(f,a,{},"note",0,8);
c+=i(q,!0),c+='\')">
<i class="icon-download">
</i>\u4e0b\u8f7d
</a>
</li>\r\n		
<li>
<a href="javascript:void(0)" onclick="SEIYA.collect(';
var r=k(f,a,{},"id",0,9);
c+=i(r,!0),c+=",'";
var s=k(f,a,{},"note",0,9);
c+=i(s,!0),c+='\')">
<i class="icon-collect">
</i>\u6dfb\u52a0\u5230\u7cbe\u9009\u96c6
</a>
</li>\r\n		
<li>
<a href="javascript:void(0)" onclick="SEIYA.recommend(';
var t=k(f,a,{},"id",0,10);
c+=i(t,!0),c+=",32,'";
var u=k(f,a,{},"note",0,10);
c+=i(u,!0),c+='\')">
<i class="icon-tshare">
</i>\u5206\u4eab
</a>
</li>\r\n		
<li>
<a href="javascript:void(0)" onclick="SEIYA.sendMobile(';
var v=k(f,a,{},"id",0,11);
c+=i(v,!0),c+=", '";
var w=k(f,a,{},"note",0,11);
c+=i(w,!0),c+='\')">
<i class="icon-mobile">
</i>\u53d1\u9001\u5230\u624b\u673a
</a>
</li>\r\n		
<li>
<a href="javascript:void(0)" onclick="SEIYA.makeBoboWidget(';
var x=k(f,a,{},"id",0,12);
c+=i(x,!0),c+=",'";
var y=k(f,a,{},"note",0,12);
return c+=i(y,!0),c+='\')">
<i class="icon-bobo">
</i>\u751f\u6210\u867e\u7c73\u64ad\u64ad
</a>
</li>\r\n	
</ul>\r\n	
<span class="arrow">
</span>\r\n
</div>'}}),

KISSY.add("page/mods/xtpl/otherMenu-xtpl",function(a,b,c,d){return function(a){var b,c="",e=this.config,f=this,g=e.utils;
"undefined"!=typeof d&&d.kissy&&(b=d);
var h=g.runBlockCommand,i=g.renderOutput,j=g.getProperty,k=(g.runInlineCommand,g.getPropertyOrRunCommand);
c+="";
var l={},m=[],n=j(f,a,"up",0,1);
m.push(n),l.params=m,l.fn=function(a){var b="";
b+='\r\n
<div id="J_itemMoreMenu" class="mouse-menu item-more-menu item-more-menu-up" style="left:';
var c=j(f,a,"left",0,2);
b+=i(c+30,!0),b+="px;
 top:";
var d=j(f,a,"top",0,2);
return b+=i(d-16,!0),b+='px;
">\r\n'},l.inverse=function(a){var b="";
b+='\r\n
<div id="J_itemMoreMenu" class="mouse-menu item-more-menu item-more-menu-down" style="left:';
var c=j(f,a,"left",0,4);
b+=i(c+30,!0),b+="px;
 top:";
var d=j(f,a,"top",0,4);
return b+=i(d-166,!0),b+='px;
">\r\n'},c+=h(f,a,l,"if",1),c+='\r\n	
<ul>\r\n		
<li>
<a href="javascript:void(0)" onclick="SEIYA.thenplay(';
var o=k(f,a,{},"id",0,7);
c+=i(o,!0),c+=')">
<i class="icon-thenplay">
</i>\u63a5\u7740\u64ad\u653e
</a>
</li>\r\n		
<li>
<a href="javascript:void(0)" onclick="SEIYA.download(';
var p=k(f,a,{},"id",0,8);
c+=i(p,!0),c+=')">
<i class="icon-download">
</i>\u4e0b\u8f7d
</a>
</li>\r\n		
<li>
<a href="javascript:void(0)" onclick="SEIYA.collect(';
var q=k(f,a,{},"id",0,9);
c+=i(q,!0),c+=')">
<i class="icon-collect">
</i>\u6dfb\u52a0\u5230\u7cbe\u9009\u96c6
</a>
</li>\r\n		
<li>
<a href="javascript:void(0)" onclick="SEIYA.recommend(';
var r=k(f,a,{},"id",0,10);
c+=i(r,!0),c+=', 32)">
<i class="icon-tshare">
</i>\u5206\u4eab
</a>
</li>\r\n		
<li>
<a href="javascript:void(0)" onclick="SEIYA.sendMobile(';
var s=k(f,a,{},"id",0,11);
c+=i(s,!0),c+=')">
<i class="icon-mobile">
</i>\u53d1\u9001\u5230\u624b\u673a
</a>
</li>\r\n		
<li>
<a href="javascript:void(0)" onclick="SEIYA.makeBoboWidget(';
var t=k(f,a,{},"id",0,12);
return c+=i(t,!0),c+=')">
<i class="icon-bobo">
</i>\u751f\u6210\u867e\u7c73\u64ad\u64ad
</a>
</li>\r\n	
</ul>\r\n	
<span class="arrow">
</span>\r\n
</div>'}}),

KISSY.add("page/mods/xtpl/pageItem-xtpl",function(a,b,c,d){return function(a){var b,c="",e=this.config,f=this,g=e.utils;
"undefined"!=typeof d&&d.kissy&&(b=d);
var h=g.runBlockCommand,i=g.renderOutput,j=g.getProperty,k=(g.runInlineCommand,g.getPropertyOrRunCommand);
c+="";
var l={},m=[],n=j(f,a,"type",0,1);
return m.push("track"===n),l.params=m,l.fn=function(a){var b="";
b+='\r\n
<div id="J_pageMoreMenu" class="mouse-menu page-more-menu" style="left:';
var c=j(f,a,"left",0,2);
b+=i(c+86,!0),b+='px;
">\r\n	
<ul>\r\n		
<li>
<a href="javascript:void(0)" onclick="SEIYA.downloadsongs(\'';
var d=k(f,a,{},"type",0,4);
b+=i(d,!0),b+='\')">
<i class="icon-download">
</i>\u4e0b\u8f7d
</a>
</li>\r\n		
<li>
<a href="javascript:void(0)" onclick="SEIYA.makeMultiWidget(\'';
var e=k(f,a,{},"type",0,5);
return b+=i(e,!0),b+='\')">
<i class="icon-bobo">
</i>\u751f\u6210\u867e\u7c73\u64ad\u64ad
</a>
</li>\r\n	
</ul>\r\n	
<span class="arrow">
</span>\r\n
</div>\r\n'},l.inverse=function(a){var b="";
b+='\r\n
<div id="J_pageMoreMenu" class="mouse-menu page-more-menu" style="left:';
var c=j(f,a,"left",0,10);
b+=i(c+86,!0),b+='px;
">\r\n	
<ul>\r\n		
<li>
<a href="javascript:void(0)" onclick="SEIYA.thenplayIds(\'';
var d=k(f,a,{},"type",0,12);
b+=i(d,!0),b+='\')">
<i class="icon-thenplay">
</i>\u63a5\u7740\u64ad\u653e
</a>
</li>\r\n		
<li>
<a href="javascript:void(0)" onclick="SEIYA.downloadsongs(\'';
var e=k(f,a,{},"type",0,13);
b+=i(e,!0),b+='\')">
<i class="icon-download">
</i>\u4e0b\u8f7d
</a>
</li>\r\n		
<li>
<a href="javascript:void(0)" onclick="SEIYA.makeMultiWidget(\'';
var g=k(f,a,{},"type",0,14);
return b+=i(g,!0),b+='\')">
<i class="icon-bobo">
</i>\u751f\u6210\u867e\u7c73\u64ad\u64ad
</a>
</li>\r\n	
</ul>\r\n	
<span class="arrow">
</span>\r\n
</div>\r\n'},c+=h(f,a,l,"if",1),c+="\r\n"}}),


KISSY.add("page/mods/xtpl/trackMenu-xtpl",function(a,b,c,d){return function(a){var b,c="",e=this.config,f=this,g=e.utils;
"undefined"!=typeof d&&d.kissy&&(b=d);
var h=(g.runBlockCommand,g.renderOutput),i=(g.getProperty,g.runInlineCommand,g.getPropertyOrRunCommand);
c+='
<div id="J_trackMoreMenu" class="mouse-menu track-more-menu" style="left:';
var j=i(f,a,{},"left",0,1);
c+=h(j,!0),c+='px;
">\r\n	
<ul>\r\n		
<li>
<a id="J_trackDown" href="javascript:void(0)" onclick="SEIYA.download(';
var k=i(f,a,{},"id",0,3);
c+=h(k,!0),c+=')">
<i class="icon-download">
</i>\u4e0b\u8f7d
</a>
</li>\r\n		
<li>
<a id="J_trackCollect" href="javascript:void(0)" onclick="SEIYA.collect(';
var l=i(f,a,{},"id",0,4);
c+=h(l,!0),c+=')">
<i class="icon-collect">
</i>\u6dfb\u52a0\u5230\u7cbe\u9009\u96c6
</a>
</li>\r\n		
<li>
<a id="J_trackMobile" href="javascript:void(0)" onclick="SEIYA.sendMobile(';
var m=i(f,a,{},"id",0,5);
return c+=h(m,!0),c+=')">
<i class="icon-mobile">
</i>\u53d1\u9001\u5230\u624b\u673a
</a>
</li>\r\n	
</ul>\r\n	
<span class="arrow">
</span>\r\n
</div>'}}),


KISSY.add("page/mods/xtpl/roamMenu-xtpl",function(a,b,c,d){return function(a){var b,c="",e=this.config,f=this,g=e.utils;
"undefined"!=typeof d&&d.kissy&&(b=d);
var h=g.runBlockCommand,i=g.renderOutput,j=g.getProperty,k=(g.runInlineCommand,g.getPropertyOrRunCommand);
c+="";
var l={},m=[],n=j(f,a,"up",0,1);
m.push(n),l.params=m,l.fn=function(a){var b="";
b+='\r\n
<div id="J_itemMoreMenu" class="mouse-menu item-more-menu item-more-menu-up" style="left:';
var c=j(f,a,"left",0,2);
b+=i(c+30,!0),b+="px;
 top:";
var d=j(f,a,"top",0,2);
return b+=i(d-16,!0),b+='px;
">\r\n'},l.inverse=function(a){var b="";
b+='\r\n
<div id="J_itemMoreMenu" class="mouse-menu item-more-menu item-more-menu-down" style="left:';
var c=j(f,a,"left",0,4);
b+=i(c+30,!0),b+="px;
 top:";
var d=j(f,a,"top",0,4);
return b+=i(d-136,!0),b+='px;
">\r\n'},c+=h(f,a,l,"if",1),c+='\r\n	
<ul>\r\n		
<li>
<a href="javascript:void(0)" onclick="SEIYA.download(';
var o=k(f,a,{},"id",0,7);
c+=i(o,!0),c+=')">
<i class="icon-download">
</i>\u4e0b\u8f7d
</a>
</li>\r\n		
<li>
<a href="javascript:void(0)" onclick="SEIYA.collect(';
var p=k(f,a,{},"id",0,8);
c+=i(p,!0),c+=')">
<i class="icon-collect">
</i>\u6dfb\u52a0\u5230\u7cbe\u9009\u96c6
</a>
</li>\r\n		
<li>
<a href="javascript:void(0)" onclick="SEIYA.recommend(';
var q=k(f,a,{},"id",0,9);
c+=i(q,!0),c+=', 32)">
<i class="icon-tshare">
</i>\u5206\u4eab
</a>
</li>\r\n		
<li>
<a href="javascript:void(0)" onclick="SEIYA.sendMobile(';
var r=k(f,a,{},"id",0,10);
c+=i(r,!0),c+=')">
<i class="icon-mobile">
</i>\u53d1\u9001\u5230\u624b\u673a
</a>
</li>\r\n		
<li>
<a href="javascript:void(0)" onclick="SEIYA.makeBoboWidget(';
var s=k(f,a,{},"id",0,11);
return c+=i(s,!0),c+=')">
<i class="icon-bobo">
</i>\u751f\u6210\u867e\u7c73\u64ad\u64ad
</a>
</li>\r\n	
</ul>\r\n	
<span class="arrow">
</span>\r\n
</div>'}}),


KISSY.add("page/mods/player/player-menu",["node","base","event","xtemplate","../xtpl/itemMenu-xtpl","../xtpl/otherMenu-xtpl","../xtpl/pageItem-xtpl","../xtpl/trackMenu-xtpl","../xtpl/roamMenu-xtpl"],function(a,b,c,d){var e=b("node"),f=b("base"),g=b("event"),h=b("xtemplate"),i=b("../xtpl/itemMenu-xtpl"),j=b("../xtpl/otherMenu-xtpl"),k=b("../xtpl/pageItem-xtpl"),l=b("../xtpl/trackMenu-xtpl"),m=b("../xtpl/roamMenu-xtpl"),n=e.all,o={initializer:function(){var a=this;
g.delegate(document,"click mousewheel","body",function(){a.hideMenu()}),g.on(window,"resize",function(){a.hideMenu()}),a.on("afterRowChange",function(a){a.newVal&&a.newVal.addClass("ui-track-select"),a.prevVal&&a.prevVal.removeClass("ui-track-select")})},showPanelMenu:function(a,b){if(0==b)return!1;
if(e.one("#J_trackMoreMenu"))return e.one("#J_trackMoreMenu").remove(),!1;
var c=this,d=new h(l);
c.hideMenu(),menuHtml=d.render({id:b,left:a.offset().left+30}),n("body").append(menuHtml)},showBatchMenu:function(a){var b=this,c=a,d=a.attr("data-type"),e=new h(k),f=c.offset(),g={left:f.left,top:f.top,type:d};
if(b.get("toogle"))var i=!0;
if(b.hideMenu(),i)return!1;
var j=e.render(g);
n("body").append(j),b.set("toogle",!0)},showTrackMenu:function(a,b,c,d){var e=this;
if(0==b)return!1;
var f=e.get("open"),g=e.get("sid"),k=e.get("type");
if(f&&b==g&&c==k)return e.hideMenu(),!1;
e.set("open",!0),e.set("sid",b),e.set("type",c);
var l,o=a.parent(".ui-track-item");
switch(o.hasClass("ui-track-select")||e.set("row",o),c){case"track":l=new h(i);
break;
case"roam":l=new h(m);
break;
default:l=new h(j)}var p=a.offset().left,q=a.offset().top,r=!0;
q>n("body").height()/2&&(r=!1);
var s={id:b,left:p,top:q,up:r,note:d};
menuHtml=l.render(s),e._hideOtherMenu(),n("body").append(menuHtml)},hideMenu:function(){var a=this;
a.set("toogle",!1);
var b=n(".mouse-menu");
b&&b.remove(),a.get("row")&&a.get("row").removeClass("ui-track-select"),a.set("open",!1)
},_hideOtherMenu:function(){var a=this;
a.set("toogle",!1);
var b=n(".mouse-menu");
b&&b.remove()}},p={ATTRS:{sid:{value:0},type:{value:""},open:{value:!1},row:{value:""},toogle:{value:!1}}};
d.exports=f.extend(o,p)}),

KISSY.add("page/mods/xtpl/roamList-xtpl",function(a,b,c,d){return function(a){var b,c="",e=this.config,f=this,g=e.utils;
"undefined"!=typeof d&&d.kissy&&(b=d);
var h=g.runBlockCommand,i=g.renderOutput,j=g.getProperty,k=(g.runInlineCommand,g.getPropertyOrRunCommand);
c+='
<div class="ui-roam-body" id="J_roamBody" style="height:0;
">\r\n	
<div class="ui-roam-title">\r\n		
<span>\u6b63\u5728\u6f2b\u6e38...
</span>\r\n		
<div class="ui-roam-close">
<a data-event="close">\u5173\u95ed\u6f2b\u6e38
</a>
</div>\r\n	
</div>\r\n	
<div class="ui-roam-main" id="J_roamMain">\r\n		';
var l={};
return l.fn=function(a){var b="";
b+='\r\n		
<div class="ui-roam-item" ondblclick="SEIYAEVENT.roamDblclick(this, ';
var c=k(f,a,{},"song_id",0,8);
b+=i(c,!0),b+=')" id="J_roamItem';
var d=k(f,a,{},"song_id",0,8);
b+=i(d,!0),b+='">\r\n			
<div class="ui-roam-sort">
<em data-type="roam" data-sid="';
var e=k(f,a,{},"song_id",0,9);
b+=i(e,!0),b+='">
</em>
</div>\r\n			
<div class="ui-roam-item-column c1">';
var g=k(f,a,{},"title",0,10);
b+=i(g,!1),b+='
</div>\r\n			
<div class="ui-roam-item-column c2">
<a href="http://www.xiami.com/artist/';
var l=k(f,a,{},"artist_id",0,11);
b+=i(l,!0),b+='" target="_blank" title="';
var m=k(f,a,{},"artist",0,11);
b+=i(m,!1),b+='">';
var n=k(f,a,{},"artist",0,11);
b+=i(n,!1),b+='
</a>
</div>\r\n			
<div class="ui-roam-item-column c3">
<a href="http://www.xiami.com/album/';
var o=k(f,a,{},"album_id",0,12);
b+=i(o,!0),b+='" target="_blank" title="';
var p=k(f,a,{},"album_name",0,12);
b+=i(p,!1),b+='">';
var q=k(f,a,{},"album_name",0,12);
b+=i(q,!1),b+='
</a>
</div>\r\n			
<div class="ui-roam-control">\r\n				';
var r={},s=[],t=j(f,a,"grade",0,14);
s.push(1*t===-1),r.params=s,r.fn=function(a){var b="";
b+='\r\n				
<a class="fav-btn icon-roam-fav" data-type="roam" data-sid="';
var c=k(f,a,{},"song_id",0,15);
return b+=i(c,!0),b+='" data-event="fav" title="\u6536\u85cf">
</a>\r\n				'},r.inverse=function(a){var b="";
b+='\r\n				
<a class="fav-btn icon-roam-faved" data-type="roam" data-sid="';
var c=k(f,a,{},"song_id",0,17);
return b+=i(c,!0),b+='" data-event="fav" title="\u53d6\u6d88\u6536\u85cf">
</a>\r\n				'},b+=h(f,a,r,"if",14),b+='\r\n				
<a class="more-btn icon-roam-more" data-type="roam" data-sid="';
var u=k(f,a,{},"song_id",0,19);
return b+=i(u,!0),b+='" data-event="more" title="\u66f4\u591a"></a>\r\n			</div>\r\n		</div>\r\n		'},c+=h(f,a,l,"songs",7),c+="\r\n	
</div>\r\n</div>"}}),


KISSY.add("page/mods/xtpl/roamItem-xtpl",function(a,b,c,d){return function(a){var b,c="",e=this.config,f=this,g=e.utils;
"undefined"!=typeof d&&d.kissy&&(b=d);
var h=g.runBlockCommand,i=g.renderOutput,j=g.getProperty,k=(g.runInlineCommand,g.getPropertyOrRunCommand);
c+="";
var l={};
return l.fn=function(a){var b="";
b+='\r\n
<div class="ui-roam-item" ondblclick="SEIYAEVENT.roamDblclick(this, ';
var c=k(f,a,{},"song_id",0,2);
b+=i(c,!0),b+=')" id="J_roamItem';
var d=k(f,a,{},"song_id",0,2);
b+=i(d,!0),b+='">\r\n	
<div class="ui-roam-sort">
<em data-type="roam" data-sid="';
var e=k(f,a,{},"song_id",0,3);
b+=i(e,!0),b+='">
</em>
</div>\r\n	
<div class="ui-roam-item-column c1">';
var g=k(f,a,{},"title",0,4);
b+=i(g,!1),b+='
</div>\r\n	
<div class="ui-roam-item-column c2">
<a href="http://www.xiami.com/artist/';
var l=k(f,a,{},"artist_id",0,5);
b+=i(l,!0),b+='" target="_blank" title="';
var m=k(f,a,{},"artist",0,5);
b+=i(m,!1),b+='">';
var n=k(f,a,{},"artist",0,5);
b+=i(n,!1),b+='
</a>
</div>\r\n	
<div class="ui-roam-item-column c3">
<a href="http://www.xiami.com/album/';
var o=k(f,a,{},"album_id",0,6);
b+=i(o,!0),b+='" target="_blank" title="';
var p=k(f,a,{},"album_name",0,6);
b+=i(p,!1),b+='">';
var q=k(f,a,{},"album_name",0,6);
b+=i(q,!1),b+='
</a>
</div>\r\n	
<div class="ui-roam-control">\r\n		';
var r={},s=[],t=j(f,a,"grade",0,8);
s.push(1*t===-1),r.params=s,r.fn=function(a){var b="";
b+='\r\n		
<a class="fav-btn icon-roam-fav" data-type="roam" data-sid="';
var c=k(f,a,{},"song_id",0,9);
return b+=i(c,!0),b+='" data-event="fav" title="\u6536\u85cf">
</a>\r\n		'},r.inverse=function(a){var b="";
b+='\r\n		
<a class="fav-btn icon-roam-faved" data-type="roam" data-sid="';
var c=k(f,a,{},"song_id",0,11);
return b+=i(c,!0),b+='" data-event="fav" title="\u53d6\u6d88\u6536\u85cf">
</a>\r\n		'},b+=h(f,a,r,"if",8),b+='\r\n		
<a class="more-btn icon-roam-more" data-type="roam" data-sid="';
var u=k(f,a,{},"song_id",0,13);
return b+=i(u,!0),b+='" data-event="more" title="\u66f4\u591a">
</a>\r\n	
</div>\r\n
</div>\r\n'},c+=h(f,a,l,"songs",1)}}),

KISSY.add("page/mods/player/player-roam",["node","base","anim","xtemplate","event","../xtpl/roamList-xtpl","../xtpl/roamItem-xtpl"],function(a,b,c,d){var e=b("node").all,f=b("base"),g=b("anim"),h=b("xtemplate"),i=(b("event"),b("../xtpl/roamList-xtpl")),j=b("../xtpl/roamItem-xtpl"),k={initializer:function(){var a=this;
a.TPL_roamList=new h(i),a.TPL_roamItem=new h(j),a.countStep=0,a.animObj=null},render:function(a,b){var c=this;
if(0==b.length||b.length
<10)return!1;
c.set("songId",a),c.set("songs",b);
var d=e("#J_roamWrap"+a),f={sid:a,songs:b.slice(0,5)},h=c.TPL_roamList.render(f);
d.one(".ui-roam-head").hide(),e("#J_roamWrap"+a).append(h),new g(d.one(".ui-roam-body"),{height:"245px"},.5,"linear",function(){e("#J_trackList"+a).removeClass("ui-track-current").addClass("ui-track-roaming"),c.fire("renderComplete")}).run()},add:function(a,b){var c=this,d=c.TPL_roamItem.render({songs:a});
e("#J_roamMain").append(d),c.countStep+=b,c.remove()},change:function(a){var b=this,c=b.TPL_roamItem.render({songs:a});
e("#J_roamMain").html(c)},remove:function(){var a=this,b=e("#J_roamMain").first(".ui-roam-item");
return b?a.animObj&&a.animObj.isRunning()?!1:(b.css("margin-top","0px"),a.animObj=new g(b,{"margin-top":"-41px"},{easing:"linear ",duration:1.5,queue:!0,useTransition:!0,complete:function(){a.countStep-=1,b.remove(),a.countStep>0&&a.remove()}}),void(a.animObj&&a.animObj.run())):!1},before:function(a){e("#J_trackList"+a).one(".ui-roam-head").html("
<p>\u6b63\u5728\u5bfb\u627e\u76f8\u4f3c\u6b4c\u66f2...
</p>"),e("#J_trackList"+a).one(".ui-track-sort").addClass(".ui-track-sort-roam")},after:function(a){e("#J_trackList"+a).one(".ui-roam-head").html("
<p>\u554a\u54e6\uff0c\u6ca1\u6709\u627e\u5230\u76f8\u4f3c\u6b4c\u66f2\u3002
</p>"),e("#J_trackList"+a).one(".ui-track-sort").removeClass(".ui-track-sort-roam")}},l={ATTRS:{songId:{value:0},songs:{value:null}}};
d.exports=f.extend(k,l)}),

KISSY.add("page/mods/player/player-log",["io"],function(a,b){var c=b("io"),d="http://www.xiami.com/recommend/log",e={send:function(b,e,f,g,h,i,j){if(!a.isUndefined(b)){var j=j||"web";
new c({type:"get",url:d,data:{rec_note:b,op:e,terminal:j,playlen:f,object_name:g,objectid:h,userid:i}})}}};
return e}),

KISSY.add("page/mods/xtpl/trackInfo-xtpl",function(a,b,c,d){return function(a){var b,c="",e=this.config,f=this,g=e.utils;
"undefined"!=typeof d&&d.kissy&&(b=d);
var h=g.runBlockCommand,i=g.renderOutput,j=(g.getProperty,g.runInlineCommand,g.getPropertyOrRunCommand);
c+="";
var k={};
return k.fn=function(a){var b="";
b+='\r\n
<a id="J_trackName" href="http://www.xiami.com/song/';
var c=j(f,a,{},"songId",0,2);
b+=i(c,!0),b+='" title="';
var d=j(f,a,{},"song",0,2);
b+=i(d,!1),b+='" target="_blank">';
var e=j(f,a,{},"song",0,2);
b+=i(e,!1),b+="
</a> - ";
var g=j(f,a,{},"artistfun",0,2);
return b+=i(g,!1),b+="\r\n"},c+=h(f,a,k,"data",1)}}),

KISSY.add("utils/tip/index",["node","base","event","xtemplate"],function(a,b,c,d){function e(a){var b=this;
b.init(a)}var f=b("node"),g=(b("base"),b("event")),h=b("xtemplate"),i=f.all,j='
<div class="{{theme}}" id="{{id}}">
<div class="tip-inner tip-bg-image">{{{content}}}
</div>
<div class="tip-arrow tip-arrow-bottom" style="visibility: inherit;
">
</div>
</div>';
e.prototype={init:function(b){var c=this;
c.timer=null;
var d=c.option=a.merge({},{content:"hello world",target:"",className:"tip-twitter",alignX:"center",alignY:"center",offsetX:5,offsetY:5,maxWidth:"auto",duration:5e3},b);
if(""==d.target)return!1;
var e=new h(j),f=e.render({theme:d.className,content:d.content,id:d.target.substr(1)+"-tip"});
c.target=i(d.target),c.tipDiv=i(f)},show:function(){var a=this,b=a.option;
i(b.target+"-tip").remove();
var c=a.target.offset(),d=a.target.width();
a.tipDiv.css({position:"absolute",left:-999,top:-999}).appendTo("body");
var e=a.tipDiv.outerWidth(),f=a.tipDiv.outerHeight();
a.tipDiv.css({left:c.left-e/2+d/2,top:c.top-f-10,"max-width":b.maxWidth}),a.timer=setTimeout(function(){a.destroy()},b.duration),a._addEvent()},destroy:function(){var a=this;
a.timer&&clearTimeout(a.timer),a.tipDiv.fadeOut()},_addEvent:function(){var a=this;
g.on(a.tipDiv,"mouseenter",function(){a.timer&&clearTimeout(a.timer)}),g.on(a.tipDiv,"mouseleave",function(){a.timer=setTimeout(function(){a.destroy()},a.option.duration)}),g.on(window,"resize",function(){var b=a.target.offset(),c=a.target.width(),d=a.tipDiv.outerWidth(),e=a.tipDiv.outerHeight();
a.tipDiv.css({left:b.left-d/2+c/2,top:b.top-e-10})})}},d.exports=e}),


KISSY.add("page/mods/player",["node","base","json","event","xtemplate","./player/player-swf","./player/player-lrc","./player/player-lister","./player/player-volume","./player/player-panel","./player/player-control","./player/player-tracks","./player/player-blur","./player/player-data","./player/player-menu","./player/player-roam","./player/player-log","./xtpl/trackInfo-xtpl","widget/tool/index","utils/tip/index"],function(a,b,c,d){function e(){}var f=b("node"),g=(b("base"),b("json")),h=b("event"),i=b("xtemplate"),j=b("./player/player-swf"),k=b("./player/player-lrc"),l=b("./player/player-lister"),m=b("./player/player-volume"),n=b("./player/player-panel"),o=b("./player/player-control"),p=b("./player/player-tracks"),q=b("./player/player-blur"),r=b("./player/player-data"),s=b("./player/player-menu"),t=b("./player/player-roam"),u=b("./player/player-log"),v=b("./xtpl/trackInfo-xtpl"),w=(b("widget/tool/index"),b("utils/tip/index")),x=f.all,y='{{#if cover}}
<a href="{{^if albumId===0}}http://www.xiami.com/album/{{albumId}}{{else}}http://www.xiami.com/artist/{{artistId}}{{/if}}" target="_blank" title="{{album}}-{{artist}}">
<img src="{{cover}}?v=sya" alt="{{album}}-{{artist}}">
</a>{{else}}
<img src="http://gtms01.alicdn.com/tps/i1/T1THUfFc8jXXaC1Jrl-250-250.png" width="250" height="250" />{{/if}}',z=new i(y);
e.prototype={init:function(a){var b=this;
b.tpl_trackInfo=new i(v),b.Play_btn=x("#J_playBtn"),b.Prev_btn=x("#J_prevBtn"),b.Next_btn=x("#J_nextBtn"),b.High_btn=x("#J_playerHQ"),b.Mode_btn=x("#J_playerMode"),b.Fav_btn=x("#J_trackFav"),b.More_btn=x("#J_trackMore"),b.Share_btn=x("#J_trackShare"),b.Track_info=x("#J_trackInfo"),b.Cover=x("#J_playerCover"),b.PlayerWrap=x("#J_playerWrap"),b.BODY=x("#middle"),b.High_Timer=null,b.High_Runing=!1,b.isVIP=!1,b.autoplay=!0,b._opLock=null,b.player=new j(a),b._playerMenu(),b._playerRoam(),b._playerBlur(),b._playerTracks(),b._playerVolume(),b._playerControl(),b._playerListen(),b._playerPanel(),b._playerData(),b._playerLrc(),b._addEvent()},sync:function(a){var b=this;
a.status&&(b.isVIP=1==a.data.vip,b.player.sync())},setMusicInfo:function(b){var c=this,d=g.parse(b),e=document.title,f="";
e.indexOf("\u3011")>-1&&(f=e.split("\u3011")[0]+"\u3011"),document.title=f+"\u6b63\u5728\u64ad\u653e:"+a.unEscapeHTML(d.song+"-"+d.artist),c.BODY.addClass("playing");
var h={data:[d],artistfun:function(){var b=a.unEscapeHTML(this.artist),c=b.split(";
"),d=[];
if(1==c.length)return'
<a href="http://www.xiami.com/artist/'+this.artistId+'" target="_blank" title="'+b+'">'+b+"
</a>";
for(var e=0,f=c.length;
f>e;
e++)d.push('
<a href="http://www.xiami.com/search/find/artist/'+c[e]+'" target="_blank" title="'+c[e]+'">'+c[e]+"
</a>");
return d.join(" ;
 ")}},i=c.tpl_trackInfo.render(h);
c.Track_info.html(i),d.cover.indexOf("demo100.png")>-1&&(d.cover="http://img.xiami.net/res/img/default/demo185.png"),c.Cover.html(z.render(d)),c.PlayerBlur.render(d.cover+"?v=sya"),c.Fav_btn.attr("data-sid",d.songId),c.More_btn.attr("data-sid",d.songId),c.Share_btn.attr("data-sid",d.songId),d.grade>-1?(c.Fav_btn.attr("class","icon-faved"),c.Fav_btn.attr("title","\u53d6\u6d88\u6536\u85cf")):(c.Fav_btn.attr("class","icon-fav"),c.Fav_btn.attr("title","\u6536\u85cf"));
var j=c.PlayerData.get("status");
"room"!=c.PlayerData.get("status")&&c.PlayerTracks.highCurrentTrack(d.songId,j);
try{x("#J_trackMoreMenu").remove()}catch(k){throw new Error("#J_trackMoreMenu Not in the Body")}},setModeView:function(a){var b=this;
switch(a){case 1:b.Mode_btn.attr("class","mode-order"),b.Mode_btn.attr("title","\u987a\u5e8f\u64ad\u653e");
break;
case 2:b.Mode_btn.attr("class","mode-random"),b.Mode_btn.attr("title","\u968f\u673a\u64ad\u653e");
break;
case 0:b.Mode_btn.attr("class","mode-only"),b.Mode_btn.attr("title","\u5355\u66f2\u5faa\u73af");
break;
default:b.Mode_btn.attr("class","mode-order"),b.Mode_btn.attr("title","\u987a\u5e8f\u64ad\u653e")}},changeTrackFlag:function(b,c,d){var e;
switch(a.log(["changeTrackFlag",b,c,d]),d){case"roam":e=x("#J_roamItem"+b).one(".fav-btn");
break;
case"myfav":e=x("#J_favList"+b).one(".fav-btn");
break;
case"history":e=x("#J_historyList"+b).one(".fav-btn");
break;
case"collect":e=x("#J_collectList"+b).one(".fav-btn");
break;
default:e=x("#J_trackList"+b).one(".fav-btn")}"roam"==d?c?(e&&e.removeClass("icon-roam-fav").addClass("icon-roam-faved"),e&&e.attr("title","\u53d6\u6d88\u6536\u85cf")):(e&&e.removeClass("icon-roam-faved").addClass("icon-roam-fav"),e&&e.attr("title","\u6536\u85cf")):c?(e&&e.removeClass("icon-track-fav").addClass("icon-track-faved"),e&&e.attr("title","\u53d6\u6d88\u6536\u85cf")):(e&&e.removeClass("icon-track-faved").addClass("icon-track-fav"),e&&e.attr("title","\u6536\u85cf"))},playOrPause:function(){var b=this,c=b.PlayerData.get("track");
if(""===c)return!1;
if("room"==b.PlayerData.get("status"))return!1;
var d=b.player.status();
a.log(["playOrPause: ",d]);
var e=b.Play_btn;
"stop"==d&&(b.player.load(c),b.setMusicInfo(c),e.removeClass("play-btn").addClass("pause-btn"),b.BODY.removeClass("playing")),"play"==d&&(b.player.pause(),e.removeClass("pause-btn").addClass("play-btn"),b.BODY.removeClass("playing")),"pause"==d&&(b.player.play(),e.removeClass("play-btn").addClass("pause-btn"),b.BODY.addClass("playing"))},next:function(){var a=this;
a.autoplay&&a.autoplay&&a.PlayerData.next(!0)},prev:function(){var a=this;
a.PlayerData.prev()},stop:function(){var a=this;
a.BODY.removeClass("playing"),a.Play_btn.removeClass("pause-btn"),a.Play_btn.addClass("play-btn"),a.player.stop()},_addEvent:function(){var b=this;
b.Play_btn.on("click",function(){b.playOrPause()}),b.High_btn.on("click",function(){if(a.log(b.isVIP,"","is vip"),!b.isVIP){var c=new w({target:"#J_playerHQ",content:'\u4eab\u53d7\u9ad8\u54c1\u8d28\u97f3\u4e50\uff0c\u7acb\u5373
<a href="http://www.xiami.com/vip/update" target="_blank">\u5f00\u901aVIP
</a>',maxWidth:"200px"});
return c.show(),!1}if(b.High_Runing)return!1;
if("off"==b.High_btn.attr("data-hq")){b.player.changeHq(!0),b.High_Runing=!0,b.High_btn.attr("class","mode-hq-on1");
var d=1;
b.High_Timer=setInterval(function(){d++,d>25&&(clearInterval(b.High_Timer),b.High_btn.attr("data-hq","on"),b.High_Runing=!1),b.High_btn.attr("class","mode-hq-on"+d)},5)}else{b.player.changeHq(!1),b.High_Runing=!0,b.High_btn.attr("class","mode-hq-off1");
var d=1;
b.High_Timer=setInterval(function(){d++,d>25&&(clearInterval(b.High_Timer),b.High_btn.attr("data-hq","off"),b.High_Runing=!1),b.High_btn.attr("class","mode-hq-off"+d)},5)}}),b.Prev_btn.on("click",function(){b._opLock&&b._opLock.cancel(),b._opLock=a.later(function(){b.prev()},200,!1,null,null)}),b.Next_btn.on("click",function(){b._opLock&&b._opLock.cancel(),b._opLock=a.later(function(){b.next()},200,!1,null,null)}),b.Mode_btn.on("click",function(){return"room"==b.PlayerData.get("status")?!1:(b._opLock&&b._opLock.cancel(),void(b._opLock=a.later(function(){var a=b.PlayerData.changeMode();
b.setModeView(a),setTimeout(function(){b.player.mode(a)},0)},200,!1,null,null)))}),b.Fav_btn.on("click",function(){var a=x(this),c=a.attr("data-sid");
b.PlayerControl.fav(this,c)}),b.More_btn.on("click",function(a){a.halt();
var c=x(this),d=c.attr("data-sid");
b.PlayerMenu.showPanelMenu(c,d)}),b.Share_btn.on("click",function(a){a.halt();
var c=x(this),d=c.attr("data-sid");
b.PlayerControl.share(this,d);
var e=b.PlayerData.get("track"),f=g.parse(e);
if(""!=f.rec_note){var h=__USER__&&__USER__.get("uid")||0,i=b.XIAMIPLAYER.get("position");
u.send(f.rec_note,107,Math.floor(i),f.objectName,f.objectId,h)}}),h.delegate(document,"click","body",function(a){var c=a.target.id,d=0;
switch(c){case"J_trackFav":d=102;
break;
case"J_trackName":d=104;
break;
case"J_nextBtn":d=105;
break;
case"J_prevBtn":d=105;
break;
case"J_trackDown":d=106;
break;
case"J_trackCollect":d=109;
break;
case"J_trackMobile":d=111}if(0!==d){var e=b.PlayerData.get("track"),f=g.parse(e);
if(""!=f.rec_note){var h=__USER__&&__USER__.get("uid")||0,i=b.XIAMIPLAYER.get("position");
u.send(f.rec_note,d,Math.floor(i),f.objectName,f.objectId,h)}}})},_playerRoam:function(){var a=this;
a.PlayerRoam=new t,a.PlayerRoam.on("renderComplete",function(){a.PlayerTracks.syncScrollView(),a.PlayerData.playthisRoam()})},_playerMenu:function(){var a=this;
a.PlayerMenu=new s},_playerBlur:function(){var a=this;
a.PlayerBlur=new q({wrap:"#J_blurBackground"})},_playerVolume:function(){var a=this;
a.PlayerVolume=new m({wrap:"#J_volumeRange",mute:"#J_volumeSpeaker"}),a.PlayerVolume.on("afterVolumeChange",function(b){a.player.volume(b.newVal)})},_playerLrc:function(){var a=this;
a.PlayerLrc=new k({wrap:"#J_playerLrc"})},_playerControl:function(){var a=this;
a.PlayerControl=new o,a.PlayerControl.on("trackFavCallback",function(b){a.PlayerData.changeTrackFav(b.data.songId,b.data.flag,b.targetType),a.changeTrackFlag(b.data.songId,b.data.flag,b.targetType)})},_playerListen:function(){var b=this;
b.XIAMIPLAYER=window.__XIAMIPLAYER__=new l({grogress:"#J_playerProgress",panel:"#J_playerPanel",positionTime:"#J_positionTime",durationTime:"#J_durationTime"}),b.XIAMIPLAYER.on("ready",function(a){var c=g.parse(a.data);
b.PlayerVolume.set("volume",c.volume,{silent:!0}),b.PlayerVolume.volumeUI(c.volume),b.PlayerData.setMode(c.mode),b.setModeView(c.mode),window.__FLASHREADY__=!0,setTimeout(function(){x("#J_loading").fadeOut(.3,function(){x("#J_loading").remove()})},100)}),b.XIAMIPLAYER.on("addSongs",function(c){a.log(c.data);
var d;
try{d=g.parse(c.data)}catch(e){throw new Error("addSongsData, not Json format:"+e)}var f=d.data.trackList.track;
if(a.isUndefined(f))return!1;
if(b.PlayerData.set("lastPlayId",d.lastPlayid),b.PlayerData.set("lastPlayToggle",d.lastPlayToggle),b.PlayerData.setData(f,d.atPlay),b.isVIP=1==d.data.vip,b.isVIP&&1==d.data.hqset&&"off"==b.High_btn.attr("data-hq")){b.High_Runing=!0,b.High_btn.attr("class","mode-hq-on1");
var h=1;
b.High_Timer=setInterval(function(){h++,h>25&&(clearInterval(b.High_Timer),b.High_btn.attr("data-hq","on"),b.High_Runing=!1),b.High_btn.attr("class","mode-hq-on"+h)},5)}if(b.isVIP&&0==d.data.hqset&&"on"==b.High_btn.attr("data-hq")){b.High_Runing=!0,b.High_btn.attr("class","mode-hq-off1");
var h=1;
b.High_Timer=setInterval(function(){h++,h>25&&(clearInterval(b.High_Timer),b.High_btn.attr("data-hq","off"),b.High_Runing=!1),b.High_btn.attr("class","mode-hq-off"+h)},5)}}),b.XIAMIPLAYER.on("soundComplete",function(){a.log("soundComplete"),b.PlayerData.next(!1),window.XiamiPlayer.player_song_end&&window.XiamiPlayer.player_song_end()}),b.XIAMIPLAYER.on("soundOpen",function(){var a=b.PlayerData.get("track"),c=b.PlayerData.getDataArrLimit();
window.XiamiPlayer.player_song_start&&window.XiamiPlayer.player_song_start(a,c)}),b.XIAMIPLAYER.on("playerRuning",function(){a.log("playerRuning");
var c=b.PlayerData.get("track"),d=b.PlayerData.getDataArrLimit();
window.XiamiPlayer.player_runing&&window.XiamiPlayer.player_runing(c,d)}),b.XIAMIPLAYER.on("soundPlaying",function(a){var c=g.parse(a.data);
b.PlayerLrc.syncTime(c.position)}),b.XIAMIPLAYER.on("lyricComplete",function(a){var c=b.PlayerData.get("track"),d=g.parse(c);
b.PlayerLrc.render(d.songId,a.status,a.data)}),b.XIAMIPLAYER.on("soundError",function(c){return a.log(["sounderror",c.data]),c.data>10?(b.stop(),alert("\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5\u662f\u5426\u6b63\u5e38."),!1):void b.next()})},_playerPanel:function(){var b=this;
b.PlayerPanel=new n({grogress:"#J_playerProgress",panel:"#J_playerPanel"}),b.PlayerPanel.on("afterTickDragChange",function(c){a.log("change "+c.attrName+": "+c.prevVal+" --> "+c.newVal),b.XIAMIPLAYER.set("canRender",!c.newVal)}),b.PlayerPanel.on("afterPositionChange",function(c){return a.log("change "+c.attrName+": "+c.prevVal+" --> "+c.newVal),c.newVal>=1?(b.next(),!1):(b.XIAMIPLAYER.changePositionTime(c.newVal),void b.player.position(c.newVal))}),b.PlayerPanel.on("afterDragpositionChange",function(c){a.log("change "+c.attrName+": "+c.prevVal+" --> "+c.newVal),b.XIAMIPLAYER.changePositionTime(c.newVal,!0)})},_playerData:function(){var b=this;
b.PlayerData=new r,b.PlayerData.on("afterSoundArrChange",function(c){a.log(c.newVal.length,"","afterSoundArrChange");
var d=c.newVal;
if(0==d.length)return b.PlayerTracks.reset(),b.stop(),!1;
{var e=b.PlayerData.getCurrentIndex();
b.PlayerData.get("roamSongId")}b.PlayerTracks.addTracks(d,e)}),b.PlayerData.on("afterRoamIndexChange",function(c){a.log(["afterRoamIndexChange",c.prevVal,c.newVal]);
var d=b.PlayerData.getRoamArrLimit(),e=c.newVal-c.prevVal;
0>e&&(e+=20),-1!=c.prevVal&&(d=d.slice(5-e),b.PlayerRoam.add(d,e))}),b.PlayerData.on("afterTrackChange",function(c){a.log("afterTrackChange"),b.player.load(c.newVal),b.setMusicInfo(c.newVal),b.Play_btn.hasClass("play-btn")&&(b.Play_btn.removeClass("play-btn"),b.Play_btn.addClass("pause-btn"))}),b.PlayerData.on("afterStatusChange",function(a){b.PlayerWrap[0].className="player-"+a.newVal,b.PlayerPanel.set("status",a.newVal)}),b.PlayerData.on("roamCallback",function(a){var c=a.data.songId;
return c!=b.PlayerData.get("songId")?!1:void(a.status&&a.data.songs.length>0?b.PlayerRoam.render(a.data.songId,a.data.songs):b.PlayerRoam.after(a.data.songId,a.data.songs))}),b.PlayerData.on("thenComplete",function(a){b.PlayerTracks.add(a.mergeArr,a.removeID,a.startSid)}),b.PlayerData.on("endComplete",function(a){b.PlayerTracks.append(a.mergeArr,a.removeID,a.startSid)})},_playerTracks:function(){var a=this;
a.PlayerTracks=new p}},d.exports=e}),


KISSY.add("page/mods/xtpl/collectItem-xtpl",function(a,b,c,d){return function(){var a,b="",c=this.config,e=c.utils;
"undefined"!=typeof d&&d.kissy&&(a=d);
e.runBlockCommand,e.renderOutput,e.getProperty,e.runInlineCommand,e.getPropertyOrRunCommand;
return b+='<div class="collect-item collect-item-edit" data-id="0">\r\n	<div class="collect-item-con">\r\n		<img src="http://gtms01.alicdn.com/tps/i1/T1c7F7FqXeXXcCXlfb-25-25.png" width="25" height="25">\r\n		<input type="hidden" class="item-old" value="">\r\n		<span class="item-name"></span>\r\n		<input type="text" value="" class="item-input" maxlength="400" title="\u56de\u8f66\u786e\u8ba4" placeholder="\u56de\u8f66\u786e\u8ba4" />\r\n		<a class="edit icon-editCollect"></a>\r\n		<a class="delete icon-deleteCollect"></a>\r\n	</div>\r\n</div>'}}),


KISSY.add("page/mods/xtpl/favTrackItem-xtpl",function(a,b,c,d){return function(a){var b,c="",e=this.config,f=this,g=e.utils;
"undefined"!=typeof d&&d.kissy&&(b=d);
var h=g.runBlockCommand,i=g.renderOutput,j=g.getProperty,k=(g.runInlineCommand,g.getPropertyOrRunCommand);
c+="";
var l={},m=[],n=j(f,a,"data",0,1);
return m.push(n),l.params=m,l.fn=function(a){var b="";
b+="\r\n";
var c={};
return c.fn=function(a){var b="";
b+="\r\n";
var c={},d=[],e=j(f,a,"shield",0,3);
return d.push(e),c.params=d,c.fn=function(a){var b="";
b+='\r\n
<div class="ui-row-item ui-track-item ui-track-disabled" data-sid="';
var c=k(f,a,{},"song_id",0,4);
b+=i(c,!0),b+='" data-type="fav" id="J_favList';
var d=k(f,a,{},"song_id",0,4);
b+=i(d,!0),b+='">\r\n
<div class="ui-track-main">\r\n	
<div class="ui-track-checkbox">\r\n		
<input type="checkbox" disabled="disabled" class="ui-track-item-id" name="fav" id="J_track';
var e=k(f,a,{},"song_id",0,7);
b+=i(e,!0),b+='" value="';
var g=k(f,a,{},"song_id",0,7);
b+=i(g,!0),b+='" disabled="disabled" />\r\n	
</div>\r\n	
<div class="ui-track-sort">
<i>';
var l=j(f,a,"xindex",0,9);
b+=i(l+1,!0),b+='
</i>
</div>\r\n	
<div class="ui-row-item-body">\r\n		
<div class="ui-row-item-column c1" data-id="';
var m=k(f,a,{},"song_id",0,11);
b+=i(m,!0),b+='">';
var n=k(f,a,{},"song_name",0,11);
b+=i(n,!1),b+='&nbsp;
&nbsp;

<img src="http://gtms03.alicdn.com/tps/i3/T1iS08FvdcXXblKhDf-39-18.png" width="39" height="18" />
</div>\r\n		
<div class="ui-row-item-column c2" data-artist-id="';
var o=k(f,a,{},"artist_id",0,12);
b+=i(o,!0),b+='">\r\n		';
var p={},q=[],r=j(f,a,"singers",0,13);
q.push(r),p.params=q,p.fn=function(a){var b="";
b+="\r\n		";
var c={},d=[],e=j(f,a,"xindex",0,14);
d.push(0!==e),c.params=d,c.fn=function(){var a="";
return a+=" ;
 "},b+=h(f,a,c,"if",14),b+='
<a href="http://www.xiami.com';
var g=k(f,a,{},"href",0,14);
b+=i(g,!0),b+='" target="_blank" title="';
var l=k(f,a,{},"name",0,14);
b+=i(l,!1),b+='">';
var m=k(f,a,{},"name",0,14);
return b+=i(m,!1),b+="
</a>\r\n		"},b+=h(f,a,p,"each",13),b+='\r\n		
</div>\r\n		
<div class="ui-row-item-column c3" data-album-id="';
var s=k(f,a,{},"album_id",0,17);
b+=i(s,!0),b+='">
<a href="http://www.xiami.com/album/';
var t=k(f,a,{},"album_id",0,17);
b+=i(t,!0),b+='" target="_blank" title="';
var u=k(f,a,{},"album_name",0,17);
b+=i(u,!1),b+='">';
var v=k(f,a,{},"album_name",0,17);
b+=i(v,!1),b+='
</a>
</div>\r\n	
</div>\r\n	
<div class="ui-track-control">\r\n		';
var w={},x=[],y=j(f,a,"grade",0,20);
return x.push(-1===y),w.params=x,w.fn=function(){var a="";
return a+='\r\n		
<a class="fav-btn icon-track-fav" data-type="myfav" data-event="fav" title="\u6536\u85cf">
</a>\r\n		'},w.inverse=function(){var a="";
return a+='\r\n		
<a class="fav-btn icon-track-faved" data-type="myfav" data-event="fav" title="\u53d6\u6d88\u6536\u85cf">
</a>\r\n		'},b+=h(f,a,w,"if",20),b+="\r\n	
</div>\r\n
</div>\r\n
</div>\r\n"},c.inverse=function(a){var b="";
b+='\r\n
<div class="ui-row-item ui-track-item" data-sid="';
var c=k(f,a,{},"song_id",0,29);
b+=i(c,!0),b+='" data-type="fav" id="J_favList';
var d=k(f,a,{},"song_id",0,29);
b+=i(d,!0),b+='">\r\n
<div class="ui-track-main">\r\n	
<div class="ui-track-checkbox">\r\n		
<input type="checkbox" class="ui-track-item-id" name="fav" id="J_track';
var e=k(f,a,{},"song_id",0,32);
b+=i(e,!0),b+='" value="';
var g=k(f,a,{},"song_id",0,32);
b+=i(g,!0),b+='" />\r\n	
</div>\r\n	
<div class="ui-track-sort">
<em>';
var l=j(f,a,"xindex",0,34);
b+=i(l+1,!0),b+='
</em>
</div>\r\n	
<div class="ui-row-item-body">\r\n		
<div class="ui-row-item-column c1" data-id="';
var m=k(f,a,{},"song_id",0,36);
b+=i(m,!0),b+='">';
var n=k(f,a,{},"song_name",0,36);
b+=i(n,!1),b+='
</div>\r\n		
<div class="ui-row-item-column c2" data-artist-id="';
var o=k(f,a,{},"artist_id",0,37);
b+=i(o,!0),b+='">\r\n		';
var p={},q=[],r=j(f,a,"singers",0,38);
q.push(r),p.params=q,p.fn=function(a){var b="";
b+="\r\n		";
var c={},d=[],e=j(f,a,"xindex",0,39);
d.push(0!==e),c.params=d,c.fn=function(){var a="";
return a+=" ;
 "},b+=h(f,a,c,"if",39),b+='
<a href="http://www.xiami.com';
var g=k(f,a,{},"href",0,39);
b+=i(g,!0),b+='" target="_blank" title="';
var l=k(f,a,{},"name",0,39);
b+=i(l,!1),b+='">';
var m=k(f,a,{},"name",0,39);
return b+=i(m,!1),b+="
</a>\r\n		"},b+=h(f,a,p,"each",38),b+='\r\n		
</div>\r\n		
<div class="ui-row-item-column c3" data-album-id="';
var s=k(f,a,{},"album_id",0,42);
b+=i(s,!0),b+='">
<a href="http://www.xiami.com/album/';
var t=k(f,a,{},"album_id",0,42);
b+=i(t,!0),b+='" target="_blank" title="';
var u=k(f,a,{},"album_name",0,42);
b+=i(u,!1),b+='">';
var v=k(f,a,{},"album_name",0,42);
b+=i(v,!1),b+='
</a>
</div>\r\n	
</div>\r\n	
<div class="ui-track-control">\r\n		';
var w={},x=[],y=j(f,a,"grade",0,45);
return x.push(-1===y),w.params=x,w.fn=function(){var a="";
return a+='\r\n		
<a class="fav-btn icon-track-fav" data-type="myfav" data-event="fav" title="\u6536\u85cf">
</a>\r\n		'},w.inverse=function(){var a="";
return a+='\r\n		
<a class="fav-btn icon-track-faved" data-type="myfav" data-event="fav" title="\u53d6\u6d88\u6536\u85cf">
</a>\r\n		'},b+=h(f,a,w,"if",45),b+='\r\n		
<a class="more-btn icon-track-more" data-type="myfav" data-event="more" title="\u66f4\u591a">
</a>\r\n	
</div>\r\n
</div>\r\n
</div>\r\n'},b+=h(f,a,c,"if",3),b+="\r\n"},b+=h(f,a,c,"data",2),b+="\r\n"},l.inverse=function(){var a="";
return a+='\r\n
<div class="fav-detail-none">
</div>\r\n'},c+=h(f,a,l,"if",1),c+="\r\n"}}),


KISSY.add("page/mods/sidebar/myfav",["node","io","xtemplate","utils/base","utils/scrollView/scrollViewManage","../xtpl/favTrackItem-xtpl"],function(a,b,c,d){function e(){this.init()}var f=b("node"),g=b("io"),h=b("xtemplate"),i=b("utils/base"),j=b("utils/scrollView/scrollViewManage"),k=b("../xtpl/favTrackItem-xtpl"),l=f.all,m=e.prototype;
m.init=function(){var a=this;
a.favCount=l("#J_favCount")},m.renderData=function(){var b=this;
b.favCount.html("
<span>loading
</span>"),j.content("J_myfavScrollView","");
var c=new h(k),d=a.UA.ie&&a.UA.ie
<9?100:200;
new g({url:i.MY_FAV_TRCKS_URL,dataType:"jsonp",success:function(a){if(a.status){var e,f={data:a.data.songs},g=a.data.count;
e=f.data&&f.data.length>0?f.data.length:0,e>d&&(f.data.length=d),b.favCount.html(g>d?"
<span>\u603b\u6536\u85cf\u6b4c\u66f2:"+g+"\u9996 (\u663e\u793a"+f.data.length+'\u9996)
</span>  
<a href="http://www.xiami.com/space/lib-song" target="_blank">\u67e5\u770b\u5168\u90e8
</a>':"
<span>\u5171\u6536\u85cf"+e+"\u9996
</span>"),e>0?l(".ui-myfav-body").removeClass("ui-myfav-empty"):l(".ui-myfav-body").addClass("ui-myfav-empty");
var h=c.render(f);
l("#J_checkAll_fav").prop("checked",!1),j.content("J_myfavScrollView",h)}},error:function(){}})},m.sortTrackList=function(){for(var a=this,b=a.pageContent.all(".ui-track-item"),c=b.length,d=0;
c>d;
d++){var e=l(b[d]).one(".ui-track-sort");
e.html("
<em>"+(d+1)+"
</em>")}j.sync("J_myfavScrollView")},d.exports=e}),

KISSY.add("page/mods/xtpl/collectListItem-xtpl",function(a,b,c,d){return function(a){var b,c="",e=this.config,f=this,g=e.utils;
"undefined"!=typeof d&&d.kissy&&(b=d);
var h=g.runBlockCommand,i=g.renderOutput,j=g.getProperty,k=(g.runInlineCommand,g.getPropertyOrRunCommand);
c+="";
var l={},m=[],n=j(f,a,"data",0,1);
return m.push(n),l.params=m,l.fn=function(a){var b="";
b+="\r\n";
var c={},d=[],e=j(f,a,"data",0,2);
return d.push(e),c.params=d,c.fn=function(a){var b="";
b+='\r\n
<div class="collect-item"  data-id="';
var c=k(f,a,{},"list_id",0,3);
b+=i(c,!0),b+='">\r\n	
<div class="collect-item-con">\r\n		';
var d={},e=[],g=j(f,a,"logo",0,5);
e.push(g),d.params=e,d.fn=function(a){var b="";
b+='\r\n		
<img src="http://img.xiami.net/';
var c=k(f,a,{},"logo",0,6);
return b+=i(c,!0),b+='" width="25" height="25" alt="">\r\n		'},d.inverse=function(){var a="";
return a+='\r\n		
<img src="http://gtms01.alicdn.com/tps/i1/T1c7F7FqXeXXcCXlfb-25-25.png" width="25" height="25" alt="">\r\n		'},b+=h(f,a,d,"if",5),b+='\r\n		
<input type="hidden" class="item-old" value="';
var l=k(f,a,{},"name",0,10);
b+=i(l,!1),b+='">\r\n		
<span class="item-name">';
var m=k(f,a,{},"name",0,11);
b+=i(m,!1),b+='
</span>\r\n		
<input type="text" value="';
var n=k(f,a,{},"name",0,12);
return b+=i(n,!1),b+='" class="item-input" maxlength="400">\r\n		
<a class="edit icon-editCollect">
</a>\r\n		
<a class="delete icon-deleteCollect">
</a>\r\n	
</div>\r\n
</div>\r\n'},b+=h(f,a,c,"each",2),b+="\r\n"},l.inverse=function(){var a="";
return a+='\r\n
<div class="collect-none">
</div>\r\n'},c+=h(f,a,l,"if",1),c+="\r\n"}}),

KISSY.add("page/mods/xtpl/collectDetail-xtpl",function(a,b,c,d){return function(a){var b,c="",e=this.config,f=this,g=e.utils;
"undefined"!=typeof d&&d.kissy&&(b=d);
var h=g.runBlockCommand,i=g.renderOutput,j=g.getProperty,k=(g.runInlineCommand,g.getPropertyOrRunCommand);
c+='
<div class="ui-collect-title">\r\n	
<div class="ui-collect-title-con">\r\n		
<a class="icon-playAllBtn"  title="\u64ad\u653e\u5168\u90e8" onclick="SEIYA.playcollect(\'';
var l=k(f,a,{},"list_id",0,3);
c+=i(l,!0),c+="')\">
</a>\r\n		
<h2>";
var m=k(f,a,{},"name",0,4);
c+=i(m,!1),c+="
</h2>\r\n		
<p>
<span>\u6b4c\u66f2\u6570:";
var n=k(f,a,{},"songs_count",0,5);
c+=i(n,!0),c+="\u9996
</span>
<span>\u66f4\u65b0\u65f6\u95f4:";
var o=k(f,a,{},"gmt_modify",0,5);

c+=i(o,!0),c+='
</span>
<a href="http://www.xiami.com/song/showcollect/id/';
var p=k(f,a,{},"list_id",0,5);
c+=i(p,!0),c+='" target="_blank">\u67e5\u770b\u8be6\u60c5
</a>
</p>\r\n	
</div>\r\n
</div>\r\n
<div class="ui-collect-header ui-row-item">\r\n	
<div class="ui-row-item-body">\r\n		
<div class="ui-row-item-column c1">\r\n			\u6b4c\u66f2\r\n		
</div>\r\n		
<div class="ui-row-item-column c2">\r\n			\u6f14\u5531\u8005\r\n		
</div>\r\n		
<div class="ui-row-item-column c3">\r\n			\u4e13\u8f91\r\n		
</div>\r\n	
</div>\r\n
</div>\r\n';
var q={},r=[],s=j(f,a,"song",0,21);
return r.push(s),q.params=r,q.fn=function(a){var b="";
b+='\r\n
<div class="ui-collect-body">\r\n	
<div id="J_pageCollectScrollView" class="ks-scroll-view">\r\n		
<!-- \u6b4c\u66f2\u5217\u8868 -->\r\n		
<div class="ks-scroll-view-content">\r\n			
<!-- \u5217\u8868 begin -->\r\n			
<div class="ui-tracks-wrap" id="J_collectTracksList">\r\n			';
var c={};
return c.fn=function(a){var b="";
b+='\r\n				
<div class="ui-row-item ui-track-item';
var c={},d=[],e=j(f,a,"shield",0,29);
d.push(e),c.params=d,c.fn=function(){var a="";
return a+=" ui-track-disabled"},b+=h(f,a,c,"if",29),b+='" data-sid="';
var g=k(f,a,{},"song_id",0,29);
b+=i(g,!0),b+='" data-id="';
var l=k(f,a,{},"list_id",0,29);
b+=i(l,!0),b+='" data-type="collect" id="J_collectList';
var m=k(f,a,{},"song_id",0,29);
b+=i(m,!0),b+='">\r\n				
<div class="ui-track-main">\r\n					
<div class="ui-track-checkbox">\r\n						
<input type="checkbox" class="ui-track-item-id" name="collect" id="J_collectTrack';
var n=k(f,a,{},"song_id",0,32);
b+=i(n,!0),b+='" value="';
var o=k(f,a,{},"song_id",0,32);
b+=i(o,!0),b+='" ';
var p={},q=[],r=j(f,a,"shield",0,32);
q.push(r),p.params=q,p.fn=function(){var a="";
return a+='disabled="disabled"'},b+=h(f,a,p,"if",32),b+=' />\r\n					
</div>\r\n					
<div class="ui-track-sort">';
var s={},t=[],u=j(f,a,"shield",0,34);
t.push(u),s.params=t,s.fn=function(a){var b="";
b+="
<i>";
var c=j(f,a,"xindex",0,34);
return b+=i(c+1,!0),b+="
</i>"},s.inverse=function(a){var b="";
b+="
<em>";
var c=j(f,a,"xindex",0,34);
return b+=i(c+1,!0),b+="
</em>"},b+=h(f,a,s,"if",34),b+='
</div>\r\n					
<div class="ui-row-item-body">\r\n						
<div class="ui-row-item-column c1" data-id="';
var v=k(f,a,{},"song_id",0,36);
b+=i(v,!0),b+='">';
var w=k(f,a,{},"song_name",0,36);
b+=i(w,!1),b+="";
var x={},y=[],z=j(f,a,"shield",0,36);
y.push(z),x.params=y,x.fn=function(){var a="";
return a+='&nbsp;
&nbsp;

<img src="http://gtms03.alicdn.com/tps/i3/T1iS08FvdcXXblKhDf-39-18.png" width="39" height="18" />'},b+=h(f,a,x,"if",36),b+='
</div>\r\n						
<div class="ui-row-item-column c2" data-artist-id="';
var A=k(f,a,{},"artist_id",0,37);
b+=i(A,!0),b+='">\r\n						';
var B={},C=[],D=j(f,a,"singers",0,38);
C.push(D),B.params=C,B.fn=function(a){var b="";
b+="\r\n						";
var c={},d=[],e=j(f,a,"xindex",0,39);
d.push(0!==e),c.params=d,c.fn=function(){var a="";
return a+=" ;
 "},b+=h(f,a,c,"if",39),b+='
<a href="http://www.xiami.com';
var g=k(f,a,{},"href",0,39);
b+=i(g,!0),b+='" target="_blank" title="';
var l=k(f,a,{},"name",0,39);
b+=i(l,!1),b+='">';
var m=k(f,a,{},"name",0,39);
return b+=i(m,!1),b+="
</a>\r\n						"},b+=h(f,a,B,"each",38),b+='\r\n						
</div>\r\n						
<div class="ui-row-item-column c3" data-album-id="';
var E=k(f,a,{},"album_id",0,42);
b+=i(E,!0),b+='">
<a href="http://www.xiami.com/album/';
var F=k(f,a,{},"album_id",0,42);
b+=i(F,!0),b+='" target="_blank" title="';
var G=k(f,a,{},"album_name",0,42);
b+=i(G,!1),b+='">';
var H=k(f,a,{},"album_name",0,42);
b+=i(H,!1),b+='
</a>
</div>\r\n					
</div>\r\n					
<div class="ui-track-control">\r\n						';
var I={},J=[],K=j(f,a,"grade",0,45);
J.push(-1===K),I.params=J,I.fn=function(){var a="";
return a+='\r\n						
<a class="fav-btn icon-track-fav" data-type="collect" data-event="fav" title="\u6536\u85cf">
</a>\r\n						'},I.inverse=function(){var a="";
return a+='\r\n						
<a class="fav-btn icon-track-faved" data-type="collect" data-event="fav" title="\u53d6\u6d88\u6536\u85cf">
</a>\r\n						'},b+=h(f,a,I,"if",45),b+="\r\n						";
var L={},M=[],N=j(f,a,"shield",0,50);
M.push(N),L.params=M,L.fn=function(){var a="";
return a+='
<a class="more-btn icon-track-more" data-type="collect" data-event="more" title="\u66f4\u591a">
</a>'};
var O=L.fn;
return L.fn=L.inverse,L.inverse=O,b+=h(f,a,L,"if",50),b+='\r\n						
<a class="delete-btn icon-track-delete" data-type="collect" data-event="delete" title="\u5220\u9664">
</a>\r\n					
</div>\r\n				
</div>\r\n				
</div>\r\n			'},b+=h(f,a,c,"song",28),b+="\r\n			
</div>\r\n			
<!-- \u5217\u8868 end -->\r\n		
</div>\r\n		
<!-- \u6b4c\u66f2\u5217\u8868 end -->\r\n	
</div>\r\n
</div>\r\n"},q.inverse=function(){var a="";
return a+='\r\n
<div class="ui-collect-body" style="background: none">\r\n	
<div id="J_pageCollectScrollView" class="ks-scroll-view">\r\n		
<!-- \u6b4c\u66f2\u5217\u8868 -->\r\n		
<div class="ks-scroll-view-content">\r\n			
<!-- \u5217\u8868 begin -->\r\n			
<div class="ui-tracks-wrap" id="J_collectTracksList">\r\n			
<div class="collect-detail-none">
</div>\r\n			
</div>\r\n			
<!-- \u5217\u8868 end -->\r\n		
</div>\r\n		
<!-- \u6b4c\u66f2\u5217\u8868 end -->\r\n	
</div>\r\n
</div>\r\n'},c+=h(f,a,q,"if",21),c+='\r\n\r\n
<div class="ui-collect-footer">\r\n	
<div class="ui-track-all">\r\n		
<div class="ui-all-checkbox">\r\n			
<input id="J_checkAll_collect" type="checkbox" onclick="SEIYA.syncCheck(this,\'collect\')" />\r\n		
</div>\r\n		
<div class="ui-all-item">\r\n			
<a class="icon-tracks-play" onclick="SEIYA.playAllSongs(\'collect\')">\u64ad\u653e
</a>\r\n		
</div>\r\n		
<div class="ui-all-item">\r\n			
<a class="icon-tracks-add" onclick="SEIYA.collects(\'collect\')">\u6dfb\u52a0\u5230\u7cbe\u9009\u96c6
</a>\r\n		
</div>\r\n		
<div class="ui-all-item">\r\n			
<a class="icon-tracks-more" data-type="collect" data-event="more">\u66f4\u591a
</a>\r\n		
</div>\r\n	
</div>\r\n
</div>'}}),


KISSY.add("page/mods/sidebar/collect",["node","base","event","io","xtemplate","utils/base","widget/tool/index","utils/scrollView/scrollViewManage","../xtpl/collectItem-xtpl","../xtpl/collectListItem-xtpl","../xtpl/collectDetail-xtpl"],function(a,b,c,d){var e=b("node"),f=b("base"),g=(b("event"),b("io")),h=b("xtemplate"),i=b("utils/base"),j=b("widget/tool/index"),k=b("utils/scrollView/scrollViewManage"),l=b("../xtpl/collectItem-xtpl"),m=b("../xtpl/collectListItem-xtpl"),n=b("../xtpl/collectDetail-xtpl"),o=e.all,p=f.extend({initializer:function(){var a=this;
a.collectList=o("#J_collectList"),a.createCollect=o("#J_createCollect"),a.createCollect.attr("title","\u65b0\u5efa\u7cbe\u9009\u96c6"),a.pageCollect=o("#J_pageCollect"),a.TAB=o("#J_tab"),a.tpl_collectItem=new h(l),a.tpl_collectListItem=new h(m),a.tpl_collectDetail=new h(n),a._addEvent(),a._addMouseEvent()},sync:function(){var a=this;
a.renderCollectList()},_addEvent:function(){var b=this,c=o("#J_sidebarMenu").all("li");
b.renderCollectList(),b.collectList.delegate("click",".collect-item",function(d){if(!j.isLogin())return!1;
var e=o(d.currentTarget),f=e.attr("data-id");
if(e.hasClass("collect-item-edit"))return!1;
var h=o(d.target);
return h.hasClass("edit")?(e.removeClass("collect-item-hover"),e.addClass("collect-item-edit"),e.one(".item-input")[0].focus(),!1):h.hasClass("delete")?confirm("\u5220\u9664\u7cbe\u9009\u96c6\u540e\u6570\u636e\u65e0\u6cd5\u6062\u590d\uff0c\u662f\u5426\u5220\u9664?")?(new g({dataType:"jsonp",url:i.COLLECT_DELETE_URL,data:{list_id:f,_xiamitoken:i.getToken()},success:function(c){c.status?(b._cancelCreate(e),f==b.get("id")&&b.fire("deleteCurrent")):alert(c.message),a.log(c)},error:function(b){a.log(b)}}),!1):!1:(b.TAB.all(".main-page").hide(),c.removeClass("current"),b.collectList.all(".collect-item").removeClass("collect-item-current"),e.addClass("collect-item-current"),void b.renderCollectDetail(f))}),b.collectList.delegate("mouseover",".collect-item",function(a){var b=o(a.currentTarget);
return b.hasClass("collect-item-edit")?!1:void b.addClass("collect-item-hover")}),b.collectList.delegate("mouseout",".collect-item",function(a){var b=o(a.currentTarget);
return b.hasClass("collect-item-edit")?!1:void b.removeClass("collect-item-hover")}),b.createCollect.on("click",function(){if(!j.isLogin())return!1;
var a=b.collectList.first(".collect-item");
if(0==a.attr("data-id"))return a.one(".item-input")[0].focus(),!1;
var c=b.tpl_collectItem.render();
o(".collect-none")&&o(".collect-none").remove(),b.collectList.prepend(c),k.sync("J_collectScrollView"),k.scrollToTop("J_collectScrollView"),b.collectList.first(".collect-item").one(".item-input")[0].focus()}),b.collectList.delegate("keydown",".collect-item",function(c){if(13==c.keyCode||13==c.which){var d=o(c.currentTarget),e=o(c.target),f=d.one(".item-old").val(),g=d.attr("data-id"),h=a.trim(e.val());
if(""==h)return""==f?b._cancelCreate(d):(d.removeClass("collect-item-edit"),d.one(".item-name").html(f),d.one(".item-input").val(f)),!1;
if(h==f)return d.removeClass("collect-item-edit"),!1;
0==g?b._createCollect(d,g,h):b._editCollect(d,g,h)}})},_editCollect:function(b,c,d){if(a.log(["_editCollect",b,c,d]),!j.isLogin())return!1;
var e=b,d=d;
return""==d?(d=e.one(".item-old").val(),e.one(".item-name").html(d),!1):(e.removeClass("collect-item-edit"),e.one(".item-name").html(d),void new g({dataType:"jsonp",url:i.COLLECT_EDIT_NAME_URL,data:{list_id:c,title:d,_xiamitoken:i.getToken()},success:function(a){a.status?(e.one(".item-old").val(d),e.one(".item-name").html(d),e.one("input").val(d)):(d=e.one(".item-old").val(),e.one(".item-name").html(d),alert(a.message))},error:function(){d=e.one(".item-old").val(),e.one(".item-name").html(d)}}))},_createCollect:function(b,c,d){if(a.log(["_createCollect",b,d]),!j.isLogin())return!1;
var e=this,f=b,d=d;
return""==d?(e._cancelCreate(f),!1):(f.removeClass("collect-item-edit"),f.one(".item-old").val(""),f.one(".item-name").html(d),void new g({dataType:"jsonp",url:i.COLLECT_CREATE_URL,data:{title:d,_xiamitoken:i.getToken()},success:function(a){a.status?(f.attr("data-id",a.data),f.one(".item-old").val(d),f.one(".item-name").html(d),f.one("input").val(d)):(e._cancelCreate(f),alert(a.message))},error:function(){f.remove(),k.sync("J_collectScrollView"),k.scrollToTop("J_collectScrollView")}}))},_cancelCreate:function(a){var b=this;
a.remove(),k.sync("J_collectScrollView"),k.scrollToTop("J_collectScrollView"),b._showCollectTip()},renderCollectDetail:function(a){var b=this;
b.set("id",a),new g({url:i.COLLECT_DETAIL_URL,dataType:"jsonp",data:{list_id:a},success:function(a){if(a.status){var c=b.tpl_collectDetail.render(a.data);
b.pageCollect.show(),b.pageCollect.html(c),k.forceRender("J_pageCollectScrollView")}},error:function(){}})},_addMouseEvent:function(){var a=o("#J_collectTracksList");
a.delegate("mouseover",".ui-track-item",function(a){var b=o(a.currentTarget);
b.addClass("ui-track-hover")}),a.delegate("mouseout",".ui-track-item",function(a){var b=o(a.currentTarget);
b.removeClass("ui-track-hover")})},deleteCollectIds:function(b,c){o("#J_collectList"+c);
new g({url:i.COLLECT_DELETE_SONG_URL,dataType:"jsonp",data:{list_id:b,sids:c,_xiamitoken:i.getToken()},success:function(b){b.status?a.log(b):alert(b.message)},error:function(a){alert(a.message)}})},sortTrackList:function(){for(var a=o("#J_collectTracksList").all(".ui-track-item"),b=a.length,c=0;
b>c;
c++){var d=o(a[c]).one(".ui-track-sort");
d.html("
<em>"+(c+1)+"
</em>")}k.sync("J_pageCollectScrollView")},renderCollectList:function(){var a=this;
new g({url:i.COLLECT_GET_LIST_URL,dataType:"jsonp",success:function(b){if(b.status){var c={data:b.data},d=a.tpl_collectListItem.render(c);
a.collectList.html(d),k.render("J_collectScrollView")}else{var d='
<div class="collect-none">
</div>';
a.collectList.html(d)}},error:function(){var b='
<div class="collect-none">
</div>';
a.collectList.html(b)}})},_showCollectTip:function(){var a=this;
if(0==a.collectList.all(".collect-item").length){var b='
<div class="collect-none">
</div>';
a.collectList.html(b)}}},{ATTRS:{id:{value:0}}});
d.exports=p}),

KISSY.add("page/mods/xtpl/histroyTrackItem-xtpl",function(a,b,c,d){return function(a){var b,c="",e=this.config,f=this,g=e.utils;
"undefined"!=typeof d&&d.kissy&&(b=d);
var h=g.runBlockCommand,i=g.renderOutput,j=g.getProperty,k=(g.runInlineCommand,g.getPropertyOrRunCommand);
c+="";
var l={},m=[],n=j(f,a,"data",0,1);
return m.push(n),l.params=m,l.fn=function(a){var b="";
b+="\r\n";
var c={};
return c.fn=function(a){var b="";
b+="\r\n";
var c={},d=[],e=j(f,a,"shield",0,3);
return d.push(e),c.params=d,c.fn=function(a){var b="";
b+='\r\n
<div class="ui-row-item ui-track-item ui-track-disabled" data-sid="';
var c=k(f,a,{},"song_id",0,4);
b+=i(c,!0),b+='" data-gmt="';
var d=k(f,a,{},"gmt_play",0,4);
b+=i(d,!0),b+='" data-type="history" id="J_historyList';
var e=k(f,a,{},"song_id",0,4);
b+=i(e,!0),b+='">\r\n
<div class="ui-track-main">\r\n	
<div class="ui-track-checkbox">\r\n		
<input type="checkbox" class="ui-track-item-id" name="history" id="J_track';
var g=k(f,a,{},"song_id",0,7);
b+=i(g,!0),b+='" value="';
var l=k(f,a,{},"song_id",0,7);
b+=i(l,!0),b+='" disabled="disabled" />\r\n	
</div>\r\n	
<div class="ui-track-sort">
<i>';
var m=j(f,a,"xindex",0,9);
b+=i(m+1,!0),b+='
</i>
</div>\r\n	
<div class="ui-row-item-body">\r\n		
<div class="ui-row-item-column c1" data-id="';
var n=k(f,a,{},"song_id",0,11);
b+=i(n,!0),b+='">';
var o=k(f,a,{},"song_name",0,11);
b+=i(o,!1),b+='&nbsp;
&nbsp;

<img src="http://gtms03.alicdn.com/tps/i3/T1iS08FvdcXXblKhDf-39-18.png" width="39" height="18" />
</div>\r\n		
<div class="ui-row-item-column c2" data-artist-id="';
var p=k(f,a,{},"artist_id",0,12);
b+=i(p,!0),b+='">\r\n		';
var q={},r=[],s=j(f,a,"singers",0,13);
r.push(s),q.params=r,q.fn=function(a){var b="";
b+="\r\n		";
var c={},d=[],e=j(f,a,"xindex",0,14);
d.push(0!==e),c.params=d,c.fn=function(){var a="";
return a+=" ;
 "},b+=h(f,a,c,"if",14),b+='
<a href="http://www.xiami.com';
var g=k(f,a,{},"href",0,14);
b+=i(g,!0),b+='" target="_blank" title="';
var l=k(f,a,{},"name",0,14);
b+=i(l,!1),b+='">';
var m=k(f,a,{},"name",0,14);
return b+=i(m,!1),b+="
</a>\r\n		"},b+=h(f,a,q,"each",13),b+='\r\n		
</div>\r\n		
<div class="ui-row-item-column c3">
<span class="time">';
var t=k(f,a,{},"gmt_play",0,17);
b+=i(t,!0),b+='
</span>
</div>\r\n	
</div>\r\n	
<div class="ui-track-control">\r\n		';
var u={},v=[],w=j(f,a,"grade",0,20);
return v.push(-1===w),u.params=v,u.fn=function(){var a="";
return a+='\r\n		
<a class="fav-btn icon-track-fav" data-type="history" data-event="fav" title="\u6536\u85cf">
</a>\r\n		'},u.inverse=function(){var a="";
return a+='\r\n		
<a class="fav-btn icon-track-faved" data-type="history" data-event="fav" title="\u53d6\u6d88\u6536\u85cf">
</a>\r\n		'},b+=h(f,a,u,"if",20),b+='\r\n		
<a class="delete-btn icon-track-delete" data-type="history" data-event="delete" title="\u5220\u9664">
</a>\r\n	
</div>\r\n
</div>\r\n
</div>\r\n'},c.inverse=function(a){var b="";
b+='\r\n
<div class="ui-row-item ui-track-item" data-sid="';
var c=k(f,a,{},"song_id",0,30);
b+=i(c,!0),b+='" data-gmt="';
var d=k(f,a,{},"gmt_play",0,30);
b+=i(d,!0),b+='" data-type="history" id="J_historyList';
var e=k(f,a,{},"song_id",0,30);
b+=i(e,!0),b+='">\r\n
<div class="ui-track-main">\r\n	
<div class="ui-track-checkbox">\r\n		
<input type="checkbox" class="ui-track-item-id" name="history" id="J_track';
var g=k(f,a,{},"song_id",0,33);
b+=i(g,!0),b+='" value="';
var l=k(f,a,{},"song_id",0,33);
b+=i(l,!0),b+='" />\r\n	
</div>\r\n	
<div class="ui-track-sort">
<em>';
var m=j(f,a,"xindex",0,35);
b+=i(m+1,!0),b+='
</em>
</div>\r\n	
<div class="ui-row-item-body">\r\n		
<div class="ui-row-item-column c1" data-id="';
var n=k(f,a,{},"song_id",0,37);
b+=i(n,!0),b+='">';
var o=k(f,a,{},"song_name",0,37);
b+=i(o,!1),b+='
</div>\r\n		
<div class="ui-row-item-column c2" data-artist-id="';
var p=k(f,a,{},"artist_id",0,38);
b+=i(p,!0),b+='">\r\n		';
var q={},r=[],s=j(f,a,"singers",0,39);
r.push(s),q.params=r,q.fn=function(a){var b="";
b+="\r\n		";
var c={},d=[],e=j(f,a,"xindex",0,40);
d.push(0!==e),c.params=d,c.fn=function(){var a="";
return a+=" ;
 "},b+=h(f,a,c,"if",40),b+='
<a href="http://www.xiami.com';
var g=k(f,a,{},"href",0,40);
b+=i(g,!0),b+='" target="_blank" title="';
var l=k(f,a,{},"name",0,40);
b+=i(l,!1),b+='">';
var m=k(f,a,{},"name",0,40);
return b+=i(m,!1),b+="
</a>\r\n		"},b+=h(f,a,q,"each",39),b+='\r\n		
</div>\r\n		
<div class="ui-row-item-column c3">
<span class="time">';
var t=k(f,a,{},"gmt_play",0,43);
b+=i(t,!0),b+='
</span>
</div>\r\n	
</div>\r\n	
<div class="ui-track-control">\r\n		';
var u={},v=[],w=j(f,a,"grade",0,46);
return v.push(-1===w),u.params=v,u.fn=function(){var a="";
return a+='\r\n		
<a class="fav-btn icon-track-fav" data-type="history" data-event="fav" title="\u6536\u85cf">
</a>\r\n		'},u.inverse=function(){var a="";
return a+='\r\n		
<a class="fav-btn icon-track-faved" data-type="history" data-event="fav" title="\u53d6\u6d88\u6536\u85cf">
</a>\r\n		'},b+=h(f,a,u,"if",46),b+='\r\n		
<a class="more-btn icon-track-more" data-type="history" data-event="more" title="\u66f4\u591a">
</a>\r\n		
<a class="delete-btn icon-track-delete" data-type="history" data-event="delete" title="\u5220\u9664">
</a>\r\n	
</div>\r\n
</div>\r\n
</div>\r\n'},b+=h(f,a,c,"if",3),b+="\r\n"},b+=h(f,a,c,"data",2),b+="\r\n"},l.inverse=function(){var a="";
return a+='\r\n
<div class="history-detail-none">
</div>\r\n'},c+=h(f,a,l,"if",1),c+="\r\n"}}),

KISSY.add("page/mods/sidebar/history",["node","io","xtemplate","utils/base","utils/scrollView/scrollViewManage","../xtpl/histroyTrackItem-xtpl"],function(a,b,c,d){function e(){this.init()}var f=b("node"),g=b("io"),h=b("xtemplate"),i=b("utils/base"),j=b("utils/scrollView/scrollViewManage"),k=b("../xtpl/histroyTrackItem-xtpl"),l=f.all,m=e.prototype;
m.init=function(){var a=this;
a.HTML_histroyTrackItem=new h(k),a.pageContent=l("#J_historyTracksList"),a.historyCount=l("#J_historyCount")},m.renderData=function(){var b=this,c=a.UA.ie&&a.UA.ie
<9?100:200;
new g({url:i.HISTORY_TRACKS_URL,dataType:"jsonp",success:function(a){if(a.status){var d,e={data:a.data};
d=e.data&&e.data.length>0?e.data.length:0,d>=200?(e.data.length=c,b.historyCount.html("
<span>\u663e\u793a\u6700\u8fd1"+c+'\u6761\u8bb0\u5f55
</span>
<a href="http://www.xiami.com/space/charts-recent" target="_blank">\u67e5\u770b\u5b8c\u6574\u8bb0\u5f55
</a>')):b.historyCount.html("
<span>\u663e\u793a\u6700\u8fd1"+d+"\u6761\u8bb0\u5f55
</span>"),d>0?l(".ui-history-body").removeClass("ui-history-empty"):l(".ui-history-body").addClass("ui-history-empty");
var f=b.HTML_histroyTrackItem.render(e);
b.pageContent.html(f),l("#J_checkAll_history").prop("checked",!1),j.render("J_historyScrollView")}},error:function(){}})},m.deleteTrackForId=function(b,c){new g({url:i.HISTOTY_DELETE_URL,dataType:"jsonp",data:{id:b,gmt:c,_xiamitoken:i.getToken()},success:function(b){a.log(b)},error:function(){}})},m.sortTrackList=function(){for(var a=l("#J_historyTracksList").all(".ui-track-item"),b=a.length,c=0;
b>c;
c++){var d=l(a[c]).one(".ui-track-sort");
d.html("
<em>"+(c+1)+"
</em>")}j.sync("J_historyScrollView")},d.exports=e}),


KISSY.add("page/mods/sidebar",["node","io","xtemplate","widget/tool/index","./xtpl/collectItem-xtpl","./sidebar/myfav","./sidebar/collect","./sidebar/history"],function(a,b,c,d){function e(){}var f=b("node"),g=(b("io"),b("xtemplate")),h=b("widget/tool/index"),i=b("./xtpl/collectItem-xtpl"),j=b("./sidebar/myfav"),k=b("./sidebar/collect"),l=b("./sidebar/history"),m=f.all,n=null;
e.prototype={init:function(a){var b=this;
n=a,b.collectItem=new g(i),b.Myfav=new j,b.Collect=new k,b.MyHistory=new l,b.TAB=m("#J_tab"),b._addEvent()},_addEvent:function(){var b=this;
b.Collect.on("deleteCurrent",function(){b._highPlaying()});
var c=m("#J_sidebarMenu").all("li");
c.on("click",function(){var d=m(this);
if(d.hasClass("current"))return!1;
var e=d.attr("data-page");
if(a.log(e),("J_pageMyfav"===e||"J_pageHistory"===e)&&!h.isLogin())return!1;
switch(c.removeClass("current"),b.Collect.collectList.all(".collect-item").removeClass("collect-item-current"),d.addClass("current"),b.TAB&&b.TAB.all(".main-page").hide(),m("#"+e).show(),e){case"J_pageMyfav":b.Myfav.renderData();
break;
case"J_pageHistory":b.MyHistory.renderData();
break;
case"J_pagePlayList":n.PLAYER.PlayerTracks.syncScrollView();
break;
default:a.log(e)}})},_highPlaying:function(){var a=this;
a.TAB&&a.TAB.all(".main-page").hide(),m("#J_menuPlaying").addClass("current"),m("#J_pagePlayList").show(),n.PLAYER.PlayerTracks.syncScrollView()}},d.exports=e}),

KISSY.add("page/mods/player/player-event",["base"],function(a,b,c,d){var e=b("base");
d.exports=e.extend({roamDblclick:function(a,b){var c=this;
c.fire("roamDblclick",{sid:b})}},{})}),

KISSY.add("page/mods/page",["node","event","./player/player-event"],function(a,b){function c(){}var d=b("node"),e=b("event"),f=b("./player/player-event"),g=d.all,h=null;
return c.prototype={init:function(a){var b=this;
h=a,b._addEvent(),b._initEvent()},_initEvent:function(){var a=window.SEIYAEVENT=new f;
a.on("roamDblclick",function(a){h.PLAYER.PlayerData.playRoamForId(a.sid,"roam")})},_addEvent:function(){var b=this;
e.delegate(document,"click",".ui-track-item",function(c){var d=g(c.currentTarget),f=g(c.target),h=c.target.tagName.toLowerCase(),i=f.attr("data-type")||d.attr("data-type"),j=f.attr("data-event"),k=f.attr("data-sid")||d.attr("data-sid"),l=d.attr("data-note")||0;
if(a.log([i,j,k,h]),"em"==h&&k&&i&&b._dblclickRoute(k,i),"div"==h){var m=d.one("input");
e.fire(m,"click")}j&&i&&k&&(c.halt(),b._clickRoute(f,k,i,j,l))}),e.delegate(document,"dblclick",".ui-track-control",function(a){a.halt()}),e.delegate(document,"dblclick",".ui-track-main",function(a){if("input"==a.target.tagName.toLowerCase())return!1;
var c=g(a.currentTarget).parent(".ui-track-item"),d=c.attr("data-sid"),e=c.attr("data-type");
d&&e&&b._dblclickRoute(d,e)}),e.delegate(document,"click","#J_trackListDelete",function(){var a=b.getCheckboxArray("track");
return 0===a.length?(alert("\u8bf7\u9009\u62e9\u6b4c\u66f2!"),!1):(h.PLAYER.PlayerData.removeTrackForIds(a),void h.PLAYER.PlayerTracks.sortTrackList())}),e.delegate(document,"click",".icon-tracks-more",function(a){a.halt();
var b=g(a.currentTarget);
h.PLAYER.PlayerMenu.showBatchMenu(b)}),e.delegate(document,"click","#J_trackListFav",function(){var a=b.getCheckboxArray("track");
return 0===a.length?(alert("\u8bf7\u9009\u62e9\u6b4c\u66f2!"),!1):void h.PLAYER.PlayerControl.favForIds(a)}),e.delegate(document,"change","input[type=checkbox]",function(a){var b=g(a.target),c=b.attr("name"),d=b.prop("checked");
if(c&&!d&&g("#J_checkAll_"+c).prop("checked",d),c&&d){for(var e=g("input[name="+c+"]"),f=!0,h=0,i=e.length;
i>h;
h++){var j=e[h];
if(!j.checked){f=!1;
break}}f&&g("#J_checkAll_"+c).prop("checked",!0)}})},_dblclickRoute:function(b,c){if(a.log([b,c],"","_dblclickRoute"),"room"==h.PLAYER.PlayerData.get("status"))return alert("\u4f60\u6b63\u5728\u8ddf\u542c\u4e2d\uff0c\u4e0d\u80fd\u8d2a\u5fc3\u54e6\uff01\n\u8bf7\u9000\u51fa\u64ad\u95f4\u540e\u518d\u64ad\u653e\u5176\u4ed6\u6b4c\u66f2\u3002"),!1;
var d=h&&h.PLAYER.PlayerData.get("songId"),e=h&&h.PLAYER.PlayerData.get("status");
if(b==d&&"roam"===c)return!1;
switch(c){case"track":if(b==d&&"play"==e)return!1;
h.PLAYER.PlayerData.playForId(b,c);
break;
case"roam":h.PLAYER.PlayerData.playRoamForId(b,c);
break;
default:SEIYA.addAndPlay(b)}},_clickRoute:function(b,c,d,e,f){var g=this;
switch("more"!=e&&h.PLAYER.PlayerMenu.hideMenu(),e){case"fav":g._favTrack(c,d,e,f);
break;
case"more":g._moreTrack(b,c,d,e,f);
break;
case"delete":g._deleteTrack(c,d,e);
break;
case"roam":g._roamTrack(c,b);
break;
case"close":g._roamExit(c);
break;
default:a.log("\u6ca1\u6709\u76f8\u5e94\u64cd\u4f5c")}},_favTrack:function(b,c,d,e){a.log(b+", "+c+", "+d),h.PLAYER.PlayerControl.favForId(b,c,e)},_moreTrack:function(a,b,c,d,e){h.PLAYER.PlayerMenu.showTrackMenu(a,b,c,e)},_deleteTrack:function(b,c,d){if(a.log(b+", "+c+", "+d),"track"==c){var e=g("#J_trackList"+b);
e.remove(),h.PLAYER.PlayerTracks.sortTrackList(),h.PLAYER.PlayerData.removeTrackForId(b)}if("collect"==c){if(!confirm("\u786e\u5b9a\u8981\u4ece\u7cbe\u9009\u96c6\u91cc\u5220\u9664\u8fd9\u9996\u6b4c\u5417?"))return!1;
var e=g("#J_collectList"+b),f=e.attr("data-id");
e.remove(),h.SIDEBAR.Collect.sortTrackList(),h.SIDEBAR.Collect.deleteCollectIds(f,b)}if("history"==c){var e=g("#J_historyList"+b),f=e.attr("data-id"),i=e.attr("data-gmt");
e.remove(),h.SIDEBAR.MyHistory.sortTrackList(),h.SIDEBAR.MyHistory.deleteTrackForId(b,i)}},_roamTrack:function(a,b){h.PLAYER.PlayerRoam.before(a,b),h.PLAYER.PlayerData.roamTrackForId(a)},_roamExit:function(){h.PLAYER.PlayerData.roamExit()},getCheckboxArray:function(a){for(var b=[],c=g("input[name="+a+"]:checked"),d=c.length,e=0;
d>e;
e++){var f=c[e];
f.disabled||b.push(f.value)}return b}},c}),

KISSY.add("page/mods/xtpl/user-xtpl",function(a,b,c,d){return function(a){var b,c="",e=this.config,f=this,g=e.utils;
"undefined"!=typeof d&&d.kissy&&(b=d);
var h=g.runBlockCommand,i=g.renderOutput,j=g.getProperty,k=(g.runInlineCommand,g.getPropertyOrRunCommand);
c+="";
var l={},m=[],n=j(f,a,"uid",0,1);
return m.push(0===n),l.params=m,l.fn=function(){var a="";
return a+='\r\n
<div class="user unlogin">\r\n	
<div class="avatar">\r\n		
<img src="http://gtms01.alicdn.com/tps/i1/T1UJFKFtlfXXamt9jd-34-34.png" width="30" height="30" />\r\n	
</div>\r\n
</div>\r\n
<div class="mod-login" id="J_login">\r\n	
<div class="login-content">\u9a6c\u4e0a 
<a href="#login" id="J_miniLogin">\u767b\u5f55
</a>
</div>\r\n
</div>\r\n'},l.inverse=function(a){var b="";
b+='\r\n
<div class="user">\r\n
<div class="avatar">\r\n	
<a href="http://www.xiami.com/u/';
var c=k(f,a,{},"uid",0,13);
b+=i(c,!0),b+='" target="_blank" title="';
var d=k(f,a,{},"name",0,13);
b+=i(d,!1),b+='">\r\n		';
var e={},g=[],l=j(f,a,"avatar",0,14);
return g.push(l),e.params=g,e.fn=function(a){var b="";
b+='\r\n		
<img src="http://img.xiami.net/';
var c=k(f,a,{},"avatar",0,15);
b+=i(c,!0),b+='" width="30" height="30" alt="';
var d=k(f,a,{},"name",0,15);
return b+=i(d,!1),b+='" />\r\n		'},e.inverse=function(a){var b="";
b+='\r\n		
<img src="http://img.xiami.net//res/img/default/usr50.gif" width="30" height="30" alt="';
var c=k(f,a,{},"name",0,17);
return b+=i(c,!1),b+='">\r\n		'},b+=h(f,a,e,"if",14),b+='\r\n	
</a>\r\n
</div>\r\n
<em clas="msg" id="J_userMsg" style="display: none">0
</em>\r\n
</div>\r\n
<div class="friend" id="J_friend">
</div>\r\n'},c+=h(f,a,l,"if",1)}}),

KISSY.add("page/mods/user",["node","cookie","base","xtemplate","widget/tool/index","io","utils/base","./xtpl/user-xtpl"],function(a,b,c,d){var e=b("node"),f=b("cookie"),g=b("base"),h=b("xtemplate"),i=b("widget/tool/index"),j=b("io"),k=b("utils/base"),l=b("./xtpl/user-xtpl"),m=e.all,n={initializer:function(){var b=this,c=f.get("user");
return a.isUndefined(c)?void m("#J_miniLogin").on("click",function(){i.miniLogin()}):void b.sync()},render:function(){var a=this,b=a.getAttrVals(),c=new h(l),d=c.render(b);
a.get("wrap").html(d)},sync:function(){var b=this,c=f.get("user");
a.isUndefined(c)||(c=c.split('"'),a.isArray(c)&&(b.set("uid",c[0]),b.set("name",c[1]),b.set("avatar",c[2]),b.set("identity",c[3]),b.set("credits",c[4]),b.set("level",c[5]),b.set("follow",c[6]),b.set("fans",c[7]),b.set("listened",c[8]),b.render(),new j({type:"get",url:k.UPDATE_VIP,data:{user_id:b.get("uid")},dataType:"jsonp",success:function(a){b.fire("sync",{data:a})}})),a.log(b.getAttrVals()))}},o={ATTRS:{wrap:{value:"",setter:function(a){return m(a)}},uid:{value:0},name:{value:""},avatar:{value:""},identity:{value:0},credits:{value:0},level:{value:0},follow:{value:0},fans:{value:0},listened:{value:0}}};
d.exports=g.extend(n,o)}),

KISSY.add("page/mods/xtpl/search-xtpl",function(a,b,c,d){return function(a){var b,c="",e=this.config,f=this,g=e.utils;
"undefined"!=typeof d&&d.kissy&&(b=d);
var h=g.runBlockCommand,i=g.renderOutput,j=g.getProperty,k=(g.runInlineCommand,g.getPropertyOrRunCommand);
c+="
<dl>\r\n	";
var l={},m=[],n=j(f,a,"songs",0,2);
m.push(n),l.params=m,l.fn=function(a){var b="";
b+='\r\n	
<dt>\u6b4c\u66f2
</dt>\r\n	
<dd class="song-list">\r\n		
<ul>\r\n			';
var c={};
return c.fn=function(a){var b="";
b+='\r\n			
<li>
<a href="http://www.xiami.com/song/';
var c=k(f,a,{},"song_id",0,7);
b+=i(c,!0),b+='" target="_blank" title="';
var d=k(f,a,{},"song_name",0,7);
b+=i(d,!1),b+="-";
var e=k(f,a,{},"artist_name",0,7);
b+=i(e,!1),b+='">';
var g=k(f,a,{},"song_name",0,7);
b+=i(g,!1),b+="-";
var h=k(f,a,{},"artist_name",0,7);
b+=i(h,!1),b+='
</a> 
<a onclick="SEIYA.addAndPlay(';
var j=k(f,a,{},"song_id",0,7);
return b+=i(j,!0),b+=')" class="play-btn">
</a>
</li>\r\n			'},b+=h(f,a,c,"songs",6),b+="\r\n		
</ul>\r\n	
</dd>\r\n	"},c+=h(f,a,l,"if",2),c+="\r\n	";
var o={},p=[],q=j(f,a,"albums",0,12);
p.push(q),o.params=p,o.fn=function(a){var b="";
b+='\r\n	
<dt>\u4e13\u8f91
</dt>\r\n	
<dd class="album-list">\r\n		
<ul>\r\n			';
var c={};
return c.fn=function(a){var b="";
b+='\r\n			
<li>\r\n				
<div class="album">\r\n					
<div class="img">\r\n						
<a href="http://www.xiami.com/album/';
var c=k(f,a,{},"album_id",0,20);
b+=i(c,!0),b+='" target="_blank" title="';
var d=k(f,a,{},"title",0,20);
b+=i(d,!1),b+='">
<img src="http://img.xiami.net/';
var e=k(f,a,{},"album_logo",0,20);
b+=i(e,!1),b+='" width="30" height="30" alt="';
var g=k(f,a,{},"title",0,20);
b+=i(g,!1),b+='"  />
</a>\r\n					
</div>\r\n					
<div class="name">\r\n						
<p>
<a href="http://www.xiami.com/album/';
var h=k(f,a,{},"album_id",0,23);
b+=i(h,!0),b+='" target="_blank" title="';
var j=k(f,a,{},"title",0,23);
b+=i(j,!1),b+='">';
var l=k(f,a,{},"title",0,23);
b+=i(l,!1),b+='
</a>
</p>\r\n						
<p>
<a href="http://www.xiami.com/album/';
var m=k(f,a,{},"album_id",0,24);
b+=i(m,!0),b+='" target="_blank" title="';
var n=k(f,a,{},"title",0,24);
b+=i(n,!1),b+='">';
var o=k(f,a,{},"artist_name",0,24);
b+=i(o,!1),b+='
</a>
</p>\r\n					
</div>\r\n				
</div>\r\n				
<a onclick="SEIYA.addPlayalbum(';
var p=k(f,a,{},"album_id",0,27);
return b+=i(p,!0),b+=')" class="play-btn">
</a>\r\n			
</li>\r\n			'},b+=h(f,a,c,"albums",16),b+="\r\n		
</ul>\r\n	
</dd>\r\n	"},c+=h(f,a,o,"if",12),c+="\r\n	";
var r={},s=[],t=j(f,a,"artists",0,33);
s.push(t),r.params=s,r.fn=function(a){var b="";
b+='\r\n	
<dt>\u827a\u4eba
</dt>\r\n	
<dd class="artist-list">\r\n		
<ul>\r\n			';
var c={};
return c.fn=function(a){var b="";
b+='\r\n			
<li>\r\n				
<div class="artist">\r\n					
<div class="img">\r\n						
<a href="http://www.xiami.com/artist/';
var c=k(f,a,{},"artist_id",0,41);
b+=i(c,!0),b+='" target="_blank" title="';
var d=k(f,a,{},"name",0,41);
b+=i(d,!1),b+='">\r\n						
<img src="http://img.xiami.net/';
var e=k(f,a,{},"logo",0,42);
b+=i(e,!1),b+='" width="30" height="30" alt="';
var g=k(f,a,{},"name",0,42);
b+=i(g,!1),b+='" />
</a>\r\n					
</div>\r\n					
<div class="name">\r\n						
<a href="http://www.xiami.com/artist/';
var h=k(f,a,{},"artist_id",0,45);
b+=i(h,!0),b+='" target="_blank" title="';
var j=k(f,a,{},"name",0,45);
b+=i(j,!1),b+='">';
var l=k(f,a,{},"name",0,45);
return b+=i(l,!1),b+="
</a>\r\n					
</div>\r\n				
</div>\r\n			
</li>\r\n			"},b+=h(f,a,c,"artists",37),b+="\r\n		
</ul>\r\n	
</dd>\r\n	"},c+=h(f,a,r,"if",33),c+='\r\n
</dl>\r\n
<div class="result-more">\r\n	
<a href="http://www.xiami.com/search?key=';
var u=k(f,a,{},"key",0,55);
return c+=i(u,!0),c+='" target="_blank">\u66f4\u591a\u7ed3\u679c
</a>\r\n
</div>'}}),

KISSY.add("page/mods/search",["node","base","event","io","xtemplate","./xtpl/search-xtpl","utils/base"],function(a,b,c,d){var e=b("node"),f=b("base"),g=b("event"),h=b("io"),i=b("xtemplate"),j=b("./xtpl/search-xtpl"),k=b("utils/base"),l=e.all,m=new i(j),n='
<dl>
<dt>\u6682\u65e0\u7ed3\u679c
</dt>
<dd>
<div class="search-none">
<a href="http://www.xiami.com/search?key={{key}}" target="_blank">\u641c\u7d22"{{key}}"
</a>
</div>
</dd>
</dl>',o=new i(n),p={initializer:function(){var a=this;
a.timer=null,l('
<div class="search-result" id="J_searchResult" style="display:none">
</div>').appendTo("body"),a.set("wrap","#J_searchResult"),a.set("icon","#J_searchStatus"),g.on(a.get("input"),"valuechange",function(b){a._showResult(b.newVal)}),g.on(a.get("input"),"focusin",function(b){b.halt(),a._showCompletion()}),g.delegate(document,"click","#J_searchResult",function(a){"a"!==a.target.tagName.toLowerCase()&&a.halt()}),g.on(document,"click",function(b){return"J_searchInput"==b.target.id&&"input"==b.target.tagName.toLowerCase()?!1:void a._hideCompletion()})},_showResult:function(b){var c=this;
c.timer&&clearTimeout(c.timer);
var b=a.trim(b);
return a.log(["_showResult:",b]),""==b?(c._hideCompletion(),!1):void(c.timer=setTimeout(function(){c.set("key",b)},300))},_onSetKey:function(a){var b=this;
return a?void b._sendSearch(a):!1
},_sendSearch:function(b){var c=this;
c.get("icon").addClass("loading"),c.IO=new h({url:k.SEARCH_JSON,dataType:"jsonp",data:{t:4,k:encodeURIComponent(b),n:3},complete:function(){a.log("search complete"),c.get("icon").removeClass("loading")},success:function(a){var d,e={songs:a.songs.length>0?a.songs:null,albums:a.albums.length>0?a.albums:null,artists:a.artists.length>0?a.artists:null,key:b};
d=e.songs||e.albums||e.artists?m.render(e):o.render(e),c.get("wrap").html(d).show()},error:function(){var a={key:b},d=o.render(a);
c.get("wrap").html(d).show()}})},_showCompletion:function(){var b=this,c=a.trim(b.get("input").val());
return c?void b._sendSearch(c):!1},_hideCompletion:function(){var a=this;
a.set("key","",{silent:!0}),a.get("wrap").hide()}},q={ATTRS:{input:{value:"",setter:function(a){return l(a)}},wrap:{value:"",setter:function(a){return l(a)}},icon:{value:"",setter:function(a){return l(a)}},key:{value:""}}};
d.exports=f.extend(p,q)}),

KISSY.add("page/mods/main",["node","io","event","xtemplate","utils/index/global","./shortcut","./player","./sidebar","./page","./user","./search"],function(a,b,c,d){function e(){}{var f=b("node"),g=(b("io"),b("event"),b("xtemplate"),b("utils/index/global")),h=b("./shortcut"),i=b("./player"),j=b("./sidebar"),k=b("./page"),l=b("./user"),m=b("./search");
f.all}if(a.UA.ie
<7||a.UA.opera
<16)return alert("\u867e\u5c0f\u7c73\u63d0\u9192\u60a8\uff1a\u6d4f\u89c8\u5668\u7248\u672c\u8fc7\u4f4e\uff0c\u8bf7\u5148\u5347\u7ea7\u6d4f\u89c8\u5668\u540e\u518d\u8bbf\u95ee\u54e6\u3002"),window.location.href="http://www.xiami.com/event/play2014",!1;
window.SEIYA=g;
var n=function(){var a=window.location.search.substr(1);
if(null!=a&&""!=a){for(var b={},c=a.split("&"),d=0;
d
<c.length;
d++){var e=c[d].split("=");
b[e[0]]=e[1]}return b}return{}}();
window.__TEST__=n.test||0,window.location.origin||(window.location.origin=window.location.protocol+"//"+window.location.hostname+(window.location.port?":"+window.location.port:""));
var o=e.prototype;
o.init=function(){var b=this;
b.SEARCH=new m({input:"#J_searchInput"}),b.USER=window.__USER__=new l({wrap:"#J_userInfo"}),b.USER.on("sync",function(a){var c=a.data;
b.PLAYER&&b.PLAYER.sync(c)});
var c=n.ids||"/song/playlist-default",d=n.uid||0;
d==b.USER.get("uid")&&(d=0),a.log(d,"","roomUid");
var e=-1!==location.href.indexOf("gitlabswf")?"http://gitlabswf.xiami.com/music/xiamiplayer/1.0.0/player.swf":"http://img.xiami.com/static/swf/seiya/player.swf?v="+a.now();
b.PLAYER=window.__PLAYER__=new i,b.PLAYER.init({src:e,params:{flashVars:{srNum:20,interval:120,dataUrl:0==d?c:"",host:-1!==location.href.indexOf("gitlabswf")?"http://pre.xiami.com":window.location.origin}}}),b.SIDEBAR=window.__SIDEBAR__=new j,b.SIDEBAR.init(this),b.PAGE=new k,b.PAGE.init(this),b.Shortcut=new h,b.Shortcut.on("space",function(){b.PLAYER.playOrPause()}),b.Shortcut.on("right",function(){b.PLAYER.next()}),b.Shortcut.on("left",function(){b.PLAYER.prev()}),b.Shortcut.on("up",function(){b.PLAYER.PlayerVolume.volumeUP()}),b.Shortcut.on("down",function(){b.PLAYER.PlayerVolume.volumeDOWN()}),b._addEvent()},o._addEvent=function(){},d.exports=e}),

KISSY.add("page/init",function(a){var b=a.makeArray(arguments);
a.ready(function(){for(var a=1;
a
<b.length;
a++){var c=b[a]||{};
(new c).init&&setTimeout(function(a){return function(){(new a).init()}}(c),0)}})},{requires:["./mods/main"]}),

KISSY.use("page/init");
