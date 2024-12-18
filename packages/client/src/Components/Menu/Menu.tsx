import { AppBar, Button, SxProps, Toolbar } from '@mui/material';
import { NavLink } from 'react-router-dom';

import { LogoutButton } from '@Components';
import { Routes } from '@Constants';

const buttonStyles = {
  '&.active': {
    backgroundColor: 'red',
  },
} as SxProps;

export const Menu = () => {
  return (
    <AppBar position='static'>
      <Toolbar>
        <Button
          sx={buttonStyles}
          color='inherit'
          component={NavLink}
          to={Routes.Main}>
          Главная
        </Button>
        <Button
          sx={buttonStyles}
          color='inherit'
          component={NavLink}
          to={Routes.SignUp}>
          Регистрация
        </Button>
        <Button
          sx={buttonStyles}
          color='inherit'
          component={NavLink}
          to={Routes.SignIn}>
          Вход
        </Button>
        <Button
          sx={buttonStyles}
          color='inherit'
          component={NavLink}
          to={Routes.Forum}>
          Форум
        </Button>
        <Button
          sx={buttonStyles}
          color='inherit'
          component={NavLink}
          to={Routes.LeaderBord}>
          Лидерборд
        </Button>
        <Button
          sx={buttonStyles}
          color='inherit'
          component={NavLink}
          to={Routes.Profile}>
          Профиль
        </Button>
        <LogoutButton />
      </Toolbar>
    </AppBar>
  );
};
