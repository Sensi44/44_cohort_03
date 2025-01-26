import { NextFunction, Request, Response } from 'express';

import logger from '../logger';
import type { AuthRequest } from './Types/AuthRequest.type';

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
    // Здесь должны быть логика проверки токена
    logger.info('Authorization Token: ', token);

    // Заглушка получения user_id из токена
    (request as AuthRequest).user = { id: 1 };

    next();
  } catch (err) {
    return response.status(403).json({ error: 'Unauthorized: Invalid token' });
  }

  return null;
};
