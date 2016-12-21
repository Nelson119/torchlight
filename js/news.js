'use strict';
/*eslint-disable new-cap, no-unused-vars,
	no-use-before-define, no-trailing-spaces, space-infix-ops, comma-spacing,
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,no-empty,
	key-spacing ,curly, no-shadow, no-return-assign, no-redeclare, no-unused-vars,
	eqeqeq, no-extend-native, quotes , no-inner-declarations*/
/*global app, $ */

app.partial.news = function () {

	if (!$('html.mobile,html.tablet').length) {
		$('.news .board-content .list').niceScroll({
			horizrailenabled: false
		});
	}
};
//# sourceMappingURL=news.js.map
