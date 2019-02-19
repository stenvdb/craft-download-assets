import path from 'path';
import settings from '../../package.json';

const {
  dirClient,
  dirPublic,
  localUrl
} = settings.boilerplate || {};

const config = {
  env: process.env.NODE_ENV || 'development',

  dev_hostname: localUrl || '<%= localUrl %>',

  path_base: path.resolve(__dirname, '../..'),
  dir_client: dirClient || 'src',
  dir_public: dirPublic || 'www',

  server_port: process.env.PORT || 8080,

  compiler_fail_on_warning: false,
  compiler_quiet: false,
  compiler_stats: {
    assets: true,
    colors: true,
    children: false,
    chunks: false,
    chunkModules: false,
    chunkOrigins: false,
    hash: false,
    modules: false,
    timings: false,
    versian: false,
    excludeAssets: [/fonts/, /img/]
  }
};

config.globals = {
  'process.env': {
    NODE_ENV: JSON.stringify(config.env),
    BABEL_ENV: JSON.stringify(config.env),
  },
  NODE_ENV: config.env,
  DEV: config.env === 'development',
  PROD: config.env === 'production',
  SERVER: process.env.SERVER === '1'
};

function base(...args) {
  return path.resolve(...[config.path_base].concat([].slice.call(args)));
}

config.paths = {
  base,
  client: base.bind(null, config.dir_client),
  public: base.bind(null, config.dir_public),
};

export default config;
