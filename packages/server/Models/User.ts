import {
  Column,
  DataType,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';

import Comment from './Comment';
import CommentReply from './CommentReply';
import Topic from './Topic';

import type {
  IUserAttributes,
  IUserCreationAttributes,
} from './Types/User.types';
import UserTheme from './UserTheme';

@Table({
  timestamps: false,
})
export default class User extends Model<
  IUserAttributes,
  IUserCreationAttributes
> {
  @Column(DataType.STRING(50))
  name: string;

  @HasMany(() => Comment)
  comments: Comment[];

  @HasMany(() => CommentReply)
  commentReplies: CommentReply[];

  @HasMany(() => Topic)
  topics: Topic[];

  @HasOne(() => UserTheme)
  theme: UserTheme;
}
