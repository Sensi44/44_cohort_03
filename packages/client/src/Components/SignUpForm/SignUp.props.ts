import { UserCreate } from '@Types/UserCreate';

export type SignUpFormProps = {
  isLoading: boolean;
  whenSubmitForm: (userInfo: UserCreate) => void;
};
