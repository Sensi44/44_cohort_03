import { NextFunction, Request, Response } from 'express';
import logger from '../logger';

export const requireAuth = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const token = request.headers['authorization'];

  if (!token) {
    return response
      .status(403)
      .json({ error: 'Unauthorized: No token provided' });
  }

  try {
    // Логика проверки токена
    logger.info('Authorization Token: ', token);

    next();
  } catch (err) {
    return response.status(403).json({ error: 'Unauthorized: Invalid token' });
  }

  return null;
};
