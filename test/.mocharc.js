'use strict';

module.exports = {
  quiet: true,
  require: [
    __dirname + '/common.js',
  ],
  diff: true,
  extension: ['js'],
  package: './package.json',
  reporter: 'spec',
  timeout: 10000,
  ui: 'bdd',
  recursive: true,
  'watch-files': ['test/*.js']
};

