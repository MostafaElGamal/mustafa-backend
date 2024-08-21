import { knownErrors, sendHttpError } from '#utils';

export function globalNotFoundHandler (req, res) {
  sendHttpError(res, knownErrors.notFound());
}

export function globalErrorHandler (err, req, res, next) { // eslint-disable-line no-unused-vars
  console.log(err);  // eslint-disable-line no-console
  sendHttpError(res, knownErrors.unknownCause());
}
