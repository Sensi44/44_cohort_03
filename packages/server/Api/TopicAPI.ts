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
}

export const createTopicRoutes = (router: Router): void => {
  const topicRouter = Router();

  const createTopicSchema = {
    [Segments.BODY]: Joi.object({
      title: Joi.string().min(3).max(255).required(),
    }),
  };

  topicRouter.post('', celebrate(createTopicSchema), TopicAPI.create);

  router.use(Routes.Topic, topicRouter);
};
