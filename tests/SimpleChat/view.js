var assert = require('chai').assert,
	sinon = require('sinon'),
	Backbone = require('backbone'),
	testContent = require('./content/testSimpleChat.html'),

	SimpleChat = require('../../libs/SimpleChat/view');

suite('TESTING SIMPLE_CHAT view', function() {
	setup(function() {
		Backbone.$('#sandbox').html(testContent);
		SimpleChat.prototype.onAddMessageButtonClick = sinon.spy(SimpleChat.prototype, 'onAddMessageButtonClick');
		this.simpleChat = new SimpleChat({el : '.simple_chat'});
	});

	teardown(function() {
		SimpleChat.prototype.onAddMessageButtonClick.restore();
	});

	test('test add new messages', function() {
		this.simpleChat.$(this.simpleChat.ui.messageInputField).text('This is the first message');
		this.simpleChat.$(this.simpleChat.ui.addMessageButton).trigger('click');
		assert.isTrue(this.simpleChat.onAddMessageButtonClick.calledOnce);
		assert.strictEqual(Backbone.$(this.simpleChat.ui.messageLines).children().last().text(),'This is the first message');

		this.simpleChat.$(this.simpleChat.ui.messageInputField).text('This is the second message');
		this.simpleChat.$(this.simpleChat.ui.addMessageButton).trigger('click');
		assert.isTrue(this.simpleChat.onAddMessageButtonClick.calledTwice);
		assert.strictEqual(Backbone.$(this.simpleChat.ui.messageLines).children().last().text(),'This is the second message');
		assert.lengthOf(Backbone.$(this.simpleChat.ui.messageLines).children(),2);
	});

	test('test empty message', function() {
		this.simpleChat.$(this.simpleChat.ui.messageInputField).text('');
		this.simpleChat.$(this.simpleChat.ui.addMessageButton).trigger('click');
		assert.lengthOf(Backbone.$(this.simpleChat.ui.messageLines).children(),0);
	});

	test('test max charaters', function() {
		this.simpleChat.$(this.simpleChat.ui.messageInputField)
			.text('0123456789012345678901234567890123456789');
		this.simpleChat.$(this.simpleChat.ui.addMessageButton).trigger('click');
		assert.strictEqual(Backbone.$(this.simpleChat.ui.messageLines).children().last().text(),'0123456789012345678901234567890123456789');
		assert.lengthOf(Backbone.$(this.simpleChat.ui.messageLines).children(),1);

		this.simpleChat.$(this.simpleChat.ui.messageInputField)
			.text('0123456789012345678901234567890123456789+');
		this.simpleChat.$(this.simpleChat.ui.addMessageButton).trigger('click');
		assert.lengthOf(Backbone.$(this.simpleChat.ui.messageLines).children(),1);
	});
});
