import type { IUserLogin } from '@Types/User.types';

export type ISignInFormProps = {
  isLoading: boolean;
  whenSubmitForm: (userInfo: IUserLogin) => void;
};

export enum SignInTextFieldsKeys {
  login = 'login',
  password = 'password',
}

export type ISignInFormData = Record<SignInTextFieldsKeys, string>;
