import { createApi } from '@reduxjs/toolkit/query/react';

import {
  baseTransformErrorResponse,
  BASE_URL,
  LEADER_BORD_PARAMS,
  METHODS,
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
          url: `/leaderboard/beavers`,
          method: METHODS.POST,
          data: LEADER_BORD_PARAMS,
        };
      },
      transformResponse: (
        response: TLeaderBordResponse[],
      ): TLeaderBordData[] => {
        return response.map((obj) => obj.data);
      },
      transformErrorResponse: baseTransformErrorResponse,
    }),
  }),
});

export const { useGetLeaderBordQuery } = LeaderBordApi;
