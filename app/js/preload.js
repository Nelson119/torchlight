'use strict';
/*eslint-disable new-cap, no-unused-vars,
	no-use-before-define, no-trailing-spaces, space-infix-ops, comma-spacing,
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,no-empty,
	key-spacing ,curly, no-shadow, no-return-assign, no-redeclare, no-unused-vars,
	eqeqeq, no-extend-native, quotes , no-inner-declarations*/
/*global app, $ */
app.partial.preload = function(){


	function imageReload(callback){

		var imagePreload = {}, elements = [];

		var main = $('[role=main]').find('img[data-src], figure[data-src]');
		main.each(function(idx, ele){
			if($(ele).attr('data-src')){
				imagePreload[$(ele).attr('data-src')] = false;
				elements.push(ele);
			}
		});

		var outer = $('img[data-src], figure[data-src]').not(main);
		outer.each(function(idx, ele){
			if($(ele).attr('data-src')){
				imagePreload[$(ele).attr('data-src')] = false;
				elements.push(ele);
			}
		});
		
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

	app.imageReload = imageReload;

};	
