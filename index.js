'use strict';

/**
 * Figure-Image pattern
 * Documents a system-agnostic HTML pattern for a figure element containing an image
 * @module figureImage
 */

module.exports = {
  name: 'figure-image',
  description: 'A system-agnostic HTML pattern for a figure element containing an image',
  content: {
    figure: {
      class: 'figure-image',
    },
    img: {
      alt: 'Foo Image',
      src: 'https://unsplash.it/200/300',
    },
    figcaption: {
      content: 'Foo image caption',
    },
  },
  versions: {
    default: './src/figure-image.html',
  },
};
