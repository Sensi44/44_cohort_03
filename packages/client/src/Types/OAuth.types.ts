export type TServiceIdResponse = {
  service_id: string;
};

export interface IOAuthSignInData {
  code: string;
  redirect_uri: string;
}
