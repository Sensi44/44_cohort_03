import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

import {
  IUserThemeAttributes,
  IUserThemeCreationAttributes,
} from './Types/UserTheme.types';
import User from './User';

@Table
export default class UserTheme extends Model<
  IUserThemeAttributes,
  IUserThemeCreationAttributes
> {
  @Column({
    type: DataType.STRING(50),
    defaultValue: 'light',
  })
  theme: string;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  user_id: number;
}
