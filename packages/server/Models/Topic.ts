import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';

import Comment from './Comment';

interface ITopicAttributes {
  id: number;
  title: string;
  created_at: Date;
  updated_at: Date;
}

interface ITopicCreationAttributes {
  title: string;
}

@Table
export default class Topic extends Model<
  ITopicAttributes,
  ITopicCreationAttributes
> {
  @Column(DataType.STRING(50))
  title: string;

  @HasMany(() => Comment)
  comments: Comment[];
}
