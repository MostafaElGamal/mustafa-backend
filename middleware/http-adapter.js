import { isObjectLike } from 'lodash-es';
import onFinished from 'on-finished';

import { asyncMiddleware as $ } from './async.js';
import { sendHttpError } from '#utils';


export function httpAdapter(cb, successResponse = 200) {
  return $(async function httpAdapterMiddleware(req, res) {
    try {
      const useVerbose = req.container.resolve('useVerbose');
      const result = await cb(req);
      if (isObjectLike(result) && result.pipe) {
        return result.pipe(res);
      }
      res.status(successResponse).send(result);
      if (useVerbose) {
        onFinished(res, () => console.log(result)); // eslint-disable-line no-console
      }
    } catch (e) {
      sendHttpError(res, e);
    }
  });
}
