import { Snackbar, Alert } from '@mui/material';

import type { IErrorNotificationProps } from './ErrorNotification.props';

export const ErrorNotification = ({
  isOpen,
  errorText,
  whenClose,
}: IErrorNotificationProps) => {
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
