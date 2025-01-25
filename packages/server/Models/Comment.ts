import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

import Topic from './Topic';
import type {
  ICommentAttributes,
  ICommentCreationAttributes,
} from './Types/Comment.types';

@Table
export default class Comment extends Model<
  ICommentAttributes,
  ICommentCreationAttributes
> {
  @ForeignKey(() => Topic)
  @Column(DataType.INTEGER)
  topic_id: number;

  @Column(DataType.STRING)
  text: string;

  @BelongsTo(() => Topic)
  topic: Topic;
}
