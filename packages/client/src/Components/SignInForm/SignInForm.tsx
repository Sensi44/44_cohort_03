import { useState, FC, HTMLAttributes } from 'react';
import { TextField, Button, FormControl, FormHelperText } from '@mui/material';
import './SignInForm.scss';
import { SignInFormProps, SignInTextFieldsKeys } from './SignInForm.props';
import {
  signInFormDefaultFormData,
  signInTextFieldsList,
} from '@Constants/InputForms';

export const SignInForm: FC<
  SignInFormProps & HTMLAttributes<HTMLDivElement>
> = ({ isLoading, whenSubmitForm }) => {
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
    <form className='form'>
      {signInTextFieldsList.map(field => (
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
        Авторизоваться
      </Button>
    </form>
  );
};
