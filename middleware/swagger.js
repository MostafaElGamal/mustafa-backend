import swaggerUi from 'swagger-ui-express';
import { promises as fs } from 'node:fs';
import { resolve } from 'node:path';
import { homePath } from '../home-path.js';

const { readFile } = fs;

const docs = await readFile(resolve(homePath, 'docs/swagger.json'), { encoding: 'utf8' });

export function swagger() {
  return [
    swaggerUi.serve,
    swaggerUi.setup(JSON.parse(docs)),
  ];
}


