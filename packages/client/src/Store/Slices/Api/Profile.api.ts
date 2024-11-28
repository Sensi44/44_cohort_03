import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from '@Utils/Queries/BaseQuery';
import {
  AUTH_URL_PATH,
  BASE_URL,
  baseTransformErrorResponse,
  METHODS,
  USER_URL_PATH,
} from '@Constants/Api';

import type {
  IUserChange,
  IUserChangePassword,
  IUserCreate,
  IUserLogin,
  TUserProfileResponse,
} from '@Types/User.types';
import { resetProfileData, setProfileData } from '../Profile/Profile.slice';
import { IProfileDataState } from '@Store/Types/User.types';

export const ProfileApi = createApi({
  baseQuery: axiosBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    loadUserInfo: build.mutation<IProfileDataState, void>({
      query: () => {
        return {
          url: `${AUTH_URL_PATH}/user`,
          method: METHODS.GET,
        };
      },
      transformResponse: (
        response: TUserProfileResponse,
      ): IProfileDataState => {
        return {
          id: response.id ?? -1,
          firstName: response.first_name ?? '',
          secondName: response.second_name ?? '',
          displayName: response.display_name ?? '',
          login: response.login ?? '',
          email: response.email ?? '',
          phone: response.phone ?? '',
          avatar: response.avatar ?? '',
        };
      },
      transformErrorResponse: baseTransformErrorResponse,
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setProfileData(data));
        } catch {
          dispatch(resetProfileData());
        }
      },
    }),
    signUp: build.mutation<void, IUserCreate>({
      query: (payload) => {
        return {
          url: `${AUTH_URL_PATH}/signup`,
          method: METHODS.POST,
          data: payload,
        };
      },
      transformErrorResponse: baseTransformErrorResponse,
    }),
    signIn: build.mutation<void, IUserLogin>({
      query: (payload) => {
        return {
          url: `${AUTH_URL_PATH}/signin`,
          method: METHODS.POST,
          data: payload,
        };
      },
      transformErrorResponse: baseTransformErrorResponse,
    }),
    logout: build.mutation<void, void>({
      query: () => {
        return {
          url: `${AUTH_URL_PATH}/logout`,
          method: METHODS.POST,
        };
      },
      transformErrorResponse: baseTransformErrorResponse,
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        await queryFulfilled;
        dispatch(resetProfileData());
      },
    }),
    changeAvatar: build.mutation<void, FormData>({
      query: (payload) => {
        return {
          url: `${USER_URL_PATH}/profile/avatar`,
          method: METHODS.PUT,
          data: payload,
        };
      },
      transformErrorResponse: baseTransformErrorResponse,
    }),
    changePassword: build.mutation<void, IUserChangePassword>({
      query: (payload) => {
        return {
          url: `${USER_URL_PATH}/password`,
          method: METHODS.PUT,
          data: payload,
        };
      },
      transformErrorResponse: baseTransformErrorResponse,
    }),
    editUser: build.mutation<void, IUserChange>({
      query: (payload) => {
        return {
          url: `${USER_URL_PATH}/profile`,
          method: METHODS.PUT,
          data: {
            first_name: payload.firstName,
            second_name: payload.secondName,
            display_name: payload.displayName,
            login: payload.login,
            email: payload.email,
            phone: payload.phone,
          },
        };
      },
      transformErrorResponse: baseTransformErrorResponse,
    }),
  }),
});

export const {
  useLoadUserInfoMutation,
  useSignUpMutation,
  useSignInMutation,
  useLogoutMutation,
  useChangeAvatarMutation,
  useChangePasswordMutation,
  useEditUserMutation,
} = ProfileApi;
