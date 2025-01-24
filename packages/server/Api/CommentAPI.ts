import { Request, Response, Router } from 'express';

import CommentService from '../RestServices/CommentService';

class CommentAPI {
  public static create = async (request: Request, response: Response) => {
    const { body } = request;

    try {
      await CommentService.create(body);
      response.status(201).send({ message: 'Comment created' });
    } catch (error) {
      console.log(error);
      response.status(500).send({ error: 'Failed to create comment' });
    }
  };
}

export const createCommentRoutes = (router: Router): void => {
  const commentRouter = Router();
  commentRouter.post('', CommentAPI.create);

  router.use('/comment', commentRouter);
};
