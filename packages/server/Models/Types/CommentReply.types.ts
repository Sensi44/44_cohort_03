export interface ICommentReplyAttributes {
  id: number;
  created_at: Date;
  updated_at: Date;
  comment_id: string;
  text: string;
  parent_reply_id: number | null;
}

export interface ICommentReplyCreationAttributes {
  comment_id: number;
  text: string;
  user_id: number;
  parent_reply_id?: number | null;
}
