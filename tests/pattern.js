import test from 'ava';
import fs from 'fs';
import path from 'path';

import pattern from '../';

/**
 * Tests covers the min requirements for a generic pattern
 */
test('Pattern exports', t => {
  t.is(typeof pattern, 'object', 'pattern exports an object');
});

test('Required properties', t => {
  t.true(pattern.hasOwnProperty('name'), 'pattern has a name');
  t.true(pattern.hasOwnProperty('description'), 'pattern has a description');
  t.true(pattern.hasOwnProperty('content'), 'pattern has content');
  t.true(pattern.hasOwnProperty('versions'), 'pattern has versions');
  t.true(pattern.versions.hasOwnProperty('default'), 'pattern has a default version');
  t.is(typeof pattern.versions.default, 'string', 'default version is a string');
  t.is(pattern.versions.default, './src/figure-image.html', 'default version references correct file');
  t.true(fs.existsSync(pattern.versions.default), 'referenced default file exists');
});

