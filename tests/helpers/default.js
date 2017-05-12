
/**
 * Tests an HTML `DocumentFragment` for default structure and content
 * @param  {object} test - test runner
 * @param  {object} fragment - HTML `DocumentFragment`
 * @param {object} content - default content
 */
const defaultTest = (test, fragment, content) => {
  test.true(fragment.querySelector('figure') !== null, 'has a figure element');
  test.true(fragment.querySelector('figure').classList.contains(content.figure.class), 'figure element has default className');
  test.true(fragment.querySelector('img') !== null, 'has an image element');
  test.is(fragment.querySelector('img').getAttribute('src'), content.img.src, 'image has default image url');
  test.is(fragment.querySelector('img').getAttribute('alt'), content.img.alt, 'image has default image alternate text');
  test.true(fragment.querySelector('figcaption') !== null, 'has a figcaption element');
  test.is(fragment.querySelector('figcaption').textContent.trim(), content.figcaption.content, 'figcaption has default content');
  test.is(fragment.querySelector('figure').lastElementChild, fragment.querySelector('figcaption'), 'figcaption is second element');
};

module.exports = defaultTest;
