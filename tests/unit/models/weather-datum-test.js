import { moduleForModel, test } from 'ember-qunit';

moduleForModel('weather-datum', 'Unit | Model | weather datum', {
  needs: ['model:data-set', 'model:station']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
