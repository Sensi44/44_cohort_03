import { SignInTextFieldsKeys } from '@Components/SignInForm/SignInForm.props';
import { SignUpTextFieldsKeys } from '@Components/SignUpForm/SignUpForm.props';
import type { ISignInFormData } from '@Components/SignInForm/SignInForm.props';
import type { ISignUpFormData } from '@Components/SignUpForm/SignUpForm.props';
import type { IChangePasswordFormData } from '@Components/ChangePasswordForm/ChangePasswordForm.props';
import { ChangePasswordTextFieldsKeys } from '@Components/ChangePasswordForm/ChangePasswordForm.props';
import { EditProfileTextFieldsKeys } from '@Components/EditProfileForm/EditProfileForm.props';

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
  [SignInTextFieldsKeys.login]: '',
  [SignInTextFieldsKeys.password]: '',
};

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

export const editProfileTextFieldsList = [
  {
    id: EditProfileTextFieldsKeys.email,
    name: 'email',
    label: 'Почта',
    type: 'email',
  },
  {
    id: EditProfileTextFieldsKeys.login,
    name: 'login',
    label: 'Логин',
    type: 'text',
  },
  {
    id: EditProfileTextFieldsKeys.firstName,
    name: 'first_name',
    label: 'Имя',
    type: 'text',
  },
  {
    id: EditProfileTextFieldsKeys.secondName,
    name: 'second_name',
    label: 'Фамилия',
    type: 'text',
  },
  {
    id: EditProfileTextFieldsKeys.displayName,
    name: 'display_name',
    label: 'Имя в чате',
    type: 'text',
  },
  {
    id: EditProfileTextFieldsKeys.phone,
    name: 'phone',
    label: 'Телефон',
    type: 'text',
  },
];
