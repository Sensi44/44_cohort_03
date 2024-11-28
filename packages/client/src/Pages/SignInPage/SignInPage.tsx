import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Typography, Container } from '@mui/material';

import { ErrorNotification } from '@Components';
import { SignInForm } from '@Components';
import { Routes } from '@Constants';
import { useAuthApi } from '@Services';
import { useAppDispatch } from '@Store';
import { updateProfileData } from '@StoreOld';

import type { IUserLogin } from '@Types';

import './SignInPage.scss';

export const SignInPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const authApi = useAuthApi();
  const dispatch = useAppDispatch();

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
    <Container className='sign-in-page__page'>
      <Typography textAlign='center' variant='h4' color='primary'>
        Вход
      </Typography>
      <div className='sign-in-page__form'>
        <SignInForm isLoading={isLoading} whenSubmitForm={handleSubmitForm} />
      </div>
      <Typography textAlign='center' variant='body2'>
        <NavLink to={`/${Routes.SignUp}`}>Нет аккаунта?</NavLink>
      </Typography>
      <ErrorNotification
        isOpen={errorMessage.length > 0}
        errorText={errorMessage}
        whenClose={() => setErrorMessage('')}
      />
    </Container>
  );
};
