/* ===========================================================

	Title: common.js
	Created: 2017-12-13

=========================================================== */

$(function(){
	///////////////////////////////////////////  slicknav
	$('.gn').slicknav({
		label: '',
		duration: 500,
		easingOpen: "easeOutExpo", //available with jQuery UI
		easingClose: "easeOutExpo", //available with jQuery UI
		closedSymbol: '<i class="icon-plus"></i>',
		openedSymbol: '<i class="icon-minus"></i>',
		prependTo:'.global-navigation',
		closeOnClick: false,
		allowParentLinks: false
	});
	
	///////////////////////////////////////////  globalnavigation
	function overFunc(){
		$(".gn__secondary:not(:animated)",this).animate({
			height:"show",
			 opacity: 'show'
		}, {
			'duration': 300,
			'easing': 'easeOutExpo'
		});
		$(this).addClass('gn-over');
		$(".gn__secondary",this).addClass('secondary-over');
	}
	function outFunc(){
		$(this).find(".gn__secondary").delay( 10 ).animate({
			height:"hide",
			 opacity: 'hide'
		}, {
			'duration': 10,
			'easing': 'easeOutExpo'
		});
		$(this).removeClass('gn-over');
		$(".gn__secondary",this).removeClass('secondary-over');
	}
	$('.global-navigation .gn li').hover(overFunc,outFunc);
	
	///////////////////////////////////////////  search
	$('.header__search-open').click(function(){
		$('.header__search, .header__search-close').stop().fadeIn();
		$('#searchinput').focus();		
	});
	$('.header__search-close').click(function(){
		$('.header__search').stop().fadeOut();
		$('.header__search-close').stop().hide();
	});

	///////////////////////////////////////////  common
	$("body").prepend('<a id="pagetop" name="pagetop"></a>');
	
	///////////////////////////////////////////  title span
	$(".link-button__a a").wrapInner("<span></span>");

	///////////////////////////////////////////  current - target
	var target = [".gn__secondary a", "aside > ul > li > a", ".footer a", ".ul-sort li a", ".ul-backnumber a"];

	///////////////////////////////////////////  current - pattern
	var pattern = [
		[/feature\/feature1[a-z]+\.html/, "feature/feature1.html"],
		[/portfolio\/detail\.php/, "portfolio/index.html"],
		[/ir\/procedure\d+\.html/, "ir/procedure.html"],
		[/about\/sustainability\.html/, "about/environment.html"],
		[/strategy\/growth-growth\.html/, "strategy/growth-portfolio.html"],
		[/strategy\/growth-suport\.html/, "strategy/growth-portfolio.html"],
		[/strategy\/governance-disclosure\.html/, "strategy/governance.html"]
	];
	currentLink(target, pattern);
	currentLink([".tab-a li a"]);

	///////////////////////////////////////////  indentTable
	toIndentTable(".to_indent_table");

	//scroll-area
	scrollArea(getLang());
	
	///////////////////////////////////////////  tab
	$(".tab-a li a").wrapInner("<span></span>");
	$(".tab-a li a.current").closest("li").addClass("current");
	$(".tab-a li a").hover(
		function(){$(this).closest("li").addClass("active");},
		function(){$(this).closest("li").removeClass("active");}
	  );
	$(".tabs a, .tabs area").on('click', function (e) {
		// scroll cancell
		e.preventDefault();
		$("html, body").stop().animate();
		// panel check
		var target = $(this).attr('href');
		if (!$(target).length) return false;
		// hide tab
		$('.tab a', $(this).closest('.tabs')).removeClass('active');
		// active tab
		$(this).closest('.tab a').addClass('active');
		// hide panel
		$('.panel', $(target).closest('.panels')).removeClass('active').hide();
		// active panel
		$(target).addClass('active').fadeIn();
	});
	

	// tab-b $("#content").parents('table');
	$(".tab-b").append('<span class="icon-plus"></span>');
	//$(".tab-b").css({'overflow':'hidden'});
	$(".tab-b span").click(function(){
		if($(this).parents('.tab-b').css("overflow")=="hidden"){
			$(this).parents('.tab-b').css({'overflow':'inherit', height: 'auto'});
			$(this).parents('.tab-b ul').animate( { height: 'auto' }, 'slow' );
			$(this).removeClass("icon-plus").addClass("icon-minus");
		}
		else{
			$(this).parents('.tab-b').css({'overflow':'hidden', height: '30'});
			$(this).parents('.tab-b ul').animate( { height: '30' }, 'slow' );
			$(this).removeClass("icon-minus").addClass("icon-plus");
		}
		return false;
	});

	///////////////////////////////////////////  pagetop
	var topBtn = $('.bt-pagetop');
	var showFlag = false;
	$(window).scroll(function () {
		if ($(this).scrollTop() > 200) {
			if (showFlag == false) {
				showFlag = true;
				topBtn.stop().fadeIn();
			}
		} else {
			if (showFlag) {
				showFlag = false;
				topBtn.stop().fadeOut();
			}
		}
	});
	///////////////////////////////////////////  page-link
	$('.bt-pagetop a[href^=#], .main-visual__scroll a[href^=#], .ul-page-link a[href^=#], .ul-page-link-bottom a[href^=#], .ul-sort a[href^=#]').click(function () {
		var speed = 400;
		var href = $(this).attr("href");
		var target = $(href == "#" || href == "" ? 'html' : href);
		var position = target.offset().top;
		$('body,html').animate({
			scrollTop: position
		}, speed, 'swing');
		return false;
	});

});