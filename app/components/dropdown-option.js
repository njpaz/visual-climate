import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'option',
  attributeBindings: ['value', 'selected'],
  optionValuePath: '',
  optionLabelPath: '',

  value: Ember.computed('item', function() {
    var valuePath = this.get('optionValuePath');

    if (!Ember.isEmpty('optionValuePath')) {
      valuePath = '.' + valuePath;
    }

    return this.get('item' + valuePath);
  }),

  label: Ember.computed('item', function() {
    var labelPath = this.get('optionLabelPath');

    if (!Ember.isEmpty('optionValuePath')) {
      labelPath = '.' + labelPath;
    }

    return this.get('item' + labelPath);
  })
});
