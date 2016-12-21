'use strict';
/*eslint-disable new-cap, no-unused-vars,
	no-use-before-define, no-trailing-spaces, space-infix-ops, comma-spacing,
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,no-empty,
	key-spacing ,curly, no-shadow, no-return-assign, no-redeclare, no-unused-vars,
	eqeqeq, no-extend-native, quotes , no-inner-declarations*/
/*global  $ */

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var app = {};
app.partial = {};

// var dayOfMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// 網址為 gulp 或者 github 時 設定成debug 模式
var debug = /localhost[:]9000|nelson119.github.io/.test(location.href);

app.title = 'LINE 火炬之光 手遊版';
app.pageContainer = $('[role=main]');
app.path = extractUrlValue('path') ? decodeURIComponent(extractUrlValue('path')) : null;
app.github = /nelson.works/.test(location.href);
app.rootPath = app.github ? 'http://nelson.works/torchlight/' : 'http://localhost:9000/';

$(function () {

	// 定義每個section
	$.each(app.partial, function (name, init) {
		init();
	});

	//ios menu position
	$(window).on('scroll resize', function (e) {
		if ($('html.ios').length && $(window).width() <= 768) {
			// console.log(e);
			var t = window.innerHeight - window.innerWidth / 5;
			$('header nav').css('top', t);
		} else {
			$('header nav').removeAttr('style');
		}
	});

	//預載圖片
	app.imageReload.init();

	if (!$('html.mobile,html.tablet').length) {
		$('.board-common article').niceScroll({
			horizrailenabled: false
		});
	}
});

function extractUrlValue(key, url) {
	if (typeof url === 'undefined') {
		url = window.location.href;
	}
	var match = url.match('[?&]' + key + '=([^&]+)');
	return match ? match[1] : null;
}

//判斷是否具有屬性
$.fn.hasAttr = function (attributeName) {
	var attr = $(this).attr(attributeName);
	if ((typeof attr === 'undefined' ? 'undefined' : _typeof(attr)) !== (typeof undefined === 'undefined' ? 'undefined' : _typeof(undefined)) && attr !== false) {
		return true;
	} else {
		return false;
	}
};
//# sourceMappingURL=app.js.map

'use strict';
/*eslint-disable new-cap, no-unused-vars,
	no-use-before-define, no-trailing-spaces, space-infix-ops, comma-spacing,
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,no-empty,
	key-spacing ,curly, no-shadow, no-return-assign, no-redeclare, no-unused-vars,
	eqeqeq, no-extend-native, quotes , no-inner-declarations*/
/*global app, $ */

app.partial.share = function () {

	var share = {
		facebook: function facebook(href, title) {
			href = encodeURIComponent(href || location.href + '?utm_source=facebook&utm_medium=fbshare_m&utm_campaign=roseanni');
			title = encodeURIComponent(title || document.title);
			window.open('https://www.facebook.com/sharer.php?u=' + href + '&amp;t=' + title);
		},
		googleplus: function googleplus(href) {
			href = encodeURIComponent(href || location.href + '?utm_source=g+&utm_medium=fbshare_m&utm_campaign=roseanni');
			window.open('https://plus.google.com/share?url=' + href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
		},
		email: function email(href, title) {
			href = encodeURIComponent(href || location.href + '?utm_source=email&utm_medium=fbshare_m&utm_campaign=roseanni');
			title = encodeURIComponent(title || document.title);
			var body = encodeURIComponent('' + href + ' #' + title + '');
			var to = 'service@torchlight.tw';
			var su = '我有問題:';
			if ($('html.ios').length) {
				location.href = 'mailto:' + to + '&subject=' + encodeURIComponent(su);
			} else {
				window.open('https://mail.google.com/mail/?view=cm&fs=1&to=' + to + '&su=' + su + ':&bcc=');
			}
		}
	};

	app.share = share;
};
//# sourceMappingURL=share.js.map

'use strict';
/*eslint-disable new-cap, no-unused-vars,
	no-use-before-define, no-trailing-spaces, space-infix-ops, comma-spacing,
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,no-empty,
	key-spacing ,curly, no-shadow, no-return-assign, no-redeclare, no-unused-vars,
	eqeqeq, no-extend-native, quotes , no-inner-declarations*/
/*global app, $ */

app.partial.preload = function () {

	app.dementions = {
		mobile: false,
		desktop: false
	};

	function imageReload(callback) {

		var imagePreload = {},
		    elements = [];

		// var main = $('[role=main]').find('img[data-src]:not(.visible-xs):not(.hidden-xs), figure[data-src]:not(.visible-xs):not(.hidden-xs)');
		// main.each(function(idx, ele){
		// 	if($(ele).attr('data-src')){
		// 		imagePreload[$(ele).attr('data-src')] = false;
		// 		elements.push(ele);
		// 	}
		// });

		// var outer = $('img[data-src]:not(.visible-xs):not(.hidden-xs), figure[data-src]:not(.visible-xs):not(.hidden-xs)').not(main);
		// outer.each(function(idx, ele){
		// 	if($(ele).attr('data-src')){
		// 		imagePreload[$(ele).attr('data-src')] = false;
		// 		elements.push(ele);
		// 	}
		// });

		var main = $('img[data-src]:visible, figure[data-src]:visible').not('[src],[style]');
		main.each(function (idx, ele) {
			if ($(ele).attr('data-src')) {
				imagePreload[$(ele).attr('data-src')] = false;
				elements.push(ele);
			}
		});
		var nav = $('header nav img').not('[src],[style]');
		nav.each(function (idx, ele) {
			if ($(ele).attr('data-src')) {
				imagePreload[$(ele).attr('data-src')] = false;
				elements.push(ele);
			}
		});
		// if(!app.dementions.mobile && $(window).width() <=768){
		// 	var dementionMobile = $('img[data-src].visible-xs, figure[data-src].visible-xs').not('[src],[style]');
		// 	dementionMobile.each(function(idx, ele){
		// 		if($(ele).attr('data-src')){
		// 			imagePreload[$(ele).attr('data-src')] = false;
		// 			elements.push(ele);
		// 		}
		// 	});
		// }else if(!app.dementions.desktop && $(window).width() > 768){
		// 	var dementionDesktop = $('img[data-src].hidden-xs, figure[data-src].hidden-xs').not('[src],[style]');
		// 	dementionDesktop.each(function(idx, ele){
		// 		if($(ele).attr('data-src')){
		// 			imagePreload[$(ele).attr('data-src')] = false;
		// 			elements.push(ele);
		// 		}
		// 	});
		// }

		$.each(imagePreload, function (src, stat) {
			var img = new Image();
			img.onload = function () {
				imagePreload[src] = true;
				var alldone = true;
				$.each(imagePreload, function ($s, $done) {
					alldone = $done && alldone;
				});
				var ret = $(elements).filter(function () {
					return src == $(this).attr('data-src');
				}).each(function (i, ele) {
					if (ele.tagName.toLowerCase() === 'img') {
						$(ele).attr('src', $(ele).attr('data-src'));
					} else {
						$(ele).css('background-image', 'url(' + $(ele).attr('data-src') + ')');
					}
				});

				if (alldone) {
					//全部圖片下載完成
					imageLoaded();
				}
			};
			img.src = src;
		});

		function imageLoaded() {
			if (typeof callback == 'function') {
				callback();
			}
		}
	}

	app.imageReload = {
		init: function init() {
			$(window).on('resize', function () {
				if ($('img[data-src]:visible, figure[data-src]:visible').not('[src],[style]').length && $(window).width() <= 768) {
					imageReload(function () {
						app.dementions.mobile = true;
					});
				} else if ($('img[data-src]:visible, figure[data-src]:visible').not('[src],[style]').length && $(window).width() > 768) {
					imageReload(function () {
						app.dementions.desktop = true;
					});
				}
				// if( $('html.ios').length && window.innerHeight ){
				// 	$('html, body').height(window.innerHeight);
				// }
			}).trigger('resize');
		}
	};
};
//# sourceMappingURL=preload.js.map

'use strict';
/*eslint-disable new-cap, no-unused-vars,
	no-use-before-define, no-trailing-spaces, space-infix-ops, comma-spacing,
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,no-empty,
	key-spacing ,curly, no-shadow, no-return-assign, no-redeclare, no-unused-vars,
	eqeqeq, no-extend-native, quotes , no-inner-declarations*/
/*global app */

app.partial.ga = function () {};
//# sourceMappingURL=ga.js.map
