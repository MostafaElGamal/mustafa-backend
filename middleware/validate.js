import { knownErrors, sendHttpError, performValidation } from '#utils';
import { keys } from 'lodash-es';

export function validate(schema) {
  return function validateMiddleware(req, res, next) {
    const verbose = req.container.resolve('useVerbose');
    const mainSchema = {
      type: 'object',
      properties: schema,
      required: keys(schema),
    };
    const { valid, errors } = performValidation(mainSchema, req);
    if (verbose && errors) {
      console.log('validation error', errors); // eslint-disable-line no-console
    }
    if (!valid) {
      return sendHttpError(res, knownErrors.badRequest());
    }
    next();
  };
}
