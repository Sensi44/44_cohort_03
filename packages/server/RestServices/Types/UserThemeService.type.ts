export interface IUpdateUserThemeRequest {
  user_id: number;
  theme: string;
}

export interface ICreateUserThemeRequest {
  user_id: number;
}

export interface IFindUserThemeRequest {
  user_id: number;
}
