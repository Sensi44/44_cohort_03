import { Request, Response, Router } from 'express';

import TopicService from '../RestServices/TopicService';

class TopicAPI {
  public static create = async (request: Request, response: Response) => {
    const { body } = request;

    try {
      await TopicService.create(body);
      response.status(201).send({ message: 'Topic created' });
    } catch (error) {
      console.log(error);
      response.status(500).send({ error: 'Failed to create topic' });
    }
  };
}

export const createTopicRoutes = (router: Router): void => {
  const themesRouter = Router();
  themesRouter.post('', TopicAPI.create);

  router.use('/topic', themesRouter);
};
