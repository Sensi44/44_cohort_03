export interface IFindTopicRequest {
  id?: number;
  title?: string;
}

export interface ICreateTopicRequest {
  title: string;
  user_id: number;
}
