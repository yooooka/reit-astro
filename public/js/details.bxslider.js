$(document).ready(function(){
  var maxHeight = 0;
  $(".bxslider-detail li").each(function(){
    if ( $(this).find('img').height() > maxHeight) { 
      maxHeight = $(this).height();
    }
  });
  $(".bxslider-detail li span").height(maxHeight);

$('.bxslider-detail').bxSlider({
		mode: 'fade', //スライドのエフェクト　'horizontal', 'vertical', 'fade'
		speed: 600,//スライドのアニメーションの時間
		slideMargin: 0, //スライドとスライドのマージン
		startSlide: 0, //初めのスライドの指定
		randomStart: false, //スライドの初めをランダムに
		slideSelector: '', //スライドのセレクタを指定
		infiniteLoop: true, //ループさせるか否か
		hideControlOnEnd: false, //スライドが最後の時に、次へのリンクを消すか否か
		easing: null, //イージングの設定※easingのプラグインが必要
		captions: false, //キャプションの設定
		adaptiveHeight: false, //スライドの高さが違う場合、それぞれ調節して合わせるかどうか
		touchEnabled: true, //スワイプできるようにするか否か（スマートフォン）
		
		pager: true, //ページャーの有無
		pagerCustom: '#bx-pager',
		buildPager: null, //サムネイルページャーの指定
		
		controls: false, //次へ、前へ等のコントロールの有無
		nextText: 'Next', //次へのテキスト
		prevText: 'Prev', //前へのテキスト
		autoControls: false, //自動、ストップボタンの有無
		startText: 'Start', //自動ボタンのテキスト
		stopText: 'Stop',//ストップボタンのテキスト
		auto: false, //自動スタート再生さるかいなか
		pause: 8000 //スライドの切り替えの間
		
		//カルーセルの場合
		//minSlides: 1, //最低限表示する数
		//maxSlides: 1, //マックスで表示する数
		//moveSlides: 0, //スライドをどのくらいの数を動かすか
		//slideWidth: 0 //ひとつの要素の幅を指定
	});
});