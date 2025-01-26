export interface ITopicAttributes {
  id: number;
  title: string;
  created_at: Date;
  updated_at: Date;
}

export interface ITopicCreationAttributes {
  title: string;
  user_id: number;
}
