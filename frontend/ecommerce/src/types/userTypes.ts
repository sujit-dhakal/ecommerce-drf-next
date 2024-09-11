export interface User {
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  confirm_password: string;
}

export interface loginUserType {
  email: string;
  password: string;
}

export interface userState {
  user: {
    username: string;
    first_name: string;
    last_name: string;
  };
  isLoading: boolean;
  isError: boolean;
  isAuthenticated: boolean;
}

export interface logoutUser {
  refresh_token: string;
}
