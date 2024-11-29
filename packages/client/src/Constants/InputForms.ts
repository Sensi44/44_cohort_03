import {
  IChangePasswordFormData,
  ISignInFormData,
  ISignUpFormData,
} from '@Components';

export enum SignInTextFieldsKeys {
  login = 'login',
  password = 'password',
}

export const signInTextFieldsList = [
  {
    id: SignInTextFieldsKeys.login,
    name: 'login',
    label: 'Логин',
    type: 'text',
  },
  {
    id: SignInTextFieldsKeys.password,
    name: 'password',
    label: 'Пароль',
    type: 'password',
  },
];

export const signInFormDefaultFormData: ISignInFormData = {
  [SignInTextFieldsKeys?.login]: '',
  [SignInTextFieldsKeys?.password]: '',
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

export const signUpTextFieldsList = [
  {
    id: SignUpTextFieldsKeys.login,
    name: 'login',
    label: 'Логин',
    type: 'text',
  },
  {
    id: SignUpTextFieldsKeys.email,
    name: 'email',
    label: 'Почта',
    type: 'email',
  },
  {
    id: SignUpTextFieldsKeys.firstName,
    name: 'first_name',
    label: 'Имя',
    type: 'text',
  },
  {
    id: SignUpTextFieldsKeys.secondName,
    name: 'second_name',
    label: 'Фамилия',
    type: 'text',
  },
  {
    id: SignUpTextFieldsKeys.phone,
    name: 'phone',
    label: 'Телефон',
    type: 'text',
  },
  {
    id: SignUpTextFieldsKeys.password,
    name: 'password',
    label: 'Пароль',
    type: 'password',
  },
  {
    id: SignUpTextFieldsKeys.repeatPassword,
    name: 'repeat_password',
    label: 'Пароль (еще раз)',
    type: 'password',
  },
];

export const signUpDefaultFormData: ISignUpFormData = {
  [SignUpTextFieldsKeys.login]: '',
  [SignUpTextFieldsKeys.password]: '',
  [SignUpTextFieldsKeys.email]: '',
  [SignUpTextFieldsKeys.firstName]: '',
  [SignUpTextFieldsKeys.secondName]: '',
  [SignUpTextFieldsKeys.phone]: '',
  [SignUpTextFieldsKeys.repeatPassword]: '',
};

export enum ChangePasswordTextFieldsKeys {
  oldPassword = 'oldPassword',
  newPassword = 'newPassword',
  repeatNewPassword = 'repeatNewPassword',
}

export const changePasswordTextFieldsList = [
  {
    id: ChangePasswordTextFieldsKeys.oldPassword,
    name: 'oldPassword',
    label: 'Старый пароль',
    type: 'password',
  },
  {
    id: ChangePasswordTextFieldsKeys.newPassword,
    name: 'newPassword',
    label: 'Новый пароль',
    type: 'password',
  },
  {
    id: ChangePasswordTextFieldsKeys.repeatNewPassword,
    name: 'repeat_newPassword',
    label: 'Повторите новый пароль',
    type: 'password',
  },
];

export const changePasswordFormDefaultFormData: IChangePasswordFormData = {
  [ChangePasswordTextFieldsKeys.oldPassword]: '',
  [ChangePasswordTextFieldsKeys.newPassword]: '',
  [ChangePasswordTextFieldsKeys.repeatNewPassword]: '',
};

export enum EditProfileTextFieldsKeys {
  email = 'email',
  login = 'login',
  firstName = 'firstName',
  secondName = 'secondName',
  phone = 'phone',
  displayName = 'displayName',
}

export const editProfileTextFieldsList = [
  {
    id: EditProfileTextFieldsKeys?.email,
    name: 'email',
    label: 'Почта',
    type: 'email',
  },
  {
    id: EditProfileTextFieldsKeys?.login,
    name: 'login',
    label: 'Логин',
    type: 'text',
  },
  {
    id: EditProfileTextFieldsKeys?.firstName,
    name: 'first_name',
    label: 'Имя',
    type: 'text',
  },
  {
    id: EditProfileTextFieldsKeys?.secondName,
    name: 'second_name',
    label: 'Фамилия',
    type: 'text',
  },
  {
    id: EditProfileTextFieldsKeys?.displayName,
    name: 'display_name',
    label: 'Имя в чате',
    type: 'text',
  },
  {
    id: EditProfileTextFieldsKeys?.phone,
    name: 'phone',
    label: 'Телефон',
    type: 'text',
  },
];
