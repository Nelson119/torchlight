'use strict';
/*eslint-disable new-cap, no-unused-vars,
	no-use-before-define, no-trailing-spaces, space-infix-ops, comma-spacing,
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,no-empty,
	key-spacing ,curly, no-shadow, no-return-assign, no-redeclare, no-unused-vars,
	eqeqeq, no-extend-native, quotes , no-inner-declarations*/
/*global app, $ */
app.partial.header = function(){
	
	var navShowSubTimeout = 0.25;

	var navShowSubTimeoutTick = 0;

	var nav = $('header');
	$('header nav >aside').on('mousemove', function(e){
		clearTimeout(navShowSubTimeoutTick);
		nav.addClass('nav-show-sub');
	});
	$('header').on('mousemove', function(e){
		clearTimeout(navShowSubTimeoutTick);
	});
	$('header').on('mouseout', function(e){
		clearTimeout(navShowSubTimeoutTick);
		navShowSubTimeoutTick = setTimeout(function(){
			nav.removeClass('nav-show-sub');
		}, navShowSubTimeout * 1000);
	});

	$(window).on('scroll', function(){
		var scrollTop = $(window).scrollTop();
		if(scrollTop > 30){
			$('header').addClass('shrink');
		}else{
			$('header').removeClass('shrink');
		}
	});
};	
