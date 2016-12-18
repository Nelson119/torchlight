'use strict';
/*eslint-disable new-cap, no-unused-vars,
	no-use-before-define, no-trailing-spaces, space-infix-ops, comma-spacing,
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,no-empty,
	key-spacing ,curly, no-shadow, no-return-assign, no-redeclare, no-unused-vars,
	eqeqeq, no-extend-native, quotes , no-inner-declarations*/
/*global app, $ */
app.partial.preload = function(){

	app.dementions = {
		mobile: false,
		desktop: false
	};


	function imageReload(callback){

		var imagePreload = {}, elements = [];

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
		main.each(function(idx, ele){
			if($(ele).attr('data-src')){
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
		
		$.each(imagePreload, function(src, stat){
			var img = new Image();
			img.onload = function(){
				imagePreload[src] = true;
				var alldone = true;
				$.each(imagePreload, function($s, $done){
					alldone = $done && alldone;
				});
				var ret = $(elements).filter(function(){
					return src == $(this).attr('data-src');
				}).each(function(i, ele){
					if(ele.tagName.toLowerCase() === 'img'){
						$(ele).attr('src', $(ele).attr('data-src'));
					}else{
						$(ele).css('background-image', 'url(' + $(ele).attr('data-src') + ')');
					}
				});				

				if(alldone){
					//全部圖片下載完成
					imageLoaded();
				}
			};
			img.src = src;
		});

		function imageLoaded(){
			if(typeof callback == 'function'){
				callback();
			}
		}

	}


	app.imageReload = {
		init: function(){
			$(window).on('resize', function(){
				if($('img[data-src]:visible, figure[data-src]:visible').not('[src],[style]').length && $(window).width() <=768){
					imageReload(function(){
						app.dementions.mobile = true;
					});
				} else if($('img[data-src]:visible, figure[data-src]:visible').not('[src],[style]').length && $(window).width() > 768){
					imageReload(function(){
						app.dementions.desktop = true;
					});
				}
			}).trigger('resize');
		}
	};

};	
