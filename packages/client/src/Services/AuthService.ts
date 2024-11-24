import { UserCreate } from '@Types/UserCreate'
import { Api } from '@Services/Api'

const api = new Api()

const urlBase = '/auth'

export const useAuthApi = () => {
  const signUp = async (profileData: UserCreate) => {
    try {
      await api.post(`${urlBase}/signup`, { data: profileData })

      return {
        isSuccess: true,
        error: '',
      }
    } catch (e) {
      return {
        isSuccess: false,
        error: `Не удалось зарегистрироваться ${JSON.stringify((e as { reason: string })?.reason ?? '')}`,
      }
    }
  }

  return {
    signUp,
  }
}
