import { useState } from 'react';
import type { FC } from 'react';
import { TextField, Button, FormControl, FormHelperText } from '@mui/material';

import './SignInForm.scss';
import { SignInTextFieldsKeys } from './SignInForm.props';
import type { ISignInFormProps } from './SignInForm.props';
import {
  signInFormDefaultFormData,
  signInTextFieldsList,
} from '@Constants/InputForms';

export const SignInForm: FC<ISignInFormProps> = ({
  isLoading,
  whenSubmitForm,
}) => {
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
    <form className='sign-in-form__form'>
      {signInTextFieldsList.map(field => (
        <FormControl
          className='sign-in-form__field'
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
        Авторизоваться
      </Button>
    </form>
  );
};
