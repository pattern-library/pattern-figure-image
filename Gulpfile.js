'use strict';

const gulp = require('gulp');

require('punchcard-runner')(gulp, {
  application: {
    library: {
      src: [
        'src',
      ],
    }
  },
  tasks: {
    nodemon: {
      extension: 'js html yml'
    },
    watch: [
      'browser-sync',
      'js:watch',
      'sass:watch',
      'imagemin:watch',
    ],
  },
});
