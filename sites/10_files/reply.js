var reply = {
	parent_idxno:'',
	captchaEnable:'',
	replyAll:'',
	reply_sc_order_by:'',
	reply_page:'',
	
	reply_bbs_table:'',

	// 모달 타이틀 및 비회원 폼 데이터 전달대상을 구한다. 
	replyWrite:function(event){
		var modalStr;	
		switch($(this).data('mode')){
			case "reply"  : 
				modalStr = '댓글쓰기';
				$("#nomember-info").data( "target", '');			
				break;

			case "sub_reply" : 
				modalStr = '답글쓰기'; 			
				$("#nomember-info").data( "target", event.data.reply_parent_idxno);
				
				break;			
		}

		$("#reply-modal .reveal-title").html(modalStr);	
		$("#reply-modal").foundation('open');

	},

	// 댓글옵션 
	viewOption:function(event) {

		if($(this).siblings('.comments-more-option').css("display") == "none") {
			$(".comments-more-option").hide();
			$(this).siblings('.comments-more-option').show();
		} else {		
			$(this).siblings('.comments-more-option').hide();
		}

	},

	// 삭제옵션 
	setDeleteOption:function(event){

		$("#reply-delete-mode").val( $(this).closest('article').data('mode') );
		$("#reply-delete-idxno").val( $(this).closest('article').data('idxno') );
		$("#reply-delete-reply-parent-idxno").val( $(this).closest('article').data('reply-parent-idxno') );

		if( $(this).closest('article').data('is-member') == 'Y'){
			$("#delete-password-field").hide();
		}	

		$("#reply-delete-modal").foundation('open');

	},

	// 추천
	setVote:function(evnet){
		var $o = $(this);
		var idxno = $o.closest('article').data('idxno');

		if($o.attr('id').indexOf('vote-up') != '-1'){
			var voteType = "recommend";
			var tempClass = "fa-thumbs-o-up";
		}else if($o.attr('id').indexOf('vote-down') != '-1'){
			var voteType = "dissent";
			var tempClass = "fa-thumbs-o-down";
		}
		
		
		$o.find("i").removeClass(tempClass);
		$o.find("i").addClass('fa-spinner fa-spin');
					
		$.ajax({
					  type: "post",
					  dataType: "json",
					  url: "ajaxReplyVote.php",
					  data:{
						  idxno:idxno,
						  voteType:voteType
					  },
					  success: function(json) {
						  if(json.result == 'success'){
							  var temp = $o.find("span").text();
							  $o.find("span").text(parseInt(temp) + 1);
						  }else{
							  alert(json.msg);
						  }
					  },
					  error: function(e) {
						 alert('정상처리되지 않았습니다.');
					  },
					  complete:function(){
						  $o.find("i").removeClass('fa-spinner fa-spin');
						  $o.find("i").addClass(tempClass);
					  }
		});	
	},

	// 답글
	getSubReplyView:function(evnet){
		var $o = $(this);
		var idxno = $o.closest('article').data('idxno');
		var $target = $("#sub-view-" + idxno);
		
		

		if($o.data('load') == 'on'){
			$target.toggle();
		}else{

			$.ajax({
				  type: "post",
				  dataType: "html",
				  url: "ajaxGetSubReply.php",
				  data:{
					  parent_idxno:reply.parent_idxno,
					  reply_parent_idxno:idxno,
					  captchaEnable:reply.captchaEnable,
					  replyAll:reply.replyAll,
					  reply_sc_order_by:reply.reply_sc_order_by,
					  reply_page:reply.reply_page,
					  table:reply.reply_bbs_table
				  },
				  success: function(data) {
					 $target.html(data);
					 $target.find(".comments-more-btn").on('click', reply.viewOption);									// 댓글옵션 이벤트
					 $target.find(".reply-delete-btn").on('click', reply.setDeleteOption);								// 댓글삭제 이벤트
					 $target.find(".reply-subwrite-btn").on('click', {reply_parent_idxno:idxno}, reply.replyWrite);		// 답글달기 									 
					 $target.find("#content-"+idxno).on('keyup', {reply_parent_idxno:idxno},  reply.getTextLength);		// 글자계산 											 
					 $target.find(".vote-btn").on('click', reply.setVote);												// 추천반대

					 $target.show();
					 $o.attr('data-load','on');
				  },
				  error: function(e) {
					 alert('정상처리되지 않았습니다.');
				  }
			});	
		}
	},

	// 비회원 글쓰기
	noMemberCheck:function(event){
		
		
		var teget_idxno = $("#nomember-info").data('target');	
		var $reply_container =			 (teget_idxno)?$("#reply-container-"+teget_idxno):$("#reply-container");
		var $reply_write_btn =			 (teget_idxno)?$("#reply-write-btn-"+teget_idxno):$("#reply-write-btn");
		var $nomember_name_target =	     (teget_idxno)?$("#reply-insert-name-"+teget_idxno):$("#reply-insert-name");
		var $nomember_password_target =  (teget_idxno)?$("#reply-insert-password-"+teget_idxno):$("#reply-insert-password");
		var $nomember_captcha_target =   (teget_idxno)?$("#g-recaptcha-response-"+teget_idxno):$("#g-recaptcha-response");	
		var alidationflag = true;

		//alert(("#reply-container"+teget_idxno) );

		if($("#nomember-name").val() == ''){
			alert('이름을 입력하세요');
			$("#nomember-name").focus();
			return false; 
		}
		
		if($("#nomember-password").val() == ''){
			alert('비밀번호를 입력하세요');
			$("#nomember-password").focus();
			return false; 
		}	

		if(!reCapVal || reCapVal == 'undefined') {
			alert('자동등록방지 확인을 진행하세요');
			return false; 
		} 
		
		$("#login-member").text( $("#nomember-name").val() );
		
		$nomember_name_target.val( $("#nomember-name").val() );
		$nomember_password_target.val( $("#nomember-password").val() );	
		$nomember_captcha_target.val( $("#nomember-captcha").val() );


		$reply_container.show();
		$reply_write_btn.hide();

		$("#reply-modal").foundation('close');

		
	},

	modalCloser:function(event){
		
	  var modal = $(this);
	  switch(modal.attr('id')){
		  case "reply-modal" : 
			$("#nomember-info").hide();				// 비회원 입력폼 안보이도록 초기하
			break;
		  case "reply-delete-modal":
			$("#delete-password-field").show();		// 댓글삭제 보이도록 초기화 
			break;
	  }

	},

	getTextLength:function(event){
		o = $(this);
		var cur = Math.min(o.val().length, 400);
		

		if(event.data.reply_parent_idxno) $('#reply-cur-text-'+event.data.reply_parent_idxno).text(cur);
		else $('#reply-cur-text').text(cur);

		if(o.val().length > cur) o.val(  o.val().substring(0, cur) );
		o.css('height', '40px');
		o.css('height', o.prop('scrollHeight'));		
	}

}


