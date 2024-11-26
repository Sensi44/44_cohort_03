import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Typography, Container } from '@mui/material';

import { ErrorNotification } from '@Components/ErrorNotification/ErrorNotification';
import { SignInForm } from '@Components/SignInForm/SignInForm';
import type { IUserLogin } from '@Types/User.types';
import { Routes } from '../../main';
import { updateProfileData } from '@State/Store';
import { useAuthApi } from '@Services/AuthService';

import './SignInPage.scss';

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
    <Container className='sign-in-page__page'>
      <Typography className='sign-in-page__title' variant='h4' color='primary'>
        Вход
      </Typography>
      <div className='sign-in-page__form'>
        <SignInForm isLoading={isLoading} whenSubmitForm={handleSubmitForm} />
      </div>
      <Typography className='sign-in-page__message' variant='body2'>
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
