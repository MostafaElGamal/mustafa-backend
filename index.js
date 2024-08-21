#!/usr/bin/env node

/* eslint linebreak-style: "off" */
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { asValue } from 'awilix';

import { startServer } from './bin/www.js';
import { container } from './bin/container.js';

yargs(hideBin(process.argv))
  .command({
    command: '* [port]',
    aliases: ['serve'],
    desc: 'Runs the server in a given port with or without authentication',
    builder: (yargs) => yargs
      .option('port', {
        describe: 'Port to bind on',
        type: 'number',
        default: 3000,
      })
      .coerce('port', port => {
        const numberPortValue = Number(port);
        const intPortValue = parseInt(port, 10);
        if (Number.isNaN(numberPortValue) || Number.isNaN(intPortValue) || numberPortValue !== intPortValue || intPortValue < 0 || intPortValue >= 65536) {
          throw new Error('The port must be an integer between 0 and 65535');
        }
        return intPortValue;
      })
      .option('auth', {
        describe: 'Run the server with authentication enabled',
        default: false,
        type: 'boolean',
      })
      .option('async', {
        describe: 'Process uploaded files in an asynchronous manner',
        default: false,
        type: 'boolean',
      })
      .option('verbose', {
        describe: 'Enable server logging for all requests',
        default: false,
        type: 'boolean',
      })
      .option('noreadme', {
        describe: 'Disable opening server home page with instructions automatically',
        default: false,
        type: 'boolean',
      }),
    handler: ({ auth, async, verbose, port, noreadme }) => {
      container.register({
        serverPort: asValue(port),
        useAuth: asValue(auth),
        useAsync: asValue(async),
        useVerbose: asValue(verbose),
        noReadme: asValue(noreadme),
      });
      startServer(port);
    },
  })
  .parse();
