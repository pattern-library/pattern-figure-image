import test from 'ava';
import React from 'react'; // eslint-disable-line no-unused-vars
import cloneDeep from 'lodash/cloneDeep';
import { JSDOM } from 'jsdom';
import { shallow, mount } from 'enzyme';

import plugin from '../';
import FigureImage, { Image } from '../src/figure-image.jsx'; // eslint-disable-line no-unused-vars
import defaultTest from './helpers/default.js';

test('Image: empty img tag', t => {
  const wrapper = shallow(<Image />);
  t.is(wrapper.is('img'), true, 'should create an image');
  t.is(wrapper.props().src, undefined, 'should have an undefined src');
});

test('Image: accepting attributes', t => {
  const content = plugin.content;
  const wrapper = shallow(<Image src={content.img.src} alt={content.img.alt} className="figure--image" width="200" data-test="non prop attr" />);
  t.is(wrapper.prop('src'), content.img.src, 'src should be an image url');
  t.is(wrapper.prop('alt'), content.img.alt, 'alt text should exist');
  t.is(wrapper.prop('width'), '200', 'width should be in elm');
  t.is(wrapper.prop('data-test'), 'non prop attr', 'should accept attr not in props');
  t.is(wrapper.hasClass('figure--image'), true, 'should receive a className');
});

test('React rendered with default content', t => {
  const content = cloneDeep(plugin.content);
  const wrapper = mount(<FigureImage {...content} />);

  // using wrapper debug to get a string to use the same tests as the default html file
  const frag = JSDOM.fragment(wrapper.debug());

  defaultTest(t, frag, plugin.content);
});

test('React renders with minimum content', t => {
  const content = cloneDeep(plugin.content);
  delete content.figcaption;

  const wrapper = mount(<FigureImage {...content} />);

  t.false(wrapper.find('figcaption').exists(), 'should not contain a caption');
});

test('FigureImage: allows a caption to be first', t => {
  const content = cloneDeep(plugin.content);
  content.figcaption = {
    before: true,
    content: 'I am a caption too',
  };
  const wrapper = mount(<FigureImage {...content} />);

  t.is(wrapper.find('figcaption').exists(), true, 'should contain a caption');
  t.is(wrapper.find('figcaption').text(), 'I am a caption too', 'should contain caption content');
  t.is(wrapper.find('figure').childAt(0).is('figcaption'), true, 'caption should be second child');
});
