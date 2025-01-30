import { celebrate, Joi, Segments } from 'celebrate';
import { Request, Response, Router } from 'express';

import { Routes } from '../Constants/Routes';
import logger from '../logger';
import type { AuthRequest } from '../Middleware/Types/AuthRequest.type';
import UserThemeService from '../RestServices/UserThemeService';

class UserThemeAPI {
  public static create = async (request: Request, response: Response) => {
    try {
      const dataForCreating = {
        user_id: (request as AuthRequest).user.id,
      };
      await UserThemeService.create(dataForCreating);
      response.status(200).send({ message: 'UserTheme created' });
    } catch (error) {
      logger.error(error);
      response.status(500).send({ error: 'Failed to create UserTheme' });
    }
  };

  public static find = async (request: Request, response: Response) => {
    try {
      const dataForFind = {
        user_id: (request as AuthRequest).user.id,
      };
      const result = await UserThemeService.find(dataForFind);
      response.status(200).send(result);
    } catch (error) {
      logger.error(error);
      response.status(500).send({ error: 'Failed to get UserTheme' });
    }
  };

  public static update = async (request: Request, response: Response) => {
    const { body } = request;

    try {
      const dataForUpdate = {
        ...body,
        user_id: (request as AuthRequest).user.id,
      };
      await UserThemeService.find(dataForUpdate);
      response.status(200).send({ message: 'UserTheme update' });
    } catch (error) {
      logger.error(error);
      response.status(500).send({ error: 'Failed to update UserTheme' });
    }
  };
}

export const createUserThemeRoutes = (router: Router): void => {
  const UserThemeRouter = Router();

  const updateUserThemeSchema = {
    [Segments.BODY]: Joi.object({
      theme: Joi.string().min(3).max(5).required(),
    }),
  };

  UserThemeRouter.get('', UserThemeAPI.find);
  UserThemeRouter.post('', UserThemeAPI.create);
  UserThemeRouter.put(
    '',
    celebrate(updateUserThemeSchema),
    UserThemeAPI.update,
  );

  router.use(Routes.UserTheme, UserThemeRouter);
};
