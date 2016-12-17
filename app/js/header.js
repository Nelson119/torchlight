'use strict';
/*eslint-disable new-cap, no-unused-vars,
	no-use-before-define, no-trailing-spaces, space-infix-ops, comma-spacing,
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,no-empty,
	key-spacing ,curly, no-shadow, no-return-assign, no-redeclare, no-unused-vars,
	eqeqeq, no-extend-native, quotes , no-inner-declarations*/
/*global app, $ */
app.partial.header = function(){
	
	var navShowSubTimeout = 3;


	var navShowSubTimeoutTick = 0;
	$('header nav').on('mousemove', function(e){
		var nav = $('header nav');
		nav.addClass('nav-show-sub');
		clearTimeout(navShowSubTimeoutTick);
		navShowSubTimeoutTick = setTimeout(function(){
			nav.removeClass('nav-show-sub');
		});
		
	});
};	
