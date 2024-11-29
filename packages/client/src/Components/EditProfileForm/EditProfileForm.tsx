import { Button, Stack, TextField } from '@mui/material';
import type { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';

import {
  EditProfileTextFieldsKeys,
  editProfileTextFieldsList,
} from '@Constants';
import type { IEditProfileFormProps } from './EditProfileForm.props';

export const EditProfileForm = ({
  isLoading,
  profileData,
  isDisabled,
  whenSubmitForm,
}: IEditProfileFormProps) => {
  const getFormData = () => ({
    email: profileData?.email ?? '',
    login: profileData?.login ?? '',
    firstName: profileData?.firstName ?? '',
    secondName: profileData?.secondName ?? '',
    phone: profileData?.phone ?? '',
    displayName: profileData?.displayName ?? '',
  });

  useEffect(() => {
    setFormData(getFormData());
  }, [profileData]);

  const [formData, setFormData] = useState(getFormData());

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
        {editProfileTextFieldsList.map((field) => (
          <TextField
            sx={{ width: 340 }}
            key={field.id}
            error={errors[field.id].length > 0}
            variant='filled'
            helperText={errors[field.id]}
            disabled={isLoading || isDisabled}
            id={field.id}
            label={field.label}
            name={field.name}
            type={field.type}
            value={formData[field.id]}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              handleChangeForm(event.target.value, field.id)
            }
          />
        ))}
        {!isDisabled && (
          <Button
            disabled={
              Object.values(errors).filter(Boolean).length > 0 || isLoading
            }
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
