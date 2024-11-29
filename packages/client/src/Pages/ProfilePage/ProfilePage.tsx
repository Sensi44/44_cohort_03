import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Typography, Button, Stack } from '@mui/material';

import { ErrorNotification } from '@Components/ErrorNotification/ErrorNotification';
import type { IUserChange, IUserChangePassword } from '@Types/User.types';
import { ProfilePageMode } from './ProfilePage.types';
import { ProfileAvatar } from '@Components/ProfileAvatar/ProfileAvatar';
import { ChangePasswordForm } from '@Components/ChangePasswordForm/ChangePasswordForm';
import { EditProfileForm } from '@Components/EditProfileForm/EditProfileForm';
import {
  useChangeAvatarMutation,
  useChangePasswordMutation,
  useEditUserMutation,
  useLoadUserInfoMutation,
} from '@Store/Slices/Api/Profile.api';
import { getProfileData } from '@Store/Slices/Profile/Profile.selector';

export const ProfilePage = () => {
  const [profileMode, setProfileMode] = useState(ProfilePageMode.profile);
  const [errorMessage, setErrorMessage] = useState('');
  const [loadUserInfo, { isLoading }] = useLoadUserInfoMutation();
  const [changeAvatar, { isLoading: isLoadingChangeAvatar }] =
    useChangeAvatarMutation();
  const [changePassword, { isLoading: isLoadingChangePassword }] =
    useChangePasswordMutation();
  const [editProfile, { isLoading: isLoadingEditProfile }] =
    useEditUserMutation();

  const profileData = useSelector(getProfileData);

  //TODO Временный кусок, надо вынести это в лэйаут сервиса в авторизацию
  useEffect(() => {
    if (!profileData.login) {
      loadUserInfo();
    }
  }, []);

  const handleChangeAvatar = async (file?: File) => {
    if (file) {
      const payload = new FormData();
      payload.append('avatar', file);

      changeAvatar(payload)
        .unwrap()
        .then(() => loadUserInfo().unwrap())
        .catch((error) => {
          setErrorMessage(`Не удалось загрузить изображение ${error}`);
        });
    } else {
      setErrorMessage(`Не выбран файл`);
    }
  };

  const handleChangePassword = async (
    changePasswordPayload: IUserChangePassword,
  ) => {
    changePassword(changePasswordPayload)
      .unwrap()
      .then(() => setProfileMode(ProfilePageMode.profile))
      .catch((error) => {
        setErrorMessage(`Не удалось поменять пароль ${error}`);
      });
  };

  const handleEditProfile = async (editProfilePayload: IUserChange) => {
    editProfile(editProfilePayload)
      .unwrap()
      .then(() => loadUserInfo().unwrap())
      .catch((error) => {
        setErrorMessage(`Не удалось сохранить изменения ${error}`);
      });
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
        avatarUrl={profileData.avatar}
        whenChangeAvatar={handleChangeAvatar}
      />
      <Typography textAlign='center' variant='h4' color='primary'>
        {profileData.firstName}
      </Typography>
      {profileMode === ProfilePageMode.changePassword ? (
        <ChangePasswordForm
          isLoading={
            isLoading || isLoadingChangeAvatar || isLoadingChangePassword
          }
          whenSubmitForm={handleChangePassword}
        />
      ) : (
        <EditProfileForm
          isLoading={isLoading || isLoadingChangeAvatar || isLoadingEditProfile}
          isDisabled={profileMode === ProfilePageMode.profile}
          profileData={profileData}
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
      <ErrorNotification
        isOpen={errorMessage.length > 0}
        errorText={errorMessage}
        whenClose={() => setErrorMessage('')}
      />
    </Stack>
  );
};
