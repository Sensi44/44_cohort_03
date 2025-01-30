import BaseRESTService from './BaseRESTService';

import UserTheme from '../Models/UserTheme';
import {
  ICreateUserThemeRequest,
  IFindUserThemeRequest,
  IUpdateUserThemeRequest,
} from './Types/UserThemeService.type';

class UserThemeService implements BaseRESTService {
  public find = async (data: IFindUserThemeRequest) => {
    const user_id = { data };

    const theme = await UserTheme.findOne({
      where: {
        user_id: `%${user_id}`,
      },
    });

    if (theme) {
      return theme.theme;
    }

    return null;
  };

  public create = async (data: ICreateUserThemeRequest) => {
    return await UserTheme.create(data);
  };

  public update = async (data: IUpdateUserThemeRequest) => {
    const { user_id, theme } = data;
    const model = await UserTheme.findOne({
      where: {
        user_id: `%${user_id}`,
      },
    });
    if (!model) return null;
    model.theme = theme;
    return await model.save();
  };
}

export default new UserThemeService();
