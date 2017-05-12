import test from 'ava';
import fs from 'fs';
import njk from 'nunjucks';
import attrs from 'nunjucks-add-attrs-filter';
import { JSDOM } from 'jsdom';
import cloneDeep from 'lodash/cloneDeep';

import plugin from '../';
import defaultTest from './helpers/default.js';

let template;

const nunjucks = njk.configure({ autoescape: true });
nunjucks.addFilter('attrs', attrs);


test.serial('Nunjucks template existss', t => {
  t.is(typeof plugin, 'object', 'plugin exports an object');
  t.is(typeof plugin.versions, 'object', 'should have a pattern versions');
  t.is(typeof plugin.versions.nunjucks, 'string', 'should have a nunjucks version');
  t.true(fs.existsSync(plugin.versions.nunjucks), 'referenced nunjucks file exists');
  template = plugin.versions.nunjucks;
});

test('Nunjucks rendered with default content', t => {
  const content = plugin.content;
  const rendered = nunjucks.render(template, content);
  const frag = JSDOM.fragment(rendered);

  defaultTest(t, frag, content);
});

test('Nunjucks renders with minimum content', t => {
  const content = cloneDeep(plugin.content);
  delete content.figcaption;

  const rendered = nunjucks.render(template, content);
  const frag = JSDOM.fragment(rendered);

  t.true(frag.querySelector('figcaption') === null, 'does not have a figcaption element');
});

test('Nunjucks renders with caption first', t => {
  const content = cloneDeep(plugin.content);
  content.figcaption.before = true;
  const rendered = nunjucks.render(template, content);
  const frag = JSDOM.fragment(rendered);

  t.is(frag.querySelector('figure').firstElementChild, frag.querySelector('figcaption'), 'figcaption is first element');
});

test('Nunjucks accepts variables', t => {
  const content = {
    figure: {
      class: 'figure-image--different',
      id: 'figurine',
    },
    img: {
      alt: 'Bar Image',
      src: 'https://unsplash.it/300/200',
      width: '300',
      height: '200',
    },
    figcaption: {
      before: true,
      content: 'Bar image caption',
    },
  };
  const rendered = nunjucks.render(template, content);
  const frag = JSDOM.fragment(rendered);

  t.true(frag.querySelector('figure') !== null, 'has a figure element');
  t.true(frag.querySelector('figure').classList.contains(content.figure.class), 'figure element has new className');
  t.is(frag.querySelector('figure').getAttribute('id'), content.figure.id, 'figure has an id');
  t.true(frag.querySelector('img') !== null, 'has an image element');
  t.is(frag.querySelector('img').getAttribute('src'), content.img.src, 'image has new image url');
  t.is(frag.querySelector('img').getAttribute('alt'), content.img.alt, 'image has new image alternate text');
  t.is(frag.querySelector('img').getAttribute('width'), content.img.width, 'image has new image width');
  t.is(frag.querySelector('img').getAttribute('height'), content.img.height, 'image has new image height');
  t.true(frag.querySelector('figcaption') !== null, 'has a figcaption element');
  t.is(frag.querySelector('figcaption').textContent, content.figcaption.content, 'figcaption has new content');
  t.is(frag.querySelector('figure').firstElementChild, frag.querySelector('figcaption'), 'figcaption is first element');
});
