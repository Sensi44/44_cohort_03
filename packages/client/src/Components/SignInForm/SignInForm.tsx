import { Button, Stack, TextField } from '@mui/material';
import { useState } from 'react';

import {
  signInFormDefaultFormData,
  SignInTextFieldsKeys,
  signInTextFieldsList,
} from '@Constants';

import type { ISignInFormProps } from './SignInForm.props';

export const SignInForm = ({ isLoading, whenSubmitForm }: ISignInFormProps) => {
  const [formData, setFormData] = useState(signInFormDefaultFormData);
  const [errors, setErrors] = useState(signInFormDefaultFormData);

  const handleChangeForm = (value: string, fieldKey: SignInTextFieldsKeys) => {
    setFormData({
      ...formData,
      [fieldKey]: value,
    });
  };

  const handleSubmitForm = () => {
    //TODO добавить валидацию - использовать errors

    whenSubmitForm(formData);
  };

  return (
    <form>
      <Stack
        spacing={2}
        sx={{
          alignItems: 'center',
        }}>
        {signInTextFieldsList.map((field) => (
          <TextField
            sx={{ width: 340 }}
            key={field.id}
            error={errors[field.id].length > 0}
            disabled={isLoading}
            id={field.id}
            label={field.label}
            name={field.name}
            type={field.type}
            value={formData[field.id]}
            variant='outlined'
            onChange={(event) => handleChangeForm(event.target.value, field.id)}
          />
        ))}
        <Button
          disabled={
            Object.values(errors).filter(Boolean).length > 0 || isLoading
          }
          onClick={handleSubmitForm}
          size='large'
          variant='contained'>
          Авторизоваться
        </Button>
      </Stack>
    </form>
  );
};
