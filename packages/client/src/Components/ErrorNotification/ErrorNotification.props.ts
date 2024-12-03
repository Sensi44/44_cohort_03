import { AlertProps } from '@mui/material';

export type IErrorNotificationProps = {
  isOpen: boolean;
  errorText: string;
  whenClose: () => void;
} & AlertProps;
