/* ===========================================================

	Title: top.js
	Created: 2017-12-01

=========================================================== */
///////////////////////////////////////////////////////////  bxslider-mainvisual
$(document).ready(function(){
	$('.bxslider-mainvisual').bxSlider({
		mode: 'fade', //スライドのエフェクト　'horizontal', 'vertical', 'fade'
		speed: 600,//スライドのアニメーションの時間
		slideMargin: 0, //スライドとスライドのマージン
		startSlide: 0, //初めのスライドの指定
		randomStart: false, //スライドの初めをランダムに
		slideSelector: '', //スライドのセレクタを指定
		infiniteLoop: true, //ループさせるか否か
		hideControlOnEnd: false, //スライドが最後の時に、次へのリンクを消すか否か
		easing: null, //イージングの設定*easingのプラグインが必要
		captions: false, //キャプションの設定
		adaptiveHeight: false, //スライドの高さが違う場合、それぞれ調節して合わせるかどうか
		touchEnabled: true, //スワイプできるようにするか否か（スマートフォン）
		
		pager: false, //ページャーの有無
		buildPager: null, //サムネイルページャーの指定
		
		controls: false, //次へ、前へ等のコントロールの有無
		nextText: 'Next', //次へのテキスト
		prevText: 'Prev', //前へのテキスト
		autoControls: false, //自動、ストップボタンの有無
		startText: 'Start', //自動ボタンのテキスト
		stopText: 'Stop',//ストップボタンのテキスト
		auto: true, //自動スタート再生さるかいなか
		pause: 5000, //スライドの切り替えの間
		
		//カルーセルの場合
		//minSlides: 1, //最低限表示する数
		//maxSlides: 1, //マックスで表示する数
		//moveSlides: 0, //スライドをどのくらいの数を動かすか
		//slideWidth: 0 //ひとつの要素の幅を指定
	});
});
/////////////////////////////////////////// pickup-slider
$(function() {
  jQuery(window).load(function() {
    var film_roll = new FilmRoll({
      configure_load: true,
      container: '.pickup-slider',
      animation : 400,
      interval : 2000,
      pager : false
    });
  });
});
$(document).ready(function() {
	$('.pickup-slider-item').hover(function() {
		//pickup-slider-caption
		$(this).find('.pickup-slider-caption').stop(true,true).fadeIn(200).animate({'opacity':'0.7'}, {duration:300});
	},
	function() {
		$(this).find('.pickup-slider-caption').stop(true,true).fadeOut(200);
	});

});

/////////////////////////////////////////// top-banner-slider
$(function() {
  jQuery(window).load(function() {
    var film_roll = new FilmRoll({
      configure_load: true,
      container: '.top-banner__support-slider',
      animation : 400,
      interval : 2000,
      pager : false
    });
  });
});


/////////////////////////////////////////// popup
$(function(){
 //訂正資料ポップアップ
  popup();
  //訂正資料ボタンの非表示
  $(".popup-open").each(function() {
    var target = $(this).attr("href");
    if (!$("dd", target).get(0)) {
      $(this).hide();
    }
  });
});
