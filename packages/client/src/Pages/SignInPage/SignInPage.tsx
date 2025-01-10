import { Button, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { ErrorNotification, SignInForm } from '@Components';
import { Routes } from '@Constants';
import {
  useGetServiceIdQuery,
  useOAuthSignInMutation,
  useSignInMutation,
} from '@Store';

import type { IUserLogin } from '@Types';

export const SignInPage = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const [signIn, { isLoading }] = useSignInMutation();
  const [oAuthSignIn, { isLoading: isOAuthLoading }] = useOAuthSignInMutation();

  const { data: ServiceIdData } = useGetServiceIdQuery();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('code');

    if (code) {
      const oAuthData = {
        code: code,
        redirect_uri: 'http://localhost:3000',
      };
      oAuthSignIn(oAuthData)
        .unwrap()
        .then(() => navigate(Routes.Main))
        .catch((error) => {
          setErrorMessage(`Не удалось авторизоваться ${error}`);
        });
    }
  }, [location.search]);

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

  const handleOAuth = async () => {
    const serviceId = ServiceIdData?.service_id;
    const redirectUri = 'http://localhost:3000';

    const queryParams = `response_type=code&client_id=${serviceId}&redirect_uri=${redirectUri}`;
    window.location.href = `https://oauth.yandex.ru/authorize?${queryParams}`;
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
      <SignInForm
        isLoading={isLoading && isOAuthLoading}
        whenSubmitForm={handleSubmitForm}
      />
      <Button size='large' variant='contained' onClick={handleOAuth}>
        Войти через Яндекс
      </Button>
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
