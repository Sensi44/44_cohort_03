import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Routes } from '@Constants';
import { useAuthApi } from '@Services';

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
