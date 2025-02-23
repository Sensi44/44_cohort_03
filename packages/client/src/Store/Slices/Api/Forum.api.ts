import { createApi } from '@reduxjs/toolkit/query/react';

import { baseTransformErrorResponse, METHODS, SERVER_URL } from '@Constants';
import { IComment, ICreateComment, ITopic, ITopicCreate } from '@Store';
import { axiosBaseQuery } from '@Utils';

export const ForumApi = createApi({
  reducerPath: 'forum',
  baseQuery: axiosBaseQuery({ baseUrl: SERVER_URL }),
  endpoints: (build) => ({
    getTopics: build.query<ITopic[], void>({
      query: () => {
        return {
          url: '/topic',
          method: METHODS.GET,
        };
      },
      transformResponse: (response: { topics: ITopic[] }): ITopic[] => {
        return response?.topics;
      },
      transformErrorResponse: baseTransformErrorResponse,
    }),
    createTopic: build.mutation<void, ITopicCreate>({
      query: (payload) => {
        return {
          url: '/topic',
          method: METHODS.POST,
          data: payload,
        };
      },
      transformErrorResponse: baseTransformErrorResponse,
    }),
    createComment: build.mutation<void, ICreateComment>({
      query: (payload) => {
        return {
          url: '/comment',
          method: METHODS.POST,
          data: payload,
        };
      },
      transformErrorResponse: baseTransformErrorResponse,
    }),
    getComments: build.mutation<IComment[], { topic_id: number }>({
      query: (payload) => {
        return {
          url: '/comment/topic',
          method: METHODS.POST,
          data: payload,
        };
      },
      transformResponse: (response: { comments: IComment[] }): IComment[] => {
        return response?.comments;
      },
      transformErrorResponse: baseTransformErrorResponse,
    }),
  }),
});

export const {
  useCreateCommentMutation,
  useCreateTopicMutation,
  useGetTopicsQuery,
  useGetCommentsMutation,
} = ForumApi;
