import BaseRESTService from './BaseRESTService';

import CommentReply from '../Models/CommentReply';

interface CreateCommentReplyRequest {
  comment_id: number;
  text: string;
  parent_reply_id?: number | null;
}

class CommentReplyService implements BaseRESTService {
  public create = async (data: CreateCommentReplyRequest) => {
    return await CommentReply.create(data);
  };
}

export default new CommentReplyService();
