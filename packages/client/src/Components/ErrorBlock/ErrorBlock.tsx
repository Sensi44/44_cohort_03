import { Routes } from '@Constants';
import { Stack, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { IErrorBlockProps } from './ErrorBlock.props';

export const ErrorBlock = ({ title, subtitle }: IErrorBlockProps) => {
  return (
    <Stack
      spacing={2}
      sx={{
        padding: '200px 40px',
        marginTop: 2,
        alignItems: 'center',
      }}>
      <Typography textAlign='center' variant='h1' color='primary'>
        {title}
      </Typography>
      <Typography textAlign='center' variant='subtitle1' color='primary'>
        {subtitle}
      </Typography>
      <Typography textAlign='center' variant='body1'>
        <NavLink to={Routes.Main}>На главную</NavLink>
      </Typography>
    </Stack>
  );
};
