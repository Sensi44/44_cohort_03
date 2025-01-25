export interface ICreateCommentReplyRequest {
  comment_id: number;
  text: string;
  parent_reply_id?: number | null;
}
