import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';

import Comment from './Comment';
import type {
  ITopicAttributes,
  ITopicCreationAttributes,
} from './Types/Topic.types';
import User from './User';

@Table
export default class Topic extends Model<
  ITopicAttributes,
  ITopicCreationAttributes
> {
  @Column(DataType.STRING(50))
  title: string;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  user_id: number;

  @HasMany(() => Comment)
  comments: Comment[];

  @BelongsTo(() => User)
  user: User;
}
