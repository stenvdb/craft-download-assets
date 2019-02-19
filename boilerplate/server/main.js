/* eslint-disable import/no-extraneous-dependencies */
import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import Debug from 'debug';
/* eslint-enable import/no-extraneous-dependencies */
import webpackConfig from '../config/webpack.config';
import project from '../config/project.config';


const debug = Debug('app:config:server');

// Add the webpack-dev-server client entry point to all entry points
webpackConfig.entry.app.unshift(`webpack-dev-server/client?http://${project.dev_hostname}:${project.server_port}/`);

debug('Starting webpack compiler');
// Start Webpack
const compiler = webpack(webpackConfig);

// Pass compiler along to the webpack-dev-server
const server = new WebpackDevServer(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: project.compiler_quiet,
  noInfo: project.compiler_quiet,
  lazy: false,
  stats: project.compiler_stats
});

export default server;
