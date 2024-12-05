export const BASE_URL = 'https://ya-praktikum.tech/api/v2';

export enum METHODS {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
}

export const AUTH_URL_PATH = '/auth';
export const USER_URL_PATH = '/user';

export const baseTransformErrorResponse = (error: {
  data: { reason: string };
}) => error.data?.reason ?? '';

export const LEADER_BORD_PARAMS = {
  ratingFieldName: 'score',
  cursor: 0,
  limit: 20,
};
