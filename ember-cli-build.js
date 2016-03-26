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
    case 'production':
      fingerprintOptions.prepend = 'https://s3-us-west-2.amazonaws.com/visual-climate-production/';
      break;
  }

  var app = new EmberApp(defaults, {
    fingerprint: fingerprintOptions,
    emberCLIDeploy: {
      runOnPostBuild: (env === 'development') ? 'development-postbuild' : false,
      configFile: 'config/deploy.js',
      shouldActivate: true,
    },
    sassOptions: {
      includePaths: ['bower_components/materialize/sass']
    }
  });

  app.import('bower_components/highcharts/highcharts.js');

  return app.toTree();
};
