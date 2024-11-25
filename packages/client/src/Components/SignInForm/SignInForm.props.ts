import { UserLogin } from '@Types/UserLogin';

export type SignInFormProps = {
  isLoading: boolean;
  whenSubmitForm: (userInfo: UserLogin) => void;
};

export enum TextFieldsKeys {
  login = 'login',
  password = 'password',
}

export type SignInFormData = Record<TextFieldsKeys, string>;
