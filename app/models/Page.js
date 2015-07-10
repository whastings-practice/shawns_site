var keystone = require('keystone');

var Types = keystone.Field.Types;

/**
 * Page Model
 * ==========
 */

var Page = new keystone.List('Page', {
  autokey: {path: 'permalink', from: 'title', unique: true}
});

Page.add({
  title: {type: String, required: true, initial: true, index: true},
  content: {type: Types.Html, wysiwyg: true, height: 400, initial: true},
  permalink: {type: String, index: true}
});

Page.track = true;
Page.defaultColumns = 'title, content';
Page.register();
