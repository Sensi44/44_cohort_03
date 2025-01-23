import { createApi } from '@reduxjs/toolkit/query/react';

import {
  baseTransformErrorResponse,
  BASE_URL,
  LEADER_BORD_PARAMS,
  METHODS,
  RATING_FIELD_NAME,
} from '@Constants';
import { TLeaderBordData, TLeaderBordResponse } from '@Types';
import { axiosBaseQuery } from '@Utils';

export const LeaderBordApi = createApi({
  reducerPath: 'leaderBord',
  baseQuery: axiosBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    getLeaderBord: build.query<TLeaderBordData[], void>({
      query: () => {
        return {
          url: `/leaderboard/all`,
          method: METHODS.POST,
          data: LEADER_BORD_PARAMS,
        };
      },
      transformResponse: (
        response: TLeaderBordResponse[],
      ): TLeaderBordData[] => {
        return response?.map((obj) => obj.data);
      },
    }),

    sendScore: build.mutation<void, TLeaderBordData>({
      //
      query: (payload) => {
        return {
          url: `/leaderboard`,
          method: METHODS.POST,
          data: {
            data: payload,
            ratingFieldName: RATING_FIELD_NAME,
          },
        };
      },
      transformErrorResponse: baseTransformErrorResponse,
    }),
  }),
});

export const { useGetLeaderBordQuery, useSendScoreMutation } = LeaderBordApi;
