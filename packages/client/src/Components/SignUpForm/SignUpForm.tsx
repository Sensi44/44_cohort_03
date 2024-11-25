import { TextField, Button, FormControl, FormHelperText } from '@mui/material';
import { HTMLAttributes, useState } from 'react';
import './SignUpForm.scss';
import {
  SignUpFormProps,
  TextFieldsKeys,
  SignUpFormData,
} from './SignUpForm.props';

const textFieldsList = [
  {
    id: TextFieldsKeys.login,
    name: 'login',
    label: 'Логин',
    type: 'text',
  },
  {
    id: TextFieldsKeys.email,
    name: 'email',
    label: 'Почта',
    type: 'email',
  },
  {
    id: TextFieldsKeys.firstName,
    name: 'first_name',
    label: 'Имя',
    type: 'text',
  },
  {
    id: TextFieldsKeys.secondName,
    name: 'second_name',
    label: 'Фамилия',
    type: 'text',
  },
  {
    id: TextFieldsKeys.phone,
    name: 'phone',
    label: 'Телефон',
    type: 'text',
  },
  {
    id: TextFieldsKeys.password,
    name: 'password',
    label: 'Пароль',
    type: 'password',
  },
  {
    id: TextFieldsKeys.repeatPassword,
    name: 'repeat_password',
    label: 'Пароль (еще раз)',
    type: 'password',
  },
];

const defaultFormData: SignUpFormData = {
  [TextFieldsKeys.login]: '',
  [TextFieldsKeys.password]: '',
  [TextFieldsKeys.email]: '',
  [TextFieldsKeys.firstName]: '',
  [TextFieldsKeys.secondName]: '',
  [TextFieldsKeys.phone]: '',
  [TextFieldsKeys.repeatPassword]: '',
};

export default function SignUpForm({
  isLoading,
  whenSubmitForm,
}: SignUpFormProps & HTMLAttributes<HTMLDivElement>) {
  const [formData, setFormData] = useState(defaultFormData);
  const [errors, setErrors] = useState(defaultFormData);

  const handleChangeForm = (value: string, fieldKey: TextFieldsKeys) => {
    setFormData({
      ...formData,
      [fieldKey]: value,
    });
  };

  const handleSubmitForm = () => {
    const { email, login, firstName, secondName, phone, password } = formData;
    //TODO добавить валидацию - использовать errors

    whenSubmitForm({
      first_name: firstName,
      second_name: secondName,
      login,
      email,
      password,
      phone,
    });
  };

  return (
    <form className='form'>
      {textFieldsList.map(field => (
        <FormControl
          className='field'
          key={field.id}
          error={errors[field.id].length > 0}
          variant='standard'>
          <TextField
            disabled={isLoading}
            fullWidth
            id={field.id}
            label={field.label}
            name={field.name}
            type={field.type}
            value={formData[field.id]}
            variant='outlined'
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleChangeForm(event.target.value, field.id)
            }
          />
          <FormHelperText>{errors[field.id]}</FormHelperText>
        </FormControl>
      ))}
      <Button
        disabled={Object.values(errors).filter(Boolean).length > 0}
        onClick={handleSubmitForm}
        size='large'
        variant='contained'>
        Зарегистрироваться
      </Button>
    </form>
  );
}
