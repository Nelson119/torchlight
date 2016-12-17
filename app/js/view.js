'use strict';
/*eslint-disable new-cap, no-unused-vars,
	no-use-before-define, no-trailing-spaces, space-infix-ops, comma-spacing,
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,no-empty,
	key-spacing ,curly, no-shadow, no-return-assign, no-redeclare, no-unused-vars,
	eqeqeq, no-extend-native, quotes , no-inner-declarations*/
/*global app, $ */
app.partial.view = function(){


	function updateContent(path, callback, isPopstate){
		// console.log(content, cat, cata, callback || null);
		isPopstate = isPopstate || false;

		var title = app.title;
		var container = app.pageContainer;
		var htmlContent = '';

		if(!isPopstate && location.pathname !== path){
			container.addClass('fade').removeClass('in');
		}

		$.get(app.rootPath + path, function(response){

			$(response).each(function(i, element){
				if($(element).attr('property') === 'og:title'){
					title = $(element).attr('content');
				}
				if($(element).attr('role') === 'main'){
					htmlContent = $(element).html();
				}
			});

			container.html(htmlContent);

			app.path = path;

			setTimeout(function(){
				container.addClass('in');				
			}, 100);

			app.imageReload(function(){
				if(!isPopstate){
					pushState({path: app.path, title: title}, 'update content: ' + path);
				}
			});

			if(typeof callback == 'function'){
				callback();
			}

		});
	}

	function pushState(info, ref){
		// console.log(info);
		info.title = info.title || document.title;
		document.title = info.title;
		if(history.pushState){
			// console.log(history.pushState);
        	history.pushState(info, info.title, info.path);
        }
	}

	function checkView(callback){
		var callback2 = function(){

			$('a[data-href]').unbind('click').on('click', function(e){
				var path = $(this).attr('data-href');
				updateContent(path);
			});
			if(typeof callback == 'function'){
				callback();
			}
		};
		if(app.path){
			updateContent(app.path, callback2, false);
		}else{
			app.imageReload(callback2);
		}
	}

	app.checkView = checkView;

	checkView();
};
