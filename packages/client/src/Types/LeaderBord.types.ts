export type TLeaderBordParams = {
  ratingFieldName: string;
  cursor: number;
  limit: number;
};

export type TLeaderBordData = {
  name: string;
  beaversScore: number;
};

export type TLeaderBordResponse = {
  data: TLeaderBordData;
};

export const RATING_FIELD_NAME = 'beaversScore';

export const LEADER_BORD_PARAMS = {
  ratingFieldName: RATING_FIELD_NAME,
  cursor: 0,
  limit: 10,
};
