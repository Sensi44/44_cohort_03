import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

import Topic from './Topic';

interface ICommentAttributes {
  id: number;
  topic_id: number;
  text: string;
  created_at: Date;
  updated_at: Date;
}

interface ICommentCreationAttributes {
  topic_id: number;
  text: string;
}

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
