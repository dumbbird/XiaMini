	
var loadGroup = function() {
   var el = document.createElement("a");
	el.id = "gr_xiamini";
	el.className = 'bigtext middle  ';
	el.href = '/group';
	el.innerHTML = '小组';
  headEl = document.getElementsByClassName('subnav')[0];
  headEl.style.width = '320px';
  headEl.insertBefore(el, headEl.childNodes[3]);
  // sale = document.getElementsByClassName['bigtext last'][0];
  // sale.childNodes[0].style.display = 'none';
};

function removeGroup() {
  var el = document.getElementById("gr_xiamini");
  if (el) {
    el.parentNode.removeChild(el);
  }

}

function semicolCovert() {
	var el = document.getElementById("albums_info");
	if (el) {
		var txt = el.innerHTML;
		//alert(txt);
		txt = txt.replace(/<\/a>; <a href/g, "</a>/ <a href");
		el.innerHTML = txt;
	}
	/*
	txt = $("#track td.song_name").contents().filter(function(index){return this.nodeType === 3;}).text().split(" ");
	alert (txt);
	for (var i=0; i<txt.length; i++){
		if(txt[i].search(/;/) != -1){
			txt[i] = txt[i].replace(/;/g, " / ");
			txt[i] = txt[i].replace(/\&amp \/ /g, "&amp;");
			txt[i] = txt[i].replace(/  /g, " ");
		}
	}
	*/
	
	el = $('#album_song, #track, #relate_song').find('.song_name');
	for (var i=0; i<el.length; i++) {
		txt = $(el).eq(i).html();	// 直接获取html
		
		if(txt.search(/;/) != -1){
			// 如果检测到;，就做以下的替换。
			txt = txt.replace(/;/g, " / ");	
			//alert(txt); 
			txt = txt.replace(/\&amp \/ /g, "&amp;");
			txt = txt.replace(/  /g, " ");
			//alert(txt);
			$(el).eq(i).html(txt);		// 将html赋值回去	
		}
	}
	
}

function lrcheader() {
	var el = document.getElementById("lrc");
	if (el)
		el.innerHTML = el.innerHTML.replace(/<strong>歌词：<\/strong>/, "<strong>歌词及制作信息：</strong>");
}
removeGroup();
loadGroup();
semicolCovert();
lrcheader();
