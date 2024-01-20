/* ===========================================================

	Title:					qa.js
	Created:		2016-10-26
	Last Created:		2016-10-27
	
=========================================================== */

$(function(){
	//アコーディオン
	var curClass = "active";
	$(".accordion").each(function(i) { 
		var self = this;
		var $acitem = $(".accord-item", self);
		$acitem.hide();
		var $acbtn = $(".accord-btn", self);
		//ボタン動作
		$acbtn.on("click", function() {
			if ($(this).hasClass(curClass)) {
				//閉じる
				$acitem.slideUp();
				$(this).removeClass(curClass);
			} else {
				//他のアクティブなアコーディオンを閉じる
				$(".accord-btn." + curClass).trigger("click");
				//開く
				$acitem.slideDown();
				$(this).addClass(curClass);
			}
		});
		//初期表示
		if (i == 0) {
			$acitem.show();
			$acbtn.addClass(curClass);
		}
	});

});