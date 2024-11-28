import { useState } from 'react';
import type { FC, ChangeEvent } from 'react';
import {
  Button,
  FormControl,
  FormHelperText,
  Stack,
  TextField,
} from '@mui/material';

import { editProfileTextFieldsList } from '@Constants/InputForms';
import type {
  EditProfileTextFieldsKeys,
  IEditProfileFormProps,
} from './EditProfileForm.props';

export const EditProfileForm: FC<IEditProfileFormProps> = ({
  isLoading,
  profileData,
  isDisabled,
  whenSubmitForm,
}) => {
  const [formData, setFormData] = useState({
    email: profileData.email,
    login: profileData.login,
    firstName: profileData.first_name,
    secondName: profileData.second_name,
    phone: profileData.phone,
    displayName: profileData.display_name,
  });

  const [errors, setErrors] = useState({
    email: '',
    login: '',
    firstName: '',
    secondName: '',
    phone: '',
    displayName: '',
  });

  const handleChangeForm = (
    value: string,
    fieldKey: EditProfileTextFieldsKeys,
  ) => {
    setFormData({
      ...formData,
      [fieldKey]: value,
    });
  };

  const handleSubmitForm = () => {
    const { email, phone, login, firstName, secondName, displayName } =
      formData;
    //TODO добавить валидацию - использовать errors

    whenSubmitForm({
      email,
      login,
      first_name: firstName,
      second_name: secondName,
      phone,
      display_name: displayName,
    });
  };

  return (
    <form>
      <Stack
        spacing={2}
        sx={{
          alignItems: 'center',
        }}>
        {editProfileTextFieldsList.map((field) => (
          <FormControl
            sx={{ width: 340 }}
            key={field.id}
            error={errors[field.id].length > 0}
            variant='filled'>
            <TextField
              disabled={isLoading || isDisabled}
              id={field.id}
              label={field.label}
              fullWidth
              name={field.name}
              type={field.type}
              value={formData[field.id]}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                handleChangeForm(event.target.value, field.id)
              }
            />
            <FormHelperText>{errors[field.id]}</FormHelperText>
          </FormControl>
        ))}
        {!isDisabled && (
          <Button
            disabled={Object.values(errors).filter(Boolean).length > 0}
            onClick={handleSubmitForm}
            size='large'
            variant='contained'>
            Сохранить
          </Button>
        )}
      </Stack>
    </form>
  );
};
