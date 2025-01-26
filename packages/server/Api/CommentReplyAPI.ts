import { Request, Response, Router } from 'express';

import { Routes } from '../Constants/Routes';
import CommentReplyService from '../RestServices/CommentReplyService';

class CommentReplyAPI {
  public static create = async (request: Request, response: Response) => {
    const { body } = request;

    try {
      await CommentReplyService.create(body);
      response.status(201).send({ message: 'Comment reply created' });
    } catch (error) {
      console.log(error);
      response.status(500).send({ error: 'Failed to create comment reply' });
    }
  };
}

export const createCommentReplyRoutes = (router: Router): void => {
  const commentRouter = Router();
  commentRouter.post('', CommentReplyAPI.create);

  router.use(Routes.CommentReply, commentRouter);
};
