import express from 'express';
import { marked } from 'marked';
import { promises } from 'node:fs';
import { resolve } from 'node:path';

import { asyncMiddleware as $ } from '../../middleware/index.js';
import { homePath } from '../../home-path.js';

const { readFile } = promises;

const router = express.Router();

/* GET home page. */
router.get('/', $(async (req, res) => {
  const html = await readFile(resolve(homePath, './routes/readme/wrapper.html'), { encoding: 'utf-8' });
  const contents = await readFile(resolve(homePath, 'Instructions.md'), { encoding: 'utf-8' });
  const parsed = await marked.parse(contents, { async: true });
  const result = html.replace('<!--placeholder-->', parsed);
  res.status(200).send(result);
}));

export default router;
