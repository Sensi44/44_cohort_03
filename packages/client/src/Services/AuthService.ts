import { Api } from '@Services/Api';

import type { IUserCreate, IUserLogin } from '@Types/User.types';
import type { IProfileDataState } from '../StoreOld/Store';

const api = new Api();

const urlBase = '/auth';

export const useAuthApi = () => {
  const signUp = async (profileData: IUserCreate) => {
    try {
      await api.post(`${urlBase}/signup`, { data: profileData });

      return {
        isSuccess: true,
        error: '',
      };
    } catch (e) {
      return {
        isSuccess: false,
        error: `Не удалось зарегистрироваться ${(e as { reason: string })?.reason ?? ''}`,
      };
    }
  };

  const signIn = async (payload: IUserLogin) => {
    try {
      await api.post(`${urlBase}/signin`, { data: payload });

      return {
        isSuccess: true,
        error: '',
      };
    } catch (e) {
      const reason = (e as { reason: string })?.reason ?? '';
      const isAlreadyAuthorised = reason === 'User already in system';

      return {
        isSuccess: isAlreadyAuthorised,
        error: isAlreadyAuthorised ? '' : `Не удалось авторизоваться ${reason}`,
      };
    }
  };

  const getUserInfo = async (): Promise<IProfileDataState | null> => {
    try {
      const response = (await api.get(`${urlBase}/user`)) as Response;
      const userInfo = (await response.json()) as IProfileDataState;

      return userInfo;
    } catch {
      return null;
    }
  };

  const logout = async () => {
    try {
      await api.post(`${urlBase}/logout`);

      return {
        isSuccess: true,
        error: '',
      };
    } catch (e) {
      return {
        isSuccess: false,
        error: `Не выйти из системы ${(e as { reason: string })?.reason ?? ''}`,
      };
    }
  };

  return {
    signUp,
    signIn,
    getUserInfo,
    logout,
  };
};
