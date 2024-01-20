$(function(){
		
	// current
	var url = window.location.pathname;
	$('.module-tab a[href="'+url+'"], .module-tab a[href*="#"]').addClass('current');
	
	// pre 要素のタイトル
	$('.html').parent('pre').before('<p class="pre-title"></> HTML</p>');
	$('.css').parent('pre').before('<p class="pre-title"></> CSS</p>');	
	$('.js').parent('pre').before('<p class="pre-title"></> javascript</p>');	

});


// adjust
$(document).ready(function() {
	
	var prefix = 'module-type';
	var list = '';
	$(".module .module__title").each(function(i){
		aname = prefix + i;
		//$(this).before('<a name="' + aname + '"></a>');
		$(this).attr('id', '' + aname + '');
		list += '<li><a href="#' + aname + '"><span>' + $(this).text() + '</span></a></li>';
	});
	
	if ($(".module .module__title").length){
		$(".module").prepend('<ul class="module-link clearfix">' + list + '</ul>');
	}

	// #で始まるアンカーをクリックした場合に処理
	$('.module-link a[href^=#]').click(function() {
		// スクロールの速度
		var speed = 400; // ミリ秒
		// アンカーの値取得
		var href= $(this).attr("href");
		// 移動先を取得
		var target = $(href == "#" || href == "" ? 'html' : href);
		// 移動先を数値で取得
		var position = target.offset().top - 100;
		// スムーススクロール
		$('body,html').animate({scrollTop:position}, speed, 'swing');
		return false;
	});

});