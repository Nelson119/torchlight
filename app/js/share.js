'use strict';
/*eslint-disable new-cap, no-unused-vars,
	no-use-before-define, no-trailing-spaces, space-infix-ops, comma-spacing,
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,no-empty,
	key-spacing ,curly, no-shadow, no-return-assign, no-redeclare, no-unused-vars,
	eqeqeq, no-extend-native, quotes , no-inner-declarations*/
/*global app, $ */
app.partial.share = function(){

	var share = {
		facebook: function(href, title){
			href = encodeURIComponent(href || location.href + '?utm_source=facebook&utm_medium=fbshare_m&utm_campaign=roseanni');
			title = encodeURIComponent(title || document.title);
			window.open('https://www.facebook.com/sharer.php?u='+href+'&amp;t='+title);
		},
		googleplus: function(href){
			href = encodeURIComponent(href || location.href + '?utm_source=g+&utm_medium=fbshare_m&utm_campaign=roseanni');
			window.open('https://plus.google.com/share?url=' + href,'', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
		},
		email: function(href, title){
			href = encodeURIComponent(href || location.href + '?utm_source=email&utm_medium=fbshare_m&utm_campaign=roseanni');
			title = encodeURIComponent(title || document.title);
			var body = encodeURIComponent(''+href+' #' +title+'');
			var to = 'service@torchlight.tw';
			var su = '我有問題:';
			if($('html.ios').length){
				location.href = 'mailto:' + to + '&subject=' + encodeURIComponent(su);
			}else{
				window.open('https://mail.google.com/mail/?view=cm&fs=1&to='+to+'&su='+su+':&bcc=');
			}

		}
	};
	
	app.share = share;
};
