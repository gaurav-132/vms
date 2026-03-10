import { HttpError } from '../http-error.js';

export function errorHandler(error, _req, res, _next) {
  if (error instanceof HttpError) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  return res.status(500).json({ message: 'Internal server error' });
}
