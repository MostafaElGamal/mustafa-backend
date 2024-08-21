import awilix from 'awilix';
import { Api } from '../db/api.js';
import { connect } from '../db/db.js';
import { DbConfig, FileAdapter } from '../db/missing-types.js';
import { resolve } from 'node:path';
import { homePath } from '../home-path.js';

export const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
});

container.register({
  dbPath: awilix.asValue(resolve(homePath, 'db/db.json')),
  storage: awilix.asClass(FileAdapter).classic(),
  dbConfig: awilix.asClass(DbConfig).classic(),
  db: awilix.asFunction(connect).singleton(),
  api: awilix.asClass(Api).classic(),
});
