import { Snackbar, Alert } from '@mui/material'
import { ErrorNotificationProps } from './ErrorNotification.props'

export default function ErrorNotification({
  isOpen,
  errorText,
  whenClose,
}: ErrorNotificationProps) {
  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={5000}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      onClose={whenClose}>
      <Alert
        onClose={whenClose}
        severity="error"
        variant="filled"
        sx={{ width: '100%' }}>
        {errorText}
      </Alert>
    </Snackbar>
  )
}
