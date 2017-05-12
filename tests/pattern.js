import test from 'ava';
import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';

import plugin from '../';

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

  t.true(frag.querySelector('figure') !== null, 'has a figure element');
  t.true(frag.querySelector('figure').classList.contains(content.figure.class), 'figure element has default className');
  t.true(frag.querySelector('img') !== null, 'has an image element');
  t.is(frag.querySelector('img').getAttribute('src'), content.img.src, 'image has default image url');
  t.is(frag.querySelector('img').getAttribute('alt'), content.img.alt, 'image has default image alternate text');
  t.true(frag.querySelector('figcaption') !== null, 'has a figcaption element');
  t.is(frag.querySelector('figcaption').textContent, content.figcaption.content, 'figcaption has default content');
  t.is(frag.querySelector('figure').lastElementChild, frag.querySelector('figcaption'), 'figcaption is second element');
})
