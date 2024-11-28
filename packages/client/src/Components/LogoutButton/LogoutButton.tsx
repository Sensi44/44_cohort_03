import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { Routes } from '@Constants/Routes';
import { useAuthApi } from '@Services/AuthService';

export const LogoutButton: React.FC = () => {
  const authApi = useAuthApi();
  const navigate = useNavigate();

  const handleLogout = () => {
    authApi.logout().then((result) => {
      if (!result.isSuccess) {
        return;
      }
      navigate(`/${Routes.SignIn}`);
    });
  };

  return (
    <Button color='inherit' onClick={handleLogout}>
      Выйти
    </Button>
  );
};
