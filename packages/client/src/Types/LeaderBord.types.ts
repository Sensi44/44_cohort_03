export type TLeaderBordParams = {
  ratingFieldName: string;
  cursor: number;
  limit: number;
};

export type TLeaderBordData = {
  name: string;
  score: number;
};

export type TLeaderBordResponse = {
  data: {
    name: string;
    score: number;
  };
};
