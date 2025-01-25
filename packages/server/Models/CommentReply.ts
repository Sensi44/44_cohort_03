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
  ICommentReplyAttributes,
  ICommentReplyCreationAttributes,
} from './Types/CommentReply.types';

@Table
export default class CommentReply extends Model<
  ICommentReplyAttributes,
  ICommentReplyCreationAttributes
> {
  @ForeignKey(() => Comment)
  @Column(DataType.INTEGER)
  comment_id: number;

  @Column(DataType.STRING)
  text: string;

  @ForeignKey(() => CommentReply)
  @Column(DataType.INTEGER)
  parent_reply_id: number | null;

  @BelongsTo(() => CommentReply, 'parent_reply_id')
  parentReply: CommentReply;

  @HasMany(() => CommentReply, 'parent_reply_id')
  childReplies: CommentReply[];
}
