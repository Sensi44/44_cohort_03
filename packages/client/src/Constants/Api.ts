import { SERVER_HOST } from './server-constants';

export const BASE_URL = 'https://ya-praktikum.tech/api/v2';
export const SERVER_URL = `${SERVER_HOST}/api`;

export enum METHODS {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
}

export const AUTH_URL_PATH = '/auth';
export const USER_URL_PATH = '/user';
export const OAUTH_URL_PATH = '/oauth';

export const baseTransformErrorResponse = (error: {
  data: { reason: string };
}) => error.data?.reason ?? '';

export const RATING_FIELD_NAME = 'beaversScore';

export const LEADER_BORD_PARAMS = {
  ratingFieldName: RATING_FIELD_NAME,
  cursor: 0,
  limit: 10,
};
