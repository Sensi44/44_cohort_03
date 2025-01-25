export interface ICommentAttributes {
  id: number;
  topic_id: number;
  text: string;
  created_at: Date;
  updated_at: Date;
}

export interface ICommentCreationAttributes {
  topic_id: number;
  text: string;
}
