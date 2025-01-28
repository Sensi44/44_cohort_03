import { NextFunction, Request, Response } from 'express';

export const sanitizeInput = (
  request: Request,
  _response: Response,
  next: NextFunction,
) => {
  const sanitize = (obj: any) => {
    if (typeof obj === 'object' && obj !== null) {
      for (const key in obj) {
        if (obj[key] && typeof obj[key] === 'string') {
          // Очистка строки
          obj[key] = obj[key]
            .replace(/</g, '&lt;') // Заменить "<" на HTML-сущность
            .replace(/>/g, '&gt;') // Заменить ">" на HTML-сущность
            .replace(/"/g, '&quot;') // Заменить кавычки на сущности
            .replace(/'/g, '&#x27;'); // Заменить одиночные кавычки
        } else if (typeof obj[key] === 'object') {
          sanitize(obj[key]); // Рекурсивная очистка вложенных объектов.
        }
      }
    }
  };

  // Обработаем параметры запроса, тело и query параметры
  if (request.body) sanitize(request.body);
  if (request.query) sanitize(request.query);
  if (request.params) sanitize(request.params);

  next();
};
