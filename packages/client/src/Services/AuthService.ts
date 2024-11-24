import { UserCreate } from '@Types/UserCreate'
import { Api } from '@Services/Api'
import { UserLogin } from '@Types/UserLogin'

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

  const signIn = async (payload: UserLogin) => {
    try {
      await api.post(`${urlBase}/signin`, { data: payload })

      return {
        isSuccess: true,
        error: '',
      }
    } catch (e) {
      const reason = (e as { reason: string })?.reason ?? ''
      const isAlreadyAuthorised =
        (e as Response).status === 400 && reason === 'User already in system'

      return {
        isSuccess: isAlreadyAuthorised,
        error: isAlreadyAuthorised ? '' : `Не удалось авторизоваться ${reason}`,
      }
    }
  }

  const getUserInfo = async () => {
    try {
      const response = (await api.get(`${urlBase}/user`)) as Response
      const result = await response.json()

      return {
        result,
        error: '',
      }
    } catch (e) {
      return {
        result: null,
        error: `Не удалось зарегистрироваться ${JSON.stringify((e as { reason: string })?.reason ?? '')}`,
      }
    }
  }

  return {
    signUp,
    signIn,
    getUserInfo,
  }
}
