export interface IUserCreate {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export interface IUserLogin {
  login: string;
  password: string;
}
