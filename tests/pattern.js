import test from 'ava';
import fs from 'fs';
import { JSDOM } from 'jsdom';

import plugin from '../';
import defaultTest from './helpers/default.js';

let pattern;

/**
 * Tests covers the min requirements for a pattern
 */
test('plugin exports', t => {
  t.is(typeof plugin, 'object', 'plugin exports an object');
});

test.serial('Required properties', t => {
  t.true(plugin.hasOwnProperty('name'), 'plugin has a name');
  t.true(plugin.hasOwnProperty('description'), 'plugin has a description');
  t.true(plugin.hasOwnProperty('content'), 'plugin has content');
  t.true(plugin.hasOwnProperty('versions'), 'plugin has versions');
  t.true(plugin.versions.hasOwnProperty('default'), 'plugin has a default version');
  t.is(typeof plugin.versions.default, 'string', 'default version is a string');
  t.is(plugin.versions.default, './src/figure-image.html', 'default version references correct file');
  t.true(fs.existsSync(plugin.versions.default), 'referenced default file exists');
  pattern = fs.readFileSync(plugin.versions.default, 'utf8');
});

test('default pattern', t => {
  const content = plugin.content;
  const frag = JSDOM.fragment(pattern);

  defaultTest(t, frag, content);
});
