'use strict';
/*eslint-disable new-cap, no-unused-vars,
	no-use-before-define, no-trailing-spaces, space-infix-ops, comma-spacing,
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,no-empty,
	key-spacing ,curly, no-shadow, no-return-assign, no-redeclare, no-unused-vars,
	eqeqeq, no-extend-native, quotes , no-inner-declarations*/
/*global  $ */
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


$(function(){
    
    // 定義每個section
	$.each(app.partial, function(name, init){
		init();
    });

	//ios menu position
	$(window).on('scroll resize', function(e){
		if($('html.ios').length){
			// console.log(e);
			var t = window.innerHeight - window.innerWidth / 5;
			$('header nav').css('top', t);
		}
	});

	//預載圖片
    app.imageReload.init();


	if(!$('html.mobile,html.tablet').length){
		$('.board-common article').niceScroll({
			horizrailenabled:false
		});
	}
});


function extractUrlValue(key, url)
{
	if (typeof url === 'undefined'){
		url = window.location.href;
	}
	var match = url.match('[?&]' + key + '=([^&]+)');
	return match ? match[1] : null;
}


//判斷是否具有屬性
$.fn.hasAttr = function(attributeName){
	var attr = $(this).attr(attributeName);
	if (typeof attr !== typeof undefined && attr !== false) {
		return true;
	}else{
		return false;
	}
};


