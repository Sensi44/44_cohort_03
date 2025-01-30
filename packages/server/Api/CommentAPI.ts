import { celebrate, Joi, Segments } from 'celebrate';
import { Request, Response, Router } from 'express';

import { Routes } from '../Constants/Routes';
import logger from '../logger';
import type { AuthRequest } from '../Middleware/Types/AuthRequest.type';
import CommentService from '../RestServices/CommentService';
import TopicService from '../RestServices/TopicService';

class CommentAPI {
  public static create = async (request: Request, response: Response) => {
    const { body } = request;

    try {
      const dataForCreating = {
        ...body,
        user_id: (request as AuthRequest).user.id,
      };

      const topicExists = await TopicService.find({ id: body.topic_id });

      console.log(topicExists);

      if (!topicExists) {
        response
          .status(404)
          .send({ error: `Topic with id ${body.topic_id} not found` });
        return;
      }

      await CommentService.create(dataForCreating);
      response.status(201).send({ message: 'Comment created' });
    } catch (error) {
      logger.error(error);
      response.status(500).send({ error: 'Failed to create comment' });
    }
  };
}

export const createCommentRoutes = (router: Router): void => {
  const commentRouter = Router();

  const createCommentSchema = {
    [Segments.BODY]: Joi.object({
      topic_id: Joi.number().required(),
      text: Joi.string().required(),
    }),
  };

  commentRouter.post('', celebrate(createCommentSchema), CommentAPI.create);

  router.use(Routes.Comment, commentRouter);
};
