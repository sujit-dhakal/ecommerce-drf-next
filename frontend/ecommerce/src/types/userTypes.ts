export interface User {
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  confirm_password: string;
}

export interface loginUser {
  email: string;
  password: string;
}

export interface userState {
  user: User;
  isLoading: boolean;
  isError: boolean;
}
