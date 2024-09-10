import { User, loginUserType } from "@/types/userTypes";
export interface IUserApi {
  registerUser(user: User): Promise<{ data: User; status: number }>;
  loginUser(
    user: loginUserType
  ): Promise<{ data: loginUserType; status: number }>;
  logout(token: string): any;
  checkEmail(email: string): any;
  checkUserName(name: string): any;
  userProfile(): Promise<User>;
}
