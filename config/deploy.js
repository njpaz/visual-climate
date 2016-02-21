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

  if (deployTarget === 'production') {
    ENV.build = {
      environment: 'production'
    };

    ENV.pipeline = {
      activateOnDeploy: true
    };

    ENV['ssh-tunnel'] = {
      username: process.env['SSH_USERNAME'],
      host: process.env['REDIS_HOST'],
      srcPort: process.env['REDIS_PORT']
    };

    ENV.redis = {
      keyPrefix: 'visual-climate',
      allowOverwrite: true,
      host: 'localhost',
      port: process.env['REDIS_PORT']
    };

    ENV.s3 = {
      accessKeyId: process.env['AWS_ACCESS_KEY'],
      secretAccessKey: process.env['AWS_SECRET_KEY'],
      bucket: 'visual-climate-production',
      region: 'us-west-2'
    };
  }

  return ENV;
};
