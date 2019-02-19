/* eslint-disable import/no-extraneous-dependencies */
import Debug from 'debug';
/* eslint-enable import/no-extraneous-dependencies */
import project from '../config/project.config';
import server from '../server/main';

const debug = Debug('boilerplate:bin:server');

debug('Just before listening to server');
server.listen(project.server_port, project.dev_hostname);
debug(`🚎 Server is now running at http://${project.dev_hostname}:${project.server_port}.`);
