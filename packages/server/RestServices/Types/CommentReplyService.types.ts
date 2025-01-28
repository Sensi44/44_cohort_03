export interface ICreateCommentReplyRequest {
  comment_id: number;
  text: string;
  user_id: number;
  parent_reply_id?: number | null;
}
