import { FC } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { ErrorNotificationProps } from './ErrorNotification.props';

export const ErrorNotification: FC<ErrorNotificationProps> = ({
  isOpen,
  errorText,
  whenClose,
}) => {
  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={5000}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      onClose={whenClose}>
      <Alert
        onClose={whenClose}
        severity='error'
        variant='filled'
        sx={{ width: '100%' }}>
        {errorText}
      </Alert>
    </Snackbar>
  );
};
