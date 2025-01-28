import BaseRESTService from './BaseRESTService';

import CommentReply from '../Models/CommentReply';
import type { ICreateCommentReplyRequest } from './Types/CommentReplyService.types';

class CommentReplyService implements BaseRESTService {
  public create = async (data: ICreateCommentReplyRequest) => {
    return await CommentReply.create(data);
  };
}

export default new CommentReplyService();
