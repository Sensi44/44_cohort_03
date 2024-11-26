import { UserLogin } from '@Types/UserLogin';

export type SignInFormProps = {
  isLoading: boolean;
  whenSubmitForm: (userInfo: UserLogin) => void;
};

export enum SignInTextFieldsKeys {
  login = 'login',
  password = 'password',
}

export type SignInFormData = Record<SignInTextFieldsKeys, string>;
