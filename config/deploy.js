module.exports = function(deployTarget) {
  var ENV = {};

  if (deployTarget === 'development-postbuild') {
    ENV.plugins = ['redis'];

    ENV.build = {
      environment: 'development'
    };

    ENV.redis = {
      keyPrefix: 'visual-climate',
      revisionKey: '__development__',
      allowOverwrite: true,
      host: 'localhost',
      port: 6379,
      distDir: function(context) {
        return context.commandOptions.buildDir;
      }
    };
  }

  return ENV;
};
