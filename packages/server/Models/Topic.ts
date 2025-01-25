import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';

import Comment from './Comment';
import type {
  ITopicAttributes,
  ITopicCreationAttributes,
} from './Types/Topic.types';

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
