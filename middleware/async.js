export function asyncMiddleware(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

export function asyncErrorMiddleware(fn) {
  return (error, req, res, next) => {
    Promise.resolve(fn(error, req, res, next)).catch(next);
  };
}
