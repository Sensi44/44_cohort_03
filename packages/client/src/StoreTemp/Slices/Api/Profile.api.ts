import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from '@Utils/Queries/BaseQuery';
import { BASE_URL } from '@Constants/Api';

import type {
  TUserProfileResponse,
  TUserProfileData,
  TUserProfileParams,
} from '@Types/User.types';
import type { RootState } from '../../index';

export const ProfileApi = createApi({
  baseQuery: axiosBaseQuery({ baseUrl: `${BASE_URL}/user` }),
  endpoints: (build) => ({
    changeUserProfile: build.mutation<TUserProfileData, TUserProfileParams>({
      query: (userProfileData) => {
        return {
          url: `/profile`,
          method: 'PUT',
          data: userProfileData,
        };
      },

      /** Логика преобразования данных с бэка прилетает snake_case на фронте используем camelCase  */
      transformResponse: (response: TUserProfileResponse): TUserProfileData => {
        return {
          id: response.id,
          firstName: response.first_name,
          secondName: response.second_name,
          displayName: response.display_name,
          login: response.login,
          email: response.email,
          phone: response.phone,
          avatar: response.avatar,
        };
      },

      /** Если нужно положить в стэйт (что редко бывает нужно) либо сделать какие-то действия по окончании запроса, тут же можно обработать ошибки */
      async onQueryStarted(arg, { queryFulfilled, dispatch, getState }) {
        await queryFulfilled.catch((err) => {
          console.error('Не удалось загрузить данные профиля', err);

          /** Получаем доступ к стору */
          const {
            profile: { disabled },
          } = getState() as RootState;

          /** Всё как обычно прокидываем экшен с payload в диспатч */
          // dispatch(setProfileData(data));
        });
      },
    }),
    // остальные запросы
  }),
});

export const { useChangeUserProfileMutation } = ProfileApi;

/** Использование в компоненте  */
// const [initChangeUserProfile, { isLoading, isError }] = useChangeUserProfileMutation();

// initChangeUserProfile({
//   first_name: 'first_name',
//   second_name: 'second_name',
//   display_name: 'display_name',
//   login: 'login',
//   email: 'email',
//   phone: 'phone',
// });
