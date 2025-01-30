import { celebrate, Joi, Segments } from 'celebrate';
import { Request, Response, Router } from 'express';

import { Routes } from '../Constants/Routes';
import logger from '../logger';
import type { AuthRequest } from '../Middleware/Types/AuthRequest.type';
import TopicService from '../RestServices/TopicService';

class TopicAPI {
  public static create = async (request: Request, response: Response) => {
    const { body } = request;

    try {
      const dataForCreating = {
        ...body,
        user_id: (request as AuthRequest).user.id,
      };
      await TopicService.create(dataForCreating);
      response.status(201).send({ message: 'Topic created' });
    } catch (error) {
      logger.error(error);
      response.status(500).send({ error: 'Failed to create topic' });
    }
  };

  public static getAll = async (_request: Request, response: Response) => {
    try {
      const topics = await TopicService.getAll();
      response.status(200).json({ topics });
    } catch (error) {
      response.status(500).send({ error: 'Error while getting topics' });
    }
  };
}

export const createTopicRoutes = (router: Router): void => {
  const topicRouter = Router();

  const createTopicSchema = {
    [Segments.BODY]: Joi.object({
      title: Joi.string().min(3).max(255).required(),
    }),
  };

  topicRouter.post('', celebrate(createTopicSchema), TopicAPI.create);
  topicRouter.get('', celebrate(createTopicSchema), TopicAPI.getAll);

  router.use(Routes.Topic, topicRouter);
};
