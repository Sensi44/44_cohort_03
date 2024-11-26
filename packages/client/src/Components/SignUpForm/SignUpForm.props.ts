import type { IUserCreate } from '@Types/User.types';

export type ISignUpFormProps = {
  isLoading: boolean;
  whenSubmitForm: (userInfo: IUserCreate) => void;
};

export enum SignUpTextFieldsKeys {
  email = 'email',
  login = 'login',
  firstName = 'firstName',
  secondName = 'secondName',
  phone = 'phone',
  password = 'password',
  repeatPassword = 'repeatPassword',
}

export type ISignUpFormData = Record<SignUpTextFieldsKeys, string>;
