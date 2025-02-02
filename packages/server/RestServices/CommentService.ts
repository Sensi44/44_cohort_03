import BaseRESTService from './BaseRESTService';

import Comment from '../Models/Comment';
import type { ICreateCommentRequest } from './Types/CommentService.types';

class CommentService implements BaseRESTService {
  public create = async (data: ICreateCommentRequest) => {
    return await Comment.create(data);
  };

  public find = async ({ topic_id }: { topic_id: number }) => {
    return await Comment.findAll({
      where: {
        topic_id,
      },
    });
  };
}

export default new CommentService();
