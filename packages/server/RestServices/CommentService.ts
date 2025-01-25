import BaseRESTService from './BaseRESTService';

import Comment from '../Models/Comment';
import type { ICreateCommentRequest } from './Types/CommentService.types';

class CommentService implements BaseRESTService {
  public create = async (data: ICreateCommentRequest) => {
    return await Comment.create(data);
  };
}

export default new CommentService();
