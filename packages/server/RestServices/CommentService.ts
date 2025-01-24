import BaseRESTService from './BaseRESTService';

import Comment from '../Models/Comment';

interface CreateCommentRequest {
  topic_id: number;
  text: string;
}

class CommentService implements BaseRESTService {
  public create = async (data: CreateCommentRequest) => {
    return await Comment.create(data);
  };
}

export default new CommentService();
