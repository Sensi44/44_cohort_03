import { Request, Response, Router } from 'express';

import { Routes } from '../Constants/Routes';
import logger from '../logger';
import TopicService from '../RestServices/TopicService';

class TopicAPI {
  public static create = async (request: Request, response: Response) => {
    const { body } = request;

    try {
      await TopicService.create(body);
      response.status(201).send({ message: 'Topic created' });
    } catch (error) {
      logger.error(error);
      response.status(500).send({ error: 'Failed to create topic' });
    }
  };
}

export const createTopicRoutes = (router: Router): void => {
  const topicRouter = Router();
  topicRouter.post('', TopicAPI.create);

  router.use(Routes.Topic, topicRouter);
};
