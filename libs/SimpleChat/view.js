/**
 * @module views/SimpleChat
 */

var Backbone = require('backbone'),

	/**
	 * @class
	 * @extends external:Backbone.Marionette.View
	 */
		SimpleChat = Backbone.Marionette.View.extend(
		/** @lends module:views/SimpleChat~SimpleChat.prototype */
		{
			ui : {
				addMessageButton  : '.add_message_button',
				messageLines      : '.message_lines',
				messageItem       : '.message_item',
				messageInputField : '.message_input_field'
			},

			events : {
				'click @ui.addMessageButton' : 'onAddMessageButtonClick'
			},

			/**
			 * Handles ui.addMessageButton click event and append the new message to the messageLines
			 */
			onAddMessageButtonClick : function() {
				var message = this.$(this.ui.messageInputField).text();
				if(this._validateMessage(message)) {
					this.$(this.ui.messageLines).append('<li class="message_item">' + message +'</li>');
				}
			},

			/**
			 * Validate the current message
			 */
			_validateMessage : function(message) {
				return message.length > 40 ? '' : message;
			}
		}
	);

module.exports = SimpleChat;
