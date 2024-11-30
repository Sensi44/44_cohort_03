import { Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { ErrorNotification, SignInForm } from '@Components';
import { Routes } from '@Constants';
import { useSignInMutation } from '@Store';

import type { IUserLogin } from '@Types';

export const SignInPage = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const [signIn, { isLoading }] = useSignInMutation();

  const handleSubmitForm = async (profileData: IUserLogin) => {
    signIn(profileData)
      .unwrap()
      .then(() => navigate(Routes.Main))
      .catch((error) => {
        if (error === 'User already in system') {
          navigate(Routes.Main);
        }
        setErrorMessage(`Не удалось авторизоваться ${error}`);
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
      <Typography textAlign='center' variant='h4' color='primary'>
        Вход
      </Typography>
      <SignInForm isLoading={isLoading} whenSubmitForm={handleSubmitForm} />
      <Typography textAlign='center' variant='body2'>
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
