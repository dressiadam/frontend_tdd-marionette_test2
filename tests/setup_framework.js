module.exports = (function() {
	// setup backbone
	var Backbone = require('backbone'),
		jQuery = require('jquery');

	Backbone.$ = window.$ = jQuery;

	require('backbone.marionette');
})();
