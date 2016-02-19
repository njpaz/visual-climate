import { isEqual } from 'visual-climate/helpers/is-equal';
import { module, test } from 'qunit';

module('Unit | Helper | is equal');

// Replace this with your real tests.
test('it returns true when both values are the same', function(assert) {
  let result = isEqual([42, 42]);
  assert.ok(result);
});

test('it returns false when values are not the same', function(assert) {
  let result = isEqual([42, 37]);
  assert.ok(!result);
});
