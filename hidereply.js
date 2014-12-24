var hidereply = function() {
	// 隐藏数量较多的回复贴
		
	var CurrentUrl = window.location.href;
	if (CurrentUrl.indexOf("/group/thread-detail/") != -1) {
		var MaxReply = 5; // 最多显示数量
		var ReplyArr = new Array(); //记录加了隐藏开关的楼号
		var total_topic = $('div.parent_post'); //有回复的楼数
		for (var i=0;i<total_topic.length;i++) {
			topic_reply = $(total_topic[i]).find('div[class="post_item"]'); //每一楼的回复数
			if (topic_reply.length > MaxReply){
				var addswitch = '<a style="color:#FF8000" title="" href="javascript:void(0)" id="replyshow_' + i + '">展开回复</a>';
				$(topic_reply[MaxReply-1]).find('span.floor').before(addswitch);
				ReplyArr.push(i);
				for (var j=MaxReply;j<topic_reply.length;j++) {
					$(topic_reply[j]).attr('id','morereply_'+i);
				}			
			}
			
		}
		
		if (ReplyArr.length > 0) {
			var MainSwitch = '<a style="color:#FF8000" title="" href="javascript:void(0)" id="replyshowAll">展开全部回复</a>';
			$('div.post_item').eq(0).find('span.floor').eq(0).before(MainSwitch);
		}
		
		$("div[id^=morereply_]").hide(); //隐藏吧，小回复:-b！
		
		$("a[id^=replyshow_]").toggle(
			function(){
				var rid = this.id.split('_')[1];
				$("div#morereply_"+rid).show();
				$(this).html('折叠回复');
				$(this).attr('style', 'color:#999');
			},
			function(){
				var rid = this.id.split('_')[1];
				$("div#morereply_"+rid).hide();
				$(this).html('展开回复');
				$(this).attr('style', 'color:#FF8000');
			}
		);
		
		$("a[id=replyshowAll]").toggle(  // 不直接显示隐藏，调用各楼click事件，避免逻辑错误
			function(){
				for (var x in ReplyArr) {
					if ($("a#replyshow_"+ReplyArr[x]).text() == '展开回复') {
						$("a#replyshow_"+ReplyArr[x]).click();
					}
				}
				$(this).html('折叠全部回复');
				$(this).attr('style', 'color:#999');
			},
			function(){
				for (var x in ReplyArr) {
					if ($("a#replyshow_"+ReplyArr[x]).text() == '折叠回复') {
						$("a#replyshow_"+ReplyArr[x]).click();
					}
				}
				$(this).html('展开全部回复');
				$(this).attr('style', 'color:#FF8000');
			}
		);


	}
};

hidereply();

