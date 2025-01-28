import { celebrate, Joi, Segments } from 'celebrate';
import { Request, Response, Router } from 'express';

import { Routes } from '../Constants/Routes';
import logger from '../logger';
import type { AuthRequest } from '../Middleware/Types/AuthRequest.type';
import CommentReplyService from '../RestServices/CommentReplyService';

class CommentReplyAPI {
  public static create = async (request: Request, response: Response) => {
    const { body } = request;

    try {
      const dataForCreating = {
        ...body,
        userId: (request as AuthRequest).user.id,
      };
      await CommentReplyService.create(dataForCreating);
      response.status(201).send({ message: 'Comment reply created' });
    } catch (error) {
      logger.error(error);
      response.status(500).send({ error: 'Failed to create comment reply' });
    }
  };
}

export const createCommentReplyRoutes = (router: Router): void => {
  const commentRouter = Router();
  const createCommentReplySchema = {
    [Segments.BODY]: Joi.object({
      comment_id: Joi.number().required(),
      text: Joi.string().required(),
      parent_reply_id: Joi.number().allow(null).optional(),
    }),
  };

  commentRouter.post(
    '',
    celebrate(createCommentReplySchema),
    CommentReplyAPI.create,
  );

  router.use(Routes.CommentReply, commentRouter);
};
