import Debug from 'debug';
import { Server as HttpServer } from 'http';

import app from './express';
import IoCcontainer from './config/dependencies';

const debug = Debug('web-server');

let webServer:HttpServer;

const startGracefulShutdown = async () => {
  debug('Closing database connection...');
  await IoCcontainer.cradle.databaseService.closeConnection();
  debug('Starting shutdown of express...');
  webServer.close(() => {
    debug('Express shut down.');
  });
};

const init = async () => {
  try {
    debug('Connection to mongo db...');
    await IoCcontainer.cradle.databaseService.initDatabase();
    webServer = app.listen(process.env.LISTENING_PORT,
      () => debug(`Server running on port ${process.env.LISTENING_PORT}`));
  } catch (err) {
    debug(err);
  }
};

init();

process.on('unhandledRejection', (reason:Error) => {
  // Recommended: send the information to a crash reporting service (i.e. sentry.io)
  debug('Unhandled Rejection:', reason.stack);
  process.exit(1);
});

process.on('SIGTERM', startGracefulShutdown);
process.on('SIGINT', startGracefulShutdown);
