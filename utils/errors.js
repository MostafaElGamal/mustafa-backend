import { invert } from 'lodash-es';

export const errorTypes = {
  unknownCause: 101,
  unprocessable: 102,
  unauthenticated: 103,
  notFound: 104,
  unauthorized: 105,
  conflict: 106,
  fileError: 107,
  databaseError: 108,
  badCredentials: 109,
};

export const errorHttpStatus = {
  unknownCause: 500,
  unprocessable: 400,
  unauthenticated: 401,
  notFound: 404,
  unauthorized: 403,
  conflict: 400,
  fileError: 500,
  databaseError: 500,
  badCredentials: 401,
};


export class ServerError extends Error {
  constructor(message, code) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.type = getErrorType(code);
    this.status = errorHttpStatus[this.type];
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorCodes = invert(errorTypes);

export const knownErrors = {
  unknownCause: (message = 'Internal server error') => new ServerError(message, errorTypes.unknownCause),
  notFound: () => new ServerError('Resource not found', errorTypes.notFound),
  badRequest: (message = 'Request contains errors and cannot be processed') => new ServerError(message, errorTypes.unprocessable),
  unauthenticated: () => new ServerError('Authentication required', errorTypes.unauthenticated),
  unauthorized: () => new ServerError('Not authorized to access this resource', errorTypes.unauthorized),
  codeTaken: () => new ServerError('Code is already in use', errorTypes.conflict),
  fileError: () => new ServerError('Internal server error', errorTypes.fileError),
  databaseError: () => new ServerError('Internal server error', errorTypes.databaseError),
  missingCredentials: () => new ServerError('Missing credentials', errorTypes.unauthenticated),
  badCredentials: () => new ServerError('Invalid user and password combination', errorTypes.unauthenticated),
};

export function sendHttpError(res, e) {
  let error = ensureNormalizedError(e);
  res.status(error.status).send({
    code: error.code,
    type: error.type,
    message: error.message,
  });
}


function getErrorType(errorCode) {
  return errorCodes[errorCode.toString()];
}

function ensureNormalizedError(e) {
  if (!(e instanceof ServerError)) {
    return knownErrors.unknownCause();
  }
  return e;
}

