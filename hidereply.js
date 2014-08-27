var hidereply = function() {
	// 隐藏数量较多的回复贴
		
	var CurrentUrl = window.location.href;
	if (CurrentUrl.indexOf("/group/thread-detail/") != -1) {
		var MaxReply = 2; // 最多显示数量
		var total_topic = $('div.parent_post'); //有回复的楼数
		for (var i=0;i<total_topic.length;i++) {
			topic_reply = $(total_topic[i]).find('div.post_item'); //每一楼的回复数
			if (topic_reply.length > MaxReply){
				addswitch = '<a style="color:#FF8000" title="" href="javascript:void(0)" id="replyshow_' + i + '">显示全部回复</a>';
				$(topic_reply[MaxReply-1]).find('span.floor').before(addswitch);
				for (var j=MaxReply;j<topic_reply.length;j++) {
					$(topic_reply[j]).attr('id','morereply_'+i);
				}			
			}
			
		}
		$("div[id^=morereply_]").hide(); //隐藏吧，小回复:-b！
		
		$("a[id^=replyshow_]").toggle(
			function(){
				var rid = this.id.split('_')[1];
				$("div#morereply_"+rid).show();
				$(this).html('显示部分回复');
			},
			function(){
				var rid = this.id.split('_')[1];
				$("div#morereply_"+rid).hide();
				$(this).html('显示全部回复');
			}
		);
		


	}
};

hidereply();

