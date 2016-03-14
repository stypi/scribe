var _ = require('lodash');
var browsers = require('./browsers');
var sauce = require('./sauce');


module.exports = function(config) {
  config.set({
    basePath: '../',
    urlRoot: '/karma/',
    port: 9876,

    files: [
      { pattern: 'dist/quill.snow.css', nocache: true },
      { pattern: 'dist/unit.js', nocache: true },
      { pattern: 'dist/*.map', included: false, served: true, nocache: true },
      { pattern: 'assets/favicon.png', included: false, served: true }
    ],
    proxies: {
      '/assets/': '/karma/base/assets/'
    },

    frameworks: ['jasmine'],
    reporters: ['progress'],
    colors: true,
    autoWatch: false,
    singleRun: true,
    browsers: ['Chrome'],

    client: {
      useIframe: false
    },

    coverageReporter: {
      dir: '.coverage',
      reporters: [
        { type: 'text' },
        { type: 'html' }
      ]
    },
    sauceLabs: {
      testName: 'quill-unit',
      options: {
        'public': 'public',
        'record-screenshots': false
      },
      build: sauce.build,
      username: sauce.username,
      accessKey: sauce.accessKey,
      tunnelIdentifier: sauce.tunnel
    },
    customLaunchers: browsers
  });
  if (process.env.TRAVIS) {
    config.transports = ['polling'];
    config.browsers = [process.env.BROWSER];
    config.browserDisconnectTimeout = 10000;
    config.browserDisconnectTolerance = 3;
    config.browserNoActivityTimeout = 60000;
    config.captureTimeout = 120000;
    if (process.env.BROWSER === 'ios-latest' || process.env.BROWSER === 'android-latest') {
      config.client.useIframe = true;
    }
  }
};
