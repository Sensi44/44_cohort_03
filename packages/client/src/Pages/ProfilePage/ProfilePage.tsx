import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, Stack } from '@mui/material';
import { ErrorNotification } from '@Components/ErrorNotification/ErrorNotification';
import type { IUserChange, IUserChangePassword } from '@Types/User.types';
import { useAuthApi } from '@Services/AuthService';

import { ProfilePageMode } from './ProfilePage.types';
import { store } from '@State/Store';
import { ProfileAvatar } from '@Components/ProfileAvatar/ProfileAvatar';
import { ChangePasswordForm } from '@Components/ChangePasswordForm/ChangePasswordForm';
import { EditProfileForm } from '@Components/EditProfileForm/EditProfileForm';

export const ProfilePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [profileMode, setProfileMode] = useState(ProfilePageMode.profile);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChangeAvatar = async (file?: File) => {
    console.log(file?.name);
  };

  const handleChangePassword = async (
    changePasswordPayload: IUserChangePassword,
  ) => {
    console.log(changePasswordPayload);
  };

  const handleEditProfile = async (editProfilePayload: IUserChange) => {
    console.log(editProfilePayload);
  };

  return (
    <Stack
      spacing={2}
      sx={{
        padding: '60px 40px 20px',
        marginTop: 2,
        alignItems: 'center',
      }}>
      <ProfileAvatar
        avatarUrl={store.getState().profileData.avatar}
        whenChangeAvatar={handleChangeAvatar}
      />
      <Typography sx={{ textAlign: 'center' }} variant='h4' color='primary'>
        {store.getState().profileData.first_name}
      </Typography>
      {profileMode === ProfilePageMode.changePassword ? (
        <ChangePasswordForm
          isLoading={isLoading}
          whenSubmitForm={handleChangePassword}
        />
      ) : (
        <EditProfileForm
          isLoading={isLoading}
          isDisabled={profileMode === ProfilePageMode.profile}
          profileData={store.getState().profileData}
          whenSubmitForm={handleEditProfile}
        />
      )}
      {profileMode === ProfilePageMode.profile ? (
        <Stack
          spacing={1}
          sx={{
            marginTop: 2,
            alignItems: 'center',
          }}>
          <Button
            sx={{ width: 200 }}
            size='small'
            color='secondary'
            onClick={() => setProfileMode(ProfilePageMode.editProfile)}>
            Изменить данные
          </Button>
          <Button
            sx={{ width: 200 }}
            size='small'
            color='secondary'
            onClick={() => setProfileMode(ProfilePageMode.changePassword)}>
            Изменить пароль
          </Button>
        </Stack>
      ) : (
        <Button
          sx={{ width: 200 }}
          size='small'
          color='warning'
          onClick={() => setProfileMode(ProfilePageMode.profile)}>
          Отменить
        </Button>
      )}
    </Stack>
  );
};
