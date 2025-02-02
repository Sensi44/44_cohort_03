export interface ITopic {
  id: number;
  title: string;
}

export interface ITopicCreate {
  title: string;
}

export interface ICreateComment {
  topic_id: number;
  text: string;
}

export interface IComment {
  topic_id: number;
  text: string;
  user_id: number;
  createdAt: string;
}
