import { NextFunction, Request, Response } from 'express';

import type { AuthRequest } from './Types/AuthRequest.type';

export const requireAuth = (
  request: Request,
  _response: Response,
  next: NextFunction,
) => {
  // Здесь должны быть логика проверки токена
  // Заглушка для добавления user_id в request
  (request as AuthRequest).user = { id: 1 };
  next();
  return null;
};
