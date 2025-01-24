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

interface ICommentReplyAttributes {
  id: number;
  created_at: Date;
  updated_at: Date;
  comment_id: string;
  text: string;
  parent_reply_id: number | null;
}

interface ICommentReplyCreationAttributes {
  comment_id: number;
  text: string;
  parent_reply_id?: number | null;
}

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
