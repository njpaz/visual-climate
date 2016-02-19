import { moduleForModel, test } from 'ember-qunit';

moduleForModel('data-set', 'Unit | Model | data set', {
  needs: ['model:weather-datum']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
