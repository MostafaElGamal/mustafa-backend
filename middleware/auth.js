import { asyncMiddleware as $ } from './async.js';
import { knownErrors, sendHttpError, ServerError, extractTokenFromHeader } from '#utils';

export function auth() {
  return $(async (req, res, next) => {

    const token = extractTokenFromHeader(req);
    if (!token) {
      return sendHttpError(res, knownErrors.missingCredentials());
    }
    if (token instanceof ServerError) {
      return sendHttpError(res, token);
    }
    try {
      const user = await req.api.verifyToken(token);
      if (!user) {
        return sendHttpError(res, knownErrors.missingCredentials());
      }
      req.user = { id: user.id, name: user.name, email: user.email };
      next();
    } catch (e) {
      sendHttpError(res, e);
    }
  });
}
