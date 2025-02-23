import BaseRESTService from './BaseRESTService';

import UserTheme from '../Models/UserTheme';
import {
  ICreateUserThemeRequest,
  IFindUserThemeRequest,
  IUpdateUserThemeRequest,
} from './Types/UserThemeService.type';

class UserThemeService implements BaseRESTService {
  public find = async (data: IFindUserThemeRequest) => {
    return await UserTheme.findOne({
      where: {
        user_id: data.user_id,
      },
    });
  };

  public create = async (data: ICreateUserThemeRequest) => {
    return await UserTheme.create(data);
  };

  public update = async (data: IUpdateUserThemeRequest) => {
    const userTheme = await this.find(data);
    if (!userTheme) return null;
    userTheme.theme = data.theme;
    return await userTheme.save();
  };
}

export default new UserThemeService();
