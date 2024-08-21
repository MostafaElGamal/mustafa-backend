
/**
 * Module dependencies.
 */
import http from 'node:http';
import { createApp } from '../app.js';
import { container } from './container.js';
import open from 'open';

export function startServer(port = 3000) {
  const app = createApp(container);

  app.set('port', port);

  /**
     * Create HTTP server.
     */
  const server = http.createServer(app);

  function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }

    const bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
    case 'EACCES':
      throw new Error(bind + ' requires elevated privileges');
    case 'EADDRINUSE':
      throw new Error(bind + ' is already in use');
    default:
      throw error;
    }
  }

  /**
     * Event listener for HTTP server "listening" event.
     */

  async function onListening() {
    const addr = server.address();
    if (typeof addr !== 'string') {
      const address = `http://localhost:${addr.port}`;
      console.log('Listening on ' + address);  // eslint-disable-line no-console
      if (!container.resolve('noReadme')) {
        await open(address);
      }
      return;
    }
    console.log('Listening on ' + addr); // eslint-disable-line no-console
  }

  const $event = fn => () => fn().catch(console.error); // eslint-disable-line no-console

  server.listen(port);
  server.on('error', onError);
  server.on('listening', $event(onListening));
}


