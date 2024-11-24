import { UserLogin } from '@Types/UserLogin'

export type SignInFormProps = {
  isLoading: boolean
  whenSubmitForm: (userInfo: UserLogin) => void
}
