/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var env = EmberApp.env()|| 'development';

  var fingerprintOptions = {
    enabled: true,
  };

  switch (env) {
    case 'development':
      fingerprintOptions.prepend = 'http://localhost:4200/';
    break;
  }

  var app = new EmberApp(defaults, {
    fingerprint: fingerprintOptions,
    emberCLIDeploy: {
      runOnPostBuild: (env === 'development') ? 'development-postbuild' : false,
      configFile: 'config/deploy.js',
      shouldActivate: true,
    },
  });

  app.import('bower_components/highcharts/highcharts.js');

  return app.toTree();
};
