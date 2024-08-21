import { Api } from '../db/api.js';

export function api(req, res, next) {
  req.api = new Api(req.container.cradle);
  next();
}
