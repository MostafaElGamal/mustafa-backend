import express from 'express';
import { forEach } from 'lodash-es';

export function createRoutes(endpoints) {
  const router = express.Router();
  forEach(endpoints, (endpoint) => endpoint(router));
  return router;
}
