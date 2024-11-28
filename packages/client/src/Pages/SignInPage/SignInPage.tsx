import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Typography, Stack } from '@mui/material';

import { ErrorNotification } from '@Components/ErrorNotification/ErrorNotification';
import { SignInForm } from '@Components/SignInForm/SignInForm';
import { Routes } from '@Constants/Routes';
import { updateProfileData } from '../../StoreOld/Store';
import { useAuthApi } from '@Services/AuthService';

import type { IUserLogin } from '@Types/User.types';

export const SignInPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const authApi = useAuthApi();
  const dispatch = useDispatch();

  const handleSubmitForm = async (profileData: IUserLogin) => {
    setIsLoading(true);
    const result = await authApi.signIn(profileData);

    if (result.isSuccess) {
      const userInfo = await authApi.getUserInfo();

      if (userInfo) {
        dispatch(updateProfileData(userInfo));
        navigate(Routes.Main);
      } else {
        setErrorMessage(result.error);
      }
    } else {
      setErrorMessage(result.error);
    }

    setIsLoading(false);
  };

  return (
    <Stack
      spacing={2}
      sx={{
        padding: '60px 40px 20px',
        marginTop: 2,
        alignItems: 'center',
      }}>
      <Typography sx={{ textAlign: 'center' }} variant='h4' color='primary'>
        Вход
      </Typography>
      <SignInForm isLoading={isLoading} whenSubmitForm={handleSubmitForm} />
      <Typography sx={{ textAlign: 'center' }} variant='body2'>
        <NavLink to={`/${Routes.SignUp}`}>Нет аккаунта?</NavLink>
      </Typography>
      <ErrorNotification
        isOpen={errorMessage.length > 0}
        errorText={errorMessage}
        whenClose={() => setErrorMessage('')}
      />
    </Stack>
  );
};
